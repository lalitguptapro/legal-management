# Quick Fix for Schema Error

## If you got the error: "relation pipeline_stages does not exist"

### Option 1: Clean and Re-run (Recommended)

1. In Supabase SQL Editor, run this cleanup script first:
   ```sql
   -- Drop tables if they exist
   DROP TABLE IF EXISTS contacts CASCADE;
   DROP TABLE IF EXISTS pipeline_stages CASCADE;
   ```

2. Then run the **entire** `legal_management_schema.sql` file again

### Option 2: Run in Correct Order

If you prefer to keep any data you might have created, run these in order:

**Step 1:** Create pipeline_stages first
```sql
CREATE TABLE IF NOT EXISTS pipeline_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position INTEGER NOT NULL,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2:** Then create contacts
```sql
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'Lead' CHECK (status IN ('Lead', 'Active', 'Inactive', 'Client')),
    source TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    notes TEXT,
    pipeline_stage_id UUID REFERENCES pipeline_stages(id),
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 3:** Then run the rest of the schema

### The Schema Has Been Fixed

The main schema file (`legal_management_schema.sql`) has been updated with the correct order. You can now:

1. Run the cleanup script (if needed)
2. Run the entire `legal_management_schema.sql` file

The tables will now be created in the correct dependency order.

