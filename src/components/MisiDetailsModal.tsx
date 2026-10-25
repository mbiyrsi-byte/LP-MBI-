import { MisiPoint } from '../data/psbData';
import { X, CheckCircle2, ArrowRight, BookOpen, ShieldCheck, GraduationCap, HeartHandshake } from 'lucide-react';

interface MisiDetailsModalProps {
  misi: MisiPoint | null;
  onClose: () => void;
  onNavigateToTahfidz: () => void;
}

export default function MisiDetailsModal({ misi, onClose, onNavigateToTahfidz }: MisiDetailsModalProps) {
  if (!misi) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-burgundy-700" />;
      case 'BookOpen': return <BookOpen className="w-8 h-8 text-amber-600" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-coffee-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-emerald-700" />;
      default: return <BookOpen className="w-8 h-8 text-burgundy-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="modal-misi-detail"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-coffee-200 relative"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy-900 to-coffee-900 text-white p-6 rounded-t-2xl relative">
          <button
            id="close-misi-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400 text-burgundy-950 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              Misi Poin Ke-{misi.number}
            </span>
            {misi.isSpecialTahfidz && (
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                Pilar Utama MBI
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-amber-100 leading-snug">
            {misi.title}
          </h3>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-burgundy-50/60 border border-burgundy-100">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-coffee-200 shrink-0">
              {getIcon(misi.icon)}
            </div>
            <div>
              <h4 className="font-bold text-burgundy-900 text-base">Fokus Pendidikan & Pembinaan</h4>
              <p className="text-sm text-coffee-800 leading-relaxed mt-1">
                {misi.fullDesc}
              </p>
            </div>
          </div>

          {/* Key Implementations / Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-600 mb-3">
              Rincian Program & Kurikulum Terapan:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {misi.highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-coffee-50/80 border border-coffee-200/70 text-sm text-coffee-900"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA if Tahfidz */}
          {misi.isSpecialTahfidz ? (
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="font-bold text-coffee-900 text-sm">Ingin Melihat Rincian Program Tahfidz?</h5>
                <p className="text-xs text-coffee-700">Pelajari 3 tahapan sistematis, aplikasi tracker orang tua, dan sanad syaikhoh.</p>
              </div>
              <button
                id="btn-modal-ke-halaman-tahfidz"
                onClick={() => {
                  onClose();
                  onNavigateToTahfidz();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-bold rounded-lg shadow-sm shrink-0 transition-colors"
              >
                <span>Halaman Tahfidz Khusus</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          ) : (
            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-coffee-800 hover:bg-coffee-900 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Tutup Rincian
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
