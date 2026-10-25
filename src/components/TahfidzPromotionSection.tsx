import { useState } from 'react';
import { TAHFIDZ_PROGRAM_DETAILS } from '../data/psbData';
import { 
  Award, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  Users,
  Printer,
  Scroll,
  ExternalLink,
  FileSpreadsheet
} from 'lucide-react';
import MbiLogo from './MbiLogo';

interface TahfidzPromotionSectionProps {
  onOpenRegister: () => void;
  onBackToBeranda?: () => void;
}

export default function TahfidzPromotionSection({ onOpenRegister, onBackToBeranda }: TahfidzPromotionSectionProps) {
  // Mock tracker interactive state
  const [activeTrackerTab, setActiveTrackerTab] = useState<'log' | 'progress' | 'rapor' | 'murajaah'>('log');

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Quick Back Navigation Bar */}
      {onBackToBeranda && (
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#EADECE] shadow-xs mt-4">
          <button
            onClick={onBackToBeranda}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E1F16] text-[#FAF6F0] hover:bg-[#3B2518] hover:text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 group cursor-pointer border border-[#C49A6C]/40"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 text-[#C49A6C] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </button>
          
          <span className="text-xs text-[#7A553B] font-medium hidden sm:inline">
            Ma'had Baitussunnah Indonesia • Program Tahfidz
          </span>
        </div>
      )}
      
      {/* ACTION BAR: DOWNLOAD / CETAK DOKUMEN & TOMBOL DAFTAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-2 border-b border-[#E5DACB]">
        <div className="flex items-center gap-2 text-xs text-[#6E4F39]">
          <FileText className="w-4 h-4 text-[#C49A6C]" />
          <span className="font-semibold">{TAHFIDZ_PROGRAM_DETAILS.dokumenRef}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrintDocument}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#C49A6C]/40 bg-[#FAF6F0] hover:bg-[#F2EDE2] text-[#442E20] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Cetak atau simpan sebagai PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#8C6249]" />
            <span>Cetak / Simpan Dokumen</span>
          </button>
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2E1F16] hover:bg-[#442E20] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>Daftar PSB 2027/2028</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C49A6C]" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HEADER & INTRO PROGRAM TAHFIDZ (SESUAI DOKUMEN RESMI) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#FAF6F0] via-[#F5EFE6] to-[#F2EDE2] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#C49A6C]/40 shadow-md relative overflow-hidden text-[#2E1F16]">
        
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C49A6C_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          
          {/* Institution Header */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EADECE] border border-[#C49A6C]/60 text-[#3B2518] text-xs sm:text-sm font-black tracking-widest uppercase shadow-xs">
            <MbiLogo className="w-5 h-5 rounded-full ring-1 ring-[#C49A6C]" />
            <span>{TAHFIDZ_PROGRAM_DETAILS.lembaga}</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2E1F16] font-serif tracking-tight">
              {TAHFIDZ_PROGRAM_DETAILS.judul}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#7A553B] font-serif italic">
              {TAHFIDZ_PROGRAM_DETAILS.subjudul}
            </p>
          </div>

          {/* Golden Divider Line */}
          <div className="w-24 h-1 bg-[#C49A6C] mx-auto rounded-full"></div>

          {/* Lead Paragraph */}
          <p className="text-sm sm:text-base text-[#442E20] leading-relaxed text-justify sm:text-center max-w-3xl mx-auto font-normal">
            {TAHFIDZ_PROGRAM_DETAILS.deskripsi}
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TARGET BERJENJANG (JENJANG SMP: 15 JUZ | JENJANG SMA: 30 JUZ) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card JENJANG SMP */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#E5DACB] hover:border-[#C49A6C] shadow-sm relative overflow-hidden flex flex-col justify-between transition-all">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
                <span className="text-xs font-black tracking-wider uppercase text-[#7A553B] bg-[#FAF6F0] px-3 py-1 rounded-md border border-[#E5DACB]">
                  {TAHFIDZ_PROGRAM_DETAILS.targets.smp.jenjang}
                </span>
                <span className="text-xs text-[#8C6249] font-bold bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#E5DACB]">
                  3 Tahun Pembinaan
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#2E1F16] font-serif tracking-tight">
                  {TAHFIDZ_PROGRAM_DETAILS.targets.smp.targetBadge}
                </div>
                <p className="text-xs text-[#7A553B] font-medium">
                  Rata-rata 5 Juz per tahun (1/2 halaman ziyadah harian + muraja'ah 1 juz berkelanjutan).
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#F0E8DC] text-xs text-[#442E20]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-1:</strong> 5 Juz pertama + Matan Tajwid Tuhfatul Athfal</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-2:</strong> Genap 10 Juz + Penguatan Muraja'ah Bersanad</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-3:</strong> Tuntas 15 Juz Lancar Mutqin + Ujian Tasmi' Akhir</span>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-[#F0E8DC] bg-[#FAF6F0] p-3.5 rounded-xl border border-[#E5DACB]">
              <span className="text-[11px] text-[#7A553B] font-bold block uppercase tracking-wider">
                Output Kelulusan:
              </span>
              <span className="text-xs font-black text-[#2E1F16]">
                {TAHFIDZ_PROGRAM_DETAILS.targets.smp.output}
              </span>
            </div>
          </div>

          {/* Card JENJANG SMA */}
          <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5EFE6] rounded-2xl p-6 sm:p-8 border-2 border-[#C49A6C] shadow-md relative overflow-hidden flex flex-col justify-between">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EADECE]">
                <span className="text-xs font-black tracking-wider uppercase text-[#2E1F16] bg-[#C49A6C]/30 px-3 py-1 rounded-md border border-[#C49A6C]">
                  {TAHFIDZ_PROGRAM_DETAILS.targets.sma.jenjang}
                </span>
                <span className="text-xs text-[#2E1F16] font-bold bg-[#C49A6C] text-[#231710] px-2.5 py-0.5 rounded-full shadow-xs">
                  Target Mutqin 30 Juz
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#2E1F16] font-serif tracking-tight">
                  {TAHFIDZ_PROGRAM_DETAILS.targets.sma.targetBadge}
                </div>
                <p className="text-xs text-[#7A553B] font-medium">
                  Rata-rata 10 Juz per tahun (1 halaman ziyadah harian + muraja'ah 1.5–2 juz teratur).
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#EADECE] text-xs text-[#442E20]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-1:</strong> 10 Juz pertama + Matan Tajwid Al-Jazariyyah</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-2:</strong> Genap 20 Juz + Ujian Tasmi' Berkelanjutan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8F44] shrink-0 mt-0.5" />
                  <span><strong>Tahun ke-3:</strong> Khatam 30 Juz Mutqin + Pengambilan Sanad Matan Tajwid</span>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-[#EADECE] bg-white p-3.5 rounded-xl border border-[#C49A6C]/50 shadow-xs">
              <span className="text-[11px] text-[#7A553B] font-bold block uppercase tracking-wider">
                Output Kelulusan:
              </span>
              <span className="text-xs font-black text-[#2E1F16]">
                {TAHFIDZ_PROGRAM_DETAILS.targets.sma.output}
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. TAHAPAN PEMBELAJARAN SYSTEMATIS (SESUAI DOKUMEN RESMI) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E5DACB] shadow-sm space-y-8">
        
        {/* Section Heading matching Document */}
        <div className="border-b-2 border-[#C49A6C]/40 pb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2E1F16] font-serif tracking-tight uppercase">
            TAHAPAN PEMBELAJARAN SYSTEMATIS
          </h2>
          <p className="text-xs sm:text-sm text-[#7A553B] mt-1">
            Tahapan bertahap yang membimbing santriwati dari pemantapan kaidah tahsin dasar hingga akselerasi 30 juz.
          </p>
        </div>

        {/* 3 Phases from Document */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TAHFIDZ_PROGRAM_DETAILS.tahapanPembelajaran.map((item) => {
            return (
              <div 
                key={item.nomor}
                className="p-6 rounded-2xl border-2 border-[#E5DACB] bg-[#FFFDF9] hover:border-[#C49A6C]/80 hover:bg-[#FAF6F0]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-[#8C6249] font-serif tracking-tight">
                      {item.nomor}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EADECE] text-[#442E20]">
                      {item.durasi}
                    </span>
                  </div>

                  {/* Phase Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#2E1F16] leading-snug">
                    {item.fase}
                  </h3>

                  {/* Phase Description from Document */}
                  <p className="text-xs sm:text-sm text-[#442E20] leading-relaxed text-justify">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5DACB] flex items-center justify-between text-xs text-[#7A553B]">
                  <span className="font-semibold">{item.fokusUtama}</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. PENGAJARAN, STANDARDISASI & PEMANTAUAN (SESUAI DOKUMEN RESMI) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E5DACB] shadow-sm space-y-8">
        
        {/* Section Heading matching Document */}
        <div className="border-b-2 border-[#C49A6C]/40 pb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2E1F16] font-serif tracking-tight uppercase">
            PENGAJARAN, STANDARDISASI &amp; PEMANTAUAN
          </h2>
          <p className="text-xs sm:text-sm text-[#7A553B] mt-1">
            Empat pilar penjaminan mutu tahfidz Al-Qur'an terstruktur di Ma'had Baitu Sunnah Indonesia.
          </p>
        </div>

        {/* 4 Points from Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Point 1: Pengajar Halaqah Kompeten */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] hover:border-[#C49A6C] transition-all flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EADECE] text-[#442E20] flex items-center justify-center shrink-0 border border-[#C49A6C]/50 shadow-xs">
              <Users className="w-5 h-5 text-[#8C6249]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#2E1F16]">
                • Pengajar Halaqah Kompeten
              </h3>
              <p className="text-xs sm:text-sm text-[#442E20] leading-relaxed">
                Bimbingan harian diampu oleh tenaga pengajar halaqah yang berpengalaman dan kompeten di bidangnya.
              </p>
            </div>
          </div>

          {/* Point 2: Pengujian oleh Lajnah Iktibar Bersanad */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] hover:border-[#C49A6C] transition-all flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EADECE] text-[#442E20] flex items-center justify-center shrink-0 border border-[#C49A6C]/50 shadow-xs">
              <Award className="w-5 h-5 text-[#8C6249]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#2E1F16]">
                • Pengujian oleh Lajnah Iktibar Bersanad
              </h3>
              <p className="text-xs sm:text-sm text-[#442E20] leading-relaxed">
                Kelayakan kenaikan setiap juz diuji secara ketat dan langsung oleh lajnah iktibar (tim penguji) yang telah bersanad untuk menjamin mutu dan akurasi hafalan.
              </p>
            </div>
          </div>

          {/* Point 3: Program Sanad Matan Tajwid Santri */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] hover:border-[#C49A6C] transition-all flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EADECE] text-[#442E20] flex items-center justify-center shrink-0 border border-[#C49A6C]/50 shadow-xs">
              <Scroll className="w-5 h-5 text-[#8C6249]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#2E1F16]">
                • Program Sanad Matan Tajwid Santri
              </h3>
              <p className="text-xs sm:text-sm text-[#442E20] leading-relaxed">
                Santri berkesempatan mengikuti program pengambilan sanad matan tajwid yang diampu langsung oleh syaikhoh.
              </p>
            </div>
          </div>

          {/* Point 4: Target Terstruktur & Pemantauan Digital */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E5DACB] hover:border-[#C49A6C] transition-all flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EADECE] text-[#442E20] flex items-center justify-center shrink-0 border border-[#C49A6C]/50 shadow-xs">
              <Smartphone className="w-5 h-5 text-[#8C6249]" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#2E1F16]">
                • Target Terstruktur &amp; Pemantauan Digital
              </h3>
              <p className="text-xs sm:text-sm text-[#442E20] leading-relaxed">
                Capaian hafalan dipandu oleh indikator pekanan serta bulanan yang terukur, serta terintegrasi dengan aplikasi khusus agar orang tua dapat memantau perkembangan hafalan santri secara real-time dari rumah.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. INTERAKTIF: SIMULASI APLIKASI PEMANTAUAN DIGITAL ORANG TUA DARI RUMAH */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#2E1F16] via-[#3B2518] to-[#231710] text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border-2 border-[#C49A6C]/50">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Penjelasan Indikator Pekanan & Bulanan */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A6C]/20 text-[#EADECE] border border-[#C49A6C]/40 text-xs font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5 text-[#C49A6C]" />
              <span>Aplikasi Monitoring Khusus Tahfidz</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-serif leading-tight">
              Pemantauan Mutaba'ah Tahfidz &amp; Akses Rapor Terpadu
            </h3>

            <p className="text-xs sm:text-sm text-[#EADECE] leading-relaxed">
              Aplikasi ini difokuskan secara khusus untuk pemantauan mutaba'ah hafalan Al-Qur'an santriwati secara real-time. Setiap setoran ziyadah harian, kelancaran surah, dan kenaikan juz diverifikasi langsung oleh lajnah iktibar bersanad. Rapor asrama turut dapat diakses melalui aplikasi ini karena lembar penilaian tahfidz diterbitkan bergabung bersama buku rapor asrama santriwati.
            </p>

            <div className="space-y-3 pt-2">
              {TAHFIDZ_PROGRAM_DETAILS.fiturAplikasiTracker.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-[#EADECE] bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-6 h-6 rounded-md bg-[#C49A6C] text-[#231710] font-black flex items-center justify-center shrink-0 text-[11px]">
                    0{idx + 1}
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-xs">{feat.title}</strong>
                    <span className="text-[#C5B4A5] text-[11px]">{feat.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Simulated Phone App Screen */}
          <div className="lg:col-span-6">
            <div className="bg-[#1A120B] text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-[#3B2518] max-w-sm sm:max-w-md mx-auto">
              
              {/* App Screen Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#3B2518] text-xs text-[#C5B4A5]">
                <div className="flex items-center gap-2">
                  <MbiLogo className="w-4 h-4 rounded-full" />
                  <span className="font-bold text-[#EADECE]">MBI Apps • Monitoring Tahfidz</span>
                </div>
                <span className="bg-[#0E8F44]/20 text-[#54d887] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#0E8F44]/40">
                  ● Khusus Tahfidz
                </span>
              </div>

              {/* Santriwati Profile */}
              <div className="py-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#C49A6C] to-[#8C6249] flex items-center justify-center text-[#231710] font-black text-sm shadow-md">
                  SW
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">Aisyah Zahira (Santriwati)</h4>
                  <p className="text-[11px] text-[#C5B4A5]">Kelas VII SMP • Pembina: Syaikhoh Ustadzah Bersanad</p>
                </div>
              </div>

              {/* Progress Card Inside App */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#C5B4A5]">Capaian Terukur (SMP):</span>
                  <span className="font-black text-[#C49A6C] text-sm">4 Juz 12 Halaman</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-[#C49A6C] to-[#0E8F44] rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-[#C5B4A5]">
                  <span>Target: 15 Juz</span>
                  <span className="text-[#54d887] font-semibold">Progres Berjenjang: 32%</span>
                </div>
              </div>

              {/* App Interactive Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-black/40 p-1 rounded-xl mb-3 text-[11px]">
                <button
                  onClick={() => setActiveTrackerTab('log')}
                  className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer text-center ${
                    activeTrackerTab === 'log' ? 'bg-[#C49A6C] text-[#231710]' : 'text-[#C5B4A5] hover:text-white'
                  }`}
                >
                  Setoran
                </button>
                <button
                  onClick={() => setActiveTrackerTab('rapor')}
                  className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                    activeTrackerTab === 'rapor' ? 'bg-[#C49A6C] text-[#231710]' : 'text-[#C5B4A5] hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>Rapor</span>
                </button>
                <button
                  onClick={() => setActiveTrackerTab('progress')}
                  className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer text-center ${
                    activeTrackerTab === 'progress' ? 'bg-[#C49A6C] text-[#231710]' : 'text-[#C5B4A5] hover:text-white'
                  }`}
                >
                  Uji Lajnah
                </button>
                <button
                  onClick={() => setActiveTrackerTab('murajaah')}
                  className={`py-1.5 rounded-lg font-semibold transition-all cursor-pointer text-center ${
                    activeTrackerTab === 'murajaah' ? 'bg-[#C49A6C] text-[#231710]' : 'text-[#C5B4A5] hover:text-white'
                  }`}
                >
                  Muraja'ah
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="bg-white/5 rounded-xl p-3 text-xs space-y-2 border border-white/5 min-h-[140px]">
                {activeTrackerTab === 'log' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#EADECE]">Sesi Ziyadah Pagi</span>
                      <span className="bg-[#0E8F44]/20 text-[#54d887] text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Mumtaz (A)
                      </span>
                    </div>
                    <p className="text-[#C5B4A5] text-[11px]">
                      Surah An-Nisa ayat 1–10 (Halaman 77). Kelancaran dan mad ashli teruji fashih.
                    </p>
                    <div className="p-2 bg-black/30 rounded-lg text-[10px] text-[#EADECE] border border-white/5">
                      <span className="font-bold text-[#C49A6C] block">Catatan Pengajar Halaqah:</span>
                      "Makharijul huruf 'Ain dan Ha sangat bersih, pengulangan metode tikrar sangat disiplin."
                    </div>
                  </div>
                )}

                {activeTrackerTab === 'rapor' && (
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <span className="font-bold text-amber-300">Rapor Tahfidz (Bergabung Rapor Asrama):</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Semester Ganjil</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="p-2 rounded bg-black/30 border border-white/10">
                        <span className="font-bold text-[#C49A6C] block text-[10px]">Capaian Tahfidz:</span>
                        <div className="text-[11px] text-white font-semibold">Mumtaz (96)</div>
                        <span className="text-[9px] text-[#C5B4A5]">Tajwid &amp; Fashahah A</span>
                      </div>
                      <div className="p-2 rounded bg-black/30 border border-white/10">
                        <span className="font-bold text-[#C49A6C] block text-[10px]">Nilai Asrama:</span>
                        <div className="text-[11px] text-white font-semibold">Sangat Baik (A)</div>
                        <span className="text-[9px] text-[#C5B4A5]">Adab &amp; Shalat Jam'ah</span>
                      </div>
                    </div>
                    <div className="p-1.5 rounded bg-white/5 text-[10px] text-[#EADECE] flex items-center justify-between">
                      <span className="text-[#C5B4A5] italic">*Rapor tahfidz terbit bergabung dalam buku rapor asrama</span>
                      <span className="text-emerald-400 font-bold shrink-0 ml-1">Terpadu</span>
                    </div>
                  </div>
                )}

                {activeTrackerTab === 'progress' && (
                  <div className="space-y-2">
                    <span className="font-bold text-[#EADECE] block text-xs">Ujian Kenaikan Juz oleh Lajnah Iktibar:</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 bg-[#0E8F44]/15 border border-[#0E8F44]/30 rounded-lg text-[#54d887]">
                        ✓ Juz 30 (Lulus - 98)
                      </div>
                      <div className="p-2 bg-[#0E8F44]/15 border border-[#0E8F44]/30 rounded-lg text-[#54d887]">
                        ✓ Juz 29 (Lulus - 96)
                      </div>
                      <div className="p-2 bg-[#0E8F44]/15 border border-[#0E8F44]/30 rounded-lg text-[#54d887]">
                        ✓ Juz 1 (Lulus - 94)
                      </div>
                      <div className="p-2 bg-[#C49A6C]/20 border border-[#C49A6C]/40 rounded-lg text-[#EADECE]">
                        ⏳ Juz 2 (Siap Tasmi')
                      </div>
                    </div>
                  </div>
                )}

                {activeTrackerTab === 'murajaah' && (
                  <div className="space-y-1.5 text-[11px]">
                    <span className="font-bold text-[#EADECE] block text-xs">Jadwal Muraja'ah Pekan Ini:</span>
                    <div className="space-y-1 text-[#C5B4A5]">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span>Senin: Muraja'ah Juz 1 (1/2 Juz)</span>
                        <span className="text-[#54d887] font-bold">Lancar</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span>Selasa: Muraja'ah Juz 29</span>
                        <span className="text-[#54d887] font-bold">Lancar</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Rabu: Tasmi' Juz 30 Sekali Duduk</span>
                        <span className="text-[#C49A6C] font-bold">Hari Ini</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Info inside Phone */}
              <div className="mt-3 flex items-center justify-between text-[10px] text-[#C5B4A5]">
                <span>Sinkronisasi otomatis</span>
                <a 
                  href="https://s.id/MBIApps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 font-semibold hover:underline flex items-center gap-1 font-mono"
                  title="Buka Aplikasi Mobile"
                >
                  <span>s.id/MBIApps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. VISI KUTIPAN RESMI (HALAMAN 2 DOKUMEN) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#FAF6F0] via-[#F5EFE6] to-[#EADECE] rounded-3xl p-8 sm:p-12 border-2 border-[#C49A6C] shadow-md relative overflow-hidden text-center">
        
        {/* Left Golden Border Accent */}
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="w-12 h-1 bg-[#C49A6C] mx-auto rounded-full"></div>

          {/* Exact Quote from Page 2 */}
          <blockquote className="text-lg sm:text-xl md:text-2xl font-black text-[#2E1F16] font-serif italic leading-relaxed">
            "{TAHFIDZ_PROGRAM_DETAILS.visiTahfidz}"
          </blockquote>

          {/* Reference Label from Page 2 */}
          <div className="pt-2 text-xs sm:text-sm font-bold text-[#7A553B] tracking-wider uppercase">
            {TAHFIDZ_PROGRAM_DETAILS.dokumenRef}
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* BOTTOM NAVIGATION: KEMBALI KE BERANDA & DAFTAR SEKARANG */}
      {/* ========================================================================= */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#EADECE] shadow-sm">
        {onBackToBeranda && (
          <button
            onClick={onBackToBeranda}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6F0] hover:bg-[#EADECE] text-[#2E1F16] border border-[#C49A6C]/60 font-bold text-xs sm:text-sm transition-all transform active:scale-95 cursor-pointer shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#C49A6C] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda Utama</span>
          </button>
        )}

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrintDocument}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Halaman</span>
          </button>
          <button
            onClick={onOpenRegister}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#8C6249] hover:from-[#D4A373] hover:to-[#9D7157] text-[#231710] font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span>Daftar Santriwati Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
