import { createClient } from '@supabase/supabase-js';

// Browser-safe credentials only: the project URL and the anon / publishable key.
// Privileged keys (service_role, secret) live solely in Edge Function secrets.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export { isSupabaseConfigured } from './supabase-config';

if (!(supabaseUrl && supabaseAnonKey)) {
  console.warn(
    '[Supabase] Missing environment variables. ' +
    'Copy .env.example to .env and fill in your Supabase project URL and anon key.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder',
  // Only the admin dashboard signs in. Sessions persist in the browser (not during prerendering).
  { auth: { persistSession: typeof window !== 'undefined', autoRefreshToken: typeof window !== 'undefined' } },
);

export type QuoteRequest = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  message: string;
  status?: 'pending' | 'contacted' | 'closed';
  ip_address?: string;
  created_at?: string;
};
