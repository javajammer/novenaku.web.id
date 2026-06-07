import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Heart, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChevronDown, 
  HelpCircle, 
  CheckCircle,
  FileText,
  Mail,
  Info,
  ExternalLink,
  Milestone,
  ArrowRight
} from 'lucide-react';
import { Novena, ActiveModalType } from './types';
import { NOVENAS } from './data/novenaData';
import { NovenaDirectory } from './components/NovenaDirectory';
import { SpiritualTracker } from './components/SpiritualTracker';
import { LegalModals } from './components/LegalModals';

// Saint quotes for daily encouragement
const SAINT_QUOTES = [
  {
    quote: "Bernyanyi adalah mendaraskan doa dua kali lipat lebih indah.",
    author: "Santo Agustinus dari Hippo",
    life: "354 - 430 M"
  },
  {
    quote: "Doa adalah senjata terbaik yang kita miliki; doa adalah kunci emas yang membuka pintu hati Allah.",
    author: "Santo Padre Pio dari Pietrelcina",
    life: "1887 - 1968"
  },
  {
    quote: "Janganlah takut! Bukalah lebar-lebar pintu hati dan pikiran Anda bagi Kristus Kristus.",
    author: "Santo Paus Yohanes Paulus II",
    life: "1920 - 2005"
  },
  {
    quote: "Tuhan tidak menuntut kita sukses sepenuhnya; Dia hanya menghendaki kita mencoba dengan cinta yang tekun.",
    author: "Santa Teresa dari Kalkuta",
    life: "1910 - 1997"
  },
  {
    quote: "Mulai dengan melakukan apa yang perlu, lalu lakukan apa yang mungkin, dan tiba-tiba Anda melakukan hal mustahil.",
    author: "Santo Fransiskus dari Asisi",
    life: "1181 - 1226"
  },
  {
    quote: "Doa menyelaraskan hasrat jiwa dengan kebaikan surgawi yang abadi.",
    author: "Santo Thomas Aquinas",
    life: "1225 - 1274"
  }
];

