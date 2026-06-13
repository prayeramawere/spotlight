import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseConfig = process.env.SUPABASE_ANON_KEY;

const supabase = await createClient(supabaseUrl, supabaseConfig);

export default supabase;
