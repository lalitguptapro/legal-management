-- Create cases table
create table if not exists cases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  case_number text,
  lawyer_id uuid references lawyers(id),
  client_id uuid references clients(id),
  case_type text,
  start_date date,
  court_name text,
  description text,
  status text default 'Open'
);

-- Create opposing_clients table
create table if not exists opposing_clients (
  id uuid default gen_random_uuid() primary key,
  case_id uuid references cases(id) on delete cascade,
  first_name text,
  last_name text,
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

-- Create case_witnesses table
create table if not exists case_witnesses (
  id uuid default gen_random_uuid() primary key,
  case_id uuid references cases(id) on delete cascade,
  first_name text,
  last_name text,
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
alter table cases enable row level security;
alter table opposing_clients enable row level security;
alter table case_witnesses enable row level security;

-- Policies (Allow all for authenticated users for now)
create policy "Enable all for everyone" on cases for all using (true) with check (true);
create policy "Enable all for everyone" on opposing_clients for all using (true) with check (true);
create policy "Enable all for everyone" on case_witnesses for all using (true) with check (true);
