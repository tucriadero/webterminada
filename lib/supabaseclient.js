import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cinsudwupbiqqizvqwij.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbnN1ZHd1cGJpcXFpenZxd2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODQ3MTIsImV4cCI6MjA2ODA2MDcxMn0.NL4RoZ3dPWllHaJfK37WtPtu-6NTNJ-DRJrs6MAY8E0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
