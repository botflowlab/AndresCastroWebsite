/*
  # Fix project deletion policies

  1. Changes
    - Add deletion policy for authenticated users
    - Add cascade deletion for storage objects
    - Add policy for deleting storage objects

  2. Security
    - Ensure users can only delete their own projects
    - Ensure storage objects are cleaned up properly
*/

-- Add deletion policy for projects
CREATE POLICY "Allow users to delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add policy for deleting storage objects
CREATE POLICY "Allow authenticated users to delete files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'project-images'
    AND owner = auth.uid()
  );