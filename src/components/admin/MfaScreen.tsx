import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "enroll" | "verify";

type Enrollment = { factorId: string; qrCode: string; secret: string };

/**
 * Two-step sign-in for admins (Supabase Auth TOTP). "enroll" shows a QR code for an authenticator
 * app the first time; "verify" asks for the current 6-digit code. Either way, success upgrades the
 * session to aal2, which the database requires before any quote request can be read.
 */
export function MfaScreen({ mode, onVerified, onCancel }: { mode: Mode; onVerified: () => void; onCancel: () => void }) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error: listError } = await supabase.auth.mfa.listFactors();
      if (cancelled) return;
      if (listError) {
        setError(`Could not load two-step sign-in: ${listError.message}`);
        return;
      }
      if (mode === "verify") {
        const verified = data.totp.find((factor) => factor.status === "verified");
        if (verified) setFactorId(verified.id);
        else setError("No authenticator is set up for this account.");
        return;
      }
      // Remove abandoned, never-verified set-ups before starting a fresh one.
      for (const factor of data.all.filter((f) => f.status === "unverified")) {
        await supabase.auth.mfa.unenroll({ factorId: factor.id });
      }
      const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: `Damakasu admin (${new Date().toISOString().slice(0, 10)})`,
      });
      if (cancelled) return;
      if (enrollError || !enrolled) {
        setError(`Could not start two-step set-up: ${enrollError?.message ?? "unknown error"}`);
        return;
      }
      setEnrollment({ factorId: enrolled.id, qrCode: enrolled.totp.qr_code, secret: enrolled.totp.secret });
      setFactorId(enrolled.id);
    })();
    return () => {
      cancelled = true;
    };
  }, [mode]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!factorId || busy) return;
    const digits = code.replace(/\s/g, "");
    if (!/^\d{6}$/.test(digits)) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setBusy(true);
    setError("");
    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: digits });
    setBusy(false);
    if (verifyError) {
      setError("That code didn't work. Check the time on your phone is correct and try the newest code.");
      setCode("");
      return;
    }
    onVerified();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card w-full max-w-md rounded-2xl shadow-medium p-8 sm:p-10 border border-border/40"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            {mode === "enroll" ? <ShieldCheck className="w-7 h-7 text-white" /> : <KeyRound className="w-7 h-7 text-white" />}
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            {mode === "enroll" ? "Set up two-step sign-in" : "Two-step sign-in"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "enroll"
              ? "Admin access needs a code from an authenticator app (e.g. Google Authenticator or Microsoft Authenticator)."
              : "Enter the 6-digit code from your authenticator app."}
          </p>
        </div>

        {mode === "enroll" && (
          <div className="mb-6 space-y-3 text-sm text-muted-foreground">
            <p><strong className="text-foreground">1.</strong> In your authenticator app, add an account and scan this code:</p>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-xl border border-border bg-white p-2">
              {enrollment ? (
                <img src={enrollment.qrCode} alt="QR code for setting up two-step sign-in" className="h-full w-full" />
              ) : (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading" />
              )}
            </div>
            {enrollment && (
              <p className="text-center text-xs">
                Can't scan? Enter this key instead:{" "}
                <code className="block break-all rounded bg-muted px-2 py-1 font-mono text-foreground" data-testid="totp-secret">
                  {enrollment.secret}
                </code>
              </p>
            )}
            <p><strong className="text-foreground">2.</strong> Type the 6-digit code the app shows:</p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9 ]*"
            maxLength={7}
            placeholder="123 456"
            aria-label="6-digit authentication code"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            className="h-12 text-center text-lg tracking-[0.3em]"
            autoFocus
          />
          {error && (
            <p role="alert" className="flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={busy || !factorId}>
            {busy ? "Checking..." : mode === "enroll" ? "Confirm and continue" : "Verify"}
          </Button>
          <button type="button" onClick={onCancel} className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline">
            Sign out
          </button>
        </form>
      </motion.div>
    </div>
  );
}
