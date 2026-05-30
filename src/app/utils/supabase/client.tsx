import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Client created eagerly at module load.
// detectSessionInUrl is disabled — OAuth code exchange is handled
// explicitly in App.tsx to avoid timing races with React mounting.
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: false,
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
