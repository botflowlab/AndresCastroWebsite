import { useTranslation } from 'react-i18next';

export default function Sidebar({ onCategorySelect, selectedCategory }) {
  const { t } = useTranslation();
  const categories = [
    'sustainable',
    'outdoor',
    'infrastructure',
    'recreational',
  ];

  return (
    <aside className="flex flex-col gap-4 text-lg text-gray-600 w-full">
      <h2 className="font-bold text-5xl text-black mb-8">WORK</h2>
      <button 
        onClick={() => onCategorySelect(null)}
        className={`text-left transition-all text-xl font-light tracking-wide ${
          !selectedCategory ? 'text-black' : 'hover:text-black'
        }`}
      >
        ALL PROJECTS
      </button>
      {categories.map((cat) => (
        <button 
          key={cat}
          onClick={() => onCategorySelect(cat)}
          className={`text-left transition-all text-xl font-light tracking-wide ${
            selectedCategory === cat ? 'text-black' : 'hover:text-black'
          }`}
        >
          {t(`projects.categories.${cat}`)}
        </button>
      ))}
    </aside>
  );
}