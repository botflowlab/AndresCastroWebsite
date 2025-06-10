import React, { useState, useEffect } from 'react';

export default function ProjectForm({ 
  mode, 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'casas',
    location: '',
    year: '',
    client: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedBlueprints, setSelectedBlueprints] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [blueprintInputKey, setBlueprintInputKey] = useState(0);

  const categories = [
    { value: 'casas', label: 'Casas' },
    { value: 'condominios', label: 'Condominios Residenciales' },
    { value: 'comercial', label: 'Proyectos Comerciales' },
    { value: 'bancaria', label: 'Arquitectura Bancaria' },
    { value: 'oficinas', label: 'Oficinas' },
    { value: 'institucional', label: 'Institucional' }
  ];

  // Update form data when initialData changes (for editing mode)
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'casas',
        location: initialData.location || '',
        year: initialData.year || '',
        client: initialData.client || '',
      });
    } else if (mode === 'create') {
      // Reset form for create mode
      setFormData({
        title: '',
        description: '',
        category: 'casas',
        location: '',
        year: '',
        client: '',
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearForm = () => {
    // Clear all form data
    setFormData({
      title: '',
      description: '',
      category: 'casas',
      location: '',
      year: '',
      client: '',
    });
    
    // Clear file selections
    setSelectedFiles([]);
    setSelectedBlueprints([]);
    
    // Reset file input keys to force re-render
    setFileInputKey(prev => prev + 1);
    setBlueprintInputKey(prev => prev + 1);
    
    // Reset upload progress
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim all string values to remove extra spaces
    const trimmedData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? value.trim() : value;
      return acc;
    }, {});

    // When editing, only include fields that have been modified
    const submitData = mode === 'edit' 
      ? Object.entries(trimmedData).reduce((acc, [key, value]) => {
          // Only include non-empty values or values that differ from initialData
          if (value !== '' && value !== (initialData[key] || '').trim()) {
            acc[key] = value;
          }
          return acc;
        }, {})
      : trimmedData;

    try {
      // Always include files if selected
      await onSubmit({
        ...submitData,
        files: selectedFiles,
        blueprints: selectedBlueprints,
        setUploadProgress
      });

      // Clear the form completely after successful submission
      clearForm();
      
    } catch (error) {
      // Don't clear form on error, let user see what they entered
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Title {mode === 'edit' && <span className="text-blue-600 font-normal">(Currently editing)</span>}
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border-2 rounded focus:outline-none transition-colors ${
            mode === 'edit' 
              ? 'border-blue-300 focus:border-blue-500 bg-blue-50' 
              : 'border-gray-300 focus:border-black'
          }`}
          required={mode !== 'edit'}
          placeholder="e.g., Casa Moderna en Escazú"
        />
        {mode === 'edit' && initialData.title && (
          <p className="text-sm text-blue-600 mt-1">
            ✏️ Editing: {initialData.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          rows="4"
          required={mode !== 'edit'}
          placeholder="Describe the project, its features, and architectural approach..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="e.g., San José, Costa Rica"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="e.g., 2025"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Client
        </label>
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          placeholder="e.g., John Doe"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          required={mode !== 'edit'}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-1">
          Select the category that best describes this project
        </p>
      </div>

      {/* Project Images Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Project Images
        </label>
        <p className="text-sm text-gray-600 mb-2">
          Upload photos, renderings, and visual representations of the project
        </p>
        <input
          key={fileInputKey}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
        {selectedFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            {selectedFiles.length} project images selected
          </div>
        )}
        {mode === 'edit' && initialData.images && initialData.images.length > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            Current project has {initialData.images.length} existing images
          </div>
        )}
      </div>

      {/* Blueprints Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Architectural Drawings
        </label>
        <p className="text-sm text-gray-600 mb-2">
          Upload technical drawings, floor plans, elevations, and blueprints
        </p>
        <input
          key={blueprintInputKey}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setSelectedBlueprints(Array.from(e.target.files))}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
        {selectedBlueprints.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            {selectedBlueprints.length} architectural drawings selected
          </div>
        )}
        {mode === 'edit' && initialData.blueprints && initialData.blueprints.length > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            Current project has {initialData.blueprints.length} existing blueprints
          </div>
        )}
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-black h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Uploading: {Math.round(uploadProgress)}%
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            mode === 'edit'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-black hover:bg-gray-800 text-white'
          } disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          {loading 
            ? (mode === 'edit' ? 'Updating...' : 'Creating...') 
            : (mode === 'edit' ? 'Update Project' : 'Create Project')
          }
        </button>
        
        {mode === 'edit' && (
          <button
            type="button"
            onClick={() => {
              clearForm();
              onCancel();
            }}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Edit Mode Info */}
      {mode === 'edit' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Editing Mode
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Only modified fields will be updated</li>
                  <li>New images will be added to existing ones</li>
                  <li>Use the project management section below to reorder or delete existing images</li>
                  <li>All text inputs will be automatically trimmed of extra spaces</li>
                  <li>Form will be cleared after successful submission</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}