import React from 'react';
import { useTranslation } from 'react-i18next';

function ProjectSidebar({ onCategoryClick }) {
  const { t } = useTranslation();
  
  const categories = [
    'academic',
    'cultural',
    'government',
    'health',
    'historic',
    'infrastructure',
    'office',
    'outdoor',
    'recreational',
    'retail',
    'student',
    'sustainable',
  ];

  return (
    <div className="pt-32">
      <h2 className="text-5xl font-bold mb-12">WORK</h2>
      <ul className="space-y-6">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryClick?.()}
              className="text-gray-600 hover:text-black transition-colors text-lg"
            >
              {t(`projects.categories.${category}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectSidebar;