# Legal Management System

A comprehensive legal practice management software similar to Lawmatics, built with Next.js, TypeScript, and Supabase.

## Features

### ✅ Completed Features

1. **Dashboard** - Overview with key metrics and quick actions
2. **Contacts/CRM** - Complete contact management system
   - Create, view, and manage contacts
   - Contact status tracking
   - Source tracking
   - Full contact details (name, email, phone, address, notes)

3. **Pipeline Management** - Kanban-style pipeline view
   - Visual pipeline stages
   - Drag-and-drop contact management
   - Custom pipeline stages

4. **Custom Forms** - Form builder with password protection
   - Create custom intake forms
   - Multiple field types (text, email, phone, textarea, select, checkbox, date, number)
   - Password protection option
   - Form link sharing

5. **Appointments** - Appointment scheduling system
   - Schedule appointments
   - View in list or calendar format
   - Appointment status tracking
   - Virtual meeting support

6. **Tasks** - Task management
   - Create and manage tasks
   - Priority levels
   - Status tracking
   - Task completion

7. **Email System** - Email campaign management
   - Email templates
   - Send tracking
   - Open rate tracking
   - Click tracking
   - Email analytics

### 🚧 In Progress / Planned Features

8. **SMS/MMS Messaging** - Two-way text messaging
9. **Document Automation** - Automated document generation
10. **E-Signatures** - Electronic signature collection
11. **File Requests** - Secure file upload requests
12. **Conflict Checking** - Automated conflict detection
13. **Calendaring** - Advanced calendar management
14. **Event Management** - Event planning and tracking
15. **Client Portal** - Client-facing portal
16. **Analytics & Reporting** - Custom reports and dashboards
17. **Billing & Invoicing** - Time tracking and invoicing
18. **Online Payments** - Payment processing
19. **Automations** - Workflow automation
20. **AI Assistant** - AI-powered features

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase project
   - Open the SQL Editor
   - Run the SQL script from `supabase/legal_management_schema.sql`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The complete database schema is defined in `supabase/legal_management_schema.sql`. This includes tables for:

- Contacts & CRM
- Pipeline Stages
- Forms & Form Submissions
- Appointments
- Tasks
- Email Templates & Sends
- Documents
- E-Signatures
- File Requests
- Automations
- Conflict Checks
- Events
- Client Portal
- Invoices & Billing
- Time Entries & Expenses
- Payments
- Analytics & Reporting

## Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── contacts/          # Contacts/CRM module
│   ├── pipeline/          # Pipeline management
│   ├── forms/              # Forms builder
│   ├── appointments/       # Appointments
│   ├── tasks/              # Tasks
│   ├── emails/             # Email system
│   └── ...                 # Other modules
├── components/             # React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Top header
│   └── ui/                # UI components
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
└── supabase/              # Database schemas
    └── legal_management_schema.sql
```

## Features in Detail

### Contacts/CRM
- Full contact management
- Contact status (Lead, Active, Inactive, Client)
- Source tracking
- Contact details and notes
- Integration with pipeline

### Pipeline
- Kanban-style board
- Custom pipeline stages
- Drag contacts between stages
- Visual pipeline management

### Forms
- Visual form builder
- Multiple field types
- Password protection
- Form submission tracking
- Public form links

### Appointments
- Schedule appointments
- Link to contacts
- Status tracking
- Virtual meeting support
- Calendar view (coming soon)

### Tasks
- Task creation and management
- Priority levels (Low, Medium, High, Urgent)
- Status tracking
- Due dates
- Contact association

### Email
- Email template creation
- Campaign management
- Send tracking
- Open and click analytics
- Email type categorization

## Next Steps

1. Complete remaining features (SMS, Documents, Billing, etc.)
2. Add authentication
3. Implement Row Level Security (RLS) policies
4. Add more advanced analytics
5. Implement AI features
6. Add integrations with third-party services

## Contributing

This is a work in progress. Features are being added incrementally.

## License

Private project - All rights reserved
