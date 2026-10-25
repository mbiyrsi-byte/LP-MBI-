import { useState, useRef, useMemo, type ChangeEvent, type FormEvent } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Medal, 
  Upload, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Calendar, 
  X,
  Star,
  Search,
  BookOpen,
  Compass,
  GraduationCap,
  Globe,
  Instagram,
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';

export interface AwardBadge {
  rank: 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Medali Emas' | 'Medali Perak' | 'Medali Perunggu' | 'Finalis' | string;
  subject: string;
  type: 'gold' | 'silver' | 'bronze' | 'finalist';
  count?: string;
}

export interface PrestasiItem {
  id: string;
  namaSantri?: string;
  jenjang: 'SMP' | 'SMA' | 'SMP & SMA' | 'Umum';
  prestasi: string;
  kategori: 'Tahfidz & Bahasa Arab' | 'Sains & Astronomi' | 'Bahasa & Sosial' | 'Akidah & Fiqih';
  tingkat: 'Nasional' | 'Jabodetabek' | 'Provinsi' | 'Kota/Kabupaten' | 'Internal Ma\'had';
  tahun: string; // '2024', '2023', '2022', '2021', '2020'
  penyelenggara: string;
  deskripsi: string;
  awards: AwardBadge[];
  image?: string;
}

const STORAGE_KEY = 'mbi_prestasi_santri_data_v3';

