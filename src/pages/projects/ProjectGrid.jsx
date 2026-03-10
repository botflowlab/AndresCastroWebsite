import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useInView } from 'react-intersection-observer';

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
      {projects.map((project) => (
        <Link key={project.id} to={`/proyectos/${project.slug}`}>
          <ProjectCard 
            title={project.title} 
            image={project.images?.[0] || '/images/placeholder.jpg'} 
          />
        </Link>
      ))}
    </div>
  );
}