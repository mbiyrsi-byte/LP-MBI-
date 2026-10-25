import { ArrowLeft, Home, ChevronRight, Sparkles, UserPlus } from 'lucide-react';
import { ActiveTab } from '../types';

interface SubpageHeaderProps {
  activeTab: ActiveTab;
  onBackToHome: () => void;
  onOpenRegister?: () => void;
}

const TAB_CONFIG: Record<ActiveTab, { title: string; subtitle: string; category: string }> = {
  beranda: {
    title: 'Beranda Utama',
    subtitle: 'Portal Resmi PSB Ma\'had Baitussunnah Indonesia',
    category: 'Home'
  },
  tahfidz: {
    title: 'Program Unggulan Tahfidz Al-Qur\'an',
    subtitle: 'Target 15 Juz (SMP) & 30 Juz (SMA) Bersanad dengan Mutaba\'ah Terpadu',
    category: 'Akademik & Al-Qur\'an'
  },
  'biaya-syarat': {
    title: 'Biaya Pendidikan & Persyaratan Berkas',
    subtitle: 'Transparansi Pembiayaan 3 Tahun & Daftar Dokumen Wajib Santriwati',
    category: 'Informasi Pendaftaran'
  },
  formulir: {
    title: 'Formulir Pendaftaran Santriwati Baru',
    subtitle: 'Pengisian Data Calon Santriwati & Wali TA 2027/2028',
    category: 'Registrasi Online'
  },
  pembayaran: {
    title: 'Instruksi & Konfirmasi Pembayaran',
    subtitle: 'Transfer Biaya Registrasi Resmi via Bank Syariah Indonesia (BSI)',
    category: 'Administrasi Keuangan'
  },
  testimoni: {
    title: 'Testimoni Wali Santri & Alumni',
    subtitle: 'Pengalaman & Kesan Nyata Pendidikan Asrama Putri MBI',
    category: 'Ulasan & Jejak Prestasi'
  }
};

export default function SubpageHeader({ activeTab, onBackToHome, onOpenRegister }: SubpageHeaderProps) {
  if (activeTab === 'beranda') return null;

  const current = TAB_CONFIG[activeTab] || {
    title: 'Halaman Informasi',
    subtitle: 'Ma\'had Baitussunnah Indonesia',
    category: 'PSB MBI'
  };

  return (
    <nav 
      aria-label="Navigasi Halaman"
      className="bg-white/95 backdrop-blur-md border-b border-[#EADECE] shadow-xs sticky top-0 z-30 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back Button & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <button
              onClick={onBackToHome}
              id="btn-back-to-home"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#2E1F16] text-[#FAF6F0] hover:bg-[#3B2518] hover:text-white font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 group cursor-pointer border border-[#C49A6C]/40"
              title="Kembali ke Halaman Beranda"
            >
              <ArrowLeft className="w-4 h-4 text-[#C49A6C] group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda</span>
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#7A553B]">
              <button 
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 text-[#5C432A] hover:text-[#2E1F16] font-medium hover:underline cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>Beranda</span>
              </button>
              
              <ChevronRight className="w-3.5 h-3.5 text-[#C49A6C]" />

              <span className="text-[#2E1F16] font-bold truncate max-w-[220px] md:max-w-xs">
                {current.title}
              </span>
            </div>
          </div>

          {/* Right: Category Badge & Quick Action */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#C49A6C]/40 text-[#5C432A] text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-[#C49A6C]" />
              <span>{current.category}</span>
            </span>

            {activeTab !== 'formulir' && onOpenRegister && (
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#8C6249] hover:from-[#D4A373] hover:to-[#9D7157] text-[#231710] font-bold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Daftar Sekarang</span>
                <span className="xs:hidden">Daftar</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
