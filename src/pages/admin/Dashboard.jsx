import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [mode, setMode] = useState('create');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const uploadImages = async (files, setUploadProgress) => {
    const uploadedUrls = [];
    const timestamp = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${i}.${fileExt}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
        setUploadProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async ({ title, description, category, files, setUploadProgress }) => {
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
            images: updatedImages,
          })
          .eq('id', editingProject.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{
            title,
            slug: generateSlug(title),
            description,
            category,
            images: imageUrls,
            user_id: user.id
          }]);

        if (error) throw error;
      }

      resetForm();
      fetchProjects();
      alert(`Project ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      // Update local state immediately after successful deletion
      setProjects(projects.filter(project => project.id !== projectId));
      
      // Reset editing state if the deleted project was being edited
      if (editingProject?.id === projectId) {
        resetForm();
      }
      
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (projectId, imageIndex) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      setLoading(true);
      const project = projects.find(p => p.id === projectId);
      const updatedImages = project.images.filter((_, index) => index !== imageIndex);

      const { error } = await supabase
        .from('projects')
        .update({ images: updatedImages })
        .eq('id', projectId);

      if (error) throw error;

      // Update local state immediately
      setProjects(projects.map(p => {
        if (p.id === projectId) {
          return { ...p, images: updatedImages };
        }
        return p;
      }));

      if (editingProject?.id === projectId) {
        setEditingProject({ ...editingProject, images: updatedImages });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setMode('create');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          {mode === 'edit' ? 'Edit Project' : 'Create New Project'}
        </h2>

        <ProjectForm
          mode={mode}
          initialData={editingProject || {}}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          loading={loading}
        />

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
        <ProjectList
          projects={projects}
          onEdit={(project) => {
            setEditingProject(project);
            setMode('edit');
          }}
          onDelete={handleDelete}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}