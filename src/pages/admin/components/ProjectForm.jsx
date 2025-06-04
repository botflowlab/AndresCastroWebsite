import React, { useState } from 'react';

export default function ProjectForm({ 
  mode, 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading 
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'sustainable',
    location: initialData.location || '',
    year: initialData.year || '',
    client: initialData.client || '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ['sustainable', 'outdoor', 'infrastructure', 'recreational'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // When editing, only include fields that have been modified
    const submitData = mode === 'edit' 
      ? Object.entries(formData).reduce((acc, [key, value]) => {
          // Only include non-empty values or values that differ from initialData
          if (value !== '' && value !== initialData[key]) {
            acc[key] = value;
          }
          return acc;
        }, {})
      : formData;

    // Always include files if selected
    onSubmit({
      ...submitData,
      files: selectedFiles,
      setUploadProgress
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          required={mode !== 'edit'}
        />
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
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            placeholder="e.g., 2025"
            min="1900"
            max="2100"
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
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
        />
        {selectedFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            {selectedFiles.length} files selected
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-black h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Uploading: {Math.round(uploadProgress)}%
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : mode === 'edit' ? 'Update Project' : 'Create Project'}
        </button>
        {mode === 'edit' && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}