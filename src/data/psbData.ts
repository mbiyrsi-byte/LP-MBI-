export interface MisiPoint {
  number: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  icon: string;
  isSpecialTahfidz?: boolean;
}

export const MISI_LIST: MisiPoint[] = [
  {
    number: 1,
    title: "Membina aqidah lurus sesuai pemahaman salafus shalih",
    shortDesc: "Pondasi tauhid shahih, memurnikan ibadah, dan meneladani generasi terbaik umat Islam.",
    fullDesc: "Menanamkan nilai tauhid yang kokoh dan manhaj salafus shalih sejak dini, membentengi pemikiran santriwati dari syubhat dan penyimpangan aqidah, serta membentuk pola pikir yang bersandar pada Al-Qur'an dan As-Sunnah dengan pemahaman para sahabat Nabi radhiyallahu 'anhum.",
    highlights: [
      "Kajian kitab aqidah & tauhid mu'tabar",
      "Pembiasaan sunnah dalam keseharian asrama",
      "Kajian adab dan akhlaq thalabul 'ilmi",
      "Bimbingan pemurnian ibadah sesuai tuntunan Rasulullah ﷺ"
    ],
    icon: "ShieldCheck",
  },
  {
    number: 2,
    title: "Menyelenggarakan program tahfidz Al-Qur'an terarah dan berkualitas",
    shortDesc: "Program unggulan utama: SMP target 15 Juz & SMA target 30 Juz dengan metode Tikrar dan bimbingan intensif.",
    fullDesc: "Mencetak hafidzah dengan hafalan kuat dan bacaan tajwid tartil berstandar, memahami adab Al-Qur'an, serta mengamalkan kandungannya. Dilengkapi pemantauan hafalan digital yang dapat diakses orang tua dari rumah.",
    highlights: [
      "Target SMP 15 Juz & SMA 30 Juz Kuat dan Lancar",
      "3 Fase: Intensif 2 Bulan, Reguler Tikrar, Akselerasi 30 Juz",
      "Pengampu halaqoh berpengalaman dan berijazah resmi",
      "Aplikasi Pemantauan Hafalan Real-Time untuk Orang Tua",
      "Tasmi' Al-Qur'an sekali duduk berkala (1, 5, 10, 15, 30 Juz)"
    ],
    icon: "BookOpen",
    isSpecialTahfidz: true,
  },
  {
    number: 3,
    title: "Mengajarkan ilmu syar'i dan pengetahuan yang bermanfaat",
    shortDesc: "Perpaduan kurikulum diniyyah mendalam dan kurikulum umum untuk mencetak generasi cerdas dan mandiri.",
    fullDesc: "Memberikan bekal ilmu syar'i yang komprehensif (Fiqh, Hadits, Bahasa Arab aktif) bersama para asatidzah berkompeten alumni universitas ternama, didampingi penguasaan ilmu pengetahuan umum, sains, dan literasi teknologi modern yang bermanfaat untuk masa depan santriwati.",
    highlights: [
      "Bahasa Arab aktif bersama Native Speaker dari Saudi Arabia",
      "Kombinasi KBM Diniyyah dan KBM Umum / Akademik",
      "Kualifikasi pengajar lulusan Ummul Qura, LIPIA, STDI Jember, Unpad, dll",
      "Fasilitas Lab Komputer, Perpustakaan, dan Literation Club"
    ],
    icon: "GraduationCap",
  },
  {
    number: 4,
    title: "Membiasakan amal shalih dalam kehidupan sehari-hari",
    shortDesc: "Internalisasi ibadah, kedisiplinan hidup berasrama akhwat, dan kepemimpinan islami.",
    fullDesc: "Mengintegrasikan ilmu yang dipelajari ke dalam praktik nyata sehari-hari di asrama khusus akhwat: sholat berjamaah tepat waktu, dzikir pagi-petang, puasa sunnah, kebersihan pribadi, adab bermasyarakat, serta kepemimpinan santri melalui LDK dan OSIS.",
    highlights: [
      "Pembiasaan shalat berjamaah & sholat sunnah rawatib/malam",
      "Lingkungan asrama khusus akhwat yang kondusif & ber-AC",
      "Pelatihan kepemimpinan santri melalui LDK dan OSIS",
      "Menu makanan bergizi seimbang dan olahraga renang/indoor"
    ],
    icon: "HeartHandshake",
  },
];

