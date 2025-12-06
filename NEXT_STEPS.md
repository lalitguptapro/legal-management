# Next Steps - After Database Setup

## ✅ Step 1: Set Up Environment Variables

1. **Get your Supabase credentials:**
   - In Supabase Dashboard, go to **Settings** → **API**
   - Copy your **Project URL**
   - Copy your **anon/public** key

2. **Create `.env.local` file** in the root of your project:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Example:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## ✅ Step 2: Configure Row Level Security (RLS)

For testing purposes, you may want to temporarily disable RLS or create permissive policies.

### Option A: Disable RLS (For Testing Only)

In Supabase SQL Editor, run:
```sql
-- Temporarily disable RLS for testing
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates DISABLE ROW LEVEL SECURITY;
-- Add other tables as needed
```

### Option B: Create Permissive Policies (Recommended)

In Supabase SQL Editor, run:
```sql
-- Allow all operations for now (you can restrict later)
CREATE POLICY "Enable all for all users" ON contacts FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON pipeline_stages FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON forms FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON appointments FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON tasks FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON email_templates FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON email_sends FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON documents FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON invoices FOR ALL USING (true);
```

## ✅ Step 3: Start the Development Server

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   - Go to `http://localhost:3000`
   - You should see the dashboard

## ✅ Step 4: Test the Application

1. **Navigate to Contacts:**
   - Click "Contacts" in the sidebar
   - Click "Add Contact"
   - Create a test contact
   - Verify it appears in the list

2. **Test Pipeline:**
   - Go to "Pipeline"
   - You should see default pipeline stages
   - Try moving contacts between stages

3. **Test Forms:**
   - Go to "Forms"
   - Click "Create Form"
   - Build a simple form
   - Test form creation

4. **Test Other Features:**
   - Appointments
   - Tasks
   - Emails

## ✅ Step 5: Create Default Pipeline Stages

The pipeline needs default stages. Run this in Supabase SQL Editor:

```sql
-- Insert default pipeline stages
INSERT INTO pipeline_stages (name, position, color) VALUES
('New Lead', 0, '#3B82F6'),
('Contacted', 1, '#8B5CF6'),
('Qualified', 2, '#10B981'),
('Proposal', 3, '#F59E0B'),
('Negotiation', 4, '#EF4444'),
('Won', 5, '#10B981'),
('Lost', 6, '#6B7280')
ON CONFLICT DO NOTHING;
```

## ✅ Step 6: Verify Everything Works

Check these:
- ✅ Can create contacts
- ✅ Can view contacts list
- ✅ Can create forms
- ✅ Can schedule appointments
- ✅ Can create tasks
- ✅ Dashboard shows data

## 🚧 Step 7: Next Development Steps

1. **Add Authentication:**
   - Set up Supabase Auth
   - Create login/signup pages
   - Update RLS policies to use auth

2. **Complete Remaining Features:**
   - SMS/MMS messaging
   - Document automation
   - E-signatures
   - Billing & invoicing
   - Analytics & reporting

3. **Add Integrations:**
   - Email service (SendGrid, Resend, etc.)
   - SMS service (Twilio, etc.)
   - Payment processing (Stripe, etc.)

4. **Customize:**
   - Add your branding
   - Customize colors and styles
   - Add your logo

## 🔧 Troubleshooting

### Issue: "Failed to fetch contacts"
- Check your `.env.local` file has correct credentials
- Verify RLS policies are set correctly
- Check browser console for errors

### Issue: "Table doesn't exist"
- Make sure you ran the complete schema
- Check Supabase Table Editor to verify tables exist

### Issue: "Permission denied"
- Check RLS policies
- Make sure policies allow the operations you're trying

## 📝 Quick Reference

- **Supabase Dashboard**: https://app.supabase.com
- **Environment Variables**: `.env.local` file
- **Database Schema**: `supabase/legal_management_schema.sql`
- **Development Server**: `npm run dev`
- **Application URL**: http://localhost:3000

