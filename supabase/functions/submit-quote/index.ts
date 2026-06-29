// Supabase Edge Function — Deno runtime
// Deploy with: npx supabase functions deploy submit-quote

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const COMPANY_EMAIL = Deno.env.get("COMPANY_EMAIL") ?? "damakasumultilinkinvestmentlimited@gmail.com";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RATE_LIMIT = 5; // max submissions per IP per hour

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── CORS headers ──────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─── Sanitize: strip HTML tags ─────────────────────────────────
function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
    .slice(0, 5000);
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
      from: "DAMAKASU MULTI-LINK <noreply@damakasusupply.com>",
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
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}&remoteip=${ip}`,
  });
  const json = await res.json();
  return json.success && json.score >= 0.5;
}

// ─── Company email HTML ────────────────────────────────────────
function companyEmailHtml(data: Record<string, string>) {
  const dt = new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
  return `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
  <div style="background:#0F172A;padding:24px;text-align:center">
    <h2 style="color:#fff;margin:0;font-size:20px">New Quote Request</h2>
    <p style="color:#94a3b8;margin:4px 0 0">DAMAKASU MULTI-LINK INVESTIMENT LTD</p>
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
      <p style="margin:0;color:#334155;line-height:1.6">${data.message}</p>
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
function customerEmailHtml(name: string) {
  return `
<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
  <div style="background:#0F172A;padding:24px;text-align:center">
    <h2 style="color:#fff;margin:0;font-size:20px">Quote Request Received</h2>
    <p style="color:#94a3b8;margin:4px 0 0">DAMAKASU MULTI-LINK INVESTIMENT LTD</p>
  </div>
  <div style="padding:32px">
    <p style="color:#334155;font-size:16px">Dear <strong>${name}</strong>,</p>
    <p style="color:#334155;line-height:1.7">
      Thank you for contacting <strong>Damakasu Multi-Link Investiment Ltd.</strong>
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
    <p style="color:#64748b;font-size:14px">Best regards,<br/><strong>DAMAKASU MULTI-LINK INVESTIMENT LTD</strong><br/>Sales & Procurement Team</p>
  </div>
  <div style="background:#f1f5f9;padding:16px;text-align:center">
    <p style="color:#94a3b8;font-size:12px;margin:0">Damaturu LGA, Nigeria &nbsp;|&nbsp; Kano Dawanau Market, Damakasu Street</p>
  </div>
</div>`;
}

// ─── Main handler ──────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  try {
    const body = await req.json();

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
        headers: { ...CORS, "Content-Type": "application/json" },
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
        { status: 429, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    // 3. Sanitize
    const data = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone ?? ""),
      company: sanitize(body.company ?? ""),
      product: sanitize(body.product ?? ""),
      message: sanitize(body.message),
    };

    // 4. Server-side validation
    if (!data.name || data.name.length < 2) {
      return new Response(JSON.stringify({ error: "Valid name is required." }), {
        status: 422,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }
    if (!isEmail(data.email)) {
      return new Response(JSON.stringify({ error: "Valid email is required." }), {
        status: 422,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }
    if (!data.message || data.message.length < 10) {
      return new Response(JSON.stringify({ error: "Message must be at least 10 characters." }), {
        status: 422,
        headers: { ...CORS, "Content-Type": "application/json" },
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
      { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
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
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