export const KENAPA_MEMILIH_MBI = [
  { title: "Manhaj Ahlussunnah wal Jamaah", desc: "Berlandaskan pemahaman salafus shalih yang murni dan menyejukkan." },
  { title: "Asrama Khusus Akhwat", desc: "Lingkungan aman, privat, nyaman ber-AC, dan terjaga khusus untuk santriwati." },
  { title: "Halaqoh Tahfidz Metode Tikrar", desc: "Sistem pengulangan teruji untuk mengunci hafalan agar kuat, lancar, dan tidak mudah lupa." },
  { title: "KBM Diniyyah dan Umum", desc: "Kurikulum berimbang untuk mencetak generasi berilmu syar'i sekaligus cakap akademis." },
  { title: "Menu Makanan Bergizi Seimbang", desc: "Disusun higienis untuk menunjang daya konsentrasi menghafal dan kesehatan santriwati." },
  { title: "LDK dan OSIS", desc: "Wadah pengembangan karakter kepemimpinan, kemandirian, dan organisasi islami." },
  { title: "Pengajar Kompeten di Bidangnya", desc: "Para asatidzah lulusan universitas Islam terbaik dalam dan luar negeri." },
  { title: "Native Speaker dari Saudi Arabia", desc: "Penguasaan bahasa Arab yang fasih dan alami langsung dari penutur asli." },
  { title: "Olahraga, Club Bahasa dan Seni", desc: "Fasilitas kolam renang khusus, lapangan indoor/basket, Arabic & English Club." },
  { title: "Rihlah & Kegiatan Tahunan", desc: "Kegiatan tadabbur alam, outbound, dauroh syar'iyyah, dan rihlah edukatif tahunan." },
];

export const TIMELINE_PSB = [
  {
    tahap: "Periode Pendaftaran",
    tanggal: "1 September – 1 Mei 2027",
    status: "Sedang Dibuka",
    deskripsi: "Pendaftaran dibuka secara Online atau Offline di Ma'had (One Day Service / Dijadwalkan). Catatan: Pendaftaran dapat ditutup sewaktu-waktu jika kuota 40 santriwati telah terpenuhi.",
  },
  {
    tahap: "Seleksi Tahap I",
    tanggal: "Sesuai Jadwal Pendaftaran / One Day Service",
    status: "Tahap Pertama",
    deskripsi: "Materi seleksi meliputi: Tes tulis diniyyah dasar, wawancara calon santriwati dan orang tua/wali santri, serta tes bacaan (tahsin) dan hafalan Al-Qur'an.",
  },
  {
    tahap: "Seleksi Tahap II*",
    tanggal: "Pasca Pengumuman Tahap I",
    status: "Wajib setelah Lolos Tahap I",
    deskripsi: "Tes Psikotes Online (Biaya: SMP Rp 200.000, SMA Rp 300.000) dan pengumpulan berkas laboratorium kesehatan (cek darah lengkap, SGPT/SGOT, rontgen paru-paru, surat keterangan sehat dokter).",
  },
  {
    tahap: "Daftar Ulang & Orientasi Santri",
    tanggal: "Juli 2027",
    status: "Tahap Akhir",
    deskripsi: "Penyelesaian administrasi biaya masuk tahun pertama, pengukuran seragam, pembagian kamar asrama ber-AC, dan masa orientasi (Khutbatul 'Arsy).",
  },
];

