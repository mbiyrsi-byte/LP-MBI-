export type ActiveTab = 'beranda' | 'tahfidz' | 'biaya-syarat' | 'formulir' | 'pembayaran' | 'testimoni';

export interface RegistrationFormData {
  // Step 1: Santriwati Info
  jenjang: 'SMP' | 'SMA';
  namaLengkap: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  asalSekolah: string;
  alamatAsalSekolah: string;
  hafalanSebelumnya: string; // e.g., "1 Juz", "2 Juz", "Belum ada"
  
  // Step 2: Parent / Wali Info
  namaAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  pekerjaanIbu: string;
  nomorWhatsapp: string;
  emailWali: string;
  alamatRumah: string;
  kotaKabupaten: string;
  provinsi: string;

  // Step 3: Pilihan Seleksi
  jalurPendaftaran: 'Online' | 'Offline di Ma\'had';
  catatanKhusus?: string;

  // Step 4: Berkas Checklist (Simulasi upload/centang)
  berkasChecklist: {
    ijazah: boolean;
    akte: boolean;
    kartuKeluarga: boolean;
    ktpOrangTua: boolean;
    pasFoto: boolean;
    nisn: boolean;
    rapot: boolean;
    suratKelakuanBaik: boolean;
    suratKesehatan: boolean;
    sertifikatPrestasi: boolean;
  };
}

export interface PaymentRecord {
  registrationId: string;
  studentName: string;
  jenjang: 'SMP' | 'SMA';
  amount: number;
  originalAmount: number;
  discountApplied: boolean;
  discountPercentage: number;
  paymentMethod: 'qris' | 'va_bsi' | 'transfer_manual';
  status: 'pending' | 'verified' | 'uploaded';
  paymentDate: string;
  transactionRef: string;
  proofFileName?: string;
  senderBank?: string;
  senderName?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'bot';
  text: string;
  timestamp: string;
}
