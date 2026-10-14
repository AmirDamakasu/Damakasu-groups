import { useCallback, useRef } from "react";

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<Grecaptcha> | null = null;

function loadScript(siteKey: string): Promise<Grecaptcha> {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.onload = () => window.grecaptcha?.ready(() => resolve(window.grecaptcha as Grecaptcha));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * reCAPTCHA v3 that downloads Google's script only when the visitor starts using the form
 * (call `prime` on first focus), instead of on every page load.
 */
export function useRecaptcha(siteKey: string) {
  const primed = useRef(false);

  const prime = useCallback(() => {
    if (!siteKey || primed.current) return;
    primed.current = true;
    loadScript(siteKey).catch(() => undefined);
  }, [siteKey]);

  /** Returns a token, or "" if reCAPTCHA is not configured or could not load. */
  const execute = useCallback(
    async (action: string) => {
      if (!siteKey) return "";
      try {
        const grecaptcha = await loadScript(siteKey);
        return await grecaptcha.execute(siteKey, { action });
      } catch {
        return "";
      }
    },
    [siteKey],
  );

  return { prime, execute };
}
