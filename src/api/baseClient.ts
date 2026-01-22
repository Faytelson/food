import { createClient } from "@supabase/supabase-js";

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const baseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(baseUrl, baseKey);

export default supabase;
