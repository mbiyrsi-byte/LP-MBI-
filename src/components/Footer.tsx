import { ActiveTab } from '../types';
import MbiLogo from './MbiLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { 
  Phone, 
  MapPin, 
  Mail, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  Heart,
  Building2,
  ExternalLink,
  Smartphone
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenRegister: () => void;
  onOpenChat: () => void;
  onOpenLogoModal?: () => void;
}

export default function Footer({ setActiveTab, onOpenRegister, onOpenChat, onOpenLogoModal }: FooterProps) {
  return (
    <footer className="mt-12">
      {/* Main Footer Container */}
      <div className="bg-[#2E1F16] text-[#FAF6F0] border-t-4 border-[#C49A6C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
            
            {/* Col 1: Identity & Motto */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <MbiLogo className="w-12 h-12 rounded-full ring-2 ring-[#C49A6C] shadow-md bg-white p-0.5" />
                <div>
                  <h4 className="font-bold text-[#FAF6F0] text-base tracking-tight font-serif uppercase">
                    MA'HAD BAITUSSUNNAH INDONESIA
                  </h4>
                  <p className="text-xs text-[#C49A6C] font-medium">Asrama Khusus Akhwat • SMP & SMA</p>
                </div>
              </div>

              <p className="text-xs text-[#EADECE] leading-relaxed italic">
                "Berilmu Shahih untuk Beramal Shalih" — Membina santriwati beraqidah lurus di atas manhaj Salafus Shalih, berakhlak mulia, dan berhafalan Al-Qur'an kuat serta lancar.
              </p>

              <div className="pt-1 flex items-center gap-2 flex-wrap">
                <span className="inline-block px-3 py-1 bg-white/10 border border-[#C49A6C]/40 text-[#C49A6C] text-xs font-semibold rounded-lg">
                  Yayasan Rumah Sunnah Indonesia
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4A373]">Menu Portal</h5>
              <ul className="space-y-2 text-xs text-[#EDE0D3]">
                <li>
                  <button 
                    onClick={() => { setActiveTab('beranda'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#D4A373] transition-colors"
                  >
                    Beranda & Visi Misi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('tahfidz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-white text-[#D4A373] font-semibold transition-colors"
                  >
                    Program Tahfidz Khusus ★
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('biaya-syarat'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#D4A373] transition-colors"
                  >
                    Rincian Biaya & Berkas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenRegister}
                    className="hover:text-[#D4A373] transition-colors"
                  >
                    Formulir Pendaftaran
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('pembayaran'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#D4A373] transition-colors"
                  >
                    Sistem Pembayaran
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('testimoni'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-[#D4A373] transition-colors"
                  >
                    Testimoni Santriwati
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Program Tahfidz Summary */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4A373]">Program Unggulan</h5>
              <div className="space-y-2 text-xs text-[#EDE0D3]">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-[#FDFBF7] block">Tahfidz SMP (Target 15 Juz)</strong>
                  <span className="text-[11px] text-[#EDE0D3]/80">Kuota 30 Santriwati • Matan Tuhfatul Athfal</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-[#FDFBF7] block">Tahfidz SMA (Target 30 Juz)</strong>
                  <span className="text-[11px] text-[#EDE0D3]/80">Kuota 10 Santriwati • Sanad Matan Al-Jazariyyah</span>
                </div>
                <div className="pt-1">
                  <a
                    href="https://s.id/MBIApps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-[#C49A6C]/50 flex items-center justify-between gap-2 text-xs transition-colors group"
                    title="Aplikasi monitoring khusus tahfidz &amp; akses rapor terpadu (bergabung dengan rapor asrama)"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#C49A6C] shrink-0" />
                      <div>
                        <span className="font-bold text-[#FDFBF7] block text-[11px]">Aplikasi Monitoring Tahfidz</span>
                        <span className="text-[10px] text-amber-300 font-mono">s.id/MBIApps</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4A373] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
                <p className="text-[11px] text-[#EDE0D3]/60">
                  Monitoring khusus hafalan tahfidz real-time serta akses rapor tahfidz yang bergabung dengan rapor asrama.
                </p>
              </div>
            </div>

            {/* Col 4: Alamat & Kontak Resmi */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#D4A373]">Kontak & Lokasi</h5>
              <div className="space-y-2.5 text-xs text-[#EDE0D3]">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jl. Puri Hidayah No. 50 Jatiluhur Jatiasih Kota Bekasi Ma'had Baitusunnah")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 group hover:text-amber-300 transition-colors"
                  title="Buka lokasi di Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5 group-hover:text-amber-300" />
                  <span className="group-hover:underline">
                    Jl. Puri Hidayah No. 50, RT.04/RW.04, Jatiluhur, Kec. Jatiasih, Kota Bekasi, Jawa Barat (Klik untuk Peta)
                  </span>
                </a>
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a 
                    href="https://wa.me/6282247044181" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:underline font-bold text-[#FDFBF7]"
                  >
                    0822-4704-4181 (WhatsApp PSB)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>BSI: 2015202190 a.n. Yayasan Rumah Sunnah Indonesia</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenChat}
                  className="w-full py-2 px-3 bg-[#5C432A] hover:bg-[#704D38] text-[#FAF6F0] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#C49A6C]/40"
                >
                  <span>Tanya Ustadzah Aisyah (AI PSB)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE0D3]/70">
            <p>© 2026–2028 Ma'had Baitusunnah Indonesia. Seluruh Hak Cipta Dilindungi.</p>
            <div className="flex items-center gap-4 text-[#EDE0D3]/80">
              <span>Asrama Khusus Akhwat</span>
              <span>•</span>
              <span>Manhaj Salafus Shalih</span>
              <span>•</span>
              <span>Kota Bekasi</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
