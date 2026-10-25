import { useLogo, DEFAULT_LOGO } from '../context/LogoContext';

interface MbiLogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
}

export default function MbiLogo({
  className = "w-11 h-11",
  imgClassName = "",
  alt = "Logo Resmi Ma'had Baitusunnah Indonesia"
}: MbiLogoProps) {
  const { customLogo } = useLogo();
  const src = customLogo || DEFAULT_LOGO;

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 shadow-sm bg-white border border-[#E5E1D8] transition-transform group-hover:scale-105 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain rounded-full ${imgClassName}`}
        referrerPolicy="no-referrer"
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith('/mbi-logo.png')) {
            target.src = '/mbi-logo.png';
          }
        }}
      />
    </div>
  );
}

