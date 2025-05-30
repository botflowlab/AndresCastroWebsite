import ProjectCard from './ProjectCard';

const projects = [
  { title: 'MCI Parking Structure', image: 'https://via.placeholder.com/600x400' },
  { title: 'Kansas City Museum', image: 'https://i.imgur.com/abc123.jpg' },
  { title: 'Kansas City Museum', image: 'https://via.placeholder.com/600x400' },
  { title: 'Kansas City Museum', image: 'https://via.placeholder.com/600x400' },
  { title: 'Kansas City Museum', image: 'https://via.placeholder.com/600x400' },
  { title: 'Kansas City Museum', image: 'https://via.placeholder.com/600x400' },
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