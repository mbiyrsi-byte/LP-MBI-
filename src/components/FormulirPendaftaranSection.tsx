import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import MbiLogo from './MbiLogo';
import { 
  FileText, 
  User, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface FormulirProps {
  onFormSubmitted: (data: RegistrationFormData, registrationId: string) => void;
  onBackToBeranda?: () => void;
}

const INITIAL_FORM_DATA: RegistrationFormData = {
  jenjang: 'SMP',
  namaLengkap: '',
  nisn: '',
  tempatLahir: '',
  tanggalLahir: '',
  asalSekolah: '',
  alamatAsalSekolah: '',
  hafalanSebelumnya: 'Belum ada',
  namaAyah: '',
  pekerjaanAyah: '',
  namaIbu: '',
  pekerjaanIbu: '',
  nomorWhatsapp: '',
  emailWali: '',
  alamatRumah: '',
  kotaKabupaten: '',
  provinsi: '',
  jalurPendaftaran: 'Online',
  catatanKhusus: '',
  berkasChecklist: {
    ijazah: false,
    akte: true,
    kartuKeluarga: true,
    ktpOrangTua: true,
    pasFoto: true,
    nisn: true,
    rapot: true,
    suratKelakuanBaik: false,
    suratKesehatan: false,
    sertifikatPrestasi: false,
  }
};

export default function FormulirPendaftaranSection({ onFormSubmitted, onBackToBeranda }: FormulirProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (field: keyof RegistrationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError(null);
  };

  const handleChecklistChange = (field: keyof RegistrationFormData['berkasChecklist']) => {
    setFormData(prev => ({
      ...prev,
      berkasChecklist: {
        ...prev.berkasChecklist,
        [field]: !prev.berkasChecklist[field]
      }
    }));
  };

  // Demo auto-fill helper
  const handleAutoFillDemo = () => {
    setFormData({
      jenjang: 'SMP',
      namaLengkap: 'Khadijah Nurul Fathimah',
      nisn: '0129847123',
      tempatLahir: 'Bekasi',
      tanggalLahir: '2014-06-12',
      asalSekolah: 'SDIT Al-Ihsan',
      alamatAsalSekolah: 'Jatiasih, Kota Bekasi',
      hafalanSebelumnya: '2 Juz (Juz 30 & 29)',
      namaAyah: 'Ahmad Fauzi, S.T.',
      pekerjaanAyah: 'Karyawan Swasta',
      namaIbu: 'Nurul Hidayati, S.Pd.',
      pekerjaanIbu: 'Guru',
      nomorWhatsapp: '081234567890',
      emailWali: 'keluarga.fauzi@gmail.com',
      alamatRumah: 'Jl. Melati Indah No. 12, RT 02/05',
      kotaKabupaten: 'Kota Bekasi',
      provinsi: 'Jawa Barat',
      jalurPendaftaran: 'Online',
      catatanKhusus: 'Putri kami berkeinginan kuat menyelesaikan target 15 juz hafalan lancar.',
      berkasChecklist: {
        ijazah: false,
        akte: true,
        kartuKeluarga: true,
        ktpOrangTua: true,
        pasFoto: true,
        nisn: true,
        rapot: true,
        suratKelakuanBaik: true,
        suratKesehatan: false,
        sertifikatPrestasi: true,
      }
    });
    setValidationError(null);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.namaLengkap.trim()) {
        setValidationError('Nama lengkap calon santriwati wajib diisi.');
        return false;
      }
      if (!formData.tempatLahir.trim() || !formData.tanggalLahir) {
        setValidationError('Tempat dan tanggal lahir wajib diisi.');
        return false;
      }
      if (!formData.asalSekolah.trim()) {
        setValidationError('Asal sekolah wajib diisi.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.namaAyah.trim() && !formData.namaIbu.trim()) {
        setValidationError('Nama orang tua (Ayah/Ibu) wajib diisi.');
        return false;
      }
      if (!formData.nomorWhatsapp.trim() || formData.nomorWhatsapp.length < 9) {
        setValidationError('Nomor WhatsApp aktif wajib diisi untuk konfirmasi pendaftaran.');
        return false;
      }
      if (!formData.alamatRumah.trim() || !formData.kotaKabupaten.trim()) {
        setValidationError('Alamat rumah dan kota/kabupaten wajib diisi.');
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => (prev < 4 ? ((prev + 1) as any) : prev));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev > 1 ? ((prev - 1) as any) : prev));
    setValidationError(null);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resJson = await response.json();
      const generatedId = resJson.registrationId || `MBI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      onFormSubmitted(formData, generatedId);
    } catch (err) {
      // Fallback client registration ID if offline
      const fallbackId = `MBI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      onFormSubmitted(formData, fallbackId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Quick Back Button */}
      {onBackToBeranda && (
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
            Ma'had Baitussunnah Indonesia • Formulir Registrasi
          </span>
        </div>
      )}

      {/* Header Form */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex justify-center mb-1">
          <MbiLogo className="w-16 h-16 rounded-full ring-2 ring-[#D4A373] p-1 bg-white shadow-md" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-100 text-burgundy-800 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-burgundy-700" />
          Formulir PSB 2027/2028
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-burgundy-950">
          Pendaftaran Santriwati Baru Ma'had Baitusunnah
        </h1>
        <p className="text-xs sm:text-sm text-coffee-700 max-w-xl mx-auto">
          Silakan lengkapi data calon santriwati dan orang tua/wali dengan cermat dan benar.
        </p>

        {/* Demo Auto-fill Helper Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-1.5 text-xs text-coffee-600 bg-coffee-100 hover:bg-coffee-200 px-3 py-1.5 rounded-lg border border-coffee-300 transition-colors font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Isi Contoh Data Otomatis (Demo)</span>
          </button>
        </div>
      </div>

      {/* Stepper Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-coffee-200 shadow-xs mb-8">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          
          <div className={`space-y-1 ${currentStep >= 1 ? 'text-burgundy-900 font-bold' : 'text-coffee-400'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black ${
              currentStep >= 1 ? 'bg-burgundy-800 text-white' : 'bg-coffee-100 text-coffee-600'
            }`}>
              1
            </div>
            <span className="hidden sm:inline">Data Santriwati</span>
          </div>

          <div className={`space-y-1 ${currentStep >= 2 ? 'text-burgundy-900 font-bold' : 'text-coffee-400'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black ${
              currentStep >= 2 ? 'bg-burgundy-800 text-white' : 'bg-coffee-100 text-coffee-600'
            }`}>
              2
            </div>
            <span className="hidden sm:inline">Orang Tua / Wali</span>
          </div>

          <div className={`space-y-1 ${currentStep >= 3 ? 'text-burgundy-900 font-bold' : 'text-coffee-400'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black ${
              currentStep >= 3 ? 'bg-burgundy-800 text-white' : 'bg-coffee-100 text-coffee-600'
            }`}>
              3
            </div>
            <span className="hidden sm:inline">Berkas & Jalur</span>
          </div>

          <div className={`space-y-1 ${currentStep >= 4 ? 'text-burgundy-900 font-bold' : 'text-coffee-400'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black ${
              currentStep >= 4 ? 'bg-burgundy-800 text-white' : 'bg-coffee-100 text-coffee-600'
            }`}>
              4
            </div>
            <span className="hidden sm:inline">Konfirmasi & Review</span>
          </div>

        </div>
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Form Content Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-coffee-200 shadow-sm space-y-6">
        
        {/* STEP 1: DATA SANTRIWATI */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-coffee-100">
              <User className="w-5 h-5 text-burgundy-800" />
              <h3 className="font-black text-burgundy-950 text-base sm:text-lg">
                Tahap 1: Pilihan Jenjang & Identitas Calon Santriwati
              </h3>
            </div>

            {/* Pilihan Jenjang SMP vs SMA */}
            <div>
              <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wider mb-2">
                Pilihan Jenjang Pendidikan <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('jenjang', 'SMP')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.jenjang === 'SMP'
                      ? 'border-burgundy-800 bg-burgundy-50/70 ring-2 ring-burgundy-800/20'
                      : 'border-coffee-200 hover:border-coffee-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-burgundy-950 text-sm">Jenjang SMP</span>
                    <span className="text-[10px] font-bold bg-burgundy-200 text-burgundy-900 px-2 py-0.5 rounded">
                      Kuota: 30
                    </span>
                  </div>
                  <p className="text-xs text-coffee-700">Target Tahfidz: 15 Juz</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('jenjang', 'SMA')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.jenjang === 'SMA'
                      ? 'border-burgundy-800 bg-burgundy-50/70 ring-2 ring-burgundy-800/20'
                      : 'border-coffee-200 hover:border-coffee-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-burgundy-950 text-sm">Jenjang SMA</span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      Kuota: 10
                    </span>
                  </div>
                  <p className="text-xs text-coffee-700">Target Tahfidz: 30 Juz</p>
                </button>
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-coffee-900 mb-1">
                Nama Lengkap Calon Santriwati <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={formData.namaLengkap}
                onChange={e => handleInputChange('namaLengkap', e.target.value)}
                placeholder="Contoh: Khadijah Nurul Fathimah"
                className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                required
              />
            </div>

            {/* NISN & Tempat Tanggal Lahir */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  NISN (10 Digit)
                </label>
                <input
                  type="text"
                  value={formData.nisn}
                  onChange={e => handleInputChange('nisn', e.target.value)}
                  placeholder="Contoh: 0123456789"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Tempat Lahir <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tempatLahir}
                  onChange={e => handleInputChange('tempatLahir', e.target.value)}
                  placeholder="Contoh: Bekasi"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Tanggal Lahir <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={e => handleInputChange('tanggalLahir', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>
            </div>

            {/* Asal Sekolah & Riwayat Hafalan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Asal Sekolah (SD/MI/SMP/MTs) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.asalSekolah}
                  onChange={e => handleInputChange('asalSekolah', e.target.value)}
                  placeholder="Contoh: SDIT Al-Ihsan Bekasi"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Riwayat Hafalan Al-Qur'an Sebelumnya
                </label>
                <select
                  value={formData.hafalanSebelumnya}
                  onChange={e => handleInputChange('hafalanSebelumnya', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600 bg-white"
                >
                  <option value="Belum ada">Belum ada hafalan</option>
                  <option value="Juz 30 (Sebagian)">Juz 30 (Sebagian)</option>
                  <option value="1 Juz (Juz 30 Lancar)">1 Juz (Juz 30 Lancar)</option>
                  <option value="2-3 Juz">2 – 3 Juz</option>
                  <option value="4-5 Juz">4 – 5 Juz</option>
                  <option value="Lebih dari 5 Juz">Lebih dari 5 Juz</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATA ORANG TUA / WALI */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-coffee-100">
              <Users className="w-5 h-5 text-burgundy-800" />
              <h3 className="font-black text-burgundy-950 text-base sm:text-lg">
                Tahap 2: Data Orang Tua / Wali Santri
              </h3>
            </div>

            {/* Nama Ayah & Ibu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Nama Lengkap Ayah <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaAyah}
                  onChange={e => handleInputChange('namaAyah', e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi, S.T."
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Pekerjaan Ayah
                </label>
                <input
                  type="text"
                  value={formData.pekerjaanAyah}
                  onChange={e => handleInputChange('pekerjaanAyah', e.target.value)}
                  placeholder="Contoh: Wiraswasta / Karyawan"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Nama Lengkap Ibu <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaIbu}
                  onChange={e => handleInputChange('namaIbu', e.target.value)}
                  placeholder="Contoh: Nurul Hidayati, S.Pd."
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Pekerjaan Ibu
                </label>
                <input
                  type="text"
                  value={formData.pekerjaanIbu}
                  onChange={e => handleInputChange('pekerjaanIbu', e.target.value)}
                  placeholder="Contoh: Ibu Rumah Tangga / Guru"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>
            </div>

            {/* Kontak: WhatsApp & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Nomor WhatsApp Aktif Wali <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.nomorWhatsapp}
                  onChange={e => handleInputChange('nomorWhatsapp', e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
                <span className="text-[10px] text-coffee-500 mt-1 block">
                  Penting: Digunakan untuk pengiriman bukti pendaftaran & jadwal tes seleksi.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Email Wali Santri
                </label>
                <input
                  type="email"
                  value={formData.emailWali}
                  onChange={e => handleInputChange('emailWali', e.target.value)}
                  placeholder="Contoh: orangtua@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>
            </div>

            {/* Alamat Rumah Lengkap */}
            <div>
              <label className="block text-xs font-bold text-coffee-900 mb-1">
                Alamat Domisili Rumah <span className="text-rose-600">*</span>
              </label>
              <textarea
                value={formData.alamatRumah}
                onChange={e => handleInputChange('alamatRumah', e.target.value)}
                placeholder="Jalan, RT/RW, Nomor Rumah, Kelurahan, Kecamatan"
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Kota / Kabupaten <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.kotaKabupaten}
                  onChange={e => handleInputChange('kotaKabupaten', e.target.value)}
                  placeholder="Contoh: Kota Bekasi"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-900 mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={formData.provinsi}
                  onChange={e => handleInputChange('provinsi', e.target.value)}
                  placeholder="Contoh: Jawa Barat"
                  className="w-full px-4 py-2.5 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
                />
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: CHECKLIST BERKAS & JALUR SELEKSI */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-coffee-100">
              <FileText className="w-5 h-5 text-burgundy-800" />
              <h3 className="font-black text-burgundy-950 text-base sm:text-lg">
                Tahap 3: Pilihan Jalur & Kesiapan Berkas
              </h3>
            </div>

            {/* Jalur Pendaftaran */}
            <div>
              <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wider mb-2">
                Pilihan Jalur Pelaksanaan Seleksi
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`p-4 rounded-xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.jalurPendaftaran === 'Online'
                    ? 'border-burgundy-800 bg-burgundy-50/70'
                    : 'border-coffee-200'
                }`}>
                  <input
                    type="radio"
                    name="jalurPendaftaran"
                    checked={formData.jalurPendaftaran === 'Online'}
                    onChange={() => handleInputChange('jalurPendaftaran', 'Online')}
                    className="mt-1 text-burgundy-700 focus:ring-burgundy-500"
                  />
                  <div>
                    <span className="font-bold text-burgundy-950 text-xs sm:text-sm block">
                      Jalur Online (Daring)
                    </span>
                    <span className="text-xs text-coffee-700">
                      Wawancara & tes Al-Qur'an via video call terjadwal. Cocok untuk luar kota / Jabodetabek.
                    </span>
                  </div>
                </label>

                <label className={`p-4 rounded-xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  formData.jalurPendaftaran === "Offline di Ma'had"
                    ? 'border-burgundy-800 bg-burgundy-50/70'
                    : 'border-coffee-200'
                }`}>
                  <input
                    type="radio"
                    name="jalurPendaftaran"
                    checked={formData.jalurPendaftaran === "Offline di Ma'had"}
                    onChange={() => handleInputChange('jalurPendaftaran', "Offline di Ma'had")}
                    className="mt-1 text-burgundy-700 focus:ring-burgundy-500"
                  />
                  <div>
                    <span className="font-bold text-burgundy-950 text-xs sm:text-sm block">
                      Jalur Offline / One Day Service di Ma'had
                    </span>
                    <span className="text-xs text-coffee-700">
                      Datang langsung ke Ma'had MBI Jatiluhur Jatiasih Bekasi. Tes & wawancara selesai 1 hari.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Checklist Berkas */}
            <div>
              <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wider mb-2">
                Checklist Dokumen yang Telah / Siap Diserahkan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'akte', label: 'FC Akte Kelahiran (3 lembar)' },
                  { key: 'kartuKeluarga', label: 'FC Kartu Keluarga (3 lembar)' },
                  { key: 'ktpOrangTua', label: 'FC KTP Orang Tua (3 lembar)' },
                  { key: 'pasFoto', label: 'Pas Foto latar merah 2x3, 3x4, 4x6' },
                  { key: 'nisn', label: 'FC Kartu NISN Kemdikbud' },
                  { key: 'rapot', label: 'FC Rapot kelas 4-5 (SMP) / 7-8 (SMA)' },
                  { key: 'suratKelakuanBaik', label: 'Surat Keterangan Sekolah & Kelakuan Baik' },
                  { key: 'ijazah', label: 'FC Ijazah (Bisa menyusul jika belum terbit)' },
                  { key: 'suratKesehatan', label: 'Berkas Hasil Lab Kesehatan (Tahap II)' },
                  { key: 'sertifikatPrestasi', label: 'Sertifikat Prestasi Tahfidz / Akademik (Opsional)' },
                ].map((item) => (
                  <label 
                    key={item.key}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-coffee-200 hover:bg-coffee-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.berkasChecklist as any)[item.key]}
                      onChange={() => handleChecklistChange(item.key as any)}
                      className="w-4 h-4 text-burgundy-700 rounded focus:ring-burgundy-500"
                    />
                    <span className="text-coffee-900">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-coffee-900 mb-1">
                Catatan Khusus / Harapan Orang Tua (Opsional)
              </label>
              <textarea
                value={formData.catatanKhusus}
                onChange={e => handleInputChange('catatanKhusus', e.target.value)}
                placeholder="Tuliskan motivasi, kondisi kesehatan khusus, atau target hafalan santriwati..."
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-coffee-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600"
              />
            </div>

          </div>
        )}

        {/* STEP 4: REVIEW DATA & SUBMISSION */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-coffee-100">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h3 className="font-black text-burgundy-950 text-base sm:text-lg">
                Tahap 4: Konfirmasi & Validasi Formulir Pendaftaran
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-900">Promo Diskon Pendaftaran 6,25% Aktif!</strong>
                <span>
                  Setelah data ini disimpan, Anda akan diarahkan ke invoice pembayaran biaya pendaftaran sebesar <strong>Rp 375.000,-</strong> (dari normal Rp 400.000).
                </span>
              </div>
            </div>

            {/* Summary Data Review */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-coffee-50 border border-coffee-200 space-y-1.5">
                <span className="font-bold text-burgundy-900 uppercase text-[10px] block">Data Santriwati:</span>
                <div><strong>Nama:</strong> {formData.namaLengkap || '-'}</div>
                <div><strong>Jenjang:</strong> {formData.jenjang} (Target: {formData.jenjang === 'SMP' ? '15 Juz' : '30 Juz'})</div>
                <div><strong>TTL:</strong> {formData.tempatLahir}, {formData.tanggalLahir}</div>
                <div><strong>Asal Sekolah:</strong> {formData.asalSekolah}</div>
                <div><strong>Riwayat Hafalan:</strong> {formData.hafalanSebelumnya}</div>
              </div>

              <div className="p-4 rounded-xl bg-coffee-50 border border-coffee-200 space-y-1.5">
                <span className="font-bold text-burgundy-900 uppercase text-[10px] block">Data Orang Tua / Kontak:</span>
                <div><strong>Nama Ayah:</strong> {formData.namaAyah || '-'}</div>
                <div><strong>Nama Ibu:</strong> {formData.namaIbu || '-'}</div>
                <div><strong>WhatsApp:</strong> {formData.nomorWhatsapp}</div>
                <div><strong>Domisili:</strong> {formData.kotaKabupaten}, {formData.provinsi}</div>
                <div><strong>Jalur Seleksi:</strong> {formData.jalurPendaftaran}</div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Data telah lengkap dan siap diverifikasi oleh panitia PSB MBI.</span>
            </div>
          </div>
        )}

        {/* Form Navigation Buttons */}
        <div className="pt-4 border-t border-coffee-100 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 rounded-xl border border-coffee-300 text-coffee-800 text-xs sm:text-sm font-bold hover:bg-coffee-50 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-burgundy-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Menyimpan Pendaftaran...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-burgundy-950" />
                  <span>Simpan & Lanjut ke Pembayaran</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

    </div>
  );
}
