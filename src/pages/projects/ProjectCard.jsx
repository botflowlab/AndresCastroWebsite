export default function ProjectCard({ title, image }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[5/8] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="mt-2 text-center text-white font-bold bg-black py-2 text-sm uppercase">{title}</div>
    </div>
  );
}