import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Client created eagerly at module load so the OAuth response in the URL
// is processed as early as possible.
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
      storageKey: `sb-${projectId}-auth-token`,
    },
  }
);

export function getSupabaseClient() {
  return supabase;
}

export default getSupabaseClient;
