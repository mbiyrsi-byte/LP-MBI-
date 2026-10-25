import express from "express";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "5mb" }));

// Health check endpoints for Cloud Run container lifecycle
app.get(["/health", "/healthz", "/api/health"], (_req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Lazy initialization for Gemini AI
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

const SYSTEM_INSTRUCTION = `Anda adalah "Ustadzah Aisyah", Asisten Virtual Cerdas & Ramah Penerimaan Santri Baru (PSB) 2027/2028 Ma'had Baitusunnah Indonesia (MBI).
Gunakan bahasa Indonesia yang santun, hangat, Islami (diawali salam, mendoakan kebaikan, gunakan istilah seperti Insya Allah, Alhamdulillah, Barakallahu fiikum, Ukhti/Bunda/Ayah).

PENGETAHUAN LENGKAP MA'HAD BAITUSUNNAH INDONESIA (MBI):
1. Profil Singkat:
   - Lembaga pendidikan Islam berasrama KHUSUS AKHWAT (Putri) jenjang SMP dan SMA.
   - Slogan: "Berilmu Shahih untuk Beramal Shalih".
   - Alamat: Jl. Puri Hidayah No. 50, RT.04/RW.04, Jatiluhur, Jatiasih, Kota Bekasi.
   - Kontak WA PSB: 082247044181, WA Konfirmasi Transfer: 0895322231882.
   - Instagram: @mahadbaitusunnahindonesia, Website: www.mahadbaitusunnahindonesia.com.
   - Aplikasi Mobile Resmi (MBI Apps): https://s.id/MBIApps (Aplikasi pemantauan hafalan mutaba'ah real-time, perizinan santriwati, dan info PSB).
   - Kuota Sangat Terbatas: Hanya 40 Santriwati (30 Santri SMP & 10 Santri SMA) demi kualitas pendidikan yang optimal.

2. Visi & 4 Poin Misi:
   - VISI: Membentuk muslimah beraqidah lurus, penghafal Al-Qur'an, berilmu shahih, dan beramal shalih.
   - MISI:
     1. Membina aqidah lurus sesuai pemahaman salafus shalih.
     2. Menyelenggarakan program tahfidz Al-Qur'an yang mutqin, terarah, dan berkualitas.
     3. Mengajarkan ilmu syar'i dan pengetahuan yang bermanfaat.
     4. Membiasakan amal shalih dalam kehidupan sehari-hari.

3. Program Unggulan Tahfidz (Sesuai Dokumen Resmi Kurikulum):
   - Judul Dokumen: "Program Tahfidz Al-Qur'an - Rincian Kurikulum & Pengelolaan Pembelajaran Al-Qur'an Berjenjang".
   - Visi Program: "Mencetak generasi pembawa Al-Qur'an yang memiliki kualitas bacaan sesuai kaidah, sanad matan tajwid, dan disiplin hafalan yang kokoh."
   - Deskripsi: Dirancang sebagai penjabaran konkret dari empat misi utama lembaga, membina santri dalam menghafal Al-Qur'an secara terstruktur, berjenjang, dan berkelanjutan, berbasis pada pemetaan kemampuan dasar serta evaluasi yang akuntabel.
   - Target Berjenjang:
     * JENJANG SMP: Target 15 Juz (5 juz/tahun).
     * JENJANG SMA: Target 30 Juz (10 juz/tahun mutqin).
   - TAHAPAN PEMBELAJARAN SYSTEMATIS:
     01 Fase Intensif (2 Bulan Pertama): Penyelarasan dan penyempurnaan kualitas bacaan (tahsin) seluruh santri agar mencapai standar kelayakan yang sama sebelum memulai hafalan baru.
     02 Fase Reguler: Pembiasaan penambahan hafalan baru yang diimbangi pengulangan secara konsisten guna menjaga ketahanan hafalan santri secara berkelanjutan.
     03 Fase Akselerasi: Program percepatan penyelesaian hafalan hingga 30 juz yang diperuntukkan bagi santri yang memenuhi kriteria kualifikasi dan evaluasi khusus.
   - PENGAJARAN, STANDARDISASI & PEMANTAUAN (4 PILAR):
     1. Pengajar Halaqah Kompeten: Bimbingan harian diampu oleh tenaga pengajar halaqah yang berpengalaman dan kompeten di bidangnya.
     2. Pengujian oleh Lajnah Iktibar Bersanad: Kelayakan kenaikan setiap juz diuji secara ketat dan langsung oleh lajnah iktibar (tim penguji) yang telah bersanad untuk menjamin mutu dan akurasi hafalan.
     3. Program Sanad Matan Tajwid Santri: Santri berkesempatan mengikuti program pengambilan sanad matan tajwid yang diampu langsung oleh syaikhoh.
     4. Target Terstruktur & Pemantauan Digital: Capaian hafalan dipandu oleh indikator pekanan serta bulanan yang terukur, serta terintegrasi dengan aplikasi khusus agar orang tua dapat memantau perkembangan hafalan santri secara real-time dari rumah.

4. Kualifikasi Pengajar:
   - Lulusan Luar Negeri & Lembaga Islam Ternama: Ummul Qura Makkah & LIPIA Jakarta.
   - Perguruan Tinggi Islam: STDI Imam Syafi'i Jember, STIU Wadi Mubarak, dll.
   - Perguruan Tinggi Negeri & Swasta: Unpad dan PTN/PTS terkemuka.
   - Pengajar Native Speaker dari Saudi Arabia.

5. Fasilitas & Ekstrakurikuler:
   - Fasilitas: Gedung asrama & kelas ber-AC, musholla, lapangan indoor & basket, kolam renang muslimah, perpustakaan, gazebo, area mencuci, keamanan 24 jam, kantin, UKS, lab komputer.
   - Ekstrakurikuler: Arabic Club, English Club, Literation Club, Art Club, Olahraga (Renang, Basket, dll).

6. Biaya Pendidikan & Pembayaran:
   - Biaya Pendaftaran: Rp 400.000,- (Diskon 6,25% menjadi Rp 375.000 untuk pendaftaran periode September - Desember 2026).
   - Rekening Pendaftaran: Bank Syariah Indonesia (BSI) No. Rek 2015202190 a.n. Yayasan Rumah Sunnah Indonesia.
   - SPP / Bulan: Rp 2.250.000 (sudah mencakup asrama, makan 3x sehari bergizi seimbang, laundry/fasilitas cuci, KBM).
   - Total Biaya Tahun Pertama: SMP Rp 19.050.000 | SMA Rp 20.450.000 (Terdapat diskon khusus lulusan SMP MBI).
   - Tahun ke-2 & ke-3: SMP Rp 9.500.000/tahun | SMA Rp 9.700.000/tahun.
   - Psikotes Tahap II: SMP Rp 200.000, SMA Rp 300.000 (dibayarkan jika lolos Tahap I).

7. Timeline & Seleksi PSB 2027/2028:
   - Pendaftaran: 1 September - 1 Mei 2027 (bisa tutup lebih cepat jika kuota 40 santriwati terpenuhi).
   - Seleksi Tahap I: Tes tulis diniyyah, wawancara santriwati & wali santri, tes bacaan & hafalan Al-Qur'an.
   - Seleksi Tahap II: Psikotes online dan kelengkapan berkas kesehatan lab (darah lengkap, SGPT/SGOT, rontgen paru-paru, surat dokter).
   - Daftar Ulang.

Berikan jawaban yang ramah, informatif, singkat-padat, mudah dimengerti, dan beri saran langkah pendaftaran online di website ini.`;

// Rule-based fallback answers if Gemini key is not configured or fails
function getFallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("biaya") || q.includes("spp") || q.includes("uang") || q.includes("bayar") || q.includes("harga") || q.includes("diskon")) {
    return `Afwan Bunda/Ayah, berikut rincian biaya pendidikan di Ma'had Baitusunnah Indonesia:
• **Biaya Pendaftaran:** Rp 400.000 (*Diskon 6,25% menjadi Rp 375.000 untuk pendaftaran September - Desember 2026*). Ditransfer ke BSI Rekening: **2015202190** a.n. **Yayasan Rumah Sunnah Indonesia**.
• **SPP Bulanan:** Rp 2.250.000/bulan (asrama AC, makan bergizi 3x, laundry, KBM).
• **Total Biaya Tahun ke-1:** SMP Rp 19.050.000 | SMA Rp 20.450.000 (ada potongan khusus alumni SMP MBI).
• **Tahun ke-2 & ke-3:** SMP Rp 9.500.000/thn | SMA Rp 9.700.000/thn.
• **Psikotes Tahap II:** SMP Rp 200.000, SMA Rp 300.000 (setelah lolos Tahap I).

Bunda/Ayah dapat langsung mengisi formulir pendaftaran online pada tab 'Formulir PSB'!`;
  }

  if (q.includes("tahfidz") || q.includes("hafalan") || q.includes("juz") || q.includes("sanad") || q.includes("metode") || q.includes("akselerasi") || q.includes("lajnah") || q.includes("matan")) {
    return `Alhamdulillah, sesuai Dokumen Resmi Kurikulum & Pengelolaan Pembelajaran Al-Qur'an Berjenjang Ma'had Baitu Sunnah Indonesia:
• **Target Berjenjang:**
  - JENJANG SMP: Target 15 Juz (5 juz/tahun)
  - JENJANG SMA: Target 30 Juz (10 juz/tahun mutqin)
• **Tahapan Pembelajaran Sistematis:**
  1. *01 Fase Intensif (2 Bulan Pertama):* Penyelarasan & penyempurnaan kualitas bacaan (tahsin) seluruh santri sebelum memulai hafalan baru.
  2. *02 Fase Reguler:* Penambahan hafalan baru dengan pengulangan konsisten menjaga ketahanan hafalan.
  3. *03 Fase Akselerasi:* Percepatan penyelesaian hafalan hingga 30 juz bagi santri yang memenuhi kriteria kualifikasi & evaluasi khusus.
• **4 Pilar Standarisasi Mutu:**
  - Pengajar halaqah kompeten & berpengalaman.
  - Pengujian kelayakan setiap juz oleh Lajnah Iktibar Bersanad.
  - Program sanad matan tajwid santri langsung diampu oleh syaikhoh.
  - Target terstruktur & pemantauan aplikasi digital real-time untuk orang tua di rumah.
• **Visi Tahfidz:** *"Mencetak generasi pembawa Al-Qur'an yang memiliki kualitas bacaan sesuai kaidah, sanad matan tajwid, dan disiplin hafalan yang kokoh."*

Silakan kunjungi tab khusus 'Program Tahfidz' di atas untuk melihat dokumen lengkap serta simulasi pemantauan digital!`;
  }

  if (q.includes("jadwal") || q.includes("timeline") || q.includes("kapan") || q.includes("gelombang") || q.includes("tanggal")) {
    return `Jadwal Timeline PSB 2027/2028 Ma'had Baitusunnah Indonesia:
• **Periode Pendaftaran:** 1 September – 1 Mei 2027 (akan ditutup sewaktu-waktu jika kuota terpenuhi).
• **One Day Service / Dijadwalkan:** Pendaftaran bisa via online maupun offline di ma'had.
• **Seleksi Tahap I:** Tes tulis diniyyah, wawancara calon santriwati & wali santri, tes bacaan & hafalan Al-Qur'an.
• **Seleksi Tahap II:** Tes psikotes online & pengumpulan berkas kesehatan lab.
• **Daftar Ulang:** Bagi santriwati yang dinyatakan diterima.

Kami sarankan segera mendaftar lebih awal karena kuota terbatas hanya 40 santriwati!`;
  }

  if (q.includes("syarat") || q.includes("berkas") || q.includes("dokumen")) {
    return `Berikut berkas persyaratan PSB yang perlu disiapkan:
1. FC Ijazah dilegalisir (jika sudah terbit)
2. FC Akte Kelahiran (3 lembar)
3. FC Kartu Keluarga (3 lembar)
4. FC KTP Orang Tua (3 lembar)
5. Pas foto merah (2x3, 3x4, 4x6 masing-masing 4 lembar)
6. FC NISN & FC Rapot kelas 4-5
7. Surat Keterangan Kelas 6 & Kelakuan Baik dari sekolah asal
8. FC Sertifikat Prestasi (jika ada)
9. Berkas Kesehatan Lab (Darah lengkap, SGPT/SGOT, Rontgen Paru, Surat Sehat Dokter)

Berkas dapat diunggah digital atau diserahkan saat verifikasi/tes di ma'had.`;
  }

  if (q.includes("kuota") || q.includes("kapasitas") || q.includes("banyak")) {
    return `Ma'had Baitusunnah Indonesia membuka kuota SANGAT TERBATAS hanya untuk **40 Santriwati**:
• **Jenjang SMP:** 30 Santriwati
• **Jenjang SMA:** 10 Santriwati
Pembatasan kuota ini kami terapkan demi menjaga rasio halaqoh tahfidz yang ideal (8-10 santriwati per ustadzah) dan pembinaan akhlak yang intensif.`;
  }

  if (q.includes("lokasi") || q.includes("alamat") || q.includes("kontak") || q.includes("wa") || q.includes("nomor")) {
    return `📍 **Alamat Ma'had Baitusunnah Indonesia:**
Jl. Puri Hidayah No. 50, RT.04/RW.04, Jatiluhur, Jatiasih, Kota Bekasi, Jawa Barat.

📞 **Kontak Informasi & PSB:**
• WhatsApp PSB: 082247044181
• WhatsApp Konfirmasi Pembayaran: 0895322231882
• Instagram: @mahadbaitusunnahindonesia
• Website: www.mahadbaitusunnahindonesia.com`;
  }

  if (q.includes("aplikasi") || q.includes("apps") || q.includes("download") || q.includes("unduh") || q.includes("mutabaah") || q.includes("monitoring") || q.includes("rapor") || q.includes("rapot")) {
    return `📲 **Aplikasi Monitoring Tahfidz (MBI Apps):**
Aplikasi ini khusus untuk pemantauan mutaba'ah hafalan Al-Qur'an santriwati secara real-time, sekaligus untuk mengakses e-rapor santriwati (di mana rapor tahfidz diterbitkan bergabung bersama rapor asrama).

Tautan akses resmi aplikasi:
👉 **https://s.id/MBIApps**

Fitur Utama:
1. **Monitoring Khusus Tahfidz Real-Time**: Cek setoran ziyadah harian, kelancaran surah, & evaluasi tajwid bersanad langsung dari halaqah.
2. **Akses Rapor Terpadu (Tahfidz & Asrama)**: Unduh e-rapor resmi santriwati, di mana nilai capaian tahfidz disajikan terpadu bergabung dalam rapor asrama.
3. **Jadwal Muraja'ah Mutqin & Lajnah Iktibar**: Pemetaan jadwal muraja'ah terjadwal dan laporan kelayakan kenaikan juz oleh tim penguji bersanad.`;
  }

  return `Assalamu'alaikum warahmatullah. Terima kasih atas pertanyaan Bunda/Ayah mengenai PSB Ma'had Baitusunnah Indonesia 2027/2028 (Asrama Khusus Akhwat).
Kami siap membantu informasi mengenai:
1. Program Unggulan Tahfidz Bersanad (SMP 15 Juz, SMA 30 Juz)
2. Biaya Pendidikan & Diskon Periode September-Desember 2026
3. Persyaratan Berkas & Timeline Seleksi
4. Kuota Pendaftaran (hanya 40 santriwati)
5. Panduan Pengisian Formulir Online & Pembayaran BSI

Ada yang bisa kami bantu jelaskan lebih lanjut, Bunda/Ayah?`;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const ai = getGemini();
    if (!ai) {
      // Return smart fallback answer
      const reply = getFallbackAnswer(message);
      return res.json({ reply, source: "knowledge_base" });
    }

    // Call Gemini 3.8 Flash model
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || getFallbackAnswer(message);
    res.json({ reply, source: "gemini" });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error?.message || error);
    // Graceful fallback to avoid breaking chat UI
    const reply = getFallbackAnswer(req.body?.message || "");
    res.json({ reply, source: "knowledge_base_fallback" });
  }
});

