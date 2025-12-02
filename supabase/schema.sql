-- Create Lawyers table
CREATE TABLE IF NOT EXISTS lawyers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Cases table
CREATE TABLE IF NOT EXISTS cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    case_number TEXT,
    case_type TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Open', -- Open, Pending, Closed
    start_date DATE,
    court_name TEXT,
    
    lawyer_id UUID REFERENCES lawyers(id),
    client_id UUID REFERENCES clients(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Opposing Clients table
CREATE TABLE IF NOT EXISTS opposing_clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    mobile TEXT,
    email TEXT,
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Case Witnesses table
CREATE TABLE IF NOT EXISTS case_witnesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    mobile TEXT,
    email TEXT,
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some dummy data for dropdowns (Optional)
INSERT INTO lawyers (name, specialization) VALUES 
('Sarah Connor', 'Criminal'),
('Mike Ross', 'Corporate'),
('Harvey Specter', 'Corporate');

INSERT INTO clients (name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');
