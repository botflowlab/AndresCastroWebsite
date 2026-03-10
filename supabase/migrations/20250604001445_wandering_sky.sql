/*
  # Add project details fields
  
  1. New Fields
    - `location` (text) - Project location
    - `year` (integer) - Year project was created
    - `client` (text) - Client name
    
  2. Changes
    - Add new columns to projects table
    - Make fields nullable to maintain compatibility with existing data
*/

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS year integer,
ADD COLUMN IF NOT EXISTS client text;