/*
  # Update project categories

  1. Changes
    - Update the category constraint to use the new categories
    - Update existing projects to use new category values if needed

  2. Security
    - Maintain existing RLS policies
*/

-- First, remove the existing constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS valid_category;

-- Add the new constraint with updated categories
ALTER TABLE projects ADD CONSTRAINT valid_category 
CHECK ((category = ANY (ARRAY[
  'casas'::text, 
  'condominios'::text, 
  'comercial'::text, 
  'bancaria'::text, 
  'oficinas'::text, 
  'institucional'::text
])));

-- Update existing projects to map old categories to new ones
UPDATE projects SET category = 'casas' WHERE category = 'sustainable';
UPDATE projects SET category = 'oficinas' WHERE category = 'outdoor';
UPDATE projects SET category = 'institucional' WHERE category = 'infrastructure';
UPDATE projects SET category = 'comercial' WHERE category = 'recreational';