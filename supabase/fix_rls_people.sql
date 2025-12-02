-- Fix RLS Policy for people table
-- First, enable RLS (idempotent)
ALTER TABLE people ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable all for everyone" ON people;
DROP POLICY IF EXISTS "Enable read access for all users" ON people;
DROP POLICY IF EXISTS "Enable insert access for all users" ON people;
DROP POLICY IF EXISTS "Enable update access for all users" ON people;
DROP POLICY IF EXISTS "Enable delete access for all users" ON people;

-- Create a permissive policy for ALL operations (Select, Insert, Update, Delete)
-- This allows anyone (anon or authenticated) to do anything. 
-- WARNING: For production, you should restrict this to authenticated users or specific roles.
CREATE POLICY "Enable all for everyone" 
ON people 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Force schema cache reload
NOTIFY pgrst, 'reload config';
