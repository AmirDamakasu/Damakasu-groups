import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing environment variables. ' +
    'Copy .env.example to .env and fill in your Supabase project URL and anon key.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder'
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
