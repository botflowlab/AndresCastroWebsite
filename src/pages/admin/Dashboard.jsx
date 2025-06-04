// Update the handleSubmit function in the Dashboard component
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

export default handleSubmit