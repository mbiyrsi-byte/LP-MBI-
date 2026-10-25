import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import MbiLogo from './MbiLogo';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Phone, 
  RefreshCw,
  Minimize2,
  Maximize2,
  ChevronDown
} from 'lucide-react';

interface ChatbotMbiProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'bot',
    text: "Assalamu'alaikum Warahmatullahi Wabarakatuh! Ahlan wa Sahlan di Portal PSB Ma'had Baitusunnah Indonesia. Saya **Ustadzah Aisyah**, asisten virtual PSB. Ada yang bisa saya bantu terkait program Tahfidz, persyaratan berkas, rincian biaya, atau alur pendaftaran santriwati?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

const SUGGESTED_QUESTIONS = [
  "Aplikasi pemantauan & akses rapor (s.id/MBIApps)?",
  "Berapa rincian biaya pendaftaran & SPP?",
  "Bagaimana program Tahfidz 15 Juz & 30 Juz?",
  "Apakah asrama khusus akhwat ber-AC?",
  "Apa saja 10 berkas yang harus disiapkan?",
  "Bagaimana sistem pemantauan hafalan orang tua?",
  "Berapa nomor rekening resmi pembayaran BSI?",
];

export default function ChatbotMbi({ isOpen, onClose, onOpen }: ChatbotMbiProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botResponseText = data.reply || "Afwan, terjadi kendala teknis. Silakan tanyakan kembali atau hubungi Panitia via WhatsApp di 0822-4704-4181.";

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: "Afwan, server AI sedang mengalami jeda. Ma'had Baitusunnah Indonesia (MBI) membuka pendaftaran santriwati SMP (target 15 juz) dan SMA (target 30 juz) kuota 40 santriwati. Biaya formulir promo Rp 375.000 ke BSI 2015202190 a.n Yayasan Rumah Sunnah Indonesia. Hubungi WhatsApp Panitia: 0822-4704-4181.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating Launcher Button if Closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-coffee-200 text-xs font-semibold text-burgundy-950 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tanya Ustadzah Aisyah (AI PSB)</span>
          </div>
          <button
            id="chatbot-open-floating-btn"
            onClick={onOpen}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl border-2 border-[#D4A373] transition-transform hover:scale-105 active:scale-95 p-0.5"
            aria-label="Buka Chatbot PSB"
          >
            <MbiLogo className="w-full h-full rounded-full" />
          </button>
        </div>
      )}

      {/* Chat Window if Open */}
      {isOpen && (
        <div 
          id="chatbot-window-container"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-coffee-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-burgundy-900 to-coffee-950 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <MbiLogo className="w-10 h-10 rounded-full bg-white ring-2 ring-[#D4A373] p-0.5 shadow-xs shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Ustadzah Aisyah</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-coffee-200">Asisten Virtual PSB Ma'had Baitusunnah</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-coffee-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Percakapan"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                id="chatbot-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-coffee-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Tutup Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-coffee-50/40 text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isBot && (
                    <MbiLogo className="w-7 h-7 rounded-full bg-white ring-1 ring-[#D4A373] p-0.5 shrink-0 mt-1 shadow-xs" />
                  )}
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-white text-coffee-950 border border-coffee-200/80 rounded-tl-xs shadow-xs'
                        : 'bg-burgundy-800 text-white rounded-tr-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                    <span className={`block text-[9px] mt-1.5 text-right ${isBot ? 'text-coffee-400' : 'text-coffee-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-coffee-600 text-[11px] p-2">
                <Bot className="w-4 h-4 text-burgundy-700 animate-spin" />
                <span>Ustadzah Aisyah sedang mengetik jawaban...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="p-2 bg-white border-t border-coffee-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-coffee-50 hover:bg-burgundy-50 hover:text-burgundy-900 border border-coffee-200 rounded-full text-[11px] text-coffee-700 font-medium transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-coffee-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Tanyakan biaya, tahfidz, atau syarat..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-coffee-200 text-xs focus:outline-none focus:ring-2 focus:ring-burgundy-700"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl transition-colors disabled:opacity-40"
              aria-label="Kirim"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Footer Contact Note */}
          <div className="bg-coffee-100 py-1.5 px-3 text-[10px] text-center text-coffee-600 border-t border-coffee-200 flex items-center justify-center gap-1">
            <span>Butuh bicara langsung dengan Panitia?</span>
            <a
              href="https://wa.me/6282247044181"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-0.5"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>WhatsApp 0822-4704-4181</span>
            </a>
          </div>

        </div>
      )}
    </>
  );
}
