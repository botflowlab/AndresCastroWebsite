import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { validateFileUpload, sanitizeInput, createRateLimiter } from '../../utils/security';
import { batchUploadToR2, batchDeleteFromR2, validateR2Config } from '../../utils/r2Storage';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import StorageManager from './components/StorageManager';

// Create rate limiter for uploads
const uploadRateLimiter = createRateLimiter(5, 60000); // 5 uploads per minute

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [mode, setMode] = useState('create');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('projects'); // New state for tabs
  const [r2ConfigValid, setR2ConfigValid] = useState(false);

  useEffect(() => {
    // Verify user authentication and R2 configuration
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        // Validate R2 configuration
        try {
          validateR2Config();
          setR2ConfigValid(true);
          console.log('✅ R2 configuration validated');
        } catch (r2Error) {
          console.warn('⚠️ R2 configuration issue:', r2Error.message);
          setR2ConfigValid(false);
          setError(`R2 Storage configuration issue: ${r2Error.message}. Please check your environment variables.`);
        }
        
        setUser(user);
        await fetchProjects();
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Authentication required. Please sign in again.');
      }
    };

    checkAuth();

    // Subscribe to changes with security validation
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
          // Validate that the change belongs to the current user
          if (payload.new?.user_id === user?.id || payload.old?.user_id === user?.id) {
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
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
    return sanitizeInput(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const generateUniqueSlug = async (title, excludeProjectId = null) => {
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      // Check if slug exists in database
      let query = supabase
        .from('projects')
        .select('id')
        .eq('slug', slug);

      // If we're updating a project, exclude it from the check
      if (excludeProjectId) {
        query = query.neq('id', excludeProjectId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error checking slug uniqueness:', error);
        // If there's an error checking, append timestamp to be safe
        return `${baseSlug}-${Date.now()}`;
      }

      // If no existing project has this slug, we can use it
      if (!data || data.length === 0) {
        return slug;
      }

      // If slug exists, try with a counter
      slug = `${baseSlug}-${counter}`;
      counter++;

      // Safety check to prevent infinite loop
      if (counter > 100) {
        // Fallback to timestamp-based slug
        return `${baseSlug}-${Date.now()}`;
      }
    }
  };

  const deleteImagesFromR2 = async (imageUrls) => {
    if (!imageUrls?.length) return;
    
    try {
      const result = await batchDeleteFromR2(imageUrls);
      console.log(`Deleted ${result.success} images, failed: ${result.failed}`);
      
      if (result.failed > 0) {
        console.warn(`Failed to delete ${result.failed} images from R2`);
      }
    } catch (error) {
      console.error('Error deleting images from R2:', error);
      throw error;
    }
  };

  const uploadImages = async (files, setUploadProgress, fileType = 'image') => {
    // Check R2 configuration before attempting upload
    if (!r2ConfigValid) {
      throw new Error('R2 Storage is not properly configured. Please check your environment variables and ensure R2 settings are correct.');
    }

    // Rate limiting check
    try {
      uploadRateLimiter(user?.id || 'anonymous');
    } catch (error) {
      throw new Error('Upload rate limit exceeded. Please wait before uploading more files.');
    }

    // Validate each file
    for (const file of files) {
      try {
        validateFileUpload(file);
      } catch (error) {
        throw new Error(`File ${file.name}: ${error.message}`);
      }
    }

    try {
      // Upload to R2 using batch upload
      const uploadedUrls = await batchUploadToR2(files, fileType, setUploadProgress);
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images to R2:', error);
      
      // Provide more specific error messages
      if (error.message.includes('R2 Storage configuration error') || error.message.includes('R2 configuration is incomplete')) {
        throw new Error('R2 Storage configuration error. Please ensure the following environment variables are set in your Supabase Edge Functions:\n- R2_ACCOUNT_ID\n- R2_ACCESS_KEY_ID\n- R2_SECRET_ACCESS_KEY\n\nContact your administrator to configure these settings.');
      }
      
      throw new Error(`Failed to upload images: ${error.message}`);
    }
  };

  const handleSubmit = async ({ title, description, category, location, year, client, files, blueprints, setUploadProgress }) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Sanitize all text inputs
      const sanitizedData = {
        title: sanitizeInput(title),
        description: sanitizeInput(description),
        category: sanitizeInput(category),
        location: sanitizeInput(location),
        year: sanitizeInput(year),
        client: sanitizeInput(client)
      };

      let imageUrls = [];
      let blueprintUrls = [];

      // Upload project images to R2
      if (files && files.length > 0) {
        console.log('📤 Uploading project images to R2...');
        imageUrls = await uploadImages(files, setUploadProgress, 'project');
        console.log('✅ Project images uploaded to R2:', imageUrls);
      }

      // Upload blueprints to R2
      if (blueprints && blueprints.length > 0) {
        console.log('📤 Uploading blueprints to R2...');
        blueprintUrls = await uploadImages(blueprints, setUploadProgress, 'blueprint');
        console.log('✅ Blueprints uploaded to R2:', blueprintUrls);
      }

      if (mode === 'edit' && editingProject) {
        // Create update object only with provided values
        const updateData = {};
        
        // Only include fields that were provided and are different
        Object.entries(sanitizedData).forEach(([key, value]) => {
          if (value !== undefined && value !== '' && value !== editingProject[key]) {
            updateData[key] = value;
          }
        });
        
        // If new images were uploaded, append them to existing ones
        if (imageUrls.length > 0) {
          updateData.images = [...(editingProject.images || []), ...imageUrls];
        }

        // If new blueprints were uploaded, append them to existing ones
        if (blueprintUrls.length > 0) {
          updateData.blueprints = [...(editingProject.blueprints || []), ...blueprintUrls];
        }

        // If title was updated, generate a unique slug
        if (sanitizedData.title && sanitizedData.title !== editingProject.title) {
          updateData.slug = await generateUniqueSlug(sanitizedData.title, editingProject.id);
        }

        if (Object.keys(updateData).length === 0) {
          throw new Error('No changes detected');
        }

        const { error } = await supabase
          .from('projects')
          .update(updateData)
          .eq('id', editingProject.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Validate required fields for new projects
        if (!sanitizedData.title || !sanitizedData.description || !sanitizedData.category) {
          throw new Error('Title, description, and category are required');
        }

        // Generate unique slug for new project
        const uniqueSlug = await generateUniqueSlug(sanitizedData.title);

        const { error } = await supabase
          .from('projects')
          .insert([{
            ...sanitizedData,
            slug: uniqueSlug,
            images: imageUrls,
            blueprints: blueprintUrls,
            user_id: user.id
          }]);

        if (error) throw error;
      }

      resetForm();
      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    try {
      setLoading(true);
      
      // Get project and verify ownership
      const project = projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');
      
      if (project.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only delete your own projects');
      }

      // Delete images from R2 first
      await deleteImagesFromR2(project.images);
      await deleteImagesFromR2(project.blueprints);

      // Delete project from database
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

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
      
      if (project.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only modify your own projects');
      }

      const imageToDelete = project.images[imageIndex];
      const updatedImages = project.images.filter((_, index) => index !== imageIndex);

      // Delete image from R2 first
      await deleteImagesFromR2([imageToDelete]);

      // Update project with remaining images
      const { error } = await supabase
        .from('projects')
        .update({ images: updatedImages })
        .eq('id', projectId)
        .eq('user_id', user.id);

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
      
      if (project.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only modify your own projects');
      }

      const blueprintToDelete = project.blueprints[blueprintIndex];
      const updatedBlueprints = project.blueprints.filter((_, index) => index !== blueprintIndex);

      // Delete blueprint from R2 first
      await deleteImagesFromR2([blueprintToDelete]);

      // Update project with remaining blueprints
      const { error } = await supabase
        .from('projects')
        .update({ blueprints: updatedBlueprints })
        .eq('id', projectId)
        .eq('user_id', user.id);

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
      
      if (project.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only modify your own projects');
      }

      // Update project with new image order
      const { error } = await supabase
        .from('projects')
        .update({ images: newImageOrder })
        .eq('id', projectId)
        .eq('user_id', user.id);

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
      
      if (project.user_id !== user?.id) {
        throw new Error('Unauthorized: You can only modify your own projects');
      }

      // Update project with new blueprint order
      const { error } = await supabase
        .from('projects')
        .update({ blueprints: newBlueprintOrder })
        .eq('id', projectId)
        .eq('user_id', user.id);

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

  // Show loading state
  if (loading && !projects.length && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating and loading your projects...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-500 mb-4">Please sign in to access the dashboard.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Authentication
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-20">
      {/* R2 Configuration Warning */}
      {!r2ConfigValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">R2 Storage Configuration Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Image uploads are currently disabled. Please configure the following environment variables in your Supabase Edge Functions:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>R2_ACCOUNT_ID</li>
                  <li>R2_ACCESS_KEY_ID</li>
                  <li>R2_SECRET_ACCESS_KEY</li>
                </ul>
                <p className="mt-2">Contact your administrator to set up these configurations.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8 pt-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects Management
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'storage'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              R2 Storage Management
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' ? (
        <>
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
              r2ConfigValid={r2ConfigValid}
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
                    <p className="text-sm text-red-800 whitespace-pre-line">{error}</p>
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
        </>
      ) : (
        <StorageManager />
      )}
    </div>
  );
}