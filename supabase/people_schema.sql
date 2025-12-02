-- Create people table
create table if not exists people (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  case_id uuid references cases(id),
  first_name text not null,
  last_name text,
  role text not null, -- Client, Opposing client, Witness
  mobile text,
  email text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  country text,
  photo_url text
);

-- Enable RLS
alter table people enable row level security;

-- Policy
create policy "Enable all for everyone" on people for all using (true) with check (true);
