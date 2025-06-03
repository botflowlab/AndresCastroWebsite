/*
  # Create projects table and storage

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `title` (text, not null)
      - `slug` (text, unique, not null)
      - `description` (text)
      - `category` (text)
      - `images` (text array)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on projects table
    - Add policies for:
      - Select: Allow anyone to read
      - Insert/Update: Only authenticated users
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category text,
  images text[],
  user_id uuid REFERENCES auth.users(id),
  CONSTRAINT valid_category CHECK (category IN ('sustainable', 'outdoor', 'infrastructure', 'recreational'))
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);