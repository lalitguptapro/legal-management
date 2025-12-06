# Troubleshooting Guide

## Contact Creation Errors

### Common Error: Row Level Security (RLS) Policy Violation

If you're getting errors when creating contacts, it's likely due to RLS policies blocking the insert.

#### Solution 1: Check RLS Policies in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Policies**
3. Find the `contacts` table
4. Make sure you have a policy that allows INSERT operations

#### Solution 2: Run This SQL in Supabase SQL Editor

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'contacts';

-- If RLS is blocking, create a permissive policy for development
-- (Replace with proper auth policies in production)

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Enable all for all users" ON contacts;

-- Create a new permissive policy
CREATE POLICY "Enable all for all users" ON contacts
    FOR ALL 
    USING (true) 
    WITH CHECK (true);
```

#### Solution 3: Temporarily Disable RLS (Development Only)

```sql
-- WARNING: Only use this for development!
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
```

### Common Error: Missing Environment Variables

Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Then restart your dev server:
```bash
npm run dev
```

### Common Error: Invalid Data Types

The form now properly handles:
- Empty strings converted to `null` for optional fields
- Trimmed whitespace from all inputs
- Proper data types matching the schema

### Debug Steps

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab
   - Check the Network tab for failed requests

2. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for API errors

3. **Test Database Connection**
   - Verify your Supabase credentials are correct
   - Test a simple query in Supabase SQL Editor:
   ```sql
   SELECT * FROM contacts LIMIT 1;
   ```

4. **Verify Table Structure**
   - Make sure the `contacts` table exists
   - Check that all required columns match the schema

### Quick Fix Script

Run this in Supabase SQL Editor to set up everything:

```sql
-- Ensure contacts table exists with correct structure
-- (This should already be done, but just in case)

-- Set up permissive RLS policy for development
DROP POLICY IF EXISTS "Enable all for all users" ON contacts;
CREATE POLICY "Enable all for all users" ON contacts
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'contacts';
```

## Still Having Issues?

1. Check the exact error message in the browser console
2. Verify your Supabase project is active
3. Make sure you've run the complete database schema
4. Check that RLS policies are set correctly

