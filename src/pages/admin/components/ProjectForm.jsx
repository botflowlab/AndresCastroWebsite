import React, { useState } from 'react';

export default function ProjectForm({ 
  mode, 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  loading 
}) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [category, setCategory] = useState(initialData.category || 'sustainable');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ['sustainable', 'outdoor', 'infrastructure', 'recreational'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          required
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