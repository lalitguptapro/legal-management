-- Fix RLS Policies for Contacts Table
-- Run this in Supabase SQL Editor

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON contacts;
DROP POLICY IF EXISTS "Enable all for all users" ON contacts;

-- Create a proper policy with both USING and WITH CHECK clauses
CREATE POLICY "Enable all for all users" ON contacts
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'contacts';