export default function App() {
  const [selectedNovena, setSelectedNovena] = useState<Novena | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  
  // Interactive feature: Altar Candle Toggle
  const [isCandleLit, setIsCandleLit] = useState<boolean>(true);
  
  // saint quote index state
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Rotating quote on mount
  useEffect(() => {
    const today = new Date().getDate();
    setQuoteIndex(today % SAINT_QUOTES.length);
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % SAINT_QUOTES.length);
  };

  const handleSelectNovena = (novena: Novena) => {
    setSelectedNovena(novena);
    // Smooth scroll to the interactive frame
    const element = document.getElementById('prayer-tracker-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentQuote = SAINT_QUOTES[quoteIndex];

  return (
    <div className="min-h-screen bg-vatican-cream flex flex-col justify-between selection:bg-vatican-gold-light selection:text-stone-900" id="applet-frame">
      
      {/* Upper Subtle Beautiful Sleek Gold Rim */}
      <div className="h-1.5 w-full bg-gradient-to-r from-vatican-red via-vatican-gold to-vatican-red"></div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100/85 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-vatican-red rounded-full flex items-center justify-center text-white font-serif text-lg md:text-xl font-bold italic shadow-md">N</div>
            <div className="flex flex-col justify-center">
              <span className="font-serif-cinzel text-base sm:text-lg md:text-xl font-bold tracking-tight text-vatican-red block leading-none">
                novenaku<span className="text-vatican-gold">.id</span>
              </span>
              <span className="font-sans-inter text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-stone-500 font-bold block mt-1">
                Aplikasi Devosional<span className="hidden sm:inline"> Katolik</span>
              </span>
            </div>
          </div>

          {/* Nav Actions */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-stone-605">
            <a href="#tentang-section" className="text-stone-600 hover:text-vatican-gold transition-colors">
              Mengapa Novena?
            </a>
            <a href="#materi-panduan" className="text-stone-600 hover:text-vatican-gold transition-colors">
              Panduan Devosi
            </a>
            <a href="#prayer-tracker-section" className="text-stone-600 hover:text-vatican-gold transition-colors">
              Perjalanan Doa
            </a>
          </nav>

          <div className="shrink-0 ml-1">
            <a 
              href="#prayer-tracker-section" 
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2 bg-vatican-red text-white hover:bg-vatican-red-dark font-serif-cinzel font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wider rounded-full transition-all shadow-md hover:shadow-lg uppercase text-center leading-none"
              id="cta-nav-mulai"
            >
              Mulai Doa
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-stone-50 to-[#FAF9F6] border-b border-stone-200/60 overflow-hidden py-16 md:py-24" id="hero-section">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Explanatory Block */}
          <div className="lg:col-span-7 space-y-6 text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3  py-1 bg-vatican-gold-light border border-vatican-gold/50 rounded text-vatican-red text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-vatican-gold" />
              <span>Ruang Doa Digital Modern</span>
            </div>

            <h1 className="font-serif-cinzel text-4xl md:text-6xl font-extrabold text-stone-900 leading-[1.1] mb-6">
              Menemukan Kedamaian Dalam <br />
              <span className="italic font-light text-vatican-red">Setiap Doa.</span>
            </h1>
            
            <p className="font-serif-lora text-stone-600 text-base md:text-lg leading-relaxed max-w-xl">
              Novenaku.id hadir sebagai teman peziarahan batin digital yang menemani Anda dalam ritus suci doa sembilan hari berturut-turut. Anggun dirancang secara praktis, bebas iklan mengganggu, dan sangat ramah bagi rentang usia 20-50 tahun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#prayer-tracker-section"
                className="px-8 py-3.5 bg-vatican-red text-white hover:bg-vatican-red-dark font-serif-cinzel font-bold text-xs tracking-wider uppercase text-center rounded-full shadow-lg transition-all hover:-translate-y-0.5"
              >
                Pilih Doa Novena Anda
              </a>
              <a 
                href="#tentang-section"
                className="px-8 py-3.5 bg-white text-stone-700 hover:text-stone-950 hover:bg-stone-50 border border-stone-300 font-serif-cinzel font-semibold text-xs tracking-wider uppercase text-center rounded-full shadow-sm transition-all animate-pulse"
              >
                Selami Sejarah Doa &darr;
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-sans-inter text-stone-500 border-t border-stone-250/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tanpa Registrasi Akun</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Penyimpanan Lokal</span>
              </div>
            </div>
          </div>

          {/* Interactive Altar Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-[40px] border-8 border-stone-800 shadow-2xl overflow-hidden p-6 md:p-8 space-y-6 relative flex flex-col items-center text-center">
              {/* Gold Framing Decor */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-vatican-gold/30 pointer-events-none rounded-[32px]"></div>
              
              <span className="font-serif-cinzel text-[10px] tracking-widest text-vatican-red font-bold uppercase bg-stone-50 px-3 py-1 rounded-full border border-stone-100 z-10">
                Altar Virtual Anda
              </span>

              {/* Lit Candle Animation Graphic */}
              <div className="relative py-6 z-10" id="lit-candle-container">
                {isCandleLit ? (
                  <div className="relative">
                    {/* Flame with pulse */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-amber-400 rounded-full blur-[2px] animate-pulse"></div>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-250 rounded-full"></div>
                    {/* Candle body */}
                    <div className="w-6 h-28 bg-[#fdfaf2] border border-stone-350 rounded-b mt-4 relative mx-auto flex flex-col justify-end pb-3 shadow-inner">
                      <div className="h-0.5 bg-vatican-gold/20 w-full mb-1"></div>
                      <div className="h-0.5 bg-vatican-gold/10 w-full mb-2"></div>
                      <div className="text-[7px] font-sans-inter text-vatican-gold font-bold tracking-tighter">AMDG</div>
                    </div>
                    {/* Halo Light */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-vatican-gold-light/40 rounded-full blur-xl pointer-events-none"></div>
                  </div>
                ) : (
                  <div>
                    {/* Candle body unlit */}
                    <div className="w-6 h-28 bg-[#ebe6db] border border-stone-400 rounded-b mt-4 relative mx-auto flex flex-col justify-end pb-3">
                      <div className="w-1.5 h-1 bg-stone-700 mx-auto -mt-2 rounded"></div>
                      <div className="text-[7px] font-sans-inter text-stone-400 font-semibold tracking-tighter">AMDG</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Intention summary */}
              <div className="z-10 text-stone-850">
                <h4 className="font-serif-lora font-bold text-sm text-stone-900">
                  {isCandleLit ? 'Niat Dan Pikiran Sedang Bernyala' : 'Lilin Altar Sedang Padam'}
                </h4>
                <p className="font-serif-lora text-stone-500 text-xs mt-1 max-w-xs leading-relaxed">
                  {isCandleLit 
                    ? 'Lilin yang menyala menyimbolkan permohonan hati yang tiada putus dikirimkan ke hadirat Illahi.' 
                    : 'Nyalakan lilin sesaat sebelum memulai ritus sembahyang harian Anda.'}
                </p>
              </div>

              {/* Interact Button */}
              <button
                onClick={() => setIsCandleLit(!isCandleLit)}
                className={`z-10 px-5 py-2.5 rounded-full text-xs font-serif-cinzel font-bold tracking-wider transition-colors shadow-md border ${
                  isCandleLit
                    ? 'bg-vatican-red border-vatican-gold text-white hover:bg-vatican-red-dark'
                    : 'bg-white border-stone-300 text-stone-750 hover:bg-stone-50'
                }`}
                id="toggle-candle-btn"
              >
                {isCandleLit ? 'Padamkan Lilin Sementara' : 'Nyalakan Lilin Doa'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Daily Spiritual Saint Quote Segment */}
      <section className="bg-stone-950 text-stone-100 py-10 relative overflow-hidden" id="daily-quotes-segment">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="font-serif-cinzel text-xs font-extrabold tracking-widest text-vatican-gold uppercase block">
            Mutiara Iman Hari Ini
          </span>
          
          <div className="max-w-2xl mx-auto space-y-2">
            <p className="font-serif-lora text-lg md:text-xl italic leading-relaxed text-[#fbfbfa] px-4">
              &ldquo;{currentQuote.quote}&rdquo;
            </p>
            <div className="pt-2">
              <span className="font-serif-cinzel font-bold text-vatican-gold text-sm block">
                {currentQuote.author}
              </span>
              <span className="text-[10px] text-stone-500 font-sans-inter tracking-widest block">
                Masa Hidup: {currentQuote.life}
              </span>
            </div>
          </div>

          <button
            onClick={handleNextQuote}
            className="text-[10px] font-sans-inter text-stone-400 hover:text-vatican-gold tracking-widest uppercase flex items-center gap-1 mx-auto border-b border-light pb-0.5 border-dashed focus:outline-none transition-colors"
          >
            Sapaan Selanjutnya &rarr;
          </button>
        </div>
      </section>

      {/* Main Interactive Prayer App Frame */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12" id="prayer-tracker-section">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-sans-inter font-bold uppercase tracking-widest text-[#800020]">
            Buku Devosional Digital
          </p>
          <h2 className="font-serif-cinzel text-2xl md:text-4xl font-extrabold text-stone-950 tracking-wide">
            {selectedNovena ? 'Panduan Sembahyang Anda' : 'Koleksi Liturgis Doa Novena'}
          </h2>
          <div className="h-0.5 w-16 bg-vatican-gold mx-auto"></div>
          <p className="font-serif-lora text-stone-500 text-sm md:text-base leading-relaxed">
            {selectedNovena 
              ? `Saat ini Anda sedang memfokuskan hati pada ${selectedNovena.title}. Bacalah renungan harian dan lengkapi sembilan hari ketekunan.`
              : 'Pilihlah salah satu dari rangkaian doa Novena di bawah ini berdasarkan kemantapan batin and intensi khusus Anda.'}
          </p>
        </div>

        {/* Conditional rendering based on active selection */}
        {selectedNovena ? (
          <SpiritualTracker 
            novena={selectedNovena} 
            onBackToDirectory={() => setSelectedNovena(null)} 
          />
        ) : (
          <NovenaDirectory 
            onSelectNovena={handleSelectNovena} 
            activeNovenaId={selectedNovena ? selectedNovena.id : null}
          />
        )}

      </section>

      {/* Vatican & Christianity Architectural Comparison (Why Novenaku.id works) */}
      <section className="bg-gradient-to-b from-stone-50 to-[#FAF9F6] border-t border-b border-stone-200/50 py-20" id="tentang-section">
        <div className="max-w-5xl mx-auto px-6 space-y-12 animate-fade-in">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="font-serif-cinzel text-xs font-bold tracking-widest text-vatican-red uppercase block">
              Pedoman Liturgis Terpercaya
            </span>
            <h3 className="font-serif-cinzel font-extrabold text-2xl md:text-3xl text-stone-900 tracking-tight leading-snug">
              Merangkum Keagungan Vatican di Era Modern
            </h3>
            <p className="font-serif-lora text-stone-600 text-sm">
              Kami merancang novenaku.id dengan meneladani dan merujuk pilar keindahan visual serta keluhuran teologis dari tiga institusi spiritual terkemuka dunia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="materi-panduan">
            {/* Vatican.va Inspired */}
            <div className="bg-white p-8 rounded-[24px] border border-stone-200/60 shadow-md flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 duration-300 group">
              <div>
                <span className="font-serif-cinzel text-[10px] text-vatican-gold font-bold tracking-widest block uppercase">
                  Rujukan 1 &bull; Otoritas Liturgi
                </span>
                <span className="font-serif-cinzel font-bold text-lg text-stone-900 block mt-2 border-b border-stone-100 pb-2">
                  Holy See (vatican.va)
                </span>
                <p className="font-serif-lora text-stone-600 text-xs md:text-sm mt-4 leading-relaxed">
                  Menyerap ketelitian teologis dokumen gerejawi dan keaslian naskah doa orisinal. Membantu kami menjaga keselarasan ajaran resmi iman Katolik bagi ketenteraman hati kita.
                </p>
              </div>
              <a 
                href="https://www.vatican.va" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vatican-red hover:text-vatican-gold text-xs font-sans-inter font-bold flex items-center gap-1.5 mt-6 transition-colors"
              >
                Kunjungi Vatican.va <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Vatican Museums Inspired */}
            <div className="bg-white p-8 rounded-[24px] border border-stone-200/60 shadow-md flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 duration-300 group">
              <div>
                <span className="font-serif-cinzel text-[10px] text-vatican-gold font-bold tracking-widest block uppercase">
                  Rujukan 2 &bull; Seni Keindahan Visual
                </span>
                <span className="font-serif-cinzel font-bold text-lg text-stone-900 block mt-2 border-b border-stone-100 pb-2">
                  Vatican Museums
                </span>
                <p className="font-serif-lora text-stone-600 text-xs md:text-sm mt-4 leading-relaxed">
                  Meniru kemegahan kontras gelap-terang (<em>chiaroscuro</em>), serif klasik Romawi, warna emas murni, serta kelembutan warna krim yang berwibawa demi rasa hormat saat membaca doa.
                </p>
              </div>
              <a 
                href="https://www.museivaticani.va" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vatican-red hover:text-vatican-gold text-xs font-sans-inter font-bold flex items-center gap-1.5 mt-6 transition-colors"
              >
                Kunjungi Musei Vaticani <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Christianity.org.uk Inspired */}
            <div className="bg-white p-8 rounded-[24px] border border-stone-200/60 shadow-md flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 duration-300 group">
              <div>
                <span className="font-serif-cinzel text-[10px] text-vatican-gold font-bold tracking-widest block uppercase">
                  Rujukan 3 &bull; Kehangatan Penyampaian
                </span>
                <span className="font-serif-cinzel font-bold text-lg text-stone-900 block mt-2 border-b border-stone-100 pb-2">
                  Christianity.org.uk
                </span>
                <p className="font-serif-lora text-stone-600 text-xs md:text-sm mt-4 leading-relaxed">
                  Terinspirasi dari pendekatan komunikasi rohani modern yang hangat, inklusif, komunikatif, serta mudah dipahami oleh rentang umur produktif and dewasa madya (20-50 tahun).
                </p>
              </div>
              <a 
                href="https://www.christianity.org.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vatican-red hover:text-vatican-gold text-xs font-sans-inter font-bold flex items-center gap-1.5 mt-6 transition-colors"
              >
                Kunjungi Christianity <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Endorsements / User Quotes for age 20-50 */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans-inter font-bold uppercase tracking-widest text-vatican-gold">
            Testimonial Komunitas Sembahyang
          </span>
          <h3 className="font-serif-cinzel font-extrabold text-vatican-red text-xl md:text-2xl">
            Menemukan Sauh Jiwa di Tengah Kesibukan Modern
          </h3>
          <div className="h-0.5 w-12 bg-vatican-red mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="user-endorsements">
          
          <div className="bg-white p-8 rounded-[24px] border border-stone-200/80 space-y-4 shadow-sm relative hover:shadow-md transition-shadow">
            <p className="font-serif-lora italic text-stone-605 text-xs md:text-sm leading-relaxed">
              &ldquo;Sebagai arsitek berumur 34 tahun dengan tingkat pekerjaan yang padat, membawa buku doa tebal ke lapangan sangat membingungkan. Novenaku.id sangat ringan, elegan, dan fitur penanda harinya sungguh menolong menjaga komitmen devosi saya.&rdquo;
            </p>
            <div className="border-t border-stone-100 pt-4">
              <span className="font-serif-cinzel font-bold text-xs text-stone-900 block">Bernardus Hartono (34 thn)</span>
              <span className="text-[10px] text-stone-400 font-sans-inter block">Arsitek Mandiri &bull; Semarang</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-vatican-gold/50 space-y-4 shadow-md relative ring-1 ring-vatican-gold/15">
            <p className="font-serif-lora italic text-stone-605 text-xs md:text-sm leading-relaxed">
              &ldquo;Saya mengagumi perpaduan keindahan visualnya. Terasa khidmat seperti website resmi Vatikan, namun penataan langkahnya begitu adaptif di layar smartphone saya. Sangat menenangkan untuk rehat sore di kantor.&rdquo;
            </p>
            <div className="border-t border-stone-100 pt-4">
              <span className="font-serif-cinzel font-bold text-xs text-stone-900 block">Maria Fransisca (27 thn)</span>
              <span className="text-[10px] text-stone-400 font-sans-inter block">Analisis Data Perusahaan Medis &bull; Jakarta</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-stone-200/80 space-y-4 shadow-sm relative hover:shadow-md transition-shadow">
            <p className="font-serif-lora italic text-stone-605 text-xs md:text-sm leading-relaxed">
              &ldquo;Sebagai bapak berumur 48 tahun, saya sering mengajari anak-anak muda pentingnya devosi Roh Kudus. Situs ini sangat ramah di mata saya, hurufnya pas terbaca tanpa kacamata plus, dan isinya murni dan bersih sesuai liturgi paroki.&rdquo;
            </p>
            <div className="border-t border-stone-100 pt-4">
              <span className="font-serif-cinzel font-bold text-xs text-stone-900 block">Stephanus Gunawan (48 thn)</span>
              <span className="text-[10px] text-stone-400 font-sans-inter block">Wiraswasta &bull; Yogyakarta</span>
            </div>
          </div>

        </div>
      </section>

      {/* Publisher Adsense Safety Discolser Area */}
      <section className="bg-vatican-cream/60 border-t border-stone-200/50 py-10 text-center text-[11px] font-sans-inter text-stone-500">
        <div className="max-w-4xl mx-auto px-6">
          <p className="leading-relaxed">
            <strong>Informasi Kepatuhan Google AdSense Publisher:</strong> Situs web novenaku.id didanai murni dari program kemitraan iklan pihak ketiga Google AdSense untuk mengompensasi pemeliharaan peladen nirlaba. Seluruh konten doa, sejarah santo/santa, dan visualisasi liturgi dirawat secara sukarela dan tidak memungut biaya atau menghitung donasi langsung dari para umat pengguna ritual kebaktian sembilan hari ini.
          </p>
        </div>
      </section>

      {/* Main Beautiful Vatican-Colored Footer */}
      <footer className="bg-stone-950 text-stone-100 border-t border-vatican-gold pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/Slogan Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-vatican-red text-white rounded-full flex items-center justify-center font-serif-cinzel font-bold text-sm italic">
                N
              </div>
              <span className="font-serif-cinzel text-base tracking-widest font-bold text-vatican-gold">
                novenaku<span className="text-white">.id</span>
              </span>
            </div>
            
            <p className="font-serif-lora text-stone-400 text-xs md:text-sm leading-relaxed max-w-sm">
              Peziarahan murni doa devosi katolik, diletakkan dengan indah di pelukan teknologi modern Indonesia demi keluhuran rohani batin Anda.
            </p>
            <p className="text-[10px] text-stone-550 font-sans-inter">
              Ad Maiorem Dei Gloriam (AMDG) &bull; Sejak 2026
            </p>
          </div>

          {/* Quick link actions */}
          <div className="space-y-3">
            <h5 className="font-serif-cinzel font-bold text-xs tracking-widest text-vatican-gold uppercase">
              Navigasi Halaman
            </h5>
            <ul className="space-y-2 text-xs font-sans-inter text-stone-400">
              <li>
                <a href="#hero-section" className="hover:text-stone-100 transition-colors">Utama (Home)</a>
              </li>
              <li>
                <a href="#prayer-tracker-section" className="hover:text-stone-100 transition-colors">Daftar Doa</a>
              </li>
              <li>
                <a href="#tentang-section" className="hover:text-stone-100 transition-colors">Misi Keuskupan</a>
              </li>
              <li>
                <button onClick={() => setActiveModal('about')} className="text-left hover:text-stone-100 transition-colors cursor-pointer">Tentang novenaku.id</button>
              </li>
            </ul>
          </div>

          {/* Regulatory Google Ads Footer compliant pages */}
          <div className="space-y-3">
            <h5 className="font-serif-cinzel font-bold text-xs tracking-widest text-vatican-gold uppercase">
              Halaman Legalitas &amp; Ads
            </h5>
            <ul className="space-y-2 text-xs font-sans-inter text-stone-400">
              <li>
                <button 
                  onClick={() => setActiveModal('tos')} 
                  className="hover:text-stone-100 text-left transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Ketentuan Layanan (TOS)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('privacy')} 
                  className="hover:text-stone-100 text-left transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('cookie')} 
                  className="hover:text-stone-100 text-left transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  Kebijakan Cookie &amp; Iklan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal('contact')} 
                  className="hover:text-stone-100 text-left transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Hubungi Kami
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal copy and copyright bar */}
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-stone-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-stone-500 font-sans-inter">
          <p>&copy; 2026 novenaku.id. Semua hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-4">
            <button onClick={() => setActiveModal('privacy')} className="hover:underline cursor-pointer">Privacy Policy</button>
            <button onClick={() => setActiveModal('tos')} className="hover:underline cursor-pointer">Terms of Service</button>
            <button onClick={() => setActiveModal('cookie')} className="hover:underline cursor-pointer">Cookie Policy</button>
          </div>
        </div>
      </footer>

      {/* Floating compliance legal modals */}
      <LegalModals 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)} 
      />

    </div>
  );
}
