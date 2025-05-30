import ProjectCard from './ProjectCard';

const projects = [
  { <img src="/placeholder.jpg" alt="placeholder" />,
  // Add more as needed
];

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <ProjectCard key={i} title={p.title} image={p.image} />
      ))}
    </div>
  );
}