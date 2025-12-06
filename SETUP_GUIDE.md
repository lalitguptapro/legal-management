# Setup Guide - Legal Management System

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/legal_management_schema.sql`
4. This will create all necessary tables, indexes, and basic RLS policies

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Database Tables Created

The schema creates the following main tables:

- **contacts** - Contact/CRM management
- **pipeline_stages** - Pipeline kanban stages
- **forms** - Custom forms
- **form_submissions** - Form submission data
- **appointments** - Appointment scheduling
- **appointment_settings** - Booking configuration
- **tasks** - Task management
- **email_templates** - Email templates
- **email_sends** - Email send tracking
- **email_campaigns** - Campaign management
- **audiences** - Contact segmentation
- **email_domains** - Custom email domains
- **sms_messages** - SMS/MMS messages
- **documents** - Document storage
- **document_templates** - Document automation templates
- **e_signatures** - E-signature tracking
- **file_requests** - File request management
- **automations** - Workflow automations
- **automation_runs** - Automation execution logs
- **conflict_checks** - Conflict checking records
- **events** - Event management
- **portal_access** - Client portal access
- **portal_documents** - Portal-visible documents
- **invoices** - Invoice management
- **invoice_items** - Invoice line items
- **time_entries** - Time tracking
- **expenses** - Expense tracking
- **payments** - Payment records
- **custom_reports** - Custom report configurations
- **source_tracking** - UTM/source tracking

## Features Status

### ✅ Completed & Functional

1. **Dashboard** - Overview with statistics
2. **Contacts/CRM** - Full contact management
3. **Pipeline** - Kanban-style pipeline view
4. **Forms** - Form builder with password protection
5. **Appointments** - Appointment scheduling
6. **Tasks** - Task management system
7. **Email** - Email template management and tracking

### 🚧 In Progress / Placeholder

- SMS/MMS Messaging
- Document Automation
- E-Signatures
- File Requests
- Conflict Checking
- Calendaring
- Event Management
- Client Portal
- Analytics & Reporting
- Billing & Invoicing
- Automations
- AI Assistant

## Next Steps

1. **Set up authentication** - Configure Supabase Auth
2. **Customize RLS policies** - Adjust Row Level Security based on your needs
3. **Add integrations** - Connect with third-party services
4. **Complete remaining features** - Build out placeholder pages
5. **Add email/SMS providers** - Configure actual email and SMS services
6. **Payment integration** - Add payment processing (Stripe, etc.)

## Important Notes

- All database operations require proper RLS policies
- Email and SMS features need external service providers
- Payment processing requires payment gateway integration
- Some features are placeholders and need full implementation

## Support

For issues or questions, refer to the main README.md file.

