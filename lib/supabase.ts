import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yonoqofkviojnebhlfkh.supabase.co";
const supabaseKey = "sb_publishable_--raM0w4lgib3YQjl4mqcQ_m2fFqGRJ";

export const supabase = createClient(supabaseUrl, supabaseKey);