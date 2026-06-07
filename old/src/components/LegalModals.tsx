import React from 'react';
import { Shield, FileText, CheckCircle, Info, Mail, MapPin, Printer } from 'lucide-react';
import { ActiveModalType } from '../types';

interface LegalModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  userEmail?: string;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose, userEmail = 'riesal@gmail.com' }) => {
  if (!activeModal) return null;

  const handlePrint = () => {
    window.print();
  };

  const getModalTitleAndIcon = () => {
    switch (activeModal) {
      case 'tos':
        return {
          title: 'Ketentuan Layanan (Terms of Service)',
          icon: <FileText className="w-6 h-6 text-emerald-600" />
        };
      case 'privacy':
        return {
          title: 'Kebijakan Privasi (Privacy Policy)',
          icon: <Shield className="w-6 h-6 text-cyan-600" />
        };
      case 'cookie':
        return {
          title: 'Kebijakan Cookie & Iklan (Cookie Policy)',
          icon: <Info className="w-6 h-6 text-amber-500" />
        };
      case 'contact':
        return {
          title: 'Hubungi Kami (Contact Us)',
          icon: <Mail className="w-6 h-6 text-vatican-gold" />
        };
      case 'about':
        return {
          title: 'Tentang novenaku.id (About Us)',
          icon: <Info className="w-6 h-6 text-vatican-red" />
        };
    }
  };

