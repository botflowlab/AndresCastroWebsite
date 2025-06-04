export default function ProjectCard({ title, image }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="aspect-[7/9] overflow-hidden relative bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-125" 
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
      <div className="mt-2 text-center text-[0c0c0c] font-bold bg-blur py-2 text-xl text-bold uppercase">
        {title}
      </div>
    </div>
  );
}