export default function ProjectCard({ title, image }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[6/8] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="mt-2 text-center text-[0c0c0c] font-bold bg-white py-2 text-xl text-bold uppercase">{title}</div>
    </div>
  );
}