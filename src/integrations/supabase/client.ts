import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wfbsdphzivpiqhpzxcbw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYnNkcGh6aXZwaXFocHp4Y2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTQ2MzcsImV4cCI6MjA4OTUzMDYzN30.9x2arKdueZmEivORWH4HGbRVXQHYZ49CfQfENRmxzj4"

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
)