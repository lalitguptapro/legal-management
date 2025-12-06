-- Quick Fix: If you already ran the schema and got errors
-- Run this first to clean up, then run the main schema again

-- Drop tables in reverse dependency order (if they exist)
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS pipeline_stages CASCADE;
DROP TABLE IF EXISTS email_campaigns CASCADE;
DROP TABLE IF EXISTS audiences CASCADE;

-- Now run the main legal_management_schema.sql file again

