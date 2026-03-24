-- Create users table for Supabase (run this in Supabase SQL Editor)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    is_subscribed BOOLEAN DEFAULT FALSE,
    subscription_ends TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for simplicity (our API handles auth)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
