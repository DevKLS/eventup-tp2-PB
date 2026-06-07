import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bfwospbzquembjnjcbbz.supabase.co';
const supabaseAnonKey = 'sb_publishable__JTfWrvFsnosAMQjolW1vQ_apQgNLvv';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);