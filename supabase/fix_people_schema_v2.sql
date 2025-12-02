-- Add missing columns to people table if they don't exist
-- Version 2: Uses BIGINT for case_id to match the cases table type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'first_name') THEN
        ALTER TABLE people ADD COLUMN first_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'last_name') THEN
        ALTER TABLE people ADD COLUMN last_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'role') THEN
        ALTER TABLE people ADD COLUMN role text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'mobile') THEN
        ALTER TABLE people ADD COLUMN mobile text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'email') THEN
        ALTER TABLE people ADD COLUMN email text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'address_line1') THEN
        ALTER TABLE people ADD COLUMN address_line1 text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'address_line2') THEN
        ALTER TABLE people ADD COLUMN address_line2 text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'city') THEN
        ALTER TABLE people ADD COLUMN city text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'state') THEN
        ALTER TABLE people ADD COLUMN state text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'postal_code') THEN
        ALTER TABLE people ADD COLUMN postal_code text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'country') THEN
        ALTER TABLE people ADD COLUMN country text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'photo_url') THEN
        ALTER TABLE people ADD COLUMN photo_url text;
    END IF;
    
    -- Check for case_id and add it as BIGINT if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'case_id') THEN
        ALTER TABLE people ADD COLUMN case_id bigint references cases(id);
    END IF;
END $$;

-- Force schema cache reload
NOTIFY pgrst, 'reload config';
