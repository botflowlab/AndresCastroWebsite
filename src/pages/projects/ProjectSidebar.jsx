export default function Sidebar({ onItemClick }) {
  const categories = [
    'Academic', 'Cultural', 'Government', 'Health', 'Historic Preservation',
    'Infrastructure / Industrial', 'Office', 'Outdoor', 'Recreational',
    'Retail', 'Student Housing', 'Sustainable / LEED', 'Client Directory',
  ];

  return (
    <aside className="hidden md:flex flex-col gap-4 text-lg text-gray-600 w-full pl-4 pr-8">
      <h2 className="font-bold text-5xl text-black mb-8">WORK</h2>
      {categories.map((cat) => (
        <button 
          key={cat} 
          onClick={() => onItemClick?.(cat)} 
          className="text-left hover:text-black transition-all text-xl font-light tracking-wide"
        >
          {cat}
        </button>
      ))}
    </aside>
  );
}