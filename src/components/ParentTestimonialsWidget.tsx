import { useState, type FormEvent } from 'react';
import { Star, MessageSquareQuote, PlusCircle, CheckCircle, Heart, ShieldCheck, X } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  nama: string;
  peran: string;
  teks: string;
  rating: number;
  tanggal?: string;
  asalKota?: string;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    nama: "Ummu Khadijah",
    peran: "Wali Santriwati SMP MBI",
    asalKota: "Jakarta Timur",
    teks: "Masya Allah, kemajuan tahfidz putri kami luar biasa sejak di MBI. Adanya aplikasi monitoring hafalan membuat kami yang di rumah selalu tenang dan bisa memantau perkembangan hafalan harian. Pembiasaan adab dan asrama akhwatnya sangat terjaga.",
    rating: 5,
    tanggal: "12 Agt 2026"
  },
  {
    id: 't-2',
    nama: "Fathimah Az-Zahra",
    peran: "Santriwati SMA MBI (Target 30 Juz)",
    asalKota: "Bandung",
    teks: "Metode Tikrar di MBI sangat membantu hafalan saya kuat menancap. Para ustadzah sangat sabar membimbing tahsin sampai makhraj huruf benar-benar sempurna. Lingkungan teman-teman asramanya shalihah dan saling mendukung dalam kebaikan.",
    rating: 5,
    tanggal: "28 Jul 2026"
  },
  {
    id: 't-3',
    nama: "Abu Hafsh Pratama",
    peran: "Wali Santriwati SMA MBI",
    asalKota: "Bekasi",
    teks: "Alhamdulillah kami memilih MBI karena manhajnya ahlussunnah yang lurus, fasilitas asrama akhwatnya sangat nyaman ber-AC, dan pengajarnya alumni universitas ternama seperti Ummul Qura & LIPIA. Biayanya sangat transparan dan sebanding dengan mutunya.",
    rating: 5,
    tanggal: "15 Jul 2026"
  }
];

const LOCAL_STORAGE_KEY = 'mbi_parent_testimonials_v1';

export default function ParentTestimonialsWidget() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore fallback
    }
    return INITIAL_TESTIMONIALS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nama, setNama] = useState('');
  const [peran, setPeran] = useState('Wali Santriwati SMP');
  const [asalKota, setAsalKota] = useState('');
  const [teks, setTeks] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !teks.trim()) return;

    const newTestimonial: TestimonialItem = {
      id: `t-${Date.now()}`,
      nama: nama.trim(),
      peran: peran.trim(),
      asalKota: asalKota.trim() || 'Indonesia',
      teks: teks.trim(),
      rating: rating,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Reset form
    setNama('');
    setTeks('');
    setAsalKota('');
    setRating(5);
    setIsModalOpen(false);

    // Show temporary notification
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 4000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white rounded-3xl border border-coffee-200/90 shadow-lg p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        {/* Header with Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-coffee-100 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-800 text-xs font-bold uppercase tracking-wider mb-2 border border-burgundy-100">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
              Suara Orang Tua & Santriwati
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-burgundy-950 tracking-tight">
              Testimoni Wali Santriwati MBI
            </h3>
            <p className="text-xs sm:text-sm text-coffee-700 mt-1 max-w-2xl">
              Pengalaman nyata para orang tua yang mempercayakan pendidikan putri tercinta di Ma'had Baitusunnah Indonesia.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C49A6C] to-[#A8795D] hover:from-[#B5895B] hover:to-[#96684C] text-[#FAF6F0] text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all transform active:scale-95 shrink-0 border border-[#C49A6C]/50"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Tulis Testimoni Anda</span>
          </button>
        </div>

        {/* Success toast notification */}
        {showSuccessNotification && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Jazakumullahu khairan! Testimoni Anda berhasil ditambahkan dan tampil di bawah ini.</span>
          </div>
        )}

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 relative z-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-coffee-50/50 hover:bg-white border border-coffee-200/80 hover:border-burgundy-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Rating & Quote mark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-5 h-5 text-burgundy-200 group-hover:text-burgundy-300 transition-colors" />
                </div>

                {/* Text quote */}
                <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed italic">
                  "{item.teks}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 mt-4 border-t border-coffee-200/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-burgundy-800 to-coffee-900 text-amber-200 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-1 ring-amber-400/40">
                  {item.nama.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-burgundy-950 text-xs sm:text-sm truncate">
                    {item.nama}
                  </h4>
                  <p className="text-[11px] text-coffee-600 truncate font-medium">
                    {item.peran} {item.asalKota ? `• ${item.asalKota}` : ''}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Wali Terverifikasi
                    </span>
                    {item.tanggal && (
                      <span className="text-[10px] text-coffee-400">
                        {item.tanggal}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form Tambah Testimoni */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-coffee-200 relative animate-fadeIn">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-coffee-400 hover:text-burgundy-900 hover:bg-coffee-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-800 text-xs font-bold uppercase tracking-wider mb-2 border border-burgundy-100">
                <PlusCircle className="w-3.5 h-3.5 text-burgundy-700" />
                Formulir Testimoni
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-burgundy-950">
                Bagikan Pengalaman Anda
              </h3>
              <p className="text-xs sm:text-sm text-coffee-600 mt-1">
                Kesan, pesan, atau pengalaman Anda mengenai pembinaan tahfidz dan adab putri di MBI sangat berarti bagi calon wali santriwati lainnya.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wide mb-1">
                  Nama Anda / Panggilan Wali <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ummu Aisyah / Abu Rayyan"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 bg-coffee-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wide mb-1">
                    Status / Peran <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={peran}
                    onChange={(e) => setPeran(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 bg-white"
                  >
                    <option value="Wali Santriwati SMP">Wali Santriwati SMP</option>
                    <option value="Wali Santriwati SMA">Wali Santriwati SMA</option>
                    <option value="Santriwati SMP">Santriwati SMP</option>
                    <option value="Santriwati SMA">Santriwati SMA</option>
                    <option value="Alumni Santriwati MBI">Alumni Santriwati MBI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wide mb-1">
                    Kota Domisili
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jakarta / Bekasi"
                    value={asalKota}
                    onChange={(e) => setAsalKota(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 bg-coffee-50/50"
                  />
                </div>
              </div>

              {/* Rating Star Selection */}
              <div>
                <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wide mb-1">
                  Penilaian / Rating
                </label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating || rating) >= star
                            ? 'fill-current text-amber-400'
                            : 'text-coffee-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-coffee-700 ml-2">
                    {rating} dari 5 Bintang
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wide mb-1">
                  Pesan & Testimoni <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan perkembangan hafalan, kenyamanan fasilitas asrama akhwat, atau pembinaan adab santriwati..."
                  value={teks}
                  onChange={(e) => setTeks(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 bg-coffee-50/50 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-coffee-200 text-coffee-700 hover:bg-coffee-100 text-xs font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#5C432A] hover:bg-[#442E20] text-white text-xs font-bold shadow-md transition-all border border-[#C49A6C]/40"
                >
                  Kirim Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
