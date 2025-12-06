-- Setup Default Data for Legal Management System
-- Run this after the main schema is applied
-- This gives FULL CRUD access to all tables (Super Admin Access)

-- ============================================
-- DEFAULT PIPELINE STAGES
-- ============================================

-- Insert default pipeline stages (only if they don't exist)
INSERT INTO pipeline_stages (name, position, color) VALUES
('New Lead', 0, '#3B82F6'),
('Contacted', 1, '#8B5CF6'),
('Qualified', 2, '#10B981'),
('Proposal', 3, '#F59E0B'),
('Negotiation', 4, '#EF4444'),
('Won', 5, '#10B981'),
('Lost', 6, '#6B7280')
ON CONFLICT DO NOTHING;

-- ============================================
-- RLS POLICIES - FULL CRUD ACCESS FOR ALL
-- ============================================

-- Function to create or replace policy with full access
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
BEGIN
    FOREACH table_name IN ARRAY tables
    LOOP
        -- Drop existing policies
        EXECUTE format('DROP POLICY IF EXISTS "Enable all for all users" ON %I', table_name);
        EXECUTE format('DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON %I', table_name);
        EXECUTE format('DROP POLICY IF EXISTS "Allow all for authenticated users" ON %I', table_name);
        
        -- Create new policy with full CRUD access
        EXECUTE format('
            CREATE POLICY "Enable all for all users" ON %I
                FOR ALL
                USING (true)
                WITH CHECK (true)
        ', table_name);
    END LOOP;
END $$;

-- Verify policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;
