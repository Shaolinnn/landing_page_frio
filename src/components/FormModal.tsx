// components/FormModal.tsx

'use client';

import { useState, FormEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatarTelefone = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else v = v.replace(/(\d*)/, '($1');
    setWhatsapp(v);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ message: '', type: '' });

    // Validação simples
    if (nome.length < 3 || !email.includes('@') || whatsapp.replace(/\D/g, '').length < 10) {
      setFeedback({ message: 'Por favor, preencha todos os campos corretamente.', type: 'erro' });
      setIsLoading(false);
      return;
    }
    
    // --- LINK DE CHECKOUT (Oferta R$ 297) ---
    const checkoutBaseUrl = 'https://pay.hotmart.com/K70495535U?off=apdkfkwd'; 
    
    // Monta a URL final com os parâmetros para preenchimento automático (nome e email)
    const checkoutUrl = `${checkoutBaseUrl}&checkoutMode=10&bid=${Date.now()}&name=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}`;

    // Redirecionamento direto para a Hotmart (sem automação n8n)
    window.location.href = checkoutUrl;
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity p-4"
    >
      <div className="relative bg-white rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:rotate-90 transition-transform duration-300"
          aria-label="Fechar modal"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-emerald-600 mb-2">Quero o DAQ Essencial</h3>
          <p className="text-slate-600">Preencha seus dados para liberar a oferta de <strong>R$ 297</strong>.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {feedback.message && (
            <div className={`p-3 rounded-lg text-sm font-medium text-center ${feedback.type === 'erro' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {feedback.message}
            </div>
          )}
          
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
              placeholder="Digite seu nome completo" 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Melhor E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
              placeholder="seu@email.com" 
            />
          </div>
          
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp</label>
            <input 
              type="tel" 
              id="whatsapp" 
              name="whatsapp" 
              value={whatsapp} 
              onChange={(e) => formatarTelefone(e.target.value)} 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" 
              placeholder="(99) 99999-9999" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              'Redirecionando...'
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                Ir para Pagamento Seguro
              </>
            )}
          </button>
          
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Seus dados estão seguros. Ao continuar, você concorda com nossos termos.
          </p>
        </form>
      </div>
    </div>
  );
}