export default function Sidebar({ onItemClick }) {
  const categories = [
    'Academic', 'Cultural', 'Government', 'Health', 'Historic Preservation',
    'Infrastructure / Industrial', 'Office', 'Outdoor', 'Recreational',
    'Retail', 'Student Housing', 'Sustainable / LEED', 'Client Directory',
  ];

  return (
    <aside className="hidden md:flex flex-col gap-2 text-sm text-gray-600 w-full pr-4">
      <h2 className="font-bold text-lg text-black mb-4">WORK</h2>
      {categories.map((cat) => (
        <button key={cat} onClick={() => onItemClick?.(cat)} className="text-left hover:text-black transition-all">
          {cat}
        </button>
      ))}
    </aside>
  );
}