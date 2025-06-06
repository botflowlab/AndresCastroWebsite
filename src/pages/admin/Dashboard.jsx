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

    // Subscribe to changes
    const channel = supabase
      .channel('projects_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setProjects(prev => prev.filter(project => project.id !== payload.old.id));
          } else if (payload.eventType === 'INSERT') {
            setProjects(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setProjects(prev => prev.map(project => 
              project.id === payload.new.id ? payload.new : project
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const deleteImagesFromStorage = async (imageUrls) => {
    if (!imageUrls?.length) return;
    
    const filesToDelete = imageUrls.map(url => url.split('/').pop());
    
    try {
      const { error } = await supabase.storage
        .from('project-images')
        .remove(filesToDelete);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting images from storage:', error);
      throw error;
    }
  };

  const uploadImages = async (files, setUploadProgress, fileType = 'image') => {
    const uploadedUrls = [];
    const timestamp = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${fileType}-${timestamp}-${i}.${fileExt}`;

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

  const handleSubmit = async ({ title, description, category, location, year, client, files, blueprints, setUploadProgress }) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let imageUrls = [];
      let blueprintUrls = [];

      // Upload project images
      if (files.length > 0) {
        imageUrls = await uploadImages(files, setUploadProgress, 'project');
      }

      // Upload blueprints
      if (blueprints.length > 0) {
        blueprintUrls = await uploadImages(blueprints, setUploadProgress, 'blueprint');
      }

      if (mode === 'edit' && editingProject) {
        // Create update object only with provided values
        const updateData = {};
        
        // Only include fields that were provided
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (location !== undefined) updateData.location = location;
        if (year !== undefined) updateData.year = year;
        if (client !== undefined) updateData.client = client;
        
        // If new images were uploaded, append them to existing ones
        if (imageUrls.length > 0) {
          updateData.images = [...(editingProject.images || []), ...imageUrls];
        }

        // If new blueprints were uploaded, append them to existing ones
        if (blueprintUrls.length > 0) {
          updateData.blueprints = [...(editingProject.blueprints || []), ...blueprintUrls];
        }

        // If title was updated, update slug
        if (title) {
          updateData.slug = generateSlug(title);
        }

        const { error } = await supabase
          .from('projects')
          .update(updateData)
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
            blueprints: blueprintUrls,
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

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      
      // Get project images before deletion
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      // Delete images from storage first
      await deleteImagesFromStorage(project.images);
      await deleteImagesFromStorage(project.blueprints);

      // Delete project from database
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', project.user_id);

      if (error) throw error;

      // Reset editing state if the deleted project was being edited
      if (editingProject?.id === projectId) {
        resetForm();
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (projectId, imageIndex) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      setLoading(true);
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      const imageToDelete = project.images[imageIndex];
      const updatedImages = project.images.filter((_, index) => index !== imageIndex);

      // Delete image from storage first
      await deleteImagesFromStorage([imageToDelete]);

      // Update project with remaining images
      const { error } = await supabase
        .from('projects')
        .update({ images: updatedImages })
        .eq('id', projectId)
        .eq('user_id', project.user_id);

      if (error) throw error;

      if (editingProject?.id === projectId) {
        setEditingProject({ ...editingProject, images: updatedImages });
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting image:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlueprint = async (projectId, blueprintIndex) => {
    if (!confirm('Are you sure you want to delete this blueprint?')) return;
    
    try {
      setLoading(true);
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      const blueprintToDelete = project.blueprints[blueprintIndex];
      const updatedBlueprints = project.blueprints.filter((_, index) => index !== blueprintIndex);

      // Delete blueprint from storage first
      await deleteImagesFromStorage([blueprintToDelete]);

      // Update project with remaining blueprints
      const { error } = await supabase
        .from('projects')
        .update({ blueprints: updatedBlueprints })
        .eq('id', projectId)
        .eq('user_id', project.user_id);

      if (error) throw error;

      if (editingProject?.id === projectId) {
        setEditingProject({ ...editingProject, blueprints: updatedBlueprints });
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error deleting blueprint:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReorderImages = async (projectId, newImageOrder) => {
    try {
      setLoading(true);
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      // Update project with new image order
      const { error } = await supabase
        .from('projects')
        .update({ images: newImageOrder })
        .eq('id', projectId)
        .eq('user_id', project.user_id);

      if (error) throw error;

      // Update local state immediately for smooth UX
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, images: newImageOrder } : p
      ));

      if (editingProject?.id === projectId) {
        setEditingProject({ ...editingProject, images: newImageOrder });
      }
    } catch (error) {
      console.error('Error reordering images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReorderBlueprints = async (projectId, newBlueprintOrder) => {
    try {
      setLoading(true);
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      // Update project with new blueprint order
      const { error } = await supabase
        .from('projects')
        .update({ blueprints: newBlueprintOrder })
        .eq('id', projectId)
        .eq('user_id', project.user_id);

      if (error) throw error;

      // Update local state immediately for smooth UX
      setProjects(prev => prev.map(p => 
        p.id === projectId ? { ...p, blueprints: newBlueprintOrder } : p
      ));

      if (editingProject?.id === projectId) {
        setEditingProject({ ...editingProject, blueprints: newBlueprintOrder });
      }
    } catch (error) {
      console.error('Error reordering blueprints:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setMode('create');
    setError(null);
  };

  if (loading && !projects.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-20">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
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
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Manage Projects</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500">Create your first project to get started!</p>
          </div>
        ) : (
          <ProjectList
            projects={projects}
            onEdit={(project) => {
              setEditingProject(project);
              setMode('edit');
            }}
            onDelete={handleDelete}
            onDeleteImage={handleDeleteImage}
            onDeleteBlueprint={handleDeleteBlueprint}
            onReorderImages={handleReorderImages}
            onReorderBlueprints={handleReorderBlueprints}
          />
        )}
      </div>
    </div>
  );
}