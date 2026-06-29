import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildWhatsAppUrl } from '@/config/site';

const quickOptions = [
  { label: 'Agendar consulta', message: 'Olá, gostaria de agendar uma consulta com o Dr. Lucas Rodriguez.' },
  { label: 'Direito Imobiliário', message: 'Olá, tenho uma dúvida sobre Direito Imobiliário.' },
  { label: 'Direito de Família', message: 'Olá, preciso de orientação sobre Direito de Família.' },
  { label: 'Direito Penal', message: 'Olá, preciso de atendimento urgente em Direito Penal.' },
  { label: 'Direito do Consumidor', message: 'Olá, tenho um problema de consumidor e preciso de ajuda.' },
];

const botMessages = [
  'Olá! Sou o assistente virtual do escritório Lucas Rodriguez Advocacia.',
  'Como posso ajudá-lo hoje? Selecione uma opção abaixo ou escreva sua mensagem:',
];

const openWhatsApp = (message: string) => {
  const popup = window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  if (popup) popup.opener = null;
};

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const hasStartedChat = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open && !hasStartedChat.current) {
      hasStartedChat.current = true;
      setTyping(true);
      const t1 = setTimeout(() => {
        setChatMessages([{ role: 'bot', text: botMessages[0] }]);
      }, 600);
      const t2 = setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'bot', text: botMessages[1] }]);
        setTyping(false);
      }, 1400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, typing]);

  const handleQuickOption = (option: typeof quickOptions[0]) => {
    setChatMessages(prev => [...prev, { role: 'user', text: option.label }]);
    setTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'bot', text: `Perfeito! Vou te direcionar para o WhatsApp para falar diretamente com nossa equipe sobre "${option.label}".` }]);
      setTyping(false);
      setTimeout(() => {
        openWhatsApp(option.message);
      }, 1000);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    const msg = userMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setUserMessage('');
    setTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Obrigado pela sua mensagem! Vou te direcionar para o WhatsApp para um atendimento personalizado.' }]);
      setTyping(false);
      setTimeout(() => {
        openWhatsApp(`Olá, ${msg}`);
      }, 1000);
    }, 800);
  };

  const showQuickOptions = chatMessages.length <= 2 && !chatMessages.some(m => m.role === 'user');

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-black/5 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold font-sans">Lucas Rodriguez</p>
                  <p className="text-white/50 text-[11px] font-sans">Advocacia · Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
                aria-label="Fechar atendimento online"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px] max-h-[45vh]">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 text-sm font-sans leading-relaxed rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-navy text-white rounded-br-sm'
                      : 'bg-gray-100 text-navy/80 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-navy/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Quick Options */}
              {showQuickOptions && !typing && (
                <div className="space-y-2 pt-1">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleQuickOption(opt)}
                      className="group flex w-full items-center justify-between rounded-lg border border-gold/15 bg-gold/5 px-4 py-2.5 text-left font-sans text-sm text-navy transition-all hover:-translate-y-0.5 hover:border-gold/35 hover:bg-gold/10"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-black/5 px-4 py-3 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 text-sm font-sans text-navy bg-gray-50 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold/30 border border-transparent focus:border-gold/20 transition-all placeholder:text-navy/30"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!userMessage.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white transition-all hover:-translate-y-0.5 hover:bg-navy/85 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Enviar mensagem para atendimento"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_18px_42px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/20 transition-all duration-500 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          open ? 'bg-navy' : 'bg-[#25D366]'
        } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Atendimento online"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>
    </>
  );
}
