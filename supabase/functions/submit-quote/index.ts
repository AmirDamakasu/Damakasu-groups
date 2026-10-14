// Supabase Edge Function — Deno runtime
// Deploy with: npx supabase functions deploy submit-quote

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const COMPANY_EMAIL = Deno.env.get("COMPANY_EMAIL") ?? "info@damakasu.com";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
// Must be an address on a domain verified in Resend.
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "Damakasu Multi-Link <noreply@damakasu.com>";
const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RATE_LIMIT = 5; // max submissions per IP per hour

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Allowed origins for CORS ────────────────────────────────────
// Override with the ALLOWED_ORIGINS secret (comma-separated) when the site moves.
const ALLOWED_ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ??
  [
    "https://damakasu.com",
    "https://www.damakasu.com",
    "https://mistyrose-echidna-938984.hostingersite.com",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ].join(","))
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function getCorsHeaders(requestOrigin: string | null) {
  // Unlisted origins get the primary origin back, so browsers block their requests.
  const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "X-Content-Type-Options": "nosniff",
  };
}

// ─── Input cleaning ────────────────────────────────────────────
// Stored as plain text (control characters removed, length capped); HTML-escaped only when
// placed into email markup, so the database keeps exactly what the visitor typed.
function clean(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  // deno-lint-ignore no-control-regex
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ─── Validate email ────────────────────────────────────────────
function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// ─── Resend helper ─────────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn("[Resend] No API key — email skipped");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    console.error("[Resend] Failed:", await res.text());
  }
}

// ─── Rate limit check ──────────────────────────────────────────
async function isRateLimited(ip: string): Promise<boolean> {
  const windowStart = new Date();
  windowStart.setMinutes(0, 0, 0); // start of current hour

  const { data } = await supabase
    .from("rate_limits")
    .select("count")
    .eq("ip_address", ip)
    .eq("window_start", windowStart.toISOString())
    .maybeSingle();

  if (!data) {
    await supabase.from("rate_limits").insert({ ip_address: ip, window_start: windowStart.toISOString(), count: 1 });
    return false;
  }
  if (data.count >= RATE_LIMIT) return true;

  await supabase
    .from("rate_limits")
    .update({ count: data.count + 1 })
    .eq("ip_address", ip)
    .eq("window_start", windowStart.toISOString());
  return false;
}

// ─── reCAPTCHA verification ────────────────────────────────────
async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true; // skip if not configured
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token, remoteip: ip }),
  });
  const json = await res.json();
  return json.success && json.score >= 0.5;
}

// ─── Company email HTML ────────────────────────────────────────
function companyEmailHtml(raw: Record<string, string>) {
  const data = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, escapeHtml(v)]));
  const dt = new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
  return `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
  <div style="background:#0F172A;padding:24px;text-align:center">
    <h2 style="color:#fff;margin:0;font-size:20px">New Quote Request</h2>
    <p style="color:#94a3b8;margin:4px 0 0">Damakasu Multi-Link Investment Ltd</p>
  </div>
  <div style="padding:32px">
    <table style="width:100%;border-collapse:collapse">
      ${row("Full Name", data.name)}
      ${row("Email Address", `<a href="mailto:${data.email}">${data.email}</a>`)}
      ${row("Phone Number", data.phone || "—")}
      ${row("Company Name", data.company || "—")}
      ${row("Product of Interest", data.product || "—")}
      ${row("Date & Time", dt + " (WAT)")}
    </table>
    <div style="margin-top:24px;background:#f8fafc;border-left:4px solid #2563EB;padding:16px;border-radius:4px">
      <p style="font-weight:bold;margin:0 0 8px;color:#0F172A">Message:</p>
      <p style="margin:0;color:#334155;line-height:1.6;white-space:pre-line">${data.message}</p>
    </div>
    <div style="margin-top:24px;text-align:center">
      <a href="mailto:${data.email}?subject=Re: Your Quote Request" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Reply to Customer</a>
    </div>
  </div>
  <div style="background:#f1f5f9;padding:16px;text-align:center">
    <p style="color:#94a3b8;font-size:12px;margin:0">This notification was sent automatically by your website lead capture system.</p>
  </div>
</div>`;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#0F172A;width:40%">${label}</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#334155">${value}</td></tr>`;
}

