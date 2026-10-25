import { useState } from 'react';
import { BIAYA_DATA, BERKAS_PERSYARATAN, TIMELINE_PSB } from '../data/psbData';
import { 
  CreditCard, 
  FileText, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Calculator,
  Download,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface BiayaSyaratSectionProps {
  onOpenRegister: () => void;
  onBackToBeranda?: () => void;
}

export default function BiayaSyaratSection({ onOpenRegister, onBackToBeranda }: BiayaSyaratSectionProps) {
  const [selectedJenjang, setSelectedJenjang] = useState<'SMP' | 'SMA'>('SMP');
  const [isAlumniMbi, setIsAlumniMbi] = useState(false);

  const curData = BIAYA_DATA.jenjang.find(j => j.nama.startsWith(selectedJenjang))!;
  
  // Format rupiah helper
  const formatRp = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const alumniDiscount = (selectedJenjang === 'SMA' && isAlumniMbi) ? 2000000 : 0;
  const totalTahun1 = curData.tahun1 - alumniDiscount;
  const total3Tahun = totalTahun1 + curData.tahun2 + curData.tahun3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 py-8">
      
      {/* Top Quick Back Button */}
      {onBackToBeranda && (
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#EADECE] shadow-xs">
          <button
            onClick={onBackToBeranda}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E1F16] text-[#FAF6F0] hover:bg-[#3B2518] hover:text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 group cursor-pointer border border-[#C49A6C]/40"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 text-[#C49A6C] group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </button>
          
          <span className="text-xs text-[#7A553B] font-medium hidden sm:inline">
            Ma'had Baitussunnah Indonesia • Biaya &amp; Syarat
          </span>
        </div>
      )}
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100 text-burgundy-800 text-xs font-bold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5 text-burgundy-700" />
          Transparan & Terjangkau
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-burgundy-950 tracking-tight">
          Informasi Biaya & Persyaratan Berkas
        </h1>
        <p className="text-xs sm:text-sm text-coffee-700">
          Rincian biaya pendidikan Ma'had Baitusunnah Indonesia disusun secara transparan tanpa pungutan tersembunyi.
        </p>
      </div>

      {/* 2. PROMO BANNER: BIAYA PENDAFTARAN */}
      <div className="bg-gradient-to-r from-[#FAF6F0] via-white to-[#F5EFE6] text-[#2E1F16] rounded-2xl p-6 sm:p-8 shadow-md border-2 border-[#C49A6C]/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#C49A6C] text-[#231710] text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              PROMO SPESIAL
            </span>
            <span className="text-xs text-[#7A553B] font-semibold">September – Desember 2026</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#2E1F16] font-serif">
            Biaya Formulir Pendaftaran: <span className="line-through text-[#9C8C72] font-normal text-lg">Rp 400.000</span>{' '}
            <span className="text-[#8C6249]">Rp 375.000,-</span>
          </h3>
          <p className="text-xs text-[#5D402C] max-w-xl leading-relaxed">
            Dapatkan diskon 6,25% untuk pendaftaran awal! Ditransfer ke rekening resmi BSI <strong>2015202190</strong> a.n. <strong>Yayasan Rumah Sunnah Indonesia</strong>.
          </p>
        </div>

        <button
          onClick={onOpenRegister}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] font-black rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
        >
          <span>Daftar Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. SIMULATOR BIAYA PENDIDIKAN TAHUNAN & SPP */}
      <div className="bg-white rounded-2xl border border-coffee-200 shadow-sm p-6 sm:p-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-coffee-100">
          <div>
            <span className="text-xs font-bold text-coffee-500 uppercase tracking-wider">Kalkulator Rincian</span>
            <h3 className="text-xl sm:text-2xl font-black text-burgundy-950">
              Biaya Pendidikan Jenjang {selectedJenjang}
            </h3>
          </div>

          {/* Tab Selector SMP vs SMA */}
          <div className="inline-flex p-1 bg-coffee-100 rounded-xl border border-coffee-200">
            <button
              onClick={() => { setSelectedJenjang('SMP'); setIsAlumniMbi(false); }}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedJenjang === 'SMP' ? 'bg-burgundy-800 text-white shadow-xs' : 'text-coffee-700 hover:text-burgundy-900'
              }`}
            >
              Jenjang SMP (15 Juz)
            </button>
            <button
              onClick={() => setSelectedJenjang('SMA')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                selectedJenjang === 'SMA' ? 'bg-burgundy-800 text-white shadow-xs' : 'text-coffee-700 hover:text-burgundy-900'
              }`}
            >
              Jenjang SMA (30 Juz)
            </button>
          </div>
        </div>

        {/* Special Alumni Checkbox for SMA */}
        {selectedJenjang === 'SMA' && (
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-coffee-900 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isAlumniMbi}
                onChange={(e) => setIsAlumniMbi(e.target.checked)}
                className="w-4 h-4 text-burgundy-700 rounded focus:ring-burgundy-500"
              />
              <span>Calon Santriwati adalah Alumni Lulusan SMP MBI (Potongan Biaya Khusus)</span>
            </label>
            {isAlumniMbi && (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                Potongan Rp 2.000.000 Aktif
              </span>
            )}
          </div>
        )}

        {/* 3 Years Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          
          {/* Tahun Ke-1 */}
          <div className="p-5 rounded-2xl bg-burgundy-50/70 border-2 border-burgundy-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-burgundy-900">Tahun Ke-1</span>
              <span className="bg-burgundy-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Awal Masuk</span>
            </div>
            <div className="text-2xl font-black text-burgundy-950">
              {formatRp(totalTahun1)}
            </div>
            <p className="text-[11px] text-coffee-700 leading-snug">
              Termasuk uang pangkal, perlengkapan kamar asrama ber-AC, seragam lengkap akhwat, buku modul materi, dan sarana awal.
            </p>
          </div>

          {/* Tahun Ke-2 */}
          <div className="p-5 rounded-2xl bg-white border border-coffee-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-coffee-600">Tahun Ke-2</span>
              <span className="bg-coffee-100 text-coffee-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Daftar Ulang</span>
            </div>
            <div className="text-2xl font-black text-coffee-950">
              {formatRp(curData.tahun2)}
            </div>
            <p className="text-[11px] text-coffee-700 leading-snug">
              Pemeliharaan sarana & prasarana, kelanjutan modul KBM dan operasional tahun ke-2.
            </p>
          </div>

          {/* Tahun Ke-3 */}
          <div className="p-5 rounded-2xl bg-white border border-coffee-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-coffee-600">Tahun Ke-3</span>
              <span className="bg-coffee-100 text-coffee-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Tahun Akhir</span>
            </div>
            <div className="text-2xl font-black text-coffee-950">
              {formatRp(curData.tahun3)}
            </div>
            <p className="text-[11px] text-coffee-700 leading-snug">
              Bimbingan akhir, ujian tasmi' akhir (15 atau 30 Juz), pengurusan ijazah, dan wisuda hafidzah.
            </p>
          </div>

        </div>

        {/* SPP & Psikotes Summary Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-coffee-100">
          
          {/* SPP Bulanan */}
          <div className="bg-coffee-50 p-5 rounded-xl border border-coffee-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-coffee-950 text-sm">SPP / Bulan</h4>
              <span className="text-lg font-black text-burgundy-900">{formatRp(BIAYA_DATA.sppBulanan)}</span>
            </div>
            <p className="text-xs text-coffee-700 mb-3">Sudah mencakup semua kebutuhan harian santriwati:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-coffee-800">
              {BIAYA_DATA.sppInclude.map((inc, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-snug">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seleksi Tahap II Psikotes */}
          <div className="bg-coffee-50 p-5 rounded-xl border border-coffee-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-coffee-950 text-sm">Biaya Psikotes Online (Tahap II)</h4>
                <span className="text-lg font-black text-burgundy-900">{formatRp(curData.psikotes)}</span>
              </div>
              <p className="text-xs text-coffee-700 leading-relaxed">
                Biaya psikotes online dilakukan oleh lembaga psikologi profesional rekanan MBI.
              </p>
              <div className="mt-3 p-2.5 bg-amber-100/60 rounded-lg text-[11px] text-amber-900 flex items-start gap-2 border border-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>*Biaya psikotes Tahap II hanya wajib dibayarkan jika santriwati dinyatakan <strong>Lolos Seleksi Tahap I</strong>.</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-coffee-200 flex items-center justify-between text-xs">
              <span className="text-coffee-600">Estimasi Total 3 Tahun:</span>
              <strong className="text-burgundy-950 text-sm font-black">{formatRp(total3Tahun)}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* 4. BERKAS PENDAFTARAN (10 POIN DARI BROSUR) */}
      <div className="space-y-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coffee-200 text-coffee-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-coffee-700" />
            Checklist Dokumen
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-burgundy-950">
            10 Berkas Persyaratan Pendaftaran
          </h2>
          <p className="text-xs sm:text-sm text-coffee-700">
            Pastikan seluruh dokumen berikut disiapkan dalam bentuk fisik maupun digital saat proses seleksi dan verifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BERKAS_PERSYARATAN.map((berkas, idx) => (
            <div 
              key={berkas.id}
              className="p-4 rounded-xl bg-white border border-coffee-200 shadow-xs hover:border-burgundy-300 transition-colors flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-burgundy-100 text-burgundy-900 font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-burgundy-950 text-xs sm:text-sm leading-snug">
                  {berkas.title}
                </h4>
                <p className="text-[11px] text-coffee-700 mt-1 leading-relaxed">
                  {berkas.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Khusus Berkas Kesehatan Highlight */}
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs text-coffee-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-bold text-amber-950 text-sm block">Catatan Khusus Hasil Laboratorium Kesehatan:</span>
            <p className="text-coffee-800 text-xs">
              Pemeriksaan laboratorium (Darah lengkap, SGPT/SGOT, dan Rontgen Paru-paru) dikumpulkan saat santriwati dinyatakan lolos Seleksi Tahap I untuk memastikan kesehatan santriwati selama di asrama.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white font-bold rounded-xl text-xs shrink-0 shadow-xs"
          >
            Lanjut Isi Formulir
          </button>
        </div>

      </div>

      {/* 5. TIMELINE PENDAFTARAN (1 SEP - 1 MEI 2027) */}
      <div className="bg-coffee-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-coffee-800">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">
            Alur & Jadwal Seleksi
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Timeline Penerimaan Santri Baru 2027/2028
          </h3>
          <p className="text-xs text-coffee-300">
            Pendaftaran dapat dilakukan secara online atau offline langsung di Ma'had (One Day Service).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {TIMELINE_PSB.map((t, idx) => (
            <div key={idx} className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-amber-400 text-burgundy-950 font-black text-xs flex items-center justify-center">
                {idx + 1}
              </span>
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  {t.status}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{t.tahap}</h4>
                <div className="inline-block px-2.5 py-1 rounded bg-white/10 text-amber-200 text-xs font-semibold my-2">
                  {t.tanggal}
                </div>
                <p className="text-xs text-coffee-300 leading-relaxed">{t.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#EADECE] shadow-sm">
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
            onClick={onOpenRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#8C6249] hover:from-[#D4A373] hover:to-[#9D7157] text-[#231710] font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <span>Daftar Santriwati Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
