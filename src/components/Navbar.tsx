import { useState } from 'react';
import { ActiveTab } from '../types';
import MbiLogo from './MbiLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { 
  BookOpen, 
  FileText, 
  CreditCard, 
  Sparkles, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Home,
  MessageSquareQuote,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenRegister: () => void;
  onOpenChat: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: any; isSpecial?: boolean }[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'tahfidz', label: 'Program Tahfidz', icon: BookOpen, isSpecial: true },
    { id: 'biaya-syarat', label: 'Biaya & Syarat', icon: CreditCard },
    { id: 'formulir', label: 'Formulir', icon: FileText },
    { id: 'pembayaran', label: 'Status Biaya', icon: Sparkles },
    { id: 'testimoni', label: 'Testimoni', icon: MessageSquareQuote },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#382417] text-[#FAF6F0] border-b-4 border-[#C49A6C] shadow-md">
      {/* Top Announcement Bar: Ringkas, Jelas, & Tidak Tumpang Tindih */}
      <div className="bg-[#231710] text-[#FAF6F0] text-xs py-1.5 px-4 border-b border-[#5C432A]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#5C432A] text-[#C49A6C] border border-[#C49A6C]/40 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C49A6C]" />
              PSB 2027/2028
            </span>
            <span className="text-[#FAF6F0] truncate">
              Diskon 6,25% Pendaftaran (Sep–Des 2026) • Kuota 40 Santriwati
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 min-h-[4.25rem] gap-3">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative group">
              <button 
                id="nav-brand-logo"
                onClick={() => { setActiveTab('beranda'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2.5 sm:gap-3 text-left transition-transform hover:scale-[1.01] shrink-0"
              >
                {/* Official MBI Emblem Logo */}
                <MbiLogo className="w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-[#C49A6C] shadow-md bg-white p-0.5" />
                
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[#FAF6F0] text-base sm:text-lg tracking-tight uppercase font-serif leading-tight">
                      MA'HAD BAITUSSUNNAH INDONESIA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D8B597] font-medium tracking-wide">
                    Pesantren Putri SMP &amp; SMA • Bekasi
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-[#FAF6F0] bg-[#5C432A] border border-[#C49A6C]/60 shadow-xs'
                      : 'text-[#EADECE] hover:text-[#FAF6F0] hover:bg-white/10'
                  } ${item.isSpecial ? 'ring-1 ring-[#C49A6C]/70 font-bold text-[#C49A6C] bg-[#5C432A]/40' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FAF6F0]' : item.isSpecial ? 'text-[#C49A6C]' : 'text-[#D8B597]'}`} />
                  <span>{item.label}</span>
                  {item.isSpecial && (
                    <span className="text-[8px] uppercase tracking-wider bg-[#C49A6C] text-[#231710] px-1.5 py-0.2 rounded font-black">
                      Unggulan
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C49A6C] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://wa.me/6282247044181?text=Assalamu%27alaikum%20Admin%20PSB%20Ma%27had%20Baitusunnah%20Indonesia,%20saya%20ingin%20bertanya%20mengenai%20pendaftaran%20santriwati"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#FAF6F0] bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-[#C49A6C]/30 group"
              title="Konsultasi WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>0822-4704-4181</span>
            </a>

            <button
              id="cta-daftar-online-nav"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C49A6C] hover:bg-[#b08557] text-[#231710] text-xs sm:text-sm font-black rounded-lg shadow-sm border border-[#C49A6C]/50 transition-all transform active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-[#231710]" />
              <span>Daftar Santriwati</span>
            </button>
          </div>

          {/* Mobile quick back button & menu toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            {activeTab !== 'beranda' && (
              <button
                id="mobile-quick-back-to-home"
                onClick={() => {
                  setActiveTab('beranda');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF6F0] text-[#231710] font-bold text-xs shadow-xs border border-[#C49A6C] active:scale-95 transition-all cursor-pointer"
                title="Kembali ke Beranda"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#8C6249]" />
                <span>Beranda</span>
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#FAF6F0] hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#231710] border-b border-[#5C432A] px-4 pt-2 pb-6 space-y-2 shadow-lg text-[#FAF6F0]">
          {activeTab !== 'beranda' && (
            <button
              id="drawer-back-to-home"
              onClick={() => {
                setActiveTab('beranda');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-2 rounded-xl bg-[#FAF6F0] text-[#231710] font-black text-xs uppercase tracking-wider border border-[#C49A6C] shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#8C6249]" />
              <span>← Kembali ke Beranda Utama</span>
            </button>
          )}

          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#5C432A] text-[#FAF6F0] border border-[#C49A6C]/50'
                      : 'text-[#EADECE] hover:bg-white/10 hover:text-[#C49A6C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAF6F0]' : 'text-[#C49A6C]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.isSpecial && (
                    <span className="text-[9px] uppercase tracking-wider bg-[#C49A6C] text-[#231710] px-2 py-0.5 rounded font-black">
                      Unggulan
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#FAF6F0] text-[#231710] font-bold rounded-lg text-center text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 border border-white"
            >
              <ShieldCheck className="w-4 h-4 text-[#231710]" />
              <span>Isi Formulir Pendaftaran Online</span>
            </button>

            <a
              href="https://wa.me/6282247044181"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-white/10 text-[#FDFBF7] text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5 border border-[#E5E1D8]/20"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chat WhatsApp Panitia PSB (0822-4704-4181)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
