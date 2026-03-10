import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectList({ 
  projects, 
  onEdit, 
  onDelete, 
  onDeleteImage, 
  onDeleteBlueprint,
  onReorderImages,
  onReorderBlueprints 
}) {
  return (
    <div className="space-y-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onDeleteImage={onDeleteImage}
          onDeleteBlueprint={onDeleteBlueprint}
          onReorderImages={onReorderImages}
          onReorderBlueprints={onReorderBlueprints}
        />
      ))}
    </div>
  );
}