export const BIAYA_DATA = {
  biayaPendaftaran: 400000,
  diskonPendaftaran: {
    persentase: 6.25,
    nominalSetelahDiskon: 375000,
    periode: "September – Desember 2026",
  },
  sppBulanan: 2250000,
  sppInclude: [
    "Uang asrama (kamar ber-AC & kasur nyaman)",
    "Konsumsi 3x sehari dengan menu bergizi seimbang",
    "Kegiatan Belajar Mengajar (KBM) Diniyyah & Umum",
    "Halaqoh Tahfidz intensif & reguler",
    "Fasilitas laundry pakaian seragam santriwati",
    "Akses fasilitas olahraga (kolam renang, lapangan indoor)"
  ],
  jenjang: [
    {
      nama: "SMP (Sekolah Menengah Pertama)",
      targetTahfidz: "15 Juz (5 Juz / Tahun)",
      kuota: 30,
      tahun1: 19050000,
      tahun2: 9500000,
      tahun3: 9500000,
      psikotes: 200000,
      catatan: "Total tahun ke-1 sudah termasuk uang pangkal sarana, seragam lengkap, ranjang asrama, modul materi, dan administrasi PSB."
    },
    {
      nama: "SMA (Sekolah Menengah Atas)",
      targetTahfidz: "30 Juz Kuat & Lancar (10 Juz / Tahun)",
      kuota: 10,
      tahun1: 20450000,
      tahun2: 9700000,
      tahun3: 9700000,
      psikotes: 300000,
      catatan: "**Terdapat potongan biaya khusus bagi siswi lulusan SMP MBI. Hubungi panitia untuk klaim voucher beasiswa internal."
    }
  ],
  rekening: {
    bank: "Bank Syariah Indonesia (BSI)",
    nomor: "2015202190",
    atasNama: "Yayasan Rumah Sunnah Indonesia",
    waKonfirmasi: "0895322231882",
    waAdmin: "082247044181"
  }
};

export const BERKAS_PERSYARATAN = [
  { id: "ijazah", title: "FC Ijazah dilegalisir", desc: "Jika sudah terbit dari sekolah asal" },
  { id: "akte", title: "FC Akte Kelahiran", desc: "Sebanyak 3 lembar" },
  { id: "kartuKeluarga", title: "FC Kartu Keluarga (KK)", desc: "Sebanyak 3 lembar terbaru" },
  { id: "ktpOrangTua", title: "FC KTP Orang Tua (Ayah & Ibu)", desc: "Masing-masing 3 lembar" },
  { id: "pasFoto", title: "Pas Foto Berlatar Belakang Merah", desc: "Ukuran 2x3, 3x4, dan 4x6 masing-masing 4 lembar (berjilbab syar'i)" },
  { id: "nisn", title: "FC Kartu NISN", desc: "1 lembar resmi Kemdikbud" },
  { id: "rapot", title: "FC Nilai Rapot Kelas 4-5", desc: "1 lembar legalisir untuk SMP / kelas 7-8 untuk SMA" },
  { id: "suratKelakuanBaik", title: "Surat Keterangan Kelas Akhir & Kelakuan Baik", desc: "Asli dari sekolah asal (1 lembar)" },
  { id: "sertifikatPrestasi", title: "FC Sertifikat Prestasi", desc: "Jika ada (prestasi tahfidz, akademik, atau seni)" },
  {
    id: "berkasKesehatan",
    title: "Berkas Kesehatan Laboratorium",
    desc: "Cek darah lengkap, SGPT & SGOT, Rontgen paru-paru, serta Surat Keterangan Sehat Dokter"
  }
];