// Mock database for submitted registrations (in-memory for session persistence)
const registrations: any[] = [];

app.post("/api/register", (req, res) => {
  const data = req.body;
  const registrationId = `MBI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const record = {
    ...data,
    registrationId,
    status: "MENUNGGU_PEMBAYARAN",
    createdAt: new Date().toISOString(),
  };
  registrations.push(record);
  res.json({ success: true, registrationId, record });
});

app.get("/api/registration/:id", (req, res) => {
  const found = registrations.find((r) => r.registrationId === req.params.id);
  if (found) {
    res.json({ success: true, record: found });
  } else {
    res.status(404).json({ success: false, message: "Pendaftaran tidak ditemukan" });
  }
});

async function startServer() {
  const isProduction =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.K_SERVICE) ||
    process.env.npm_lifecycle_event === "start";

  const distPath = path.join(process.cwd(), "dist");
  const indexPath = path.join(distPath, "index.html");

  if (isProduction) {
    // If running in production container and dist/index.html is missing, build it
    if (!fs.existsSync(indexPath)) {
      console.warn(`[Server] dist/index.html not found at ${indexPath}. Triggering vite build...`);
      try {
        execSync("npx vite build", { stdio: "inherit" });
      } catch (err) {
        console.error("[Server] On-demand vite build failed:", err);
      }
    }

    if (fs.existsSync(indexPath)) {
      console.log(`[Server] Serving production static files from ${distPath}`);
      app.use(express.static(distPath));
      app.get("*", (req, res, next) => {
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          next();
        }
      });
    } else {
      console.warn("[Server] dist/index.html still unavailable. Falling back to Vite middleware...");
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    }
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  // Fallback 404 handler for unmatched routes
  app.use((_req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(200).send("<!DOCTYPE html><html><body><h1>Ma'had Baitusunnah Indonesia</h1></body></html>");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} (${isProduction ? "production" : "development"})`);
  });
}

startServer();
