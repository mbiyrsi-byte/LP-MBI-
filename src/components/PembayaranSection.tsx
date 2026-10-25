import { useState } from 'react';
import { RegistrationFormData, PaymentRecord } from '../types';
import { BIAYA_DATA } from '../data/psbData';
import MbiLogo from './MbiLogo';
import { 
  CreditCard, 
  CheckCircle2, 
  Copy, 
  Check, 
  UploadCloud, 
  QrCode, 
  Building, 
  ArrowRight, 
  FileCheck, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Download,
  AlertCircle,
  Smartphone,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

interface PembayaranSectionProps {
  registrationId?: string;
  applicantData?: RegistrationFormData | null;
  onPaymentSuccess?: () => void;
  onBackToBeranda?: () => void;
}

export default function PembayaranSection({ registrationId, applicantData, onBackToBeranda }: PembayaranSectionProps) {
  // Demo state
  const activeRegId = registrationId || 'MBI-2027-48291';
  const applicantName = applicantData?.namaLengkap || 'Khadijah Nurul Fathimah';
  const jenjang = applicantData?.jenjang || 'SMP';

  const [paymentMethod, setPaymentMethod] = useState<'bsi_transfer' | 'qris' | 'va_bsi'>('bsi_transfer');
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedNominal, setCopiedNominal] = useState(false);
  const [copiedRegId, setCopiedRegId] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [senderBank, setSenderBank] = useState('');
  const [senderAccountName, setSenderAccountName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'verified'>('pending');

  const promoAmount = BIAYA_DATA.diskonPendaftaran.nominalSetelahDiskon; // 375.000
  const uniqueCode = 127;
  const totalTransfer = promoAmount + uniqueCode; // 375.127 for auto verification

  const formatRp = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const copyToClipboard = (text: string, type: 'bank' | 'nominal' | 'reg') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else if (type === 'nominal') {
      setCopiedNominal(true);
      setTimeout(() => setCopiedNominal(false), 2000);
    } else {
      setCopiedRegId(true);
      setTimeout(() => setCopiedRegId(false), 2000);
    }
  };

  const handleSimulateConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('verified');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
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
            Ma'had Baitussunnah Indonesia • Pembayaran
          </span>
        </div>
      )}

      {/* Title */}
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-1">
          <MbiLogo className="w-16 h-16 rounded-full ring-2 ring-[#D4A373] p-1 bg-white shadow-md" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          Sistem Pembayaran Terintegrasi
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-burgundy-950">
          Pembayaran Biaya Pendaftaran PSB
        </h1>
        <p className="text-xs sm:text-sm text-coffee-700 max-w-xl mx-auto">
          Selesaikan pembayaran formulir pendaftaran untuk mengunci kuota santriwati dan mendapatkan jadwal seleksi.
        </p>
      </div>

      {/* Invoice Card Header */}
      <div className="bg-white rounded-2xl border border-coffee-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-coffee-100">
          <div>
            <span className="text-xs font-semibold text-coffee-500">Nomor Registrasi PSB:</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-burgundy-900 tracking-wide font-mono">
                {activeRegId}
              </span>
              <button
                onClick={() => copyToClipboard(activeRegId, 'reg')}
                className="p-1 rounded-md text-coffee-600 hover:bg-coffee-100 transition-colors"
                title="Salin Nomor Pendaftaran"
              >
                {copiedRegId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold text-coffee-500">Status Pembayaran:</span>
            <div className="mt-0.5">
              {paymentStatus === 'verified' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Lunas & Terverifikasi
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 animate-pulse">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Menunggu Pembayaran
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bill Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-coffee-50 p-4 rounded-xl border border-coffee-200">
          <div>
            <span className="text-coffee-600 block">Calon Santriwati:</span>
            <strong className="text-burgundy-950 text-sm font-bold block mt-0.5">{applicantName}</strong>
            <span className="text-coffee-600 text-[11px]">Jenjang {jenjang}</span>
          </div>
          <div>
            <span className="text-coffee-600 block">Jenis Tagihan:</span>
            <strong className="text-coffee-900 text-sm font-bold block mt-0.5">Formulir PSB 2027/2028</strong>
            <span className="text-emerald-700 text-[11px] font-semibold">Diskon Promo 6,25% Aktif</span>
          </div>
          <div>
            <span className="text-coffee-600 block">Total Ditransfer:</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <strong className="text-burgundy-900 text-lg font-black">{formatRp(totalTransfer)}</strong>
            </div>
            <span className="text-coffee-500 text-[10px]">*Sudah termasuk kode unik Rp {uniqueCode}</span>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div>
          <label className="block text-xs font-bold text-coffee-900 uppercase tracking-wider mb-3">
            Pilih Saluran Pembayaran:
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <button
              onClick={() => setPaymentMethod('bsi_transfer')}
              className={`p-3 sm:p-4 rounded-xl border text-center transition-all ${
                paymentMethod === 'bsi_transfer'
                  ? 'border-burgundy-800 bg-burgundy-50 text-burgundy-900 font-bold ring-2 ring-burgundy-800/20'
                  : 'border-coffee-200 text-coffee-700 hover:border-coffee-300'
              }`}
            >
              <Building className="w-5 h-5 mx-auto mb-1 text-burgundy-800" />
              <span className="text-xs sm:text-sm block">Transfer BSI Resmi</span>
              <span className="text-[10px] text-coffee-500 hidden sm:block">Yayasan Rumah Sunnah</span>
            </button>

            <button
              onClick={() => setPaymentMethod('qris')}
              className={`p-3 sm:p-4 rounded-xl border text-center transition-all ${
                paymentMethod === 'qris'
                  ? 'border-burgundy-800 bg-burgundy-50 text-burgundy-900 font-bold ring-2 ring-burgundy-800/20'
                  : 'border-coffee-200 text-coffee-700 hover:border-coffee-300'
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1 text-burgundy-800" />
              <span className="text-xs sm:text-sm block">QRIS Syariah</span>
              <span className="text-[10px] text-coffee-500 hidden sm:block">Semua E-Wallet & M-Banking</span>
            </button>

            <button
              onClick={() => setPaymentMethod('va_bsi')}
              className={`p-3 sm:p-4 rounded-xl border text-center transition-all ${
                paymentMethod === 'va_bsi'
                  ? 'border-burgundy-800 bg-burgundy-50 text-burgundy-900 font-bold ring-2 ring-burgundy-800/20'
                  : 'border-coffee-200 text-coffee-700 hover:border-coffee-300'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1 text-burgundy-800" />
              <span className="text-xs sm:text-sm block">Virtual Account</span>
              <span className="text-[10px] text-coffee-500 hidden sm:block">Konfirmasi Otomatis</span>
            </button>
          </div>
        </div>

        {/* Method 1: BSI Transfer Detail */}
        {paymentMethod === 'bsi_transfer' && (
          <div className="p-5 rounded-2xl bg-burgundy-50/60 border border-burgundy-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-burgundy-900">Rekening Resmi Ma'had Baitusunnah:</span>
                <h4 className="text-sm font-black text-burgundy-950">BANK SYARIAH INDONESIA (BSI)</h4>
              </div>
              <span className="px-2.5 py-1 bg-burgundy-800 text-white rounded text-[10px] font-bold">
                Kode Bank: 451
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-coffee-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-coffee-600 block">Nomor Rekening:</span>
                <span className="text-xl sm:text-2xl font-black text-burgundy-950 font-mono tracking-wider">
                  2015202190
                </span>
                <span className="text-xs text-coffee-700 font-semibold block mt-0.5">
                  a.n. Yayasan Rumah Sunnah Indonesia
                </span>
              </div>
              <button
                onClick={() => copyToClipboard('2015202190', 'bank')}
                className="px-4 py-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-900 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {copiedBank ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBank ? 'Tersalin' : 'Salin Rekening'}</span>
              </button>
            </div>

            <div className="p-4 bg-white rounded-xl border border-coffee-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-coffee-600 block">Nominal Persis (Wajib Sesuai Kode Unik):</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono tracking-wider">
                  {formatRp(totalTransfer)}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(totalTransfer.toString(), 'nominal')}
                className="px-4 py-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-900 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {copiedNominal ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedNominal ? 'Tersalin' : 'Salin Nominal'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Method 2: QRIS Detail */}
        {paymentMethod === 'qris' && (
          <div className="p-6 rounded-2xl bg-white border border-coffee-200 text-center space-y-4">
            <h4 className="font-bold text-burgundy-950 text-sm">Scan QRIS Yayasan Rumah Sunnah Indonesia</h4>
            <div className="w-48 h-48 mx-auto bg-coffee-50 border-2 border-dashed border-coffee-300 rounded-2xl flex flex-col items-center justify-center p-4">
              <QrCode className="w-24 h-24 text-coffee-900 mb-2" />
              <span className="text-[10px] text-coffee-600 font-mono">NMID: ID1020293847291</span>
            </div>
            <p className="text-xs text-coffee-600 max-w-sm mx-auto">
              Dapat discan melalui aplikasi BSI Mobile, Livin' Mandiri, BCA Mobile, GoPay, OVO, ShopeePay, atau aplikasi QRIS lainnya.
            </p>
          </div>
        )}

        {/* Method 3: Virtual Account Detail */}
        {paymentMethod === 'va_bsi' && (
          <div className="p-5 rounded-2xl bg-coffee-50 border border-coffee-200 space-y-3">
            <h4 className="font-bold text-coffee-950 text-sm">Nomor Virtual Account BSI</h4>
            <div className="p-4 bg-white rounded-xl border border-coffee-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-coffee-600 block">Nomor BSI VA:</span>
                <span className="text-xl sm:text-2xl font-black text-burgundy-950 font-mono">
                  900 2015 2027 4829
                </span>
                <span className="text-xs text-coffee-700 block mt-0.5">MBI - {applicantName}</span>
              </div>
              <button
                onClick={() => copyToClipboard('900201520274829', 'bank')}
                className="px-4 py-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-900 rounded-lg text-xs font-bold transition-colors"
              >
                Salin VA
              </button>
            </div>
            <p className="text-xs text-coffee-600">
              Virtual Account terverifikasi otomatis dalam 1-3 menit setelah transfer berhasil tanpa perlu unggah struk manual.
            </p>
          </div>
        )}

        {/* Upload Bukti Pembayaran Form / Manual Verification */}
        {paymentStatus === 'pending' && (
          <div className="pt-6 border-t border-coffee-100 space-y-4">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-burgundy-800" />
              <h4 className="font-bold text-burgundy-950 text-sm sm:text-base">
                Konfirmasi & Unggah Bukti Transfer
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-coffee-900 mb-1">Nama Bank Pengirim</label>
                <input
                  type="text"
                  value={senderBank}
                  onChange={e => setSenderBank(e.target.value)}
                  placeholder="Contoh: BSI / Mandiri / BCA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-coffee-200 text-xs focus:ring-2 focus:ring-burgundy-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-coffee-900 mb-1">Nama Pemilik Rekening Pengirim</label>
                <input
                  type="text"
                  value={senderAccountName}
                  onChange={e => setSenderAccountName(e.target.value)}
                  placeholder="Contoh: Ahmad Fauzi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-coffee-200 text-xs focus:ring-2 focus:ring-burgundy-600 outline-none"
                />
              </div>
            </div>

            {/* Drag and Drop Box */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-coffee-300 hover:border-burgundy-600 transition-colors text-center bg-coffee-50/50">
              <UploadCloud className="w-8 h-8 mx-auto text-coffee-500 mb-2" />
              <p className="text-xs font-bold text-coffee-800">
                Klik untuk memilih file struk / tangkapan layar bukti transfer
              </p>
              <p className="text-[11px] text-coffee-500 mt-0.5">Format JPG, PNG, atau PDF (Maksimal 5MB)</p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={e => setUploadedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="mt-3 inline-block px-4 py-2 bg-coffee-200 hover:bg-coffee-300 text-coffee-900 text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                {uploadedFile ? `File Terpilih: ${uploadedFile.name}` : 'Pilih File Struk'}
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={`https://wa.me/6282247044181?text=Assalamu%27alaikum%20Panitia%20PSB%20MBI,%20saya%20sudah%20melakukan%20pembayaran%20formulir%20PSB%20dengan%20No%20Registrasi:%20${activeRegId}%20a.n.%20${encodeURIComponent(applicantName)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Atau konfirmasi via WhatsApp Panitia (0822-4704-4181)</span>
              </a>

              <button
                type="button"
                onClick={handleSimulateConfirm}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Memverifikasi...' : 'Kirim Bukti Pembayaran'}
              </button>
            </div>
          </div>
        )}

        {/* Verified Success State */}
        {paymentStatus === 'verified' && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-lg font-black text-emerald-950">
                  Alhamdulillah! Pembayaran Telah Berhasil Diverifikasi
                </h4>
                <p className="text-xs text-emerald-800">
                  Nomor Registrasi <strong>{activeRegId}</strong> telah aktif dalam sistem PSB Ma'had Baitusunnah Indonesia.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-emerald-200 text-xs text-coffee-800 space-y-2">
              <span className="font-bold text-burgundy-950 block">Langkah Selanjutnya Seleksi Tahap I:</span>
              <p>
                1. Panitia PSB akan menghubungi nomor WhatsApp <strong>{applicantData?.nomorWhatsapp || 'yang terdaftar'}</strong> dalam 1x24 jam untuk penetapan jadwal tes wawancara dan tahfidz.
              </p>
              <p>
                2. Silakan unduh dan cetak Kartu Tanda Peserta PSB berikut untuk dibawa saat pelaksanaan seleksi atau ditunjukkan saat tes daring.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => alert(`Mengunduh Bukti Pendaftaran Resmi MBI - ${activeRegId}.pdf`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Unduh Kartu Peserta PSB (PDF)</span>
              </button>
            </div>
          </div>
        )}

        {/* Info Aplikasi Mobile MBI untuk Pemantauan Seleksi */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF6F0] to-[#F5EFE6] border border-[#C49A6C]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#382417] text-[#FAF6F0] flex items-center justify-center shrink-0 shadow-xs">
              <Smartphone className="w-5 h-5 text-[#C49A6C]" />
            </div>
            <div>
              <span className="font-bold text-[#382417] text-xs sm:text-sm block font-serif">
                Aplikasi Pemantauan &amp; Notifikasi Seleksi (MBI Apps)
              </span>
              <p className="text-[11px] text-[#5D402C] mt-0.5">
                Pantau verifikasi berkas, pengumuman One Day Service, dan mutaba'ah santriwati via: <a href="https://s.id/MBIApps" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-amber-900 underline hover:text-[#382417]">https://s.id/MBIApps</a>
              </p>
            </div>
          </div>
          <a
            href="https://s.id/MBIApps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#C49A6C] hover:bg-[#B38758] text-[#231710] font-black rounded-xl text-xs transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>Buka MBI Apps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
