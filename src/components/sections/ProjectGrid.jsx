import React from 'react';

function ProjectGrid() {
  const projects = [
    {
      id: 1,
      title: 'MCI PARKING STRUCTURE',
      image: 'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg',
    },
    {
      id: 2,
      title: 'KANSAS CITY MUSEUM',
      image: 'https://images.pexels.com/photos/461902/pexels-photo-461902.jpeg',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="relative group">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-xl font-bold text-center">
              {project.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectGrid;