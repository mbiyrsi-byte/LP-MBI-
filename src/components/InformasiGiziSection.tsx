import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { 
  Heart, 
  Apple, 
  Sparkles, 
  Upload, 
  Check, 
  Edit3, 
  Plus, 
  Trash2, 
  ShieldCheck,
  Coffee,
  X,
  Clock,
  Droplets,
  Activity,
  Award,
  BookOpen,
  Calendar
} from 'lucide-react';

export interface GiziItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  porsi?: string;
  tags?: string[];
}

const STORAGE_KEY = 'mbi_gizi_nutrisi_data_v2';

const DEFAULT_GIZI_CARDS: GiziItem[] = [
  {
    id: 'gizi-1',
    title: "Menu Gizi Seimbang & Dirancang Bersama Ahli Gizi",
    category: "Nutrisi Remaja Putri",
    description: "Diupayakan sesuai kebutuhan gizi masa remaja putri dengan bahan segar, bergizi seimbang, dan terpilih tanpa mengesampingkan cita rasa serta selera santriwati.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    porsi: "Makan Terjadwal 3x Sehari",
    tags: ["Halal & Thayyib", "Second Window of Golden Age", "Ahli Gizi"]
  },
  {
    id: 'gizi-2',
    title: "Buah Segar Setiap Hari",
    category: "Vitamin & Serat Alami",
    description: "Buah-buahan segar disediakan setiap hari sebagai bagian integral dari pemenuhan asupan serat, vitamin, dan daya tahan tubuh santriwati penghafal Al-Qur'an.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    porsi: "Disediakan Setiap Hari",
    tags: ["Buah Segar", "Kaya Vitamin", "Pencernaan Sehat"]
  },
  {
    id: 'gizi-3',
    title: "Water Filter Siap Minum 24 Jam",
    category: "Hidrasi Sehat",
    description: "Fasilitas water filter higienis yang dapat diakses 24 jam penuh agar kebiasaan mencukupi kebutuhan air minum menjadi bagian alami dari keseharian santriwati.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    porsi: "Akses 24 Jam Bebas Isi Ulang",
    tags: ["Air Bersih", "Hidrasi Optimal", "Higienis 24 Jam"]
  },
  {
    id: 'gizi-4',
    title: "Aktivitas Fisik, Edukasi Gizi & Suplementasi",
    category: "Kesehatan Terpadu",
    description: "Fasilitas olahraga aktif, edukasi gizi rutin bersama pakar, pemberian tablet tambah darah berkala, serta edukasi kesehatan reproduksi remaja sesuai syariat.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    porsi: "Program Rutin & Edukasi Berkala",
    tags: ["Tablet Tambah Darah", "Edukasi Syar'i", "Olahraga Aktif"]
  }
];

