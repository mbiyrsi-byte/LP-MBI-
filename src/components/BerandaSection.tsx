import { useState } from 'react';
import { ActiveTab } from '../types';
import MbiLogo from './MbiLogo';
import ParentTestimonialsWidget from './ParentTestimonialsWidget';
import FasilitasGallerySection from './FasilitasGallerySection';
import GoogleMapsSection from './GoogleMapsSection';
import InformasiGiziSection from './InformasiGiziSection';
import PrestasiSantriSection from './PrestasiSantriSection';
import { 
  MISI_LIST, 
  MisiPoint, 
  KENAPA_MEMILIH_MBI, 
  FASILITAS_LIST, 
  BIAYA_DATA 
} from '../data/psbData';
import MisiDetailsModal from './MisiDetailsModal';
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Users, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  ChevronRight, 
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface BerandaSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenRegister: () => void;
  onOpenChat: () => void;
}

export default function BerandaSection({ setActiveTab, onOpenRegister, onOpenChat }: BerandaSectionProps) {
  const [selectedMisi, setSelectedMisi] = useState<MisiPoint | null>(null);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF6F0] to-[#F2EDE2] text-[#231710] pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E5DACB]">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C49A6C_1.2px,transparent_1.2px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Headlines & Call-To-Action */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              {/* Badge & Title */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EADECE] border border-[#C49A6C]/50 text-[#5D402C] text-xs font-bold shadow-xs">
                  <MbiLogo className="w-5 h-5 rounded-full ring-1 ring-[#C49A6C]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#A8795D] shrink-0" />
                  <span>Penerimaan Santri Baru (PSB) Tahun Ajaran 2027/2028</span>
                </div>
                
                <h1 id="hero-main-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#2E1F16] leading-tight font-serif">
                  Pendidikan Putri Berilmu Shahih dan Beramal Sholih
                </h1>
                
                <p className="text-sm sm:text-base text-[#5D402C] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Pesantren putri jenjang SMP &amp; SMA dengan asrama mandiri, bimbingan intensif ilmu syar'i bermanhaj Salafus Shalih, serta pengajar Al-Qur'an berkompeten.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  id="hero-btn-daftar-sekarang"
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] font-black rounded-xl shadow-lg shadow-[#C49A6C]/25 transition-all flex items-center justify-center gap-2 transform active:scale-95 text-sm sm:text-base border border-[#C49A6C]/30"
                >
                  <ShieldCheck className="w-5 h-5 text-[#FAF6F0]" />
                  <span>Daftar Online Sekarang</span>
                  <ArrowRight className="w-4 h-4 text-[#FAF6F0]" />
                </button>

                <button
                  id="hero-btn-ke-tahfidz"
                  onClick={() => {
                    setActiveTab('tahfidz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-[#F5EFE6] text-[#442E20] border border-[#C49A6C]/60 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm hover:border-[#C49A6C]"
                >
                  <BookOpen className="w-5 h-5 text-[#A8795D]" />
                  <span>Program Tahfidz Unggulan</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5D402C]">
                  <CheckCircle className="w-4 h-4 text-[#A8795D] shrink-0" />
                  <span>Manhaj Salafus Shalih</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5D402C]">
                  <CheckCircle className="w-4 h-4 text-[#A8795D] shrink-0" />
                  <span>Pengajar Al-Qur'an Berkompeten</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5D402C]">
                  <CheckCircle className="w-4 h-4 text-[#A8795D] shrink-0" />
                  <span>Native Speaker Saudi</span>
                </div>
              </div>

            </div>

            {/* Right Column: Ringkasan Informasi PSB (1 Kartu Lengkap & Padat dengan Tone Cerah) */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 border-2 border-[#C49A6C]/60 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md relative text-[#2E1F16]">
                
                {/* Header Kartu */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5DACB]">
                  <div className="flex items-center gap-2.5">
                    <MbiLogo className="w-6 h-6 rounded-full ring-1 ring-[#C49A6C]" />
                    <h3 className="font-bold text-[#382417] text-base sm:text-lg font-serif">Ringkasan Informasi PSB</h3>
                  </div>
                  <span className="bg-[#8C6249] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    Kuota 40 Santri
                  </span>
                </div>

                {/* Kuota Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center border border-[#E5DACB] shadow-xs">
                    <span className="text-2xl font-black text-[#8C6249] block">30</span>
                    <span className="text-xs font-bold text-[#382417]">Santriwati SMP</span>
                    <span className="block text-[11px] text-[#7A553B] mt-0.5 font-medium">Target 15 Juz</span>
                  </div>
                  <div className="bg-[#FAF6F0] rounded-xl p-3 text-center border border-[#E5DACB] shadow-xs">
                    <span className="text-2xl font-black text-[#8C6249] block">10</span>
                    <span className="text-xs font-bold text-[#382417]">Santriwati SMA</span>
                    <span className="block text-[11px] text-[#7A553B] mt-0.5 font-medium">Target 30 Juz</span>
                  </div>
                </div>

                {/* Biaya Pendaftaran Promo */}
                <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#C49A6C]/50 text-xs text-[#442E20] space-y-1.5 mb-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#442E20] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
                      Biaya Pendaftaran Online
                    </span>
                    <span className="bg-[#C49A6C] text-[#231710] font-black px-2 py-0.5 rounded text-[10px]">
                      Hemat 6,25%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#8C6249]">Rp 375.000</span>
                    <span className="line-through text-[#9C8C72] text-xs">Rp 400.000</span>
                    <span className="text-[11px] text-[#5D402C] font-semibold">(Periode Sep–Des 2026)</span>
                  </div>
                </div>

                {/* Jadwal & Lokasi */}
                <div className="space-y-2 text-xs text-[#5D402C] pt-1">
                  <div className="flex items-center justify-between py-1 border-t border-[#EDE3D5]">
                    <span className="text-[#7A553B] font-medium">Waktu Seleksi</span>
                    <span className="font-bold text-[#382417]">1 Sep 2026 – 1 Mei 2027 (One Day Service)</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-t border-[#EDE3D5]">
                    <span className="text-[#7A553B] font-medium shrink-0 mr-2">Lokasi Asrama</span>
                    <span className="text-right text-[#382417] font-medium">Jl. Puri Hidayah No. 50, Jatiluhur, Jatiasih, Kota Bekasi</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VISI & 4 POIN MISI MBI (FOCUS EMPHASIS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100 text-burgundy-800 text-xs font-bold border border-burgundy-200 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-burgundy-700" />
            Landasan Pendidikan
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-burgundy-950 tracking-tight">
            Visi & 4 Misi Ma'had Baitusunnah Indonesia
          </h2>
          <p className="text-sm sm:text-base text-coffee-700">
            Komitmen kami membimbing santriwati dengan penekanan pada kelancaran hafalan Al-Qur'an, pemahaman syar'i, dan kemurnian aqidah.
          </p>
        </div>

        {/* VISI BANNER CARD */}
        <div className="mb-10 bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-coffee-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-burgundy-700 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="bg-amber-400 text-burgundy-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2">
              VISI UTAMA
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-100 leading-snug">
              "Membentuk muslimah beraqidah lurus, penghafal Al-Qur'an, berilmu shahih, dan beramal shalih"
            </h3>
            <p className="text-xs sm:text-sm text-coffee-100 mt-2">
              Menyiapkan santriwati yang tangguh, berbudi pekerti mulia, mencintai sunnah, dan berwawasan luas demi kemaslahatan umat.
            </p>
          </div>
        </div>

        {/* 4 MISI GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MISI_LIST.map((misi) => {
            const isTahfidz = misi.isSpecialTahfidz;
            return (
              <div
                key={misi.number}
                id={`card-misi-${misi.number}`}
                className={`rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between relative border ${
                  isTahfidz
                    ? 'bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white border-amber-300 ring-2 ring-amber-400/40 shadow-lg'
                    : 'bg-white border-coffee-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shadow-xs ${
                        isTahfidz 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-burgundy-800 text-white'
                      }`}>
                        {misi.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-coffee-600">
                        Misi Ke-{misi.number}
                      </span>
                    </div>

                    {isTahfidz && (
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-200" />
                        Pilar Tahfidz Unggulan
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-burgundy-950 mb-2 leading-snug">
                    {misi.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed mb-4">
                    {misi.shortDesc}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-6">
                    {misi.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-coffee-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-coffee-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedMisi(misi)}
                    className="text-xs font-bold text-burgundy-800 hover:text-burgundy-900 flex items-center gap-1 transition-colors"
                  >
                    <span>Baca Rincian Lengkap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {isTahfidz && (
                    <button
                      onClick={() => {
                        setActiveTab('tahfidz');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-1.5 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Halaman Tahfidz</span>
                      <ArrowRight className="w-3 h-3 text-amber-300" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 3. KENAPA MEMILIH MBI? (10 POIN DARI BROSUR) */}
      <section className="bg-coffee-50/70 border-y border-coffee-200/60 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coffee-200 text-coffee-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-coffee-700" />
              Keunggulan Ma'had
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-burgundy-950 tracking-tight">
              Kenapa Memilih Ma'had Baitusunnah Indonesia?
            </h2>
            <p className="text-sm sm:text-base text-coffee-700">
              10 Poin Keunggulan yang menjadikan MBI lingkungan ideal bagi putri Anda dalam menuntut ilmu syar'i dan menghafal Al-Qur'an.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {KENAPA_MEMILIH_MBI.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-4 border border-coffee-200/80 shadow-xs hover:border-burgundy-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="w-7 h-7 rounded-lg bg-burgundy-100 text-burgundy-800 text-xs font-black flex items-center justify-center mb-3">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-burgundy-950 text-sm mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-coffee-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INFORMASI GIZI & KONSUMSI SANTRIWATI (DITEMPATKAN DI BAWAH KEUNGGULAN) */}
      <InformasiGiziSection />

      {/* 4. KUALIFIKASI PENGAJAR & FASILITAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Kualifikasi Pengajar */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100 text-burgundy-800 text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-burgundy-700" />
                Tenaga Pendidik
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-burgundy-950 tracking-tight">
                Kualifikasi Pengajar MBI
              </h2>
              <p className="text-xs sm:text-sm text-coffee-700 mt-1">
                Dibimbing oleh para asatidzah berkompeten, berakhlak mulia, dan lulusan institusi Islam terkemuka:
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white border border-coffee-200 shadow-xs">
                <h4 className="font-bold text-burgundy-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Luar Negeri & Lembaga Islam Ternama
                </h4>
                <p className="text-xs text-coffee-700 mt-1 font-medium">
                  Ummul Qura Makkah Al-Mukarramah & LIPIA Jakarta
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-coffee-200 shadow-xs">
                <h4 className="font-bold text-burgundy-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Perguruan Tinggi Islam Unggulan
                </h4>
                <p className="text-xs text-coffee-700 mt-1 font-medium">
                  STDI Imam Syafi'i Jember, STIU Wadi Mubarak, dll.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-coffee-200 shadow-xs">
                <h4 className="font-bold text-burgundy-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Perguruan Tinggi Negeri & Swasta
                </h4>
                <p className="text-xs text-coffee-700 mt-1 font-medium">
                  Universitas Padjadjaran (Unpad) & PTN/PTS Pilihan Lainnya
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 shadow-xs">
                <h4 className="font-bold text-coffee-950 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Native Speaker dari Saudi Arabia
                </h4>
                <p className="text-xs text-coffee-800 mt-1">
                  Membina kefasihan percakapan bahasa Arab fusha secara aktif dan alami dalam kegiatan sehari-hari santriwati.
                </p>
              </div>
            </div>

            {/* Ekstrakurikuler Chips */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-600 mb-2.5">
                Ekstrakurikuler Pilihan:
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Arabic Club', 'English Club', 'Literation Club', 'Art Club', 'Olahraga Renang Akhwat'].map((ekskul, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-coffee-100 text-coffee-900 rounded-full text-xs font-semibold border border-coffee-200"
                  >
                    ✓ {ekskul}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Fasilitas Lengkap MBI dengan Fitur Upload Foto */}
          <div className="lg:col-span-7">
            <FasilitasGallerySection onOpenRegister={onOpenRegister} />
          </div>

        </div>
      </section>

      {/* INFORMASI PRESTASI SANTRIWATI (DITEMPATKAN DI BAWAH FASILITAS) */}
      <PrestasiSantriSection />

      {/* 5. TIMELINE & BIAYA SUMMARY TEASER */}
      <section className="bg-gradient-to-br from-[#F5EFE6] via-[#FAF6F0] to-[#EADECE] text-[#2E1F16] rounded-3xl p-8 sm:p-12 mx-4 sm:mx-6 lg:mx-8 shadow-xl border-2 border-[#C49A6C]/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="bg-[#C49A6C] text-[#231710] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs">
            Jadwal PSB 2027/2028
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2E1F16] font-serif">
            Pendaftaran Telah Dibuka (1 September – 1 Mei 2027)
          </h2>
          <p className="text-xs sm:text-sm text-[#5D402C] max-w-2xl mx-auto font-medium">
            Kuota hanya untuk 40 santriwati (30 SMP & 10 SMA). Pendaftaran dapat ditutup sewaktu-waktu apabila kuota telah terpenuhi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setActiveTab('biaya-syarat');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white text-[#442E20] hover:bg-[#FAF6F0] font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md border border-[#C49A6C]/50"
            >
              Lihat Rincian Biaya & Syarat
            </button>
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] font-black rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              Daftar Santriwati Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* FITUR TESTIMONI ORANG TUA & FORMULIR */}
      <ParentTestimonialsWidget />

      {/* PETA LOKASI GOOGLE MAPS (DI PALING BAWAH DAPAT LANGSUNG DI-KLIK) */}
      <GoogleMapsSection />

      {/* Modal for Misi Details */}
      <MisiDetailsModal
        misi={selectedMisi}
        onClose={() => setSelectedMisi(null)}
        onNavigateToTahfidz={() => {
          setActiveTab('tahfidz');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
