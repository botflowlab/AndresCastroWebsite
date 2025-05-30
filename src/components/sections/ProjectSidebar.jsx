import React from 'react';
import { useTranslation } from 'react-i18next';

function ProjectSidebar({ onCategoryClick }) {
  const { t } = useTranslation();
  
  const categories = [
    'ACADEMIC',
    'CULTURAL',
    'GOVERNMENT',
    'HEALTH',
    'HISTORIC PRESERVATION',
    'INFRASTRUCTURE / INDUSTRIAL',
    'OFFICE',
    'OUTDOOR',
    'RECREATIONAL',
    'RETAIL',
    'STUDENT HOUSING',
    'SUSTAINABLE / LEED',
  ];

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">WORK</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryClick?.()}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectSidebar;