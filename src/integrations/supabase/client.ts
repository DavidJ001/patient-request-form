// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://llrghrslxqomphmhykvc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscmdocnNseHFvbXBobWh5a3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzczMjgsImV4cCI6MjA2NDcxMzMyOH0.RI_eWT4JFo1EHQrDMCaghZxq9C-So-X3jyPMFCMO9Zw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);