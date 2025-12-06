# Database Setup Guide

## How to Apply the Schema to Your Supabase Database

Follow these steps to set up your database:

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project (or create a new one if you haven't already)

### Step 2: Open SQL Editor

1. In your Supabase project dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New query"** button (top right)

### Step 3: Copy the Schema

1. Open the file `supabase/legal_management_schema.sql` in your code editor
2. Select all the content (Ctrl+A / Cmd+A)
3. Copy it (Ctrl+C / Cmd+C)

### Step 4: Paste and Run in Supabase

1. Go back to the Supabase SQL Editor
2. Paste the entire schema into the SQL editor (Ctrl+V / Cmd+V)
3. Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)

### Step 5: Verify Tables Were Created

1. In Supabase dashboard, go to **"Table Editor"** in the left sidebar
2. You should see all the tables listed:
   - contacts
   - pipeline_stages
   - forms
   - appointments
   - tasks
   - email_templates
   - And many more...

### Alternative: Run Schema in Parts

If you encounter any errors, you can run the schema in smaller parts:

1. **First, create the base tables** (contacts, pipeline_stages)
2. **Then create dependent tables** (forms, appointments, etc.)
3. **Finally, create indexes and RLS policies**

## Important Notes

⚠️ **Before Running:**
- Make sure you're in the correct Supabase project
- The schema uses `CREATE TABLE IF NOT EXISTS`, so it's safe to run multiple times
- If tables already exist, they won't be overwritten

⚠️ **After Running:**
- Check for any errors in the SQL Editor output
- Verify that all tables were created successfully
- You may need to adjust RLS (Row Level Security) policies based on your authentication setup

## Troubleshooting

### Error: "relation already exists"
- This means the table already exists. The schema uses `IF NOT EXISTS`, so this shouldn't happen, but if it does, you can either:
  - Drop the existing table first (be careful - this deletes data!)
  - Or skip that table creation

### Error: "permission denied"
- Make sure you're using the correct database role
- Check your Supabase project settings

### Error: "syntax error"
- Make sure you copied the entire schema
- Check for any missing semicolons
- Verify you're using PostgreSQL syntax

## Next Steps After Schema Setup

1. **Set up environment variables** in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Configure Row Level Security (RLS)**:
   - The schema includes basic RLS policies
   - You may need to customize them based on your authentication setup

3. **Test the application**:
   - Run `npm run dev`
   - Try creating a contact to verify the database connection

## Quick Reference

- **Supabase Dashboard**: https://app.supabase.com
- **SQL Editor Location**: Left sidebar → SQL Editor
- **Table Editor Location**: Left sidebar → Table Editor
- **Schema File**: `supabase/legal_management_schema.sql`

