import React, { useState, memo } from 'react';
import DraggableImageGrid from './DraggableImageGrid';

// Memoize the component to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onDeleteImage, 
  onDeleteBlueprint,
  onReorderImages,
  onReorderBlueprints 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoized handlers to prevent recreation on every render
  const handleImageReorder = React.useCallback((newImageOrder) => {
    onReorderImages(project.id, newImageOrder);
  }, [project.id, onReorderImages]);

  const handleBlueprintReorder = React.useCallback((newBlueprintOrder) => {
    onReorderBlueprints(project.id, newBlueprintOrder);
  }, [project.id, onReorderBlueprints]);

  const handleDeleteImage = React.useCallback((index) => {
    onDeleteImage(project.id, index);
  }, [project.id, onDeleteImage]);

  const handleDeleteBlueprint = React.useCallback((index) => {
    onDeleteBlueprint(project.id, index);
  }, [project.id, onDeleteBlueprint]);

  const handleEdit = React.useCallback(() => {
    onEdit(project);
  }, [project, onEdit]);

  const handleDelete = React.useCallback(() => {
    onDelete(project.id);
  }, [project.id, onDelete]);

  const toggleExpanded = React.useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // Memoized calculations
  const totalImages = React.useMemo(() => 
    (project.images?.length || 0) + (project.blueprints?.length || 0), 
    [project.images?.length, project.blueprints?.length]
  );

  const hasImages = React.useMemo(() => 
    project.images && project.images.length > 0, 
    [project.images]
  );

  const hasBlueprints = React.useMemo(() => 
    project.blueprints && project.blueprints.length > 0, 
    [project.blueprints]
  );

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 gpu-accelerated">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{project.title}</h3>
          <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs flex-shrink-0">
              📁 {project.category}
            </span>
            {project.location && (
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs flex-shrink-0">
                📍 {project.location}
              </span>
            )}
            {project.year && (
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs flex-shrink-0">
                📅 {project.year}
              </span>
            )}
            {totalImages > 0 && (
              <span className="bg-blue-100 px-2 py-1 rounded-full text-xs text-blue-700 flex-shrink-0">
                🖼️ {totalImages} files
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Optimized toggle button */}
      {totalImages > 0 && (
        <div className="mb-4">
          <button
            onClick={toggleExpanded}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150 p-2 -m-2 rounded"
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium">
              {isExpanded ? 'Hide' : 'Show'} Files ({totalImages})
            </span>
          </button>
        </div>
      )}
      
      {/* Conditionally rendered image sections with lazy loading */}
      {isExpanded && (
        <div className="space-y-6" style={{ contentVisibility: 'auto' }}>
          {/* Project Images with optimized rendering */}
          {hasImages && (
            <DraggableImageGrid
              images={project.images}
              onReorder={handleImageReorder}
              onDelete={handleDeleteImage}
              title="Project Images"
              type="image"
            />
          )}

          {/* Architectural Drawings with optimized rendering */}
          {hasBlueprints && (
            <DraggableImageGrid
              images={project.blueprints}
              onReorder={handleBlueprintReorder}
              onDelete={handleDeleteBlueprint}
              title="Architectural Drawings"
              type="blueprint"
            />
          )}
        </div>
      )}

      {/* Optimized empty state */}
      {totalImages === 0 && (
        <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No images uploaded yet</p>
          <p className="text-xs text-gray-400">Click "Edit" to add project images and blueprints</p>
        </div>
      )}
    </div>
  );
});

export default ProjectCard;