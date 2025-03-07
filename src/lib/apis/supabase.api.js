import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_LOCALENDAR_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_LOCALENDAR_SUPABASE_API;

export const supabase = createClient(supabaseUrl, supabaseKey);
