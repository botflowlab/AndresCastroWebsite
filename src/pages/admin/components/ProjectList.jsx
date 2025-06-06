import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects, onEdit, onDelete, onDeleteImage, onDeleteBlueprint }) {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onDeleteImage={onDeleteImage}
          onDeleteBlueprint={onDeleteBlueprint}
        />
      ))}
    </div>
  );
}