export const FASILITAS_LIST = [
  { name: "Gedung Kelas Ber-AC", desc: "Ruang kelas modern berpendingin udara untuk kenyamanan belajar optimal." },
  { name: "Gedung Asrama Nyaman", desc: "Kamar tidur ber-AC dengan ventilasi prima dan lemari pribadi santriwati." },
  { name: "Musholla Ma'had", desc: "Pusat halaqoh Al-Qur'an, sholat berjamaah, dan majelis ta'lim harian." },
  { name: "Kolam Renang Khusus Akhwat", desc: "Sarana olahraga renang tertutup dan terjaga privasinya." },
  { name: "Lapangan Basket & Badminton Indoor", desc: "Arena olahraga serbaguna untuk kebugaran jasmani santriwati." },
  { name: "Perpustakaan & Ruang Baca", desc: "Koleksi kitab-kitab ulama salaf, ensiklopedia Islam, dan buku sains." },
  { name: "Gazebo & Taman Diskusi", desc: "Area hijau asri untuk santriwati mengulang hafalan (tikrar) di alam terbuka." },
  { name: "Area Mencuci & Laundry", desc: "Sarana cuci higienis dengan layanan laundry seragam harian teratur." },
  { name: "Keamanan 24 Jam & CCTV", desc: "Sistem pengamanan terpadu satu pintu khusus asrama putri." },
  { name: "Kantin & Ruang Makan", desc: "Penyajian makanan 3x sehari menu sehat dan kantin kejujuran." },
  { name: "UKS Santriwati", desc: "Unit Kesehatan Sekolah dengan obat-obatan standar dan dokter mitra." },
  { name: "Lab Komputer", desc: "Fasilitas penunjang literasi digital dan KBM ilmu pengetahuan umum." },
];

export const TAHFIDZ_PROGRAM_DETAILS = {
  lembaga: "MA'HAD BAITU SUNNAH INDONESIA",
  judul: "Program Tahfidz Al-Qur'an",
  subjudul: "Rincian Kurikulum & Pengelolaan Pembelajaran Al-Qur'an Berjenjang",
  deskripsi: "Program Tahfidz Al-Qur’an di Ma’had Baitu Sunnah Indonesia dirancang sebagai penjabaran konkret dari empat misi utama lembaga. Program ini ditujukan untuk membina para santri dalam menghafal Al-Qur'an secara terstruktur, berjenjang, dan berkelanjutan, berbasis pada pemetaan kemampuan dasar serta evaluasi yang akuntabel.",
  visiTahfidz: "Mencetak generasi pembawa Al-Qur'an yang memiliki kualitas bacaan sesuai kaidah, sanad matan tajwid, dan disiplin hafalan yang kokoh.",
  dokumenRef: "Dokumen Informasi Program Unggulan PSB — Ma'had Baitu Sunnah Indonesia",
  targets: {
    smp: {
      jenjang: "JENJANG SMP",
      targetJuz: 15,
      targetBadge: "Target 15 Juz",
      targetTahunan: "5 Juz / Tahun",
      targetBulanan: "~1 Juz / 2 Bulan",
      targetHarian: "1/2 Halaman Ziyadah + Muraja'ah 1 Juz",
      output: "Syahadah Tahfidz 15 Juz & Sertifikat Uji Kompetensi Tajwid"
    },
    sma: {
      jenjang: "JENJANG SMA",
      targetJuz: 30,
      targetBadge: "Target 30 Juz",
      targetTahunan: "10 Juz / Tahun",
      targetBulanan: "1 Juz / Bulan",
      targetHarian: "1 Halaman Ziyadah + Muraja'ah 1.5 - 2 Juz",
      output: "Syahadah Tahfidz 30 Juz & Pengambilan Sanad Matan Tajwid"
    }
  },
  tahapanPembelajaran: [
    {
      nomor: "01",
      fase: "Fase Intensif (2 Bulan Pertama)",
      deskripsi: "Penyelarasan dan penyempurnaan kualitas bacaan (tahsin) seluruh santri agar mencapai standar kelayakan yang sama sebelum memulai hafalan baru.",
      durasi: "2 Bulan Pertama",
      fokusUtama: "Tahsin Standar & Makharijul Huruf"
    },
    {
      nomor: "02",
      fase: "Fase Reguler",
      deskripsi: "Pembiasaan penambahan hafalan baru yang diimbangi pengulangan secara konsisten guna menjaga ketahanan hafalan santri secara berkelanjutan.",
      durasi: "Berkelanjutan",
      fokusUtama: "Ziyadah Harian & Muraja'ah Konsisten"
    },
    {
      nomor: "03",
      fase: "Fase Akselerasi",
      deskripsi: "Program percepatan penyelesaian hafalan hingga 30 juz yang diperuntukkan bagi santri yang memenuhi kriteria kualifikasi dan evaluasi khusus.",
      durasi: "Kualifikasi Khusus",
      fokusUtama: "Target 30 Juz Percepatan"
    }
  ],
  pengajaranStandardisasiPemantauan: [
    {
      id: "pengajar-halaqah",
      judul: "Pengajar Halaqah Kompeten",
      deskripsi: "Bimbingan harian diampu oleh tenaga pengajar halaqah yang berpengalaman dan kompeten di bidangnya.",
      icon: "users"
    },
    {
      id: "lajnah-iktibar",
      judul: "Pengujian oleh Lajnah Iktibar Bersanad",
      deskripsi: "Kelayakan kenaikan setiap juz diuji secara ketat dan langsung oleh lajnah iktibar (tim penguji) yang telah bersanad untuk menjamin mutu dan akurasi hafalan.",
      icon: "award"
    },
    {
      id: "sanad-matan",
      judul: "Program Sanad Matan Tajwid Santri",
      deskripsi: "Santri berkesempatan mengikuti program pengambilan sanad matan tajwid yang diampu langsung oleh syaikhoh.",
      icon: "scroll"
    },
    {
      id: "pemantauan-digital",
      judul: "Target Terstruktur & Pemantauan Digital",
      deskripsi: "Aplikasi monitoring khusus hafalan tahfidz secara real-time, sekaligus untuk akses e-rapor santriwati di mana lembar nilai tahfidz terbit bergabung bersama buku rapor asrama.",
      icon: "smartphone"
    }
  ],
  fiturAplikasiTracker: [
    {
      title: "Monitoring Khusus Tahfidz",
      desc: "Setiap selesai halaqoh Al-Qur'an, ustadzah mencatat ayat yang disetor, tingkat kelancaran, dan evaluasi tajwid yang langsung masuk ke ponsel orang tua."
    },
    {
      title: "Akses Rapor Terpadu (Tahfidz & Asrama)",
      desc: "Akses unduhan e-rapor resmi santriwati, di mana hasil penilaian tahfidz terbit bergabung dalam satu dokumen bersama rapor asrama."
    },
    {
      title: "Indikator Target Terstruktur",
      desc: "Tampilan grafik dan bar progress pencapaian target hafalan terstruktur (SMP 15 Juz / SMA 30 Juz) yang teruji secara periodik."
    },
    {
      title: "Jadwal Muraja'ah & Catatan Lajnah",
      desc: "Pemetaan jadwal muraja'ah mutqin serta hasil kelayakan kenaikan juz dari tim penguji lajnah iktibar bersanad."
    }
  ]
};

export const TESTIMONI_LIST = [
  {
    nama: "Ummu Khadijah",
    peran: "Wali Santriwati SMP MBI (Asal Jakarta Timur)",
    teks: "Masya Allah, kemajuan tahfidz putri kami luar biasa sejak di MBI. Adanya aplikasi monitoring hafalan membuat kami yang di rumah selalu tenang dan bisa memantau perkembangan hafalan harian. Pembiasaan adab dan asrama akhwatnya sangat terjaga.",
    rating: 5
  },
  {
    nama: "Fathimah Az-Zahra",
    peran: "Santriwati SMA MBI (Target 30 Juz)",
    teks: "Metode Tikrar di MBI sangat membantu hafalan saya kuat menancap. Para ustadzah sangat sabar membimbing tahsin sampai makhraj huruf benar-benar sempurna. Lingkungan teman-teman asramanya shalihah dan saling mendukung dalam kebaikan.",
    rating: 5
  },
  {
    nama: "Abu Hafsh Pratama",
    peran: "Wali Santriwati SMA MBI (Asal Bekasi)",
    teks: "Alhamdulillah kami memilih MBI karena manhajnya ahlussunnah yang lurus, fasilitas asrama akhwatnya sangat nyaman ber-AC, dan pengajarnya alumni universitas ternama seperti Ummul Qura & LIPIA. Biayanya sangat transparan dan sebanding dengan mutunya.",
    rating: 5
  }
];
