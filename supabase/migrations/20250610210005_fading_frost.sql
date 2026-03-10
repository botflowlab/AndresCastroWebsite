/*
  # Storage bucket and policies for project images
  
  1. Changes
    - Create project-images bucket if it doesn't exist
    - Add policies for authenticated uploads
    - Add policies for public read access
  
  2. Security
    - Only authenticated users can upload
    - Public read access for all files
    - Files are owned by the uploading user
*/

DO $$
BEGIN
  -- Create bucket if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'project-images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('project-images', 'project-images', true);
  END IF;
END $$;

-- Policy to allow authenticated users to upload files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow authenticated users to upload files'
    AND tablename = 'objects'
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Allow authenticated users to upload files"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'project-images'
      AND owner = auth.uid()
    );
  END IF;
END $$;

-- Policy to allow public access to read files
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow public to read files'
    AND tablename = 'objects'
    AND schemaname = 'storage'
  ) THEN
    CREATE POLICY "Allow public to read files"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'project-images');
  END IF;
END $$;