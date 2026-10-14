-- ============================================================
-- DAMAKASU MULTI-LINK INVESTMENT LTD — database setup
-- Run in: Supabase Dashboard > SQL Editor > New Query.
-- Safe to re-run: every statement is idempotent.
--
-- Access model
--   * Website visitors (anon key) cannot read or write any table directly.
--   * Quote requests are inserted only by the submit-quote Edge Function (service role).
--   * Signed-in admins (Supabase Auth users listed in public.admin_users) can read quote
--     requests, change their status and delete them. Nothing else.
-- ============================================================

-- ─── Tables ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email       TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone       TEXT DEFAULT '',
  company     TEXT DEFAULT '',
  product     TEXT DEFAULT '',
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'contacted', 'closed')),
  ip_address  TEXT DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rate limiting (submissions per IP per hour), written by the Edge Function.
CREATE TABLE IF NOT EXISTS public.rate_limits (
  ip_address   TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  count        INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (ip_address, window_start)
);

-- Security events log, written by the Edge Function.
CREATE TABLE IF NOT EXISTS public.security_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type  TEXT NOT NULL,
  ip_address  TEXT,
  details     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Supabase Auth users allowed into the admin dashboard. Managed only from the SQL editor.
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id     UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Functions & triggers ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_updated_at ON public.quote_requests;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- True when the signed-in user is listed in admin_users. SECURITY DEFINER so it can read
-- admin_users, which no client role can query directly.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = (SELECT auth.uid()));
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE window_start < NOW() - INTERVAL '2 hours';
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC, anon, authenticated;

-- ─── Privileges (table level) ───────────────────────────────
-- Client roles get only what the dashboard needs; RLS below narrows it to admins.
REVOKE ALL ON public.quote_requests, public.rate_limits, public.security_events, public.admin_users
  FROM anon, authenticated;
GRANT SELECT, DELETE ON public.quote_requests TO authenticated;
GRANT UPDATE (status) ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests, public.rate_limits, public.security_events, public.admin_users
  TO service_role;

-- ─── Row Level Security ─────────────────────────────────────
ALTER TABLE public.quote_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users     ENABLE ROW LEVEL SECURITY;

-- Explicit denials for anonymous visitors (RLS already denies by default; kept for clarity).
DROP POLICY IF EXISTS "deny_anon_select" ON public.quote_requests;
CREATE POLICY "deny_anon_select" ON public.quote_requests FOR SELECT TO anon USING (false);
DROP POLICY IF EXISTS "deny_anon_insert" ON public.quote_requests;
CREATE POLICY "deny_anon_insert" ON public.quote_requests FOR INSERT TO anon WITH CHECK (false);
DROP POLICY IF EXISTS "deny_anon_update" ON public.quote_requests;
CREATE POLICY "deny_anon_update" ON public.quote_requests FOR UPDATE TO anon USING (false);
DROP POLICY IF EXISTS "deny_anon_delete" ON public.quote_requests;
CREATE POLICY "deny_anon_delete" ON public.quote_requests FOR DELETE TO anon USING (false);
DROP POLICY IF EXISTS "deny_anon_rate_limits_all" ON public.rate_limits;
CREATE POLICY "deny_anon_rate_limits_all" ON public.rate_limits FOR ALL TO anon USING (false) WITH CHECK (false);
DROP POLICY IF EXISTS "deny_anon_security_events_all" ON public.security_events;
CREATE POLICY "deny_anon_security_events_all" ON public.security_events FOR ALL TO anon USING (false) WITH CHECK (false);

-- Admin dashboard access (signed-in users listed in admin_users).
DROP POLICY IF EXISTS "admins_select_quotes" ON public.quote_requests;
CREATE POLICY "admins_select_quotes" ON public.quote_requests
  FOR SELECT TO authenticated USING ((SELECT public.is_admin()));
DROP POLICY IF EXISTS "admins_update_quotes" ON public.quote_requests;
CREATE POLICY "admins_update_quotes" ON public.quote_requests
  FOR UPDATE TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()));
DROP POLICY IF EXISTS "admins_delete_quotes" ON public.quote_requests;
CREATE POLICY "admins_delete_quotes" ON public.quote_requests
  FOR DELETE TO authenticated USING ((SELECT public.is_admin()));
-- admin_users, rate_limits and security_events have no client policies: service role / SQL editor only.

-- ─── Indexes ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON public.quote_requests (email);

-- ─── Make yourself an admin ─────────────────────────────────
-- 1. Authentication > Users > Add user (email + strong password, "Auto Confirm User").
-- 2. Run, with that email:
--    INSERT INTO public.admin_users (user_id)
--    SELECT id FROM auth.users WHERE email = 'you@example.com'
--    ON CONFLICT DO NOTHING;
