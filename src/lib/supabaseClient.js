import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ulkwqgglikxzueblsvgy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsa3dxZ2dsaWt4enVlYmxzdmd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTE2MjIyMywiZXhwIjoyMDY0NzM4MjIzfQ.ywyEFW9VQkgpgJKbAuMi92Q8De_iFf-z6HoMY4fIxvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);