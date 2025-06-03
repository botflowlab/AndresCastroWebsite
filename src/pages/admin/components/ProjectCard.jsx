import React from 'react';

export default function ProjectCard({ project, onEdit, onDelete, onDeleteImage }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
          <p className="text-sm text-gray-500 mt-2">Category: {project.category}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {project.images?.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={imageUrl}
              alt={`${project.title} - Image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => onDeleteImage(project.id, index)}
              className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete image"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}