import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, HelpCircle, Heart, Star, CheckCircle, ChevronRight, PenTool, RefreshCw } from 'lucide-react';
import { NOVENAS } from '../data/novenaData';
import { Novena, PrayerLog } from '../types';

interface NovenaDirectoryProps {
  onSelectNovena: (novena: Novena) => void;
  activeNovenaId: string | null;
}

export const NovenaDirectory: React.FC<NovenaDirectoryProps> = ({ onSelectNovena, activeNovenaId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [trackerState, setTrackerState] = useState<Record<string, PrayerLog>>({});

  // Load tracker state from localStorage
  useEffect(() => {
    try {
      const savedTracker = localStorage.getItem('novenaku_tracker');
      if (savedTracker) {
        setTrackerState(JSON.parse(savedTracker));
      }
    } catch (e) {
      console.error('Error loading tracker state', e);
    }
  }, [activeNovenaId]);

  const categories = ['Semua', 'Devosi Maria', 'Devosi Kristologis', 'Saksi Iman & Keluarga'];

  const filteredNovenas = selectedCategory === 'Semua' 
    ? NOVENAS 
    : NOVENAS.filter(n => n.category === selectedCategory);

  const getProgress = (novenaId: string) => {
    const log = trackerState[novenaId];
    if (!log) return 0;
    return Math.round((log.completedDays.length / 9) * 100);
  };

  return (
    <div className="space-y-8" id="novena-directory-container">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-stone-200/50 pb-5" id="category-tabs-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 text-xs md:text-sm font-serif-cinzel font-semibold tracking-wider rounded-full transition-all border ${
              selectedCategory === cat 
                ? 'bg-vatican-red border-vatican-gold text-white shadow-md' 
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-vatican-gold/50 hover:text-vatican-red'
            }`}
            id={`tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="novena-grid-container">
        {filteredNovenas.map((novena) => {
          const progress = getProgress(novena.id);
          const icon = novena.id === 'tiga-salam-maria' 
            ? <Star className="w-5 h-5 text-vatican-gold" />
            : novena.id === 'hati-kudus-yesus'
              ? <Heart className="w-5 h-5 text-vatican-red" />
              : <Calendar className="w-5 h-5 text-vatican-gold" />;

          return (
            <div 
              key={novena.id}
              className={`bg-white rounded-[24px] border border-stone-250/70 transition-all p-6 md:p-8 flex flex-col justify-between cursor-pointer group ${
                activeNovenaId === novena.id
                  ? 'border-vatican-red shadow-lg ring-1 ring-vatican-red bg-vatican-gold-light/10'
                  : 'border-stone-200/85 hover:border-vatican-gold hover:shadow-xl hover:-translate-y-1'
              } duration-300`}
              onClick={() => onSelectNovena(novena)}
              id={`card-${novena.id}`}
            >
              <div>
                {/* Category & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-sans-inter font-bold uppercase tracking-widest text-[#800020] bg-vatican-gold-light/40 px-2.5 py-0.5 rounded-full">
                    {novena.category}
                  </span>
                  <div className="p-1.5 rounded-full bg-stone-50 border border-stone-100 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                </div>

                {/* Classical Typography Title */}
                <h3 className="font-serif-cinzel font-bold text-lg text-stone-950 tracking-wide mt-2 leading-snug group-hover:text-vatican-red transition-colors">
                  {novena.title}
                </h3>
                {novena.latinTitle && (
                  <p className="font-serif-lora italic text-xs text-stone-400 mt-0.5">
                    {novena.latinTitle}
                  </p>
                )}

                {/* High quality elegant text for reading description */}
                <p className="font-serif-lora text-stone-600 text-sm mt-3 line-clamp-3 leading-relaxed">
                  {novena.description}
                </p>
              </div>

              {/* Progress & Quick Stats Footer */}
              <div className="mt-6 border-t border-stone-100 pt-4" id={`progress-${novena.id}`}>
                {progress > 0 ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-sans-inter font-medium text-stone-600">
                      <span>Progres Doa</span>
                      <span className="text-stone-900 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden border border-stone-200">
                      <div 
                        className="bg-vatican-red h-full rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-xs font-serif-cinzel font-semibold text-vatican-gold group-hover:translate-x-1 transition-transform">
                    <span>Mulai Novena</span>
                    <ChevronRight className="w-4 h-4 text-vatican-gold" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