  const { title, icon } = getModalTitleAndIcon();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in" id="legal-modal-container">
      <div 
        className="w-full max-w-3xl bg-amber-50/95 border-2 border-stone-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        id={`modal-${activeModal}`}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-vatican-gold">
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-serif-cinzel font-bold text-lg tracking-wider text-vatican-gold">{title}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-100 text-2xl font-light focus:outline-none transition-colors border border-transparent hover:border-stone-700 rounded-lg px-2"
            id="close-modal-btn"
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto text-stone-800 font-sans-inter text-sm leading-relaxed space-y-6">
          {activeModal === 'tos' && (
            <div className="space-y-4">
              <p className="text-stone-500 text-xs italic">Terakhir Diperbarui: 7 Juni 2026</p>
              <p>Selamat datang di <strong>novenaku.id</strong>. Dengan mengakses dan menggunakan situs web ini, Anda dianggap telah menyetujui, menerima, dan mematuhi seluruh syarat, ketentuan, serta kebijakan yang kami rincikan di bawah ini.</p>
              
              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">1. Penerimaan Ketentuan</h4>
              <p>Layanan novenaku.id disediakan hanya untuk penggunaan pribadi yang bersifat edukatif and spiritual (devosi liturgis Katolik). Jika Anda tidak menyetujui salah satu bagian dari ketentuan ini, Anda disarankan untuk mengabaikan isi situs ini.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">2. Deskripsi Layanan</h4>
              <p>novenaku.id adalah aplikasi web interaktif yang menyediakan basis data teks doa Novena Kristen Katolik, panduan devosi, serta modul pelacak batin (tracker) secara mandiri. Kami tidak memungut biaya apa pun dan tidak pernah berafiliasi resmi dengan entitas hirarki gerejawi mana pun secara finansial.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">3. Penyimpanan Data Lokal</h4>
              <p>Pelacak doa dan intensi batin yang Anda masukkan di novenaku.id disimpan langsung di peranti keras Anda melalui memori loka (<em>Local Storage</em>). Kami tidak memindahkan atau menyalin data doa pribadi Anda ke peladen (server) kami, guna menjamin kebebasan dan kerahasiaan meditasi batin Anda.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">4. Hak Kekayaan Intelektual</h4>
              <p>Kecuali doa-doa liturgis resmi gerejawi yang berada dalam domain publik Kristen universal, tata rupa, visualisasi, grafis, kode sumber, dan kemasan logo novenaku.id tunduk pada perlindungan hak cipta kekayaan intelektual independen kami.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">5. Iklan dan Sponsor</h4>
              <p>Situs ini didanai melalui program monetisasi iklan pihak ketiga, termasuk Google AdSense. Dengan menggunakan situs ini, Anda memahami bahwa iklan akan ditampilkan pada beberapa bagian antarmuka sebagai pendukung operasional server gratis kami.</p>
            </div>
          )}

          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="text-stone-500 text-xs italic">Terakhir Diperbarui: 7 Juni 2026</p>
              <p>Privasi Anda adalah landasan utama dalam pelayanan kami. Kebijakan Privasi ini menjelaskan bagaimana <strong>novenaku.id</strong> menghormati integritas data Anda sebagai bagian dari komitmen kepatuhan peraturan Google Adsense, GDPR, dan UU Pelindungan Data Pribadi Negara Republik Indonesia.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">1. Informasi yang Kami Kumpulkan</h4>
              <p>Situs kami dirancang tanpa menu registrasi wajib dengan nama lengkap demi melindungi profil rohani Anda. Kami tidak mengumpulkan data pribadi sensitif Anda:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Log Aktivitas Doa:</strong> Disimpan murni di memori browser lokal Google Chrome/Safari Anda (tidak diunggah ke server).</li>
                <li><strong>Data Analitik:</strong> Alamat IP rujukan generik dikelola secara anonim melalui sistem statistik bawaan dan Google Analytics guna mengamati volume pengunjung mingguan harian.</li>
              </ul>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">2. Iklan Pihak Ketiga (Google AdSense)</h4>
              <p>Kami bekerja sama dengan vendor pihak ketiga, termasuk Google, yang menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs web kami atau situs web lain di Internet.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Penggunaan <strong>cookie Google DoubleClick</strong> memungkinkan Google dan mitranya menayangkan iklan yang dipersonalisasi kepada pengguna Anda berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di Internet.</li>
                <li>Anda dapat memilih untuk membatalkan penayangan iklan yang dipersonalisasi tersebut dengan mengunjungi halaman <a href="https://settings.google.com/ads" target="_blank" rel="noopener noreferrer" className="text-vatican-red underline font-medium">Pengaturan Iklan Google</a>.</li>
              </ul>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">3. Keamanan Data</h4>
              <p>Semua komunikasi jaringan dibungkus menggunakan protokol pengiriman terenkripsi industri HTTPS (SSL). Intensi doa pribadi Anda aman di ponsel/tablet masing-masing tanpa ada risiko kebocoran peladen awan database pusat.</p>
            </div>
          )}

          {activeModal === 'cookie' && (
            <div className="space-y-4">
              <p className="text-stone-500 text-xs italic">Terakhir Diperbarui: 7 Juni 2026</p>
              <p>Situs <strong>novenaku.id</strong> menggunakan cookie untuk mengoptimalkan keandalan navigasi antarmuka dan menyesuaikan tayangan informasi yang ditampilkan kepada setiap pengunjung.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">Apa Itu Cookie?</h4>
              <p>Cookie adalah file teks kecil yang diletakkan oleh peramban situs ke dalam memori komputer atau ponsel pintar Anda saat Anda mengunjungi situs kami. File ini memantau rekam jejak sesi, namun tidak merusak fungsi gawai fisik Anda.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">Bagaimana Kami Menggunakan Cookie</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookie Fungsional Esensial:</strong> Menyimpan pengaturan personalisasi antarmuka seperti ukuran teks membaca doa atau tema visual dominan.</li>
                <li><strong>Cookie Penayangan Iklan:</strong> Memungkinkan penargetan iklan kontekstual yang ramah pengguna dari Google AdSense tanpa mengorbankan file privat batin Anda.</li>
              </ul>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">Mengontrol Cookie</h4>
              <p>Anda dapat memblokir, melarang, atau menghapus cookie web kapan saja melalui fitur opsi internal peramban peranti gawai Anda. Perlu dipahami bahwa melarang fungsionalitas cookie dapat mengembalikan progres pelacak doa digital ke awal.</p>
            </div>
          )}

          {activeModal === 'contact' && (
            <div className="space-y-6">
              <p>Kami sangat terbuka menerima saran liturgis, koreksi teks doa Novena, kerja sama pengembangan media paroki Katolik, atau sekadar bertukar sapa rohani. Jangan ragu menghubungi administrator kami:</p>
              
              <div className="bg-stone-900 text-stone-100 p-5 rounded-lg border border-vatican-gold space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-vatican-gold" />
                  <div>
                    <p className="text-xs text-stone-400 font-sans-inter">E-mail Resmi Admin</p>
                    <p className="font-mono text-sm text-stone-100">{userEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-vatican-gold" />
                  <div>
                    <p className="text-xs text-stone-400 font-sans-inter">Lokasi Layanan</p>
                    <p className="font-sans-inter text-sm text-stone-100">Yogyakarta - Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="border border-stone-300 p-5 rounded-lg bg-stone-50 space-y-4">
                <span className="font-serif-lora font-semibold text-stone-950 block">Kirim Tanggapan Cepat</span>
                <form onSubmit={(e) => { e.preventDefault(); alert('Pesan Anda berhasil dikirim secara lokal! Terima kasih atas berkat saran rohani Anda.'); }} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap</label>
                    <input required type="text" className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-vatican-gold focus:outline-none bg-white text-stone-900" placeholder="Contoh: Thomas Aquinas" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat E-mail</label>
                    <input required type="email" className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-vatican-gold focus:outline-none bg-white text-stone-900" placeholder="contoh@gmail.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Pesan / Saran Liturgis</label>
                    <textarea required rows={3} className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-vatican-gold focus:outline-none bg-white text-stone-900" placeholder="Tuliskan masukan atau pertanyaan Anda di sini..."></textarea>
                  </div>
                  <button type="submit" className="w-full mt-2 bg-stone-950 text-vatican-gold py-2 rounded font-serif-cinzel font-semibold hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs border border-vatican-gold">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeModal === 'about' && (
            <div className="space-y-4">
              <p className="text-stone-700"><strong>novenaku.id</strong> didirikan dengan kerinduan mendalam untuk melestarikan tradisi iman suci devosi Katolik (Novena) di era digital modern.</p>
              
              <div className="border-l-4 border-vatican-gold pl-4 italic text-stone-600 font-serif-lora my-4">
                "Umat Allah dipanggil untuk terus berdoa tanpa henti, menemukan kekuatan dalam hening sembilan hari yang menguatkan."
              </div>

              <p>Generasi muda berusia 20-50 tahun seringkali dihadapkan pada padatnya tuntutan karier, pekerjaan rumah tangga, maupun studi akademis, sehingga membawa buku doa tebal menjadi sulit dipraktikkan. Melalui <strong>novenaku.id</strong>, kami merancang antarmuka doa yang bersih, elegan, bebas distraksi, dan sangat intuitif.</p>

              <h4 className="font-serif-lora font-bold text-stone-900 text-base mt-4 border-b border-stone-200 pb-1">Misi Spiritual Kami</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Menyediakan kumpulan doa Novena Katolik terpopuler berterjemahan Indonesia yang rapi dan sah secara ajaran katekismus paroki Katolik.</li>
                <li>Menyediakan fitur pelacakan pribadi (Prayer Progress Tracker) digital tanpa kuota data berlebih dan tanpa pengumpulan profil rahasia.</li>
                <li>Mengembangkan aplikasi liturgi teringan yang dapat dibuka di semua jenis ponsel pintar mana saja, kapan saja secara andal.</li>
              </ul>

              <p className="border-t border-stone-200 pt-4 text-xs text-stone-500">Aplikasi novenaku.id adalah inisiatif nirlaba independen oleh para praktisi perangkat lunak Katolik di Indonesia. Kami mendedikasikan karya digital ini untuk Kemuliaan Tuhan yang Lebih Besar (<em>Ad Maiorem Dei Gloriam</em> - AMDG).</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-100 flex justify-between items-center border-t border-stone-300">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 border border-stone-400 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak Dokumen (Print)
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-vatican-red text-white hover:bg-vatican-red-dark text-xs font-semibold font-serif-cinzel uppercase tracking-wider rounded-lg transition-colors shadow"
          >
            Tutup Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
