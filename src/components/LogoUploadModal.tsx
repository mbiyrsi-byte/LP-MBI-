import React, { useState, useRef, ChangeEvent } from 'react';
import { useLogo, DEFAULT_LOGO } from '../context/LogoContext';
import { Upload, RotateCcw, X, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoUploadModal({ isOpen, onClose }: LogoUploadModalProps) {
  const { customLogo, setCustomLogo, resetLogo, isCustom } = useLogo();
  const [previewUrl, setPreviewUrl] = useState<string | null>(customLogo);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccessToast, setIsSuccessToast] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    setErrorMsg(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Harap pilih file gambar (JPG, PNG, WEBP, atau SVG).');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
    };
    reader.onerror = () => {
      setErrorMsg('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      setCustomLogo(previewUrl);
      setIsSuccessToast(true);
      setTimeout(() => {
        setIsSuccessToast(false);
        onClose();
      }, 1000);
    }
  };

  const handleResetToDefault = () => {
    resetLogo();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsSuccessToast(true);
    setTimeout(() => {
      setIsSuccessToast(false);
      onClose();
    }, 900);
  };

  const currentDisplaySrc = previewUrl || customLogo || DEFAULT_LOGO;

  return (
    <div 
      id="logo-upload-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="logo-upload-modal"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-coffee-200 text-[#2D241E] relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-coffee-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-burgundy-50 border border-burgundy-200 text-burgundy-900 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-coffee-950 font-serif">Ganti Logo Ma'had</h3>
              <p className="text-xs text-coffee-600">Unggah file gambar logo sesuai kebutuhan</p>
            </div>
          </div>
          <button
            id="close-logo-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-coffee-400 hover:text-coffee-800 hover:bg-coffee-100 transition-colors"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="py-5 space-y-5">
          {/* Logo Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-white p-1 flex items-center justify-center">
                <img
                  src={currentDisplaySrc}
                  alt="Preview Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="mt-2 block text-center text-[11px] font-medium text-coffee-500">
                {previewUrl ? 'Pratinjau Logo Baru' : isCustom ? 'Logo Kustom Aktif' : 'Logo Default Ma\'had'}
              </span>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            className="hidden"
            id="custom-logo-file-input"
          />

          {/* Upload Area / Button */}
          <div
            id="trigger-file-upload-container"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
              isDragging
                ? 'border-burgundy-700 bg-burgundy-50 scale-[1.01]'
                : 'border-coffee-300 hover:border-burgundy-700 bg-coffee-50/50 hover:bg-coffee-50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-coffee-200 flex items-center justify-center group-hover:scale-105 transition-transform text-burgundy-900">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-burgundy-900 group-hover:underline block">
                {isDragging ? 'Lepaskan gambar di sini' : 'Pilih atau Tarik File Gambar ke Sini'}
              </span>
              <span className="text-[11px] text-coffee-600">
                Format: PNG, JPG, JPEG, WEBP, SVG (Maks. 5 MB)
              </span>
            </div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success message */}
          {isSuccessToast && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Logo berhasil diperbarui!</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-coffee-100 gap-2">
          {isCustom || previewUrl ? (
            <button
              type="button"
              id="reset-default-logo-btn"
              onClick={handleResetToDefault}
              className="px-3 py-2 text-xs font-semibold text-coffee-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan Default</span>
            </button>
          ) : (
            <span className="text-[11px] text-coffee-500">Gunakan gambar berasio 1:1</span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="cancel-logo-modal-btn"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-coffee-700 hover:bg-coffee-100 rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              id="save-logo-modal-btn"
              disabled={!previewUrl || previewUrl === customLogo}
              onClick={handleSave}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm ${
                previewUrl && previewUrl !== customLogo
                  ? 'bg-burgundy-900 hover:bg-burgundy-950 text-white'
                  : 'bg-coffee-200 text-coffee-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Terapkan Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
