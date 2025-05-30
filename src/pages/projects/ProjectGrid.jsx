import ProjectCard from './ProjectCard';

const projects = [
  { title: 'MCI Parking Structure', image: '/images/placeholder.jpg' },
  // Add more as needed
];

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <ProjectCard key={i} image={p.image} />
      ))}
    </div>
  );
}