/*
  # Add blueprints column to projects table

  1. Changes
    - Add `blueprints` column to `projects` table to store architectural drawings
    - Column type: text[] (array of text URLs, same as images column)
    - Column is nullable to maintain compatibility with existing projects

  2. Notes
    - This allows projects to have separate collections for:
      - `images`: Project photos and renderings
      - `blueprints`: Technical drawings and architectural plans
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'blueprints'
  ) THEN
    ALTER TABLE projects ADD COLUMN blueprints text[];
  END IF;
END $$;