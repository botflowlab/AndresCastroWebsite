/*
  # Create storage bucket for project images

  1. Storage Setup
    - Create project-images bucket if it doesn't exist
    - Set up public access for the bucket
  
  2. Security Policies
    - Allow authenticated users to upload files
    - Allow public read access to files
*/

-- Create storage bucket only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'project-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('project-images', 'project-images', true);
  END IF;
END $$;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read files" ON storage.objects;

-- Policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images'
  AND owner = auth.uid()
);

-- Policy to allow public access to read files
CREATE POLICY "Allow public to read files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'project-images');