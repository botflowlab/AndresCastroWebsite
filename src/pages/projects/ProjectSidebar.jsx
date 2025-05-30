import { useTranslation } from 'react-i18next';

export default function Sidebar({ onItemClick }) {
  const { t } = useTranslation();
  const categories = [
    'sustainable',
    'outdoor',,,
    'infrastructure',
    'recreational',
  ];

  return (
    <aside className="flex flex-col gap-4 text-lg text-gray-600 w-full">
      <h2 className="font-bold text-5xl text-black mb-8">WORK</h2>
      {categories.map((cat) => (
        <button 
          key={cat} 
          onClick={() => onItemClick?.(cat)} 
          className="text-left hover:text-black transition-all text-xl font-light tracking-wide"
        >
          {t(`projects.categories.${cat}`)}
        </button>
      ))}
    </aside>
  );
}