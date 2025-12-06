-- Super Admin Full CRUD Access for All Tables
-- Run this in Supabase SQL Editor to get full access to everything

-- ============================================
-- FULL CRUD ACCESS POLICIES
-- ============================================

-- Drop all existing policies first
DO $$
DECLARE
    table_name TEXT;
    tables TEXT[] := ARRAY[
        'contacts',
        'pipeline_stages',
        'forms',
        'form_submissions',
        'appointments',
        'appointment_settings',
        'tasks',
        'email_templates',
        'email_sends',
        'email_campaigns',
        'audiences',
        'email_domains',
        'sms_messages',
        'documents',
        'document_templates',
        'e_signatures',
        'file_requests',
        'automations',
        'automation_runs',
        'conflict_checks',
        'events',
        'portal_access',
        'portal_documents',
        'invoices',
        'invoice_items',
        'time_entries',
        'expenses',
        'payments',
        'custom_reports',
        'source_tracking'
    ];
    policy_name TEXT;
BEGIN
    FOREACH table_name IN ARRAY tables
    LOOP
        -- Drop ALL existing policies for each table
        FOR policy_name IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE schemaname = 'public' AND tablename = table_name
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', policy_name, table_name);
        END LOOP;
        
        -- Create new policy with FULL CRUD access (SELECT, INSERT, UPDATE, DELETE)
        EXECUTE format('
            CREATE POLICY "Super Admin Full Access" ON %I
                FOR ALL
                USING (true)
                WITH CHECK (true)
        ', table_name);
        
        RAISE NOTICE 'Created full access policy for table: %', table_name;
    END LOOP;
END $$;

-- Verify all policies
SELECT 
    tablename,
    policyname,
    cmd as operation,
    CASE 
        WHEN qual IS NOT NULL THEN 'USING: ' || qual
        ELSE 'No USING clause'
    END as using_clause,
    CASE 
        WHEN with_check IS NOT NULL THEN 'WITH CHECK: ' || with_check
        ELSE 'No WITH CHECK clause'
    END as with_check_clause
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Summary
SELECT 
    COUNT(*) as total_policies,
    COUNT(DISTINCT tablename) as tables_covered
FROM pg_policies 
WHERE schemaname = 'public' AND policyname = 'Super Admin Full Access';