// ─── Customer confirmation email HTML ──────────────────────────
function customerEmailHtml(rawName: string) {
  const name = escapeHtml(rawName);
  return `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
  <div style="background:#0F172A;padding:24px;text-align:center">
    <h2 style="color:#fff;margin:0;font-size:20px">Quote Request Received</h2>
    <p style="color:#94a3b8;margin:4px 0 0">Damakasu Multi-Link Investment Ltd</p>
  </div>
  <div style="padding:32px">
    <p style="color:#334155;font-size:16px">Dear <strong>${name}</strong>,</p>
    <p style="color:#334155;line-height:1.7">
      Thank you for contacting <strong>Damakasu Multi-Link Investment Ltd.</strong>
      We have received your quotation request and our sales team will respond shortly.
    </p>
    <p style="color:#334155;line-height:1.7">
      Our team typically responds within <strong>24 hours</strong> during business days
      (Monday – Friday, 8:00 AM – 6:00 PM WAT).
    </p>
    <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px;border-radius:4px;margin:24px 0">
      <p style="margin:0;color:#166534;">For urgent inquiries, please contact us directly:</p>
      <p style="margin:8px 0 0;color:#166534;">
        📞 +234 903 784 4338 &nbsp;|&nbsp; 📞 +234 903 598 893<br/>
        💬 <a href="https://wa.me/2349160595507" style="color:#166534;">Chat on WhatsApp</a>
      </p>
    </div>
    <p style="color:#64748b;font-size:14px">Best regards,<br/><strong>Damakasu Multi-Link Investment Ltd</strong><br/>Sales & Procurement Team</p>
  </div>
  <div style="background:#f1f5f9;padding:16px;text-align:center">
    <p style="color:#94a3b8;font-size:12px;margin:0">Damaturu LGA, Nigeria &nbsp;|&nbsp; Kano Dawanau Market, Damakasu Street</p>
  </div>
</div>`;
}

// ─── Main handler ──────────────────────────────────────────────
Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  try {
    const body = await req.json();

    // 0. Honeypot: the hidden "website" field is only ever filled in by bots. Reply as if accepted
    //    (so bots learn nothing) but store nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      await supabase.from("security_events").insert({ event_type: "honeypot", ip_address: ip, details: {} });
      return new Response(
        JSON.stringify({ success: true, message: "Thank you for your inquiry." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 1. reCAPTCHA
    const captchaOk = await verifyRecaptcha(body.recaptchaToken ?? "", ip);
    if (!captchaOk) {
      await supabase.from("security_events").insert({
        event_type: "recaptcha_fail",
        ip_address: ip,
        details: { score: "low" },
      });
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Rate limiting
    const limited = await isRateLimited(ip);
    if (limited) {
      await supabase.from("security_events").insert({
        event_type: "rate_limit_exceeded",
        ip_address: ip,
        details: {},
      });
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again in an hour." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": "3600",
          },
        }
      );
    }

    // 3. Sanitize
    const data = {
      name: clean(body.name, 200),
      email: clean(body.email, 254),
      phone: clean(body.phone ?? "", 40),
      company: clean(body.company ?? "", 200),
      product: clean(body.product ?? "", 200),
      message: clean(body.message, 6000),
    };

    // 4. Server-side validation (mirrors the database CHECK constraints)
    if (data.name.length < 2 || data.name.length > 100) {
      return new Response(JSON.stringify({ error: "Name must be between 2 and 100 characters." }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isEmail(data.email)) {
      return new Response(JSON.stringify({ error: "Valid email is required." }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (data.message.length < 10 || data.message.length > 5000) {
      return new Response(JSON.stringify({ error: "Message must be between 10 and 5000 characters." }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. Store in database
    const { error: dbError } = await supabase
      .from("quote_requests")
      .insert({ ...data, ip_address: ip, status: "pending" });

    if (dbError) {
      console.error("[DB] Insert error:", dbError);
      throw new Error("Database error");
    }

    // 6. Send emails (non-blocking — don't fail submission if email fails)
    await Promise.allSettled([
      sendEmail(COMPANY_EMAIL, `New Quote Request - ${data.name}`, companyEmailHtml(data)),
      sendEmail(data.email, "Quote Request Received", customerEmailHtml(data.name)),
    ]);

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for your inquiry. Our sales team will contact you within 24 hours." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Edge Function] Error:", err);
    await supabase.from("security_events").insert({
      event_type: "submission_error",
      ip_address: ip,
      details: { error: String(err) },
    });
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
