import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gueylgcdsurkxlspzyrv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZXlsZ2Nkc3Vya3hsc3B6eXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NzM5NzQsImV4cCI6MjA3MDE0OTk3NH0.qmwaEe8JJSPCcSEDxuw3IrtWMHBNFhZxi91_fRUcuYI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});