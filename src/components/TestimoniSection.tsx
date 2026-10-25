import ParentTestimonialsWidget from './ParentTestimonialsWidget';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface TestimoniSectionProps {
  onOpenRegister: () => void;
  onBackToBeranda?: () => void;
}

export default function TestimoniSection({ onOpenRegister, onBackToBeranda }: TestimoniSectionProps) {
  return (
    <div className="space-y-12 py-8">
      {/* Top Quick Back Button */}
      {onBackToBeranda && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Ma'had Baitussunnah Indonesia • Testimoni &amp; Kesan
            </span>
          </div>
        </div>
      )}

      {/* Component with user testimonials and form */}
      <ParentTestimonialsWidget />

      {/* CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-burgundy-900 to-coffee-950 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black text-amber-200">
            Bergabung Bersama Keluarga Besar Ma'had Baitusunnah Indonesia
          </h3>
          <p className="text-xs sm:text-sm text-coffee-200 max-w-xl mx-auto">
            Wujudkan impian ananda menjadi penghafal Al-Qur'an yang tangguh, beraqidah lurus, dan berakhlak mulia.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onBackToBeranda && (
              <button
                onClick={onBackToBeranda}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm transition-all border border-white/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-amber-300" />
                <span>Kembali ke Beranda</span>
              </button>
            )}
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-burgundy-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-burgundy-950" />
              <span>Daftar Santriwati Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
