import React, { useState, useCallback } from 'react';
import { supabase } from '../../supabaseClient';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('create');
  const [editingProject, setEditingProject] = useState(null);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const uploadImages = async (files, setUploadProgress) => {
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('projects')
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            if (setUploadProgress) {
              setUploadProgress((progress.loaded / progress.total) * 100);
            }
          },
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }
    return imageUrls;
  };

  const fetchProjects = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    } catch (error) {
      setError(error.message);
      return [];
    }
  }, []);

  const resetForm = () => {
    setMode('create');
    setEditingProject(null);
    setError(null);
  };

  const handleSubmit = async ({ title, description, category, location, year, client, files, setUploadProgress }) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let imageUrls = [];

      if (files.length > 0) {
        imageUrls = await uploadImages(files, setUploadProgress);
      }

      if (mode === 'edit' && editingProject) {
        const updatedImages = [...(editingProject.images || []), ...imageUrls];
        const { error } = await supabase
          .from('projects')
          .update({
            title,
            slug: generateSlug(title),
            description,
            category,
            location,
            year,
            client,
            images: updatedImages,
          })
          .eq('id', editingProject.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{
            title,
            slug: generateSlug(title),
            description,
            category,
            location,
            year,
            client,
            images: imageUrls,
            user_id: user.id
          }]);

        if (error) throw error;
      }

      resetForm();
      await fetchProjects();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Your form and project list components go here */}
      {/* They will receive handleSubmit, loading, error, mode, and other necessary props */}
    </div>
  );
};

export default Dashboard;