// 13 DATA PRESTASI RESMI SESUAI DOKUMEN POSTER "OUR ACHIEVEMENTS" MBI (2020 - 2024)
export const OFFICIAL_PRESTASI_DATA: PrestasiItem[] = [
  // === TAHUN 2024 ===
  {
    id: 'pres-2024-prominensa',
    prestasi: "Kompetensi Tingkat Nasional PROMINENSA",
    penyelenggara: "PROMINENSA (Pristige - Olimpiade Sains Pemuda Indonesia)",
    tahun: "2024",
    tingkat: "Nasional",
    jenjang: "SMP",
    kategori: "Sains & Astronomi",
    namaSantri: "Santriwati Delegasi SMP MBI",
    deskripsi: "Pencapaian spektakuler di tingkat nasional dengan merebut Juara 1 Astronomi Dasar, Juara 1 Bahasa Indonesia, Juara 2 Bahasa Indonesia, dan Juara 3 Bahasa Indonesia.",
    awards: [
      { rank: "Juara 1", subject: "Mata Pelajaran Astronomi Dasar, Tingkat SMP", type: "gold" },
      { rank: "Juara 1", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "gold" },
      { rank: "Juara 2", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "silver" },
      { rank: "Juara 3", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "bronze" }
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'pres-2024-ossc',
    prestasi: "OSSC (OlimpiadeKu Student Science Competition)",
    penyelenggara: "Semuanya Bisa Berkompetisi (OSSC)",
    tahun: "2024",
    tingkat: "Nasional",
    jenjang: "SMP",
    kategori: "Sains & Astronomi",
    namaSantri: "Tim Sains Santriwati SMP",
    deskripsi: "Meraih 3 Medali Perak tingkat nasional dalam cabang Ilmu Pengetahuan Alam (IPA), Biologi, dan Bahasa Inggris.",
    awards: [
      { rank: "Medali Perak", subject: "IPA (Ilmu Pengetahuan Alam)", type: "silver" },
      { rank: "Medali Perak", subject: "Biologi", type: "silver" },
      { rank: "Medali Perak", subject: "Bahasa Inggris", type: "silver" }
    ],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'pres-2024-onpi',
    prestasi: "ONPI (Olimpiade Nasional Pelajar Indonesia)",
    penyelenggara: "Academy Berprestasi",
    tahun: "2024",
    tingkat: "Nasional",
    jenjang: "SMP & SMA",
    kategori: "Akidah & Fiqih",
    namaSantri: "Delegasi Ilmu Syar'i MBI",
    deskripsi: "Keunggulan pemahaman fikih dan akidah manhaj salaf terbukti dengan meraih Medali Emas cabang Fiqih (2 santriwati) dan Medali Perak Akidah Akhlak (1 santriwati).",
    awards: [
      { rank: "Medali Emas", subject: "Fiqih (2 Santriwati)", type: "gold", count: "2 Santriwati" },
      { rank: "Medali Perak", subject: "Akidah Akhlak (1 Santriwati)", type: "silver", count: "1 Santriwati" }
    ],
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80"
  },

  // === TAHUN 2023 ===
  {
    id: 'pres-2023-tahfidz-umc',
    prestasi: "Lomba Tahfidz Online Universitas Muhammadiyyah Cirebon",
    penyelenggara: "Universitas Muhammadiyyah Cirebon",
    tahun: "2023",
    tingkat: "Nasional",
    jenjang: "SMP & SMA",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Kafilah Tahfidz MBI",
    deskripsi: "Prestasi membanggakan menyapu bersih seluruh podium kejuaraan: Juara 1, Juara 2, dan Juara 3 sekaligus pada kompetisi tahfidz online nasional.",
    awards: [
      { rank: "Juara 1", subject: "Lomba Tahfidz Al-Qur'an", type: "gold" },
      { rank: "Juara 2", subject: "Lomba Tahfidz Al-Qur'an", type: "silver" },
      { rank: "Juara 3", subject: "Lomba Tahfidz Al-Qur'an", type: "bronze" }
    ],
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'pres-2023-tahfidz-depok',
    prestasi: "Lomba Tahfidz Gebyar Santri Kota Depok dan Sekitarnya",
    penyelenggara: "Panitia Gebyar Santri Kota Depok",
    tahun: "2023",
    tingkat: "Kota/Kabupaten",
    jenjang: "SMP",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Santriwati Tahfidz MBI",
    deskripsi: "Menunjukkan kelancaran muraja'ah mutqin dengan merebut Juara 2 Musabaqah Tahfidz Gebyar Santri sewilayah Depok dan sekitarnya.",
    awards: [
      { rank: "Juara 2", subject: "Lomba Tahfidz Al-Qur'an", type: "silver" }
    ]
  },
  {
    id: 'pres-2023-mhq-asesi',
    prestasi: "Musabaqah Hifdzil Qur'an (MHQ) Halal Fair ASESI",
    penyelenggara: "ASESI (Asosiasi Sekolah Islam Terpadu) Halal Fair",
    tahun: "2023",
    tingkat: "Nasional",
    jenjang: "SMP & SMA",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Hafidzah Muda MBI",
    deskripsi: "Berhasil menembus babak final bergengsi Musabaqah Hifdzil Qur'an tingkat nasional pada event akbar Halal Fair ASESI.",
    awards: [
      { rank: "Finalis", subject: "Lomba MHQ Halal Fair ASESI", type: "finalist" }
    ]
  },
  {
    id: 'pres-2023-raffi-abya',
    prestasi: "Raffi Abya Competition Vol.6",
    penyelenggara: "Raffi Abya Competition",
    tahun: "2023",
    tingkat: "Nasional",
    jenjang: "SMP & SMA",
    kategori: "Sains & Astronomi",
    namaSantri: "Kafilah Olimpiade Sains MBI",
    deskripsi: "Santriwati jenjang SMP dan SMA berhasil meraih Juara 2 dan Juara 3 dalam kompetisi IPA tingkat nasional.",
    awards: [
      { rank: "Juara 2", subject: "Mata Pelajaran IPA, Tingkat SMP & SMA", type: "silver" },
      { rank: "Juara 3", subject: "Mata Pelajaran IPA, Tingkat SMP & SMA", type: "bronze" }
    ]
  },
  {
    id: 'pres-2023-ospi-b-indo',
    prestasi: "Perunggu Olimpiade Sains Pemuda Indonesia (Bahasa Indonesia)",
    penyelenggara: "Olimpiade Sains Pemuda Indonesia",
    tahun: "2023",
    tingkat: "Nasional",
    jenjang: "SMP",
    kategori: "Bahasa & Sosial",
    namaSantri: "Tim Literasi Bahasa SMP MBI",
    deskripsi: "Dominasi gemilang dalam literasi bahasa: merebut Juara 1, Juara 2, dan Juara 3 sekaligus pada mata pelajaran Bahasa Indonesia tingkat SMP se-Indonesia.",
    awards: [
      { rank: "Juara 1", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "gold" },
      { rank: "Juara 2", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "silver" },
      { rank: "Juara 3", subject: "Mata Pelajaran Bahasa Indonesia, Tingkat SMP", type: "bronze" }
    ]
  },
  {
    id: 'pres-2023-ospi-ipa-ips-inggris',
    prestasi: "Olimpiade Sains Pemuda Indonesia (IPA, IPS, & Bahasa Inggris)",
    penyelenggara: "Olimpiade Sains Pemuda Indonesia",
    tahun: "2023",
    tingkat: "Nasional",
    jenjang: "SMP",
    kategori: "Sains & Astronomi",
    namaSantri: "Santriwati Berprestasi MBI",
    deskripsi: "Meraih Juara 2 IPA, Juara 2 IPS, serta Juara 2 dan Juara 3 Bahasa Inggris pada Olimpiade Sains Pemuda Indonesia.",
    awards: [
      { rank: "Juara 2", subject: "Mata Pelajaran Ilmu Pengetahuan Alam (IPA), Tingkat SMP", type: "silver" },
      { rank: "Juara 2", subject: "Mata Pelajaran Ilmu Pengetahuan Sosial (IPS), Tingkat SMP", type: "silver" },
      { rank: "Juara 2", subject: "Mata Pelajaran Bahasa Inggris, Tingkat SMP", type: "silver" },
      { rank: "Juara 3", subject: "Mata Pelajaran Bahasa Inggris, Tingkat SMP", type: "bronze" }
    ]
  },

  // === TAHUN 2022 ===
  {
    id: 'pres-2022-mhq-aifest',
    prestasi: "Musabaqah Hifdzil Qur'an (MHQ) AIFEST Tingkat Jabodetabek",
    penyelenggara: "Ma'had Aisyah Bogor (AIFEST)",
    tahun: "2022",
    tingkat: "Jabodetabek",
    jenjang: "SMP",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Santriwati Tahfidz 5 Juz",
    deskripsi: "Meraih Juara 2 Musabaqah Hifdzil Qur'an Kategori 5 Juz se-Jabodetabek dengan penguasaan tajwid tartil dan fashahah mutqin.",
    awards: [
      { rank: "Juara 2", subject: "Lomba Tahfidz Kategori 5 Juz", type: "silver" }
    ]
  },
  {
    id: 'pres-2022-khutbah-arabiyah',
    prestasi: "Khutbah Arabiyah (Khutbah dalam Bahasa Arab)",
    penyelenggara: "Sekolah Nabawi Islamic School Jakarta",
    tahun: "2022",
    tingkat: "Jabodetabek",
    jenjang: "SMP & SMA",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Santriwati Khotibah MBI",
    deskripsi: "Meraih Juara 1 Khutbah Arabiyah, membuktikan kefasihan santriwati MBI dalam bercakap dan menyampaikan khutbah berbahasa Arab fusha bersama bimbingan Native Speaker Saudi.",
    awards: [
      { rank: "Juara 1", subject: "Khutbah Arabiyah (Pidato Bahasa Arab)", type: "gold" }
    ]
  },

  // === TAHUN 2021 ===
  {
    id: 'pres-2021-mhq-hmu',
    prestasi: "Musabaqah Hifdzil Qur'an Yayasan HMU Kategori Juz 30",
    penyelenggara: "Yayasan HMU",
    tahun: "2021",
    tingkat: "Kota/Kabupaten",
    jenjang: "SMP",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Kafilah Hifdzil Qur'an Juz 30",
    deskripsi: "Menyapu bersih podium dengan merebut Juara 1, Juara 2, dan Juara 3 sekaligus pada ajang Musabaqah Hifdzil Qur'an Kategori Juz 30.",
    awards: [
      { rank: "Juara 1", subject: "Lomba Tahfidz Kategori Juz 30", type: "gold" },
      { rank: "Juara 2", subject: "Lomba Tahfidz Kategori Juz 30", type: "silver" },
      { rank: "Juara 3", subject: "Lomba Tahfidz Kategori Juz 30", type: "bronze" }
    ]
  },

  // === TAHUN 2020 ===
  {
    id: 'pres-2020-pusdinash',
    prestasi: "Juara 1 Lomba Tahfidz Pelajar Pusdinash",
    penyelenggara: "Pusdinash Jakarta Selatan",
    tahun: "2020",
    tingkat: "Kota/Kabupaten",
    jenjang: "SMP",
    kategori: "Tahfidz & Bahasa Arab",
    namaSantri: "Santriwati Hafidzah MBI",
    deskripsi: "Mengukir rekam jejak prestasi emas perdana dengan menyabet Juara 1 Lomba Tahfidz Pelajar se-Jakarta Selatan.",
    awards: [
      { rank: "Juara 1", subject: "Lomba Tahfidz Pelajar", type: "gold" }
    ]
  }
];

export default function PrestasiSantriSection() {
  const [items, setItems] = useState<PrestasiItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return OFFICIAL_PRESTASI_DATA;
  });

  const [selectedYear, setSelectedYear] = useState<string>('Semua');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTabMode, setActiveTabMode] = useState<'poster' | 'katalog'>('poster');

  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [editModalItem, setEditModalItem] = useState<PrestasiItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const saveItems = (updated: PrestasiItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUploadClick = (id: string) => {
    setActiveUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadId) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file foto/gambar valid (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran foto terlalu besar. Maksimal 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updated = items.map(it => it.id === activeUploadId ? { ...it, image: base64 } : it);
        saveItems(updated);
        showToast('Foto dokumentasi prestasi berhasil diperbarui!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveModal = (e: FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    if (isAddingNew) {
      const newItem: PrestasiItem = {
        ...editModalItem,
        id: `pres-${Date.now()}`
      };
      saveItems([newItem, ...items]);
      showToast('Data prestasi santri baru berhasil ditambahkan!');
    } else {
      const updated = items.map(it => it.id === editModalItem.id ? editModalItem : it);
      saveItems(updated);
      showToast('Perubahan data prestasi berhasil disimpan!');
    }
    setEditModalItem(null);
    setIsAddingNew(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Hapus data prestasi ini?')) {
      const updated = items.filter(it => it.id !== id);
      saveItems(updated);
      showToast('Data prestasi santri telah dihapus.');
    }
  };

  const resetToOfficialData = () => {
    if (confirm('Kembalikan data ke daftar prestasi resmi PSB MBI 2020–2024?')) {
      saveItems(OFFICIAL_PRESTASI_DATA);
      showToast('Data prestasi resmi berhasil dimuat ulang!');
    }
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter(it => {
      const matchYear = selectedYear === 'Semua' || it.tahun === selectedYear;
      const matchKategori = selectedKategori === 'Semua' || it.kategori === selectedKategori;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        it.prestasi.toLowerCase().includes(query) ||
        it.penyelenggara.toLowerCase().includes(query) ||
        (it.namaSantri && it.namaSantri.toLowerCase().includes(query)) ||
        it.awards.some(aw => aw.subject.toLowerCase().includes(query) || aw.rank.toLowerCase().includes(query));
      
      return matchYear && matchKategori && matchSearch;
    });
  }, [items, selectedYear, selectedKategori, searchQuery]);

  // Medal helper
  const renderMedalIcon = (type: string, rank?: string) => {
    if (type === 'gold' || (rank && (rank.includes('1') || rank.toLowerCase().includes('emas')))) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-amber-950 font-black text-xs flex items-center justify-center shadow-xs border border-amber-200 shrink-0">
          1
        </span>
      );
    }
    if (type === 'silver' || (rank && (rank.includes('2') || rank.toLowerCase().includes('perak')))) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 via-gray-300 to-slate-400 text-slate-900 font-black text-xs flex items-center justify-center shadow-xs border border-slate-100 shrink-0">
          2
        </span>
      );
    }
    if (type === 'bronze' || (rank && (rank.includes('3') || rank.toLowerCase().includes('perunggu')))) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 text-white font-black text-xs flex items-center justify-center shadow-xs border border-amber-400 shrink-0">
          3
        </span>
      );
    }
    return (
      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8C6249] to-[#5D402C] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
        ★
      </span>
    );
  };

  const getTingkatBadgeColor = (tingkat: string) => {
    switch (tingkat) {
      case 'Nasional':
        return 'bg-amber-100 text-amber-900 border border-amber-300';
      case 'Jabodetabek':
      case 'Provinsi':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
      case 'Kota/Kabupaten':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      default:
        return 'bg-stone-100 text-stone-800 border border-stone-200';
    }
  };

  // Grouped by year for poster presentation
  const yearsList = ['2024', '2023', '2022', '2021', '2020'];

  return (
    <section id="prestasi-santriwati" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="bg-white rounded-3xl border border-[#E5DACB] shadow-sm p-6 sm:p-10 space-y-8 relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />

        {/* 1. SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5DACB] relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADECE] text-[#5D402C] text-xs font-bold uppercase tracking-wider border border-[#C49A6C]/40">
              <Trophy className="w-3.5 h-3.5 text-[#A8795D]" />
              <span>Official Achievements • PSB 2027/2028</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2E1F16] font-serif tracking-tight">
              Prestasi Santriwati Ma'had Baitusunnah Indonesia
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5D402C] max-w-3xl leading-relaxed">
              Capaian gemilang santriwati MBI dari tahun 2020 hingga 2024 di kancah <strong>Nasional, Jabodetabek, dan Kota/Kabupaten</strong> dalam bidang <em>Tahfidz Al-Qur'an, Khutbah Bahasa Arab, Olimpiade Astronomi &amp; Sains, Bahasa, serta Fiqih &amp; Akidah</em>.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <div className="flex bg-[#FAF6F0] p-1 rounded-xl border border-[#E5DACB]">
              <button
                type="button"
                onClick={() => setActiveTabMode('poster')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTabMode === 'poster'
                    ? 'bg-[#C49A6C] text-[#231710] shadow-xs'
                    : 'text-[#5D402C] hover:text-[#2E1F16]'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Format Poster MBI</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabMode('katalog')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTabMode === 'katalog'
                    ? 'bg-[#C49A6C] text-[#231710] shadow-xs'
                    : 'text-[#5D402C] hover:text-[#2E1F16]'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Katalog Lengkap ({items.length})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddingNew(true);
                setEditModalItem({
                  id: '',
                  namaSantri: 'Santriwati MBI',
                  jenjang: 'SMP',
                  prestasi: '',
                  tingkat: 'Nasional',
                  tahun: '2024',
                  kategori: 'Tahfidz & Bahasa Arab',
                  penyelenggara: '',
                  deskripsi: '',
                  awards: [{ rank: 'Juara 1', subject: '', type: 'gold' }]
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] text-xs font-bold rounded-xl shadow-xs transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Prestasi</span>
            </button>
          </div>
        </div>

        {/* 2. STATISTIK RINGKAS PRESTASI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 relative z-10">
          <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E5DACB] text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#8C6249] block">34+</span>
            <span className="text-xs font-bold text-[#2E1F16]">Total Medali &amp; Gelar</span>
            <span className="text-[11px] text-[#7A553B] block mt-0.5">Tahun 2020 – 2024</span>
          </div>

          <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E5DACB] text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-700 block flex items-center justify-center gap-1">
              <span>9x</span>
              <span className="text-sm">🥇</span>
            </span>
            <span className="text-xs font-bold text-[#2E1F16]">Juara 1 &amp; Medali Emas</span>
            <span className="text-[11px] text-[#7A553B] block mt-0.5">Astronomi, Fiqih, Tahfidz</span>
          </div>

          <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E5DACB] text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-700 block flex items-center justify-center gap-1">
              <span>15x</span>
              <span className="text-sm">🥈</span>
            </span>
            <span className="text-xs font-bold text-[#2E1F16]">Juara 2 &amp; Medali Perak</span>
            <span className="text-[11px] text-[#7A553B] block mt-0.5">Sains, Biologi, IPA, IPS</span>
          </div>

          <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#E5DACB] text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-800 block flex items-center justify-center gap-1">
              <span>10x</span>
              <span className="text-sm">🥉</span>
            </span>
            <span className="text-xs font-bold text-[#2E1F16]">Juara 3 &amp; Finalis Nasional</span>
            <span className="text-[11px] text-[#7A553B] block mt-0.5">MHQ ASESI, B. Indo &amp; Inggris</span>
          </div>
        </div>

        {/* Success Toast */}
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 3. MODE TAMPILAN: FORMAT POSTER "OUR ACHIEVEMENTS" */}
        {activeTabMode === 'poster' && (
          <div className="space-y-8 relative z-10">
            {/* Infographic Poster Frame with Elegant MBI Theme */}
            <div className="bg-gradient-to-b from-[#2E1B13] via-[#3D251A] to-[#24150F] text-white rounded-3xl p-6 sm:p-10 border-4 border-[#C49A6C] shadow-2xl relative overflow-hidden">
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

              {/* Decorative top ribbon */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-amber-300/40 flex items-center justify-center p-1.5 shadow-inner">
                    <Trophy className="w-7 h-7 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-amber-300">
                      MA'HAD BAITUSSUNNAH INDONESIA
                    </h4>
                    <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
                      OUR ACHIEVEMENTS
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-4 py-1.5 rounded-full bg-amber-400 text-[#231710] font-black text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PSB 2027 / 2028</span>
                  </div>
                </div>
              </div>

              {/* Poster 2-Column Responsive Layout mirroring the Uploaded Infographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 relative z-10">
                
                {/* KOLOM 1: TAHUN 2024 & 2023 */}
                <div className="space-y-6">
                  
                  {/* TAHUN 2024 */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 text-[#2E1F16] font-serif font-black text-xl shadow-md">
                      2024
                    </div>

                    <div className="space-y-3.5">
                      {items.filter(it => it.tahun === '2024').map(it => (
                        <div 
                          key={it.id} 
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-300/20 hover:border-amber-300/50 transition-all space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-amber-200 text-sm sm:text-base leading-snug">
                              {it.prestasi}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-amber-100 uppercase tracking-wider shrink-0">
                              {it.tingkat}
                            </span>
                          </div>
                          
                          <p className="text-xs text-amber-100/80 italic">
                            Oleh {it.penyelenggara}
                          </p>

                          {/* List of Awards */}
                          <div className="space-y-2 pt-1 border-t border-white/10">
                            {it.awards.map((aw, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                                {renderMedalIcon(aw.type, aw.rank)}
                                <div className="text-white font-medium flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-amber-200">{aw.rank}:</span>
                                  <span>{aw.subject}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAHUN 2022 */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 text-[#2E1F16] font-serif font-black text-xl shadow-md">
                      2022
                    </div>

                    <div className="space-y-3.5">
                      {items.filter(it => it.tahun === '2022').map(it => (
                        <div 
                          key={it.id} 
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-300/20 hover:border-amber-300/50 transition-all space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-amber-200 text-sm sm:text-base leading-snug">
                              {it.prestasi}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-amber-100 uppercase tracking-wider shrink-0">
                              {it.tingkat}
                            </span>
                          </div>
                          
                          <p className="text-xs text-amber-100/80 italic">
                            Oleh {it.penyelenggara}
                          </p>

                          <div className="space-y-2 pt-1 border-t border-white/10">
                            {it.awards.map((aw, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                                {renderMedalIcon(aw.type, aw.rank)}
                                <div className="text-white font-medium flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-amber-200">{aw.rank}:</span>
                                  <span>{aw.subject}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* KOLOM 2: TAHUN 2023, 2021, & 2020 */}
                <div className="space-y-6">
                  
                  {/* TAHUN 2023 */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 text-[#2E1F16] font-serif font-black text-xl shadow-md">
                      2023
                    </div>

                    <div className="space-y-3.5">
                      {items.filter(it => it.tahun === '2023').map(it => (
                        <div 
                          key={it.id} 
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-300/20 hover:border-amber-300/50 transition-all space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-amber-200 text-sm sm:text-base leading-snug">
                              {it.prestasi}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-amber-100 uppercase tracking-wider shrink-0">
                              {it.tingkat}
                            </span>
                          </div>
                          
                          <p className="text-xs text-amber-100/80 italic">
                            Oleh {it.penyelenggara}
                          </p>

                          <div className="space-y-2 pt-1 border-t border-white/10">
                            {it.awards.map((aw, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                                {renderMedalIcon(aw.type, aw.rank)}
                                <div className="text-white font-medium flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-amber-200">{aw.rank}:</span>
                                  <span>{aw.subject}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TAHUN 2021 & 2020 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    
                    {/* TAHUN 2021 */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center justify-center px-4 py-1 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-100 text-[#2E1F16] font-serif font-black text-lg shadow-md">
                        2021
                      </div>

                      {items.filter(it => it.tahun === '2021').map(it => (
                        <div key={it.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-amber-300/20 space-y-2">
                          <h6 className="font-bold text-amber-200 text-xs leading-tight">
                            {it.prestasi}
                          </h6>
                          <p className="text-[11px] text-amber-100/70">
                            Oleh {it.penyelenggara}
                          </p>
                          <div className="space-y-1 pt-1 border-t border-white/10">
                            {it.awards.map((aw, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                {renderMedalIcon(aw.type, aw.rank)}
                                <span className="text-white font-medium">{aw.rank}: {aw.subject}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* TAHUN 2020 */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center justify-center px-4 py-1 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-100 text-[#2E1F16] font-serif font-black text-lg shadow-md">
                        2020
                      </div>

                      {items.filter(it => it.tahun === '2020').map(it => (
                        <div key={it.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-amber-300/20 space-y-2">
                          <h6 className="font-bold text-amber-200 text-xs leading-tight">
                            {it.prestasi}
                          </h6>
                          <p className="text-[11px] text-amber-100/70">
                            Oleh {it.penyelenggara}
                          </p>
                          <div className="space-y-1 pt-1 border-t border-white/10">
                            {it.awards.map((aw, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                {renderMedalIcon(aw.type, aw.rank)}
                                <span className="text-white font-medium">{aw.rank}: {aw.subject}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>

              {/* Poster Footer: Calligraphy Alhamdulillah & Official Social Links */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/90 relative z-10">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-300" />
                    <span>www.mahadbaitussunnahindonesia.com</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-amber-300" />
                    <span>mahadbaitussunnahindonesia</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold tracking-widest text-amber-300 drop-shadow-sm">
                    الْحَمْدُ لِلَّهِ
                  </span>
                  <span className="text-[11px] text-white/70 italic">
                    Segala puji bagi Allah atas limpahan karunia prestasi ini
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. MODE TAMPILAN: KATALOG RINCI DENGAN FILTER & SEARCH */}
        {activeTabMode === 'katalog' && (
          <div className="space-y-6 relative z-10">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E5DACB]">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A553B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kejuaraan, mata pelajaran (Astronomi, Tahfidz, Fiqih, IPA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] text-[#2E1F16]"
                />
              </div>

              {/* Year Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-[#5D402C] mr-1 shrink-0">Tahun:</span>
                {['Semua', ...yearsList].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedYear === yr
                        ? 'bg-[#8C6249] text-white shadow-xs'
                        : 'bg-white text-[#5D402C] hover:bg-[#EADECE] border border-[#E5DACB]'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['Semua', 'Tahfidz & Bahasa Arab', 'Sains & Astronomi', 'Bahasa & Sosial', 'Akidah & Fiqih'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedKategori(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedKategori === cat
                      ? 'bg-[#C49A6C] text-[#231710] font-bold shadow-xs'
                      : 'bg-[#FAF6F0] text-[#5D402C] hover:bg-[#EADECE] border border-[#E5DACB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6F0] rounded-2xl border border-[#E5DACB] text-[#5D402C]">
                <Award className="w-8 h-8 mx-auto mb-2 text-[#C49A6C] opacity-60" />
                <p className="text-sm font-bold">Tidak ditemukan prestasi dengan kriteria tersebut.</p>
                <p className="text-xs mt-1">Silakan ubah filter tahun atau kata kunci pencarian Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((it) => (
                  <div
                    key={it.id}
                    className="bg-white rounded-2xl border border-[#E5DACB] shadow-xs hover:shadow-md hover:border-[#C49A6C] transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Header Top Card */}
                    <div className="p-5 space-y-3 flex-1">
                      {/* Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getTingkatBadgeColor(it.tingkat)}`}>
                          {it.tingkat}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF6F0] text-[#5D402C] border border-[#E5DACB]">
                            {it.tahun}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#8C6249] text-white">
                            {it.jenjang}
                          </span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <div>
                        <h4 className="font-bold text-[#2E1F16] text-base leading-snug group-hover:text-[#8C6249] transition-colors">
                          {it.prestasi}
                        </h4>
                        <p className="text-xs text-[#7A553B] mt-0.5">
                          Oleh {it.penyelenggara}
                        </p>
                      </div>

                      {/* Awards List */}
                      <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E5DACB] space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A553B] block">
                          Daftar Perolehan Gelar:
                        </span>
                        <div className="space-y-1.5">
                          {it.awards.map((aw, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-2 text-xs">
                              {renderMedalIcon(aw.type, aw.rank)}
                              <div className="leading-tight">
                                <span className="font-bold text-[#2E1F16]">{aw.rank}: </span>
                                <span className="text-[#5D402C]">{aw.subject}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#5D402C] leading-relaxed">
                        {it.deskripsi}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="px-5 py-3 bg-[#FAF6F0] border-t border-[#E5DACB] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verifikasi MBI</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingNew(false);
                            setEditModalItem(it);
                          }}
                          className="p-1.5 rounded-lg text-[#7A553B] hover:text-[#2E1F16] hover:bg-white transition-colors"
                          title="Edit Data Prestasi"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUploadClick(it.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DACB] text-[#5D402C] hover:bg-[#EADECE] text-[11px] font-semibold transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Foto Piagam</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Reset helper */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={resetToOfficialData}
                className="text-xs text-[#7A553B] hover:text-[#2E1F16] underline font-medium"
              >
                Muat Ulang Data Asli "Our Achievements" PSB 2027/2028
              </button>
            </div>
          </div>
        )}

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
                Input Materi Prestasi Santri
              </span>
              <h3 className="text-xl font-black text-[#2E1F16] font-serif">
                {isAddingNew ? 'Tambah Data Prestasi' : 'Edit Data Prestasi'}
              </h3>
              <p className="text-xs text-[#5D402C] mt-1">
                Silakan input nama kejuaraan, penyelenggara, jenjang, tahun perolehan, serta rincian medali juara.
              </p>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Nama Kejuaraan / Musabaqah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kompetensi Tingkat Nasional PROMINENSA"
                  value={editModalItem.prestasi}
                  onChange={(e) => setEditModalItem({ ...editModalItem, prestasi: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Penyelenggara Kegiatan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PROMINENSA / Pusdinash"
                    value={editModalItem.penyelenggara}
                    onChange={(e) => setEditModalItem({ ...editModalItem, penyelenggara: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Tahun Perolehan
                  </label>
                  <select
                    value={editModalItem.tahun}
                    onChange={(e) => setEditModalItem({ ...editModalItem, tahun: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-white"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Tingkat Wilayah
                  </label>
                  <select
                    value={editModalItem.tingkat}
                    onChange={(e) => setEditModalItem({ ...editModalItem, tingkat: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-white"
                  >
                    <option value="Nasional">Nasional</option>
                    <option value="Jabodetabek">Jabodetabek</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Kota/Kabupaten">Kota/Kabupaten</option>
                    <option value="Internal Ma'had">Internal Ma'had</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                    Jenjang Santri
                  </label>
                  <select
                    value={editModalItem.jenjang}
                    onChange={(e) => setEditModalItem({ ...editModalItem, jenjang: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-white"
                  >
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="SMP & SMA">SMP &amp; SMA</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Kategori Bidang
                </label>
                <select
                  value={editModalItem.kategori}
                  onChange={(e) => setEditModalItem({ ...editModalItem, kategori: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-white"
                >
                  <option value="Tahfidz & Bahasa Arab">Tahfidz &amp; Bahasa Arab</option>
                  <option value="Sains & Astronomi">Sains &amp; Astronomi</option>
                  <option value="Bahasa & Sosial">Bahasa &amp; Sosial</option>
                  <option value="Akidah & Fiqih">Akidah &amp; Fiqih</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#442E20] uppercase tracking-wide mb-1">
                  Deskripsi & Catatan Tambahan
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail pencapaian santriwati..."
                  value={editModalItem.deskripsi}
                  onChange={(e) => setEditModalItem({ ...editModalItem, deskripsi: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E5DACB] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] bg-[#FAF6F0] resize-none"
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
                    <span>Hapus Prestasi Ini</span>
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
                    Simpan Prestasi
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