export default function InformasiGiziSection() {
  const [items, setItems] = useState<GiziItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_GIZI_CARDS;
  });

  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [editModalItem, setEditModalItem] = useState<GiziItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const saveItems = (updated: GiziItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  const handleUploadClick = (id: string) => {
    setActiveUploadId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadId) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (!base64) return;

      const updated = items.map((it) => {
        if (it.id === activeUploadId) {
          return { ...it, image: base64 };
        }
        return it;
      });

      saveItems(updated);
      showToast('Foto gizi berhasil diunggah!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveModal = (e: FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    if (isAddingNew) {
      const newItem: GiziItem = {
        ...editModalItem,
        id: 'gizi-' + Date.now(),
      };
      const updated = [newItem, ...items];
      saveItems(updated);
      showToast('Informasi gizi baru berhasil ditambahkan!');
    } else {
      const updated = items.map(it => it.id === editModalItem.id ? editModalItem : it);
      saveItems(updated);
      showToast('Data gizi berhasil disimpan!');
    }
    setEditModalItem(null);
    setIsAddingNew(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Hapus kartu informasi gizi ini?')) {
      const updated = items.filter(it => it.id !== id);
      saveItems(updated);
      showToast('Item gizi telah dihapus.');
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#FAF6F0] via-white to-[#F5EFE6] border-y border-[#E5DACB] py-16 px-4 sm:px-6 lg:px-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. ESSAY / REFLEKSI UTAMA GIZI SESUAI AMANAH RESMI */}
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#C49A6C]/40 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle warm glow decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          
          <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
            
            {/* Header Title */}
            <div className="text-center space-y-2 pb-4 border-b border-[#E5DACB]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADECE] text-[#5D402C] text-xs font-bold uppercase tracking-wider border border-[#C49A6C]/40">
                <Heart className="w-3.5 h-3.5 text-[#A8795D] fill-current" />
                <span>Pendidikan Kesehatan &amp; Afiyah Santriwati</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2E1F16] font-serif tracking-tight pt-1">
                Menjaga Amanah Kesehatan, Menyongsong Generasi Afiyah
              </h2>
              
              <p className="text-xs sm:text-sm text-[#7A553B] font-serif italic max-w-2xl mx-auto">
                "Mensyukuri nikmat Allah bukan hanya dengan berucap Alhamdulillah, tetapi dengan ikhtiar nyata menjaga tubuh yang dititipkan-Nya."
              </p>
            </div>

            {/* Paragraph Text Layout with Elegant Editorial Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-[#442E20] leading-relaxed text-sm sm:text-[15px]">
              
              {/* Kolom Kiri: Filosofi & Nilai Syar'i */}
              <div className="lg:col-span-6 space-y-4">
                <p>
                  Mensyukuri nikmat Allah bukan hanya dengan mengucapkan <span className="font-semibold text-[#2E1F16]">Alhamdulillah</span>, tetapi juga dengan berusaha menjaga apa yang telah Allah titipkan kepada kita. Salah satunya adalah <strong>tubuh dan kesehatan</strong>.
                </p>
                <p>
                  Allah Ta'ala mengajarkan kita untuk senantiasa memperhatikan makanan yang kita konsumsi: <span className="font-bold text-[#8C6249]">bukan hanya halal, tetapi juga thayyib</span>, baik, sehat, dan memberikan manfaat nyata bagi tubuh.
                </p>
                <p>
                  Karena itu, di <strong>Ma'had Baitusunnah Indonesia</strong> kami berusaha menanamkan kepada para santriwati bahwa makan bukan sekadar memenuhi rasa lapar. Apa yang kita makan adalah bagian dari ikhtiar menjaga amanah Allah, agar tubuh yang dititipkan kepada kita dapat digunakan dengan sebaik-baiknya untuk <em>beribadah, menuntut ilmu syar'i, dan melakukan berbagai kebaikan</em>.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#C49A6C]/30 shadow-xs">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#C49A6C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#8C6249] mb-1">
                        Second Window of Golden Age
                      </h4>
                      <p className="text-xs text-[#5D402C] leading-normal">
                        Perhatian ini menjadi semakin krusial karena santriwati berada pada masa remaja putri—fase emas penting yang turut membentuk kesehatan serta kualitas kehidupan mereka di masa mendatang.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Program Konkret & Ikhtiar Nyata */}
              <div className="lg:col-span-6 space-y-4">
                <p>
                  Maka, masa remaja bukanlah masa yang cukup hanya untuk dilewati. Ia adalah masa yang perlu dijaga dan dipersiapkan dengan sebaik-baiknya. Dengan segala upaya, kami berusaha menghadirkan lingkungan yang dapat membantu santriwati belajar menjaga kesehatan sejak dini:
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <Apple className="w-4 h-4 text-[#A8795D] shrink-0 mt-1" />
                    <span>
                      <strong>Menu Gizi Remaja Putri:</strong> Dirancang bersama ahli gizi menggunakan bahan-bahan segar terpilih, menjaga keseimbangan nutrisi tanpa mengabaikan selera santriwati.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Droplets className="w-4 h-4 text-[#C49A6C] shrink-0 mt-1" />
                    <span>
                      <strong>Buah Segar &amp; Water Filter 24 Jam:</strong> Penyediaan buah segar harian serta akses air minum higienis 24 jam guna membangun kebiasaan hidrasi sehat.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-[#8C6249] shrink-0 mt-1" />
                    <span>
                      <strong>Fasilitas Aktivitas Fisik:</strong> Mendukung olahraga teratur agar tubuh santriwati senantiasa bugar dan aktif bergerak.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#5D402C] shrink-0 mt-1" />
                    <span>
                      <strong>Edukasi Gizi &amp; Kesehatan Syar'i:</strong> Pemberian tablet tambah darah, edukasi kesehatan reproduksi remaja sesuai syariat, dan pemantauan tumbuh kembang berkala.
                    </span>
                  </li>
                </ul>

                <p className="text-xs text-[#7A553B] italic border-t border-[#E5DACB] pt-3">
                  Sebab apa yang kita jaga hari ini—makanan yang kita pilih, air yang kita minum, tubuh yang kita gerakkan, dan ilmu yang kita pelajari—adalah ikhtiar kecil untuk mempersiapkan generasi muslimah yang lebih sehat, kuat, dan siap memberi manfaat bagi umat.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* 2. CARD GALLERY DENGAN FITUR UPLOAD GAMBAR & EDIT MATERI */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADECE] text-[#5D402C] text-xs font-bold uppercase tracking-wider mb-1 border border-[#C49A6C]/40">
                <Apple className="w-3.5 h-3.5 text-[#A8795D]" />
                Dokumentasi &amp; Implementasi Layanan Gizi
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#2E1F16] font-serif">
                Dokumentasi Menu &amp; Fasilitas Gizi Santriwati
              </h3>
              <p className="text-xs sm:text-sm text-[#5D402C]">
                Foto dokumentasi menu makanan, buah harian, water filter, dan edukasi kesehatan (bisa Anda upload foto kapan saja).
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddingNew(true);
                setEditModalItem({
                  id: '',
                  title: '',
                  category: 'Gizi & Nutrisi',
                  description: '',
                  porsi: 'Jadwal Reguler',
                  tags: ['Halal & Thayyib', 'Bergizi']
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] text-xs font-bold rounded-xl shadow-sm transition-all transform active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Materi Gizi</span>
            </button>
          </div>

          {/* Success Toast */}
          {toastMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5DACB] shadow-xs hover:shadow-md hover:border-[#C49A6C] transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Photo Area with Upload Overlay */}
                <div className="relative h-44 w-full bg-[#F5EFE6] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#9C8C72] p-4 text-center">
                      <Apple className="w-8 h-8 mb-1 opacity-50" />
                      <span className="text-xs font-medium">Belum ada foto</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Category badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#FAF6F0] text-[#2E1F16] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-[#C49A6C]/40">
                      {item.category}
                    </span>
                  </div>

                  {/* Upload & Edit Buttons */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditModalItem(item);
                      }}
                      title="Edit Informasi Teks"
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUploadClick(item.id)}
                      title="Upload Foto Menu/Gizi"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#C49A6C] hover:bg-[#B5895B] text-[#231710] text-[11px] font-bold shadow-xs transition-transform transform active:scale-95"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{item.image ? 'Ganti' : 'Upload'}</span>
                    </button>
                  </div>

                  {item.porsi && (
                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <span className="text-[10px] text-white font-medium flex items-center gap-1 drop-shadow-sm">
                        <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="truncate">{item.porsi}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Text Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#2E1F16] text-sm leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5D402C] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="pt-2 border-t border-[#E5DACB] flex flex-wrap gap-1">
                      {item.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] font-semibold bg-[#FAF6F0] text-[#5D402C] px-2 py-0.5 rounded-md border border-[#E5DACB]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Edit / Add Modal */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DACB] relative">
            <button
              onClick={() => setEditModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#7A553B] hover:text-[#2E1F16] hover:bg-[#FAF6F0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="bg-[#EADECE] text-[#5D402C] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5">
                Input Materi Informasi Gizi
              </span>
              <h3 className="text-xl font-black text-[#2E1F16] font-serif">
                {isAddingNew ? 'Tambah Informasi Gizi' : 'Edit Informasi Gizi'}
              </h3>
              <p className="text-xs text-[#5D402C] mt-1">
                Silakan sesuaikan judul, penjelasan menu makanan bergizi, kategori, dan jadwal saji untuk santriwati.
              </p>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Judul Menu / Layanan Gizi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Menu Gizi Remaja Putri & Buah Segar"
                  value={editModalItem.title}
                  onChange={(e) => setEditModalItem({ ...editModalItem, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Nutrisi Remaja Putri / Hidrasi"
                    value={editModalItem.category}
                    onChange={(e) => setEditModalItem({ ...editModalItem, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Jadwal / Keterangan Waktu
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Setiap Hari / 24 Jam"
                    value={editModalItem.porsi || ''}
                    onChange={(e) => setEditModalItem({ ...editModalItem, porsi: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Deskripsi & Penjelasan Lengkap <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan jenis makanan, manfaat gizi bagi santriwati penghafal Al-Qur'an, dan standar kebersihan..."
                  value={editModalItem.description}
                  onChange={(e) => setEditModalItem({ ...editModalItem, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Tag / Label (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Halal & Thayyib, Buah Segar, Second Window of Golden Age"
                  value={editModalItem.tags ? editModalItem.tags.join(', ') : ''}
                  onChange={(e) => {
                    const parsed = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditModalItem({ ...editModalItem, tags: parsed });
                  }}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                {!isAddingNew ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteItem(editModalItem.id);
                      setEditModalItem(null);
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Item Ini</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModalItem(null)}
                    className="px-4 py-2 rounded-xl border border-[#E5DACB] text-[#5D402C] text-xs font-semibold hover:bg-[#FAF6F0] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] text-xs font-bold shadow-md transition-all"
                  >
                    Simpan Materi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
