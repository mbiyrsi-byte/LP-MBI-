import { useState, useRef, type ChangeEvent, type MouseEvent } from 'react';
import { FASILITAS_LIST } from '../data/psbData';
import { 
  Building2, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  ZoomIn, 
  X,
  Plus
} from 'lucide-react';

const STORAGE_KEY = 'mbi_fasilitas_custom_images_v1';

// Default aesthetic placeholder images with high quality architectural / Islamic educational vibes
const DEFAULT_IMAGES: Record<string, string> = {
  "Gedung Kelas Ber-AC": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
  "Gedung Asrama Nyaman": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
  "Musholla Ma'had": "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80",
  "Kolam Renang Khusus Akhwat": "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
  "Lapangan Basket & Badminton Indoor": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
  "Perpustakaan & Ruang Baca": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
  "Gazebo & Taman Diskusi": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80",
  "Area Mencuci & Laundry": "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80",
  "Keamanan 24 Jam & CCTV": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
  "Kantin & Ruang Makan": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
  "UKS Santriwati": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  "Lab Komputer": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
};

interface FasilitasGalleryProps {
  onOpenRegister: () => void;
}

export default function FasilitasGallerySection({ onOpenRegister }: FasilitasGalleryProps) {
  const [images, setImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_IMAGES;
  });

  const [activeUploadFacility, setActiveUploadFacility] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ name: string; url: string; desc: string } | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = (facilityName: string) => {
    setActiveUploadFacility(facilityName);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadFacility) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    // Limit to ~4MB
    if (file.size > 4 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar. Maksimal 4 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updated = {
          ...images,
          [activeUploadFacility]: base64
        };
        setImages(updated);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // localStorage quota exceeded fallback
        }
        setSuccessToast(`Foto untuk "${activeUploadFacility}" berhasil diperbarui!`);
        setTimeout(() => setSuccessToast(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetImage = (facilityName: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = { ...images };
    if (DEFAULT_IMAGES[facilityName]) {
      updated[facilityName] = DEFAULT_IMAGES[facilityName];
    } else {
      delete updated[facilityName];
    }
    setImages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // fallback
    }
    setSuccessToast(`Foto "${facilityName}" dikembalikan ke standar.`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100 text-burgundy-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-burgundy-700" />
            Sarana & Prasarana
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-burgundy-950 tracking-tight">
            Fasilitas Nyaman Asrama Akhwat
          </h2>
          <p className="text-xs sm:text-sm text-coffee-700 mt-1 max-w-xl">
            Fasilitas lengkap dan terawat demi mendukung kenyamanan tinggal, kekhusyukan menghafal, dan kesehatan santriwati. Anda dapat mengunggah foto asli untuk masing-masing fasilitas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-coffee-600 bg-coffee-100/70 px-3 py-1.5 rounded-xl border border-coffee-200 shrink-0">
          <Upload className="w-3.5 h-3.5 text-burgundy-800" />
          <span>Klik tombol kamera di foto untuk upload foto</span>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Facilities Grid with Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FASILITAS_LIST.map((fasilitas, idx) => {
          const currentImg = images[fasilitas.name] || DEFAULT_IMAGES[fasilitas.name] || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80';
          const isCustom = images[fasilitas.name] && images[fasilitas.name] !== DEFAULT_IMAGES[fasilitas.name];

          return (
            <div 
              key={idx} 
              className="group rounded-2xl bg-white border border-coffee-200/90 shadow-xs hover:shadow-md hover:border-burgundy-200 transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Area with overlay controls */}
              <div className="relative h-40 w-full overflow-hidden bg-coffee-100">
                <img
                  src={currentImg}
                  alt={fasilitas.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top badges & action buttons */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white tracking-wider">
                    #{idx + 1}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Zoom preview button */}
                    <button
                      type="button"
                      onClick={() => setPreviewImage({ name: fasilitas.name, url: currentImg, desc: fasilitas.desc })}
                      title="Lihat Foto Lebih Besar"
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-burgundy-900 text-white backdrop-blur-xs transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>

                    {/* Reset image button (only if custom uploaded) */}
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleResetImage(fasilitas.name, e)}
                        title="Reset ke Foto Default"
                        className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-700 text-white backdrop-blur-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Upload photo button */}
                    <button
                      type="button"
                      onClick={() => handleUploadClick(fasilitas.name)}
                      title="Upload Foto Fasilitas Ini"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-burgundy-950 text-[11px] font-bold shadow-sm backdrop-blur-xs transition-transform transform active:scale-95"
                    >
                      <Upload className="w-3 h-3 text-burgundy-950" />
                      <span>{isCustom ? 'Ganti' : 'Upload'}</span>
                    </button>
                  </div>
                </div>

                {/* Custom indicator badge */}
                {isCustom && (
                  <div className="absolute bottom-2 left-2.5 z-10">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      Foto Terupload
                    </span>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-burgundy-950 text-sm leading-snug group-hover:text-burgundy-800 transition-colors">
                    {fasilitas.name}
                  </h4>
                  <p className="text-xs text-coffee-700 leading-relaxed mt-1">
                    {fasilitas.desc}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-coffee-100 flex items-center justify-between text-[11px] text-coffee-500">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Fasilitas Terawat
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUploadClick(fasilitas.name)}
                    className="text-burgundy-800 hover:underline font-semibold"
                  >
                    Ganti Foto
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-burgundy-50 border border-burgundy-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-burgundy-950 text-xs sm:text-sm block">Siap Mendaftarkan Putri Tercinta?</span>
          <span className="text-xs text-coffee-700">Dapatkan diskon pendaftaran 6,25% untuk pendaftaran September–Desember 2026.</span>
        </div>
        <button
          onClick={onOpenRegister}
          className="px-5 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs shrink-0 transition-colors"
        >
          Isi Formulir PSB Online
        </button>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            <div className="p-5 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-burgundy-950">{previewImage.name}</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = previewImage.name;
                    setPreviewImage(null);
                    handleUploadClick(name);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Ganti Foto Ini</span>
                </button>
              </div>
              <p className="text-xs text-coffee-700">{previewImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
