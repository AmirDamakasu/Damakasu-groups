-- ============================================================
-- DAMAKASU MULTI-LINK INVESTIMENT LTD
-- Quote Requests Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
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

-- Rate limiting table (track submissions per IP)
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_address  TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  count       INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (ip_address, window_start)
);

-- Security events log
CREATE TABLE IF NOT EXISTS security_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type  TEXT NOT NULL,
  ip_address  TEXT,
  details     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on quote_requests
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security: only service role can read/write (Edge Function uses service role)
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

-- Allow anon INSERT only through Edge Function (service_role key bypasses RLS)
-- For the admin dashboard, we use service_role key via Edge Function
-- Public users cannot read the table directly
-- Anon role: deny ALL operations directly on quote_requests
-- All reads/writes must go through the service-role Edge Functions
CREATE POLICY "deny_anon_select" ON quote_requests
  FOR SELECT TO anon USING (false);

CREATE POLICY "deny_anon_insert" ON quote_requests
  FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "deny_anon_update" ON quote_requests
  FOR UPDATE TO anon USING (false);

CREATE POLICY "deny_anon_delete" ON quote_requests
  FOR DELETE TO anon USING (false);

-- Rate limits table: anon can never read or write directly
CREATE POLICY "deny_anon_rate_limits_all" ON rate_limits
  FOR ALL TO anon USING (false) WITH CHECK (false);

-- Security events log: anon can never read or write directly
CREATE POLICY "deny_anon_security_events_all" ON security_events
  FOR ALL TO anon USING (false) WITH CHECK (false);

-- Index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests (email);

-- Clean up old rate limit windows automatically (older than 2 hours)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '2 hours';
END;
$$ LANGUAGE plpgsql;
