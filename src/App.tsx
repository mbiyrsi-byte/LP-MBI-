import { useState } from 'react';
import { ActiveTab, RegistrationFormData } from './types';
import Navbar from './components/Navbar';
import SubpageHeader from './components/SubpageHeader';
import BerandaSection from './components/BerandaSection';
import TahfidzPromotionSection from './components/TahfidzPromotionSection';
import BiayaSyaratSection from './components/BiayaSyaratSection';
import FormulirPendaftaranSection from './components/FormulirPendaftaranSection';
import PembayaranSection from './components/PembayaranSection';
import TestimoniSection from './components/TestimoniSection';
import ChatbotMbi from './components/ChatbotMbi';
import Footer from './components/Footer';
import { LogoProvider } from './context/LogoContext';
import LogoUploadModal from './components/LogoUploadModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [registeredData, setRegisteredData] = useState<RegistrationFormData | null>(null);
  const [registrationId, setRegistrationId] = useState<string>('MBI-2027-48291');

  const handleBackToHome = () => {
    setActiveTab('beranda');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = () => {
    setActiveTab('formulir');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsChatbotOpen(true);
  };

  const handleFormSubmitted = (data: RegistrationFormData, generatedId: string) => {
    setRegisteredData(data);
    setRegistrationId(generatedId);
    setActiveTab('pembayaran');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LogoProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D241E] font-sans selection:bg-[#800020] selection:text-[#FDFBF7]">
        
        {/* Sticky Navbar with Brand, Links, & CTA */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenRegister={handleOpenRegister}
          onOpenChat={handleOpenChat}
        />

        {/* Global Subpage Breadcrumb & Back Navigation Bar */}
        <SubpageHeader
          activeTab={activeTab}
          onBackToHome={handleBackToHome}
          onOpenRegister={handleOpenRegister}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {activeTab === 'beranda' && (
            <BerandaSection
              setActiveTab={setActiveTab}
              onOpenRegister={handleOpenRegister}
              onOpenChat={handleOpenChat}
            />
          )}

          {activeTab === 'tahfidz' && (
            <TahfidzPromotionSection
              onOpenRegister={handleOpenRegister}
              onBackToBeranda={handleBackToHome}
            />
          )}

          {activeTab === 'biaya-syarat' && (
            <BiayaSyaratSection
              onOpenRegister={handleOpenRegister}
              onBackToBeranda={handleBackToHome}
            />
          )}

          {activeTab === 'formulir' && (
            <FormulirPendaftaranSection
              onFormSubmitted={handleFormSubmitted}
              onBackToBeranda={handleBackToHome}
            />
          )}

          {activeTab === 'pembayaran' && (
            <PembayaranSection
              registrationId={registrationId}
              applicantData={registeredData}
              onBackToBeranda={handleBackToHome}
            />
          )}

          {activeTab === 'testimoni' && (
            <TestimoniSection
              onOpenRegister={handleOpenRegister}
              onBackToBeranda={handleBackToHome}
            />
          )}
        </main>

        {/* Interactive AI Chatbot Widget (Ustadzah Aisyah) */}
        <ChatbotMbi
          isOpen={isChatbotOpen}
          onOpen={() => setIsChatbotOpen(true)}
          onClose={() => setIsChatbotOpen(false)}
        />

        {/* Logo Upload Modal */}
        <LogoUploadModal
          isOpen={isLogoModalOpen}
          onClose={() => setIsLogoModalOpen(false)}
        />

        {/* Comprehensive Footer */}
        <Footer
          setActiveTab={setActiveTab}
          onOpenRegister={handleOpenRegister}
          onOpenChat={handleOpenChat}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />

      </div>
    </LogoProvider>
  );
}

