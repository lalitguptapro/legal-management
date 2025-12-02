-- Create lawyers table
create table if not exists lawyers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Personal Details
  name text not null,
  gender text,
  dob date,
  age integer,
  email text,
  mobile text,
  address text,
  city text,
  state text,
  postal_code text,
  country text,
  photo_url text,
  
  -- Official Details
  lawyer_type text,
  case_based_bill_rate numeric,
  time_based_bill_rate numeric,
  monthly_bill_rate numeric,
  
  -- Payment Details (Stored as JSONB)
  payment_details jsonb default '[]'::jsonb
);

-- Enable Row Level Security (RLS)
alter table lawyers enable row level security;

-- Create policy to allow all operations for authenticated users (and anon for dev)
-- WARNING: For production, you should restrict this policy.
create policy "Enable all for everyone" on lawyers
  for all using (true) with check (true);
