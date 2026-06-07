import React, { useState, useEffect } from 'react';
import { Check, Edit3, HelpCircle, RotateCcw, AlertCircle, Sparkles, Star, Calendar } from 'lucide-react';
import { Novena, PrayerLog } from '../types';

interface SpiritualTrackerProps {
  novena: Novena;
  onBackToDirectory: () => void;
}

export const SpiritualTracker: React.FC<SpiritualTrackerProps> = ({ novena, onBackToDirectory }) => {
  const [intention, setIntention] = useState<string>('');
  const [isEditingIntention, setIsEditingIntention] = useState<boolean>(true);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeDayNum, setActiveDayNum] = useState<number>(1);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Load state from localStorage for this specific novena
  useEffect(() => {
    try {
      const savedTracker = localStorage.getItem('novenaku_tracker');
      if (savedTracker) {
        const fullTracker = JSON.parse(savedTracker);
        const log = fullTracker[novena.id] as PrayerLog | undefined;
        if (log) {
          setIntention(log.intention);
          setCompletedDays(log.completedDays);
          setIsEditingIntention(log.intention.trim() === '');
          
          // Set active day to the first uncompleted day
          const lastCompleted = Math.max(...log.completedDays, 0);
          if (lastCompleted < 9) {
            setActiveDayNum(lastCompleted + 1);
          } else {
            setActiveDayNum(9);
          }
        } else {
          // Initialize fresh
          setIntention('');
          setCompletedDays([]);
          setIsEditingIntention(true);
          setActiveDayNum(1);
        }
      }
    } catch (e) {
      console.error('Error loading tracker logs', e);
    }
  }, [novena.id]);

  // Save state helper
  const saveState = (updatedIntention: string, updatedDays: number[]) => {
    try {
      const savedTracker = localStorage.getItem('novenaku_tracker');
      const fullTracker = savedTracker ? JSON.parse(savedTracker) : {};
      
      const isCompleted = updatedDays.length === 9;
      fullTracker[novena.id] = {
        novenaId: novena.id,
        completedDays: updatedDays,
        intention: updatedIntention,
        startDate: fullTracker[novena.id]?.startDate || new Date().toLocaleDateString('id-ID'),
        lastPrayedDate: new Date().toLocaleDateString('id-ID'),
        isCompleted
      };

      localStorage.setItem('novenaku_tracker', JSON.stringify(fullTracker));
    } catch (e) {
      console.error('Error saving state', e);
    }
  };

  const handleSaveIntention = () => {
    if (intention.trim() === '') {
      alert('Silakan tuliskan ujud doa Anda sejenak agar doa lebih fokus.');
      return;
    }
    setIsEditingIntention(false);
    saveState(intention, completedDays);
    setFeedbackMessage('Intensi doa Anda telah diikat dalam intensi suci. Selamat mendaraskan novena!');
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleToggleDayComplete = (day: number) => {
    let updatedDays = [...completedDays];
    if (updatedDays.includes(day)) {
      // Unmark
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      // Mark as completed
      updatedDays.push(day);
      
      // Flash beautiful feedback message
      if (day === 9) {
        setFeedbackMessage('Deo Gratias! Selamat, Anda telah menyelesaikan seluruh 9 Hari Novena dengan penuh kesetiaan rohani.');
      } else {
        setFeedbackMessage(`Persembahan doa Hari ke-${day} telah selesai dideraskan.`);
      }
      setTimeout(() => setFeedbackMessage(null), 5000);
    }
    
    setCompletedDays(updatedDays);
    saveState(intention, updatedDays);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda ingin mereset progres 9 Hari Novena dan intensi doa di situs ini?')) {
      setIntention('');
      setCompletedDays([]);
      setIsEditingIntention(true);
      setActiveDayNum(1);
      
      try {
        const savedTracker = localStorage.getItem('novenaku_tracker');
        if (savedTracker) {
          const fullTracker = JSON.parse(savedTracker);
          delete fullTracker[novena.id];
          localStorage.setItem('novenaku_tracker', JSON.stringify(fullTracker));
        }
      } catch (e) {
        console.error('Error deleting log', e);
      }
    }
  };

  const activeDayContent = novena.days.find(d => d.day === activeDayNum) || novena.days[0];
  const isCurrentDayCompleted = completedDays.includes(activeDayNum);

  return (
    <div className="bg-white rounded-[32px] border border-stone-200/60 p-6 md:p-10 space-y-8 shadow-xl animate-fade-in" id="spiritual-tracker-container">
      {/* Return Head Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-stone-200">
        <div>
          <button 
            onClick={onBackToDirectory}
            className="text-xs font-serif-cinzel font-semibold tracking-wider text-stone-500 hover:text-vatican-red flex items-center gap-1.5 focus:outline-none"
            id="back-to-directory-btn"
          >
            &larr; Kembali ke Daftar Doa
          </button>
          <h2 className="font-serif-cinzel font-bold text-2xl text-stone-950 tracking-wide mt-2">
            {novena.title}
          </h2>
          <p className="font-serif-lora italic text-xs text-stone-500">
            {novena.latinTitle || 'Devotio Novena'} &bull; {completedDays.length} dari 9 Hari Selesai
          </p>
        </div>

        {/* Action Button Headers */}
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 border border-stone-300 rounded-full text-xs font-sans-inter text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors bg-white font-medium shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Mulai Ulang (Reset)
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-[14px] flex items-center gap-3 text-sm animate-fade-in" id="feedback-alert">
          <Sparkles className="w-5 h-5 text-vatican-gold shrink-0" />
          <span className="font-medium font-serif-lora">{feedbackMessage}</span>
        </div>
      )}

      {/* Intention Panel */}
      <div className="bg-vatican-gold-light/25 border border-vatican-gold/20 rounded-[20px] p-5 md:p-6 space-y-4 shadow-sm" id="intention-panel">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-cinzel font-bold text-vatican-red text-sm tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 bg-vatican-gold inline-block"></span>
            Intensi &amp; Ujud Doa Pribadi Anda
          </h3>
          {!isEditingIntention && (
            <button
              onClick={() => setIsEditingIntention(true)}
              className="text-xs font-sans-inter text-vatican-red hover:underline flex items-center gap-1 focus:outline-none font-bold uppercase tracking-wider"
            >
              <Edit3 className="w-3 h-3" />
              Ubah Intensi
            </button>
          )}
        </div>

        {isEditingIntention ? (
          <div className="space-y-3">
            <p className="text-xs text-stone-500 font-sans-inter">
              Sebelum melangkah dalam devosi sembilan hari ini, tuangkan intensi doa khusus Anda secara tertutup dan batiniah di bawah ini. Sesuai Kebijakan Privasi kami, catatan ini disimpan secara lokal di browser ponsel Anda sendiri:
            </p>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Tuliskan ujud doa Anda... (Contoh: Mohon kelancaran operasi penyembuhan Ibu, jalan keluar atas kesulitan keuangan keluarga, ketenteraman dalam karier)"
              rows={3}
              className="w-full p-3 border border-stone-250/80 bg-white rounded-xl text-stone-850 font-serif-lora text-sm focus:border-vatican-gold focus:outline-none focus:ring-1 focus:ring-vatican-gold text-stone-900"
            />
            <button
              onClick={handleSaveIntention}
              className="px-6 py-2.5 bg-vatican-red text-white hover:bg-vatican-red-dark rounded-full font-serif-cinzel font-bold text-xs tracking-wider uppercase border border-vatican-gold/50 shadow-md"
            >
              Kunci Intensi Doa Anda
            </button>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-[14px] p-5 relative" id="saved-intention-box bg-white">
            <p className="font-serif-lora italic text-stone-605 text-sm leading-relaxed pr-6">
              &ldquo;{intention}&rdquo;
            </p>
            <div className="absolute right-4 bottom-4 text-[10px] uppercase font-sans-inter font-bold text-vatican-gold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Diikat Terkunci Secara Lokal
            </div>
          </div>
        )}
      </div>

      {/* Grid of Days (Vatican Rosary Beads Representation) */}
      <div className="space-y-4">
        <h3 className="font-serif-cinzel font-bold text-stone-900 text-xs tracking-widest text-center uppercase">
          Langkah Perjalanan Devosi Sembilan Hari (Novena Beads)
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-2xl mx-auto py-2" id="day-beads-progress">
          {novena.days.map((dayObj) => {
            const isCompleted = completedDays.includes(dayObj.day);
            const isActive = activeDayNum === dayObj.day;

            return (
              <button
                key={dayObj.day}
                onClick={() => setActiveDayNum(dayObj.day)}
                className={`w-11 h-11 rounded-full flex flex-col items-center justify-center relative transition-all border-2 ${
                  isCompleted
                    ? 'bg-vatican-red border-vatican-gold text-white shadow-md scale-105'
                    : isActive
                      ? 'bg-vatican-gold-light border-vatican-red text-vatican-red font-bold ring-2 ring-vatican-red/20'
                      : 'bg-white border-stone-300 text-stone-500 hover:border-vatican-gold/30'
                }`}
                id={`bead-day-${dayObj.day}`}
              >
                <span className="text-[10px] font-sans-inter font-semibold leading-none">HARI</span>
                <span className="text-sm font-serif-cinzel font-bold leading-tight">{dayObj.day}</span>
                {isCompleted && (
                  <div className="absolute -top-1.5 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white shadow">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Spiritual Content */}
      <div className="bg-white border border-stone-200/80 rounded-[24px] overflow-hidden shadow-md" id="daily-content-container">
        {/* Day Header Bar */}
        <div className="bg-stone-900 px-6 py-4/55 border-b border-vatican-gold flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
          <div>
            <span className="text-[10px] font-sans-inter font-extrabold uppercase tracking-widest text-vatican-gold block">
              Materi Doa Liturgi
            </span>
            <h4 className="font-serif-cinzel font-bold text-base text-stone-100 tracking-wide">
              Hari ke-{activeDayContent.day}: {activeDayContent.theme}
            </h4>
          </div>
          
          <button
            onClick={() => handleToggleDayComplete(activeDayContent.day)}
            className={`px-4 py-2 rounded-full text-xs font-serif-cinzel font-semibold tracking-wider transition-all flex items-center gap-1.5 focus:outline-none ${
              isCurrentDayCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-vatican-gold text-white hover:bg-vatican-red'
            }`}
            id="mark-day-complete-btn"
          >
            {isCurrentDayCompleted ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Sudah Didoakan (Selesai)
              </>
            ) : (
              <>
                <Star className="w-3.5 h-3.5" />
                Tandai Selesai Doa
              </>
            )}
          </button>
        </div>

        {/* Content Details: Reflection and Prayer text */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Reflection */}
          <div className="space-y-2">
            <span className="font-serif-cinzel font-extrabold text-stone-400 text-[10px] tracking-widest block uppercase">
              Renungan Batin Hari ke-{activeDayContent.day}
            </span>
            <p className="font-serif-lora italic text-stone-650 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-stone-300">
              {activeDayContent.reflection}
            </p>
          </div>

          {/* Core Prayer Scripture */}
          <div className="space-y-3 bg-amber-50/20 p-5 rounded-lg border border-amber-250/30">
            <span className="font-serif-cinzel font-extrabold text-[#800020] text-xs tracking-widest block uppercase">
              Teks Doa Utama Novena
            </span>
            <p className="font-serif-lora text-stone-850 font-medium text-base leading-relaxed text-justify indent-8 border-stone-100">
              {activeDayContent.prayer}
            </p>
            <div className="text-right italic font-serif-cinzel text-xs text-stone-400 pt-2">
              Amin.
            </div>
          </div>
          
          {/* Helper Tips on how to end */}
          <div className="flex items-start gap-2.5 p-3.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-500 font-sans-inter">
            <AlertCircle className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-700 mb-0.5">Catatan Akhir Doa:</p>
              <p>Masing-masing hari dianjurkan ditutup dengan doa bapa kami sekurangnya 1 kali, doa salam maria, dan penuh penyerahan niat di hadapan salib atau lilin.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onBackToDirectory}
          className="px-6 py-2.5 border border-stone-300 rounded-xl text-xs font-serif-cinzel font-semibold tracking-wider text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 transition-colors shadow-sm focus:outline-none"
        >
          &larr; Lihat Daftar Novena Lainnya
        </button>
      </div>
    </div>
  );
};
