import React from 'react';
import DraggableImageGrid from './DraggableImageGrid';

export default function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onDeleteImage, 
  onDeleteBlueprint,
  onReorderImages,
  onReorderBlueprints 
}) {
  const handleImageReorder = (newImageOrder) => {
    onReorderImages(project.id, newImageOrder);
  };

  const handleBlueprintReorder = (newBlueprintOrder) => {
    onReorderBlueprints(project.id, newBlueprintOrder);
  };

  const handleDeleteImage = (index) => {
    onDeleteImage(project.id, index);
  };

  const handleDeleteBlueprint = (index) => {
    onDeleteBlueprint(project.id, index);
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-3 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              Category: {project.category}
            </span>
            {project.location && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📍 {project.location}
              </span>
            )}
            {project.year && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📅 {project.year}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Project Images with Drag & Drop */}
      {project.images && project.images.length > 0 && (
        <DraggableImageGrid
          images={project.images}
          onReorder={handleImageReorder}
          onDelete={handleDeleteImage}
          title="Project Images"
          type="image"
        />
      )}

      {/* Architectural Drawings with Drag & Drop */}
      {project.blueprints && project.blueprints.length > 0 && (
        <DraggableImageGrid
          images={project.blueprints}
          onReorder={handleBlueprintReorder}
          onDelete={handleDeleteBlueprint}
          title="Architectural Drawings"
          type="blueprint"
        />
      )}

      {/* Empty state */}
      {(!project.images || project.images.length === 0) && 
       (!project.blueprints || project.blueprints.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
            <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No images uploaded yet</p>
          <p className="text-sm">Click "Edit" to add project images and blueprints</p>
        </div>
      )}
    </div>
  );
}