// Supabase Edge Function — Deno runtime
// Privileged API for Admin Dashboard operations using service_role key.
// Deploy with: npx supabase functions deploy admin-api

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ADMIN_PASSWORD_HASH = Deno.env.get("ADMIN_PASSWORD_HASH") ?? "";
const ADMIN_SESSION_SECRET = Deno.env.get("ADMIN_SESSION_SECRET") ?? "fallback_admin_secret_key_32bytes_min!";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const ALLOWED_ORIGINS = [
  "https://damakasu-groups.vercel.app",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
];

function getCorsHeaders(requestOrigin: string | null) {
  const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "X-Content-Type-Options": "nosniff",
  };
}

// Compute simple HMAC token using Web Crypto
async function generateToken(timestamp: number): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(ADMIN_SESSION_SECRET);
  const cryptoKey = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC", cryptoKey, encoder.encode(`admin:${timestamp}`)
  );
  const hashArray = Array.from(new Uint8Array(signature));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${timestamp}.${hex}`;
}

async function verifyToken(token: string): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  const [tsStr, hex] = token.split(".");
  const timestamp = parseInt(tsStr, 10);
  if (isNaN(timestamp)) return false;

  // Max 2 hours expiry
  if (Date.now() - timestamp > 2 * 60 * 60 * 1000) return false;

  const expected = await generateToken(timestamp);
  return token === expected;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  try {
    const body = await req.json();
    const action = body.action;

    // Login action does not require token
    if (action === "login") {
      const providedHash = body.passwordHash;
      if (!ADMIN_PASSWORD_HASH || providedHash !== ADMIN_PASSWORD_HASH) {
        return new Response(
          JSON.stringify({ error: "Invalid credentials." }),
          { status: 401, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
      const token = await generateToken(Date.now());
      return new Response(
        JSON.stringify({ success: true, token }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // All other actions require token validation
    const token = req.headers.get("x-admin-token") ?? body.token;
    const isValid = await verifyToken(token);
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Unauthorized or expired session." }),
        { status: 401, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    if (action === "list_quotes") {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(
        JSON.stringify({ data }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    if (action === "update_status") {
      const { id, status } = body;
      const { error } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    if (action === "delete_quote") {
      const { id } = body;
      const { error } = await supabase
        .from("quote_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action." }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Admin API Error]:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});
