-- Fix RLS Policy for cases table to ensure it's readable
-- First, enable RLS (idempotent)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable all for everyone" ON cases;
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert access for all users" ON cases;
DROP POLICY IF EXISTS "Enable update access for all users" ON cases;
DROP POLICY IF EXISTS "Enable delete access for all users" ON cases;

-- Create a permissive policy for ALL operations
CREATE POLICY "Enable all for everyone" 
ON cases 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Force schema cache reload
NOTIFY pgrst, 'reload config';
