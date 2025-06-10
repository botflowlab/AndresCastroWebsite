import { useTranslation } from 'react-i18next';

export default function Sidebar({ onCategorySelect, selectedCategory }) {
  const { t, i18n } = useTranslation();
  
  const categories = [
    { key: 'casas', labelEn: 'Houses', labelEs: 'Casas' },
    { key: 'condominios', labelEn: 'Residential Condominiums', labelEs: 'Condominios Residenciales' },
    { key: 'comercial', labelEn: 'Commercial Projects', labelEs: 'Proyectos Comerciales' },
    { key: 'bancaria', labelEn: 'Banking Architecture', labelEs: 'Arquitectura Bancaria' },
    { key: 'oficinas', labelEn: 'Offices', labelEs: 'Oficinas' },
    { key: 'institucional', labelEn: 'Institutional', labelEs: 'Institucional' }
  ];

  const getCategoryLabel = (category) => {
    // Use i18n.language directly to get the current language
    return i18n.language === 'en' ? category.labelEn : category.labelEs;
  };

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
          key={cat.key}
          onClick={() => onCategorySelect(cat.key)}
          className={`text-left transition-all text-xl font-light tracking-wide ${
            selectedCategory === cat.key ? 'text-black' : 'hover:text-black'
          }`}
        >
          {getCategoryLabel(cat)}
        </button>
      ))}
    </aside>
  );
}