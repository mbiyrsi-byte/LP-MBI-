import React, { createContext, useContext, useState, useEffect } from 'react';

interface LogoContextType {
  customLogo: string | null;
  setCustomLogo: (logoUrl: string | null) => void;
  resetLogo: () => void;
  isCustom: boolean;
}

const LOCAL_STORAGE_KEY = 'mbi_custom_logo_v2';
const DEFAULT_LOGO = '/mbi-logo.svg';

const LogoContext = createContext<LogoContextType>({
  customLogo: null,
  setCustomLogo: () => {},
  resetLogo: () => {},
  isCustom: false,
});

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLogo, setCustomLogoState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCustomLogoState(saved);
      }
    } catch {
      // ignore localStorage errors in sandboxed iframes
    }
  }, []);

  const setCustomLogo = (logoUrl: string | null) => {
    setCustomLogoState(logoUrl);
    try {
      if (logoUrl) {
        localStorage.setItem(LOCAL_STORAGE_KEY, logoUrl);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const resetLogo = () => {
    setCustomLogo(null);
  };

  return (
    <LogoContext.Provider
      value={{
        customLogo,
        setCustomLogo,
        resetLogo,
        isCustom: Boolean(customLogo),
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export function useLogo() {
  return useContext(LogoContext);
}

export { DEFAULT_LOGO };
