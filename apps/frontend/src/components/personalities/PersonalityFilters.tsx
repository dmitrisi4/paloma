import { useState, useEffect } from 'react';
import { Personality } from '@/types';

interface PersonalityFiltersProps {
  personalities: Personality[];
  onFilterChange: (filtered: Personality[]) => void;
}

export default function PersonalityFilters({ personalities, onFilterChange }: PersonalityFiltersProps) {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  
  // Извлекаем уникальные эпохи и стили из списка личностей
  const eras = personalities ? ['all', ...new Set(personalities.map(p => p.era))] : ['all'];
  const styles = personalities ? ['all', ...new Set(personalities.map(p => p.style))] : ['all'];
  
  // Применяем фильтры при изменении выбранных значений
  useEffect(() => {
    if (!personalities) return;
    
    const filtered = personalities.filter(personality => {
      const matchesEra = selectedEra === 'all' || personality.era === selectedEra;
      const matchesStyle = selectedStyle === 'all' || personality.style === selectedStyle;
      return matchesEra && matchesStyle;
    });
    
    onFilterChange(filtered);
  }, [selectedEra, selectedStyle, personalities, onFilterChange]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-lighter p-4 mb-6">
      <h2 className="font-bold mb-4">Filter Personalities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="era-filter" className="block text-sm font-medium mb-2">
            Era
          </label>
          <select
            id="era-filter"
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className="w-full p-2 border border-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {eras.map(era => (
              <option key={era} value={era}>
                {era === 'all' ? 'All Eras' : era}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="style-filter" className="block text-sm font-medium mb-2">
            Style
          </label>
          <select
            id="style-filter"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full p-2 border border-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {styles.map(style => (
              <option key={style} value={style}>
                {style === 'all' ? 'All Styles' : style}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}