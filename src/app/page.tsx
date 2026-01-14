// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Script from 'next/script';

type SmartPlayerEvent = 'timeupdate';

interface SmartPlayerVideo {
  currentTime: number;
}

interface SmartPlayerInstance {
  smartAutoPlay?: boolean;
  video?: SmartPlayerVideo;
  on?: (event: SmartPlayerEvent, handler: () => void) => void;
  off?: (event: SmartPlayerEvent, handler: () => void) => void;
}

interface SmartPlayer {
  instances: SmartPlayerInstance[];
}

declare global {
  interface Window {
    smartplayer?: SmartPlayer;
  }
}

// --- CONFIGURAÇÃO PÚBLICO FRIO (REGRA DA KYRLLA) ---
const DELAY_IN_SECONDS = 1013; // 16:53 conforme orientação da mentora

// Carregamento dinâmico dos componentes pesados
const FaqSection = dynamic(() => import('@/components/FaqSection'));
const FormModal = dynamic(() => import('@/components/FormModal'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials'));

// Importação dos ícones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faTimesCircle,
  faCheckCircle,
  faSearch,
  faGraduationCap,
  faProjectDiagram,
  faPlayCircle,
  faLaptop,
  faRobot,
  faMedal,
  faTrophy,
  faShieldAlt,
  faCopyright,
  faFire,
  faCheck,
  faUserGraduate,
  faClock,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const openModal = () => setIsModalOpen(true);

  // Lógica de Delay para Público Frio (SINCRONIZADA COM O TEMPO DO VÍDEO)
  useEffect(() => {
    const STORAGE_KEY = 'daq_vsl_frio_unlocked';

    // Se já desbloqueou antes, mostra direto (mesma regra, sem frustração no refresh)
    try {
      const alreadyUnlocked = localStorage.getItem(STORAGE_KEY);
      if (alreadyUnlocked === 'true') {
        setShowContent(true);
        return;
      }
    } catch {
      // ignore
    }

    let attempts = 0;
    let disposed = false;

    const startWatchVideoProgress = () => {
      if (disposed) return;

      const sp = window.smartplayer;

      // Aguarda o player inicializar
      if (!sp || !sp.instances || sp.instances.length === 0) {
        if (attempts >= 90) return; // tenta por até ~90s
        attempts += 1;
        window.setTimeout(startWatchVideoProgress, 1000);
        return;
      }

      const instance = sp.instances[0];

      const onTimeUpdate = () => {
        if (disposed) return;

        // Evita liberar em autoplay inteligente (mantém lógica consistente com embed VTurb)
        if (instance?.smartAutoPlay) return;

        const currentTime = instance?.video?.currentTime ?? 0;
        if (currentTime < DELAY_IN_SECONDS) return;

        setShowContent(true);

        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // ignore
        }

        // Remove listener (se a lib suportar off)
        try {
          if (typeof instance?.off === 'function') {
            instance.off('timeupdate', onTimeUpdate);
          }
        } catch {
          // ignore
        }
      };

      // Listener do tempo do vídeo
      if (typeof instance?.on === 'function') {
        instance.on('timeupdate', onTimeUpdate);
      }
    };

    startWatchVideoProgress();

    return () => {
      disposed = true;
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      
      {/* --- BANNER OFERTA --- */}
      <div className="bg-red-600 text-white py-2 px-4 text-center font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md animate-pulse z-50">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        Oferta Especial — Acesso Imediato por Tempo Limitado
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-gradient-to-b from-white to-slate-50 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 select-none pointer-events-none opacity-5">
          <Image 
            src="/img/background-hero-640.webp" 
            alt="Background"
            fill
            priority
            quality={60}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="relative max_w-5xl mx-auto px-6 flex flex-col items-center text-center">
          
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-6 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <FontAwesomeIcon icon={faFire} /> Método SPQ
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 max-w-4xl">
              Aprenda com a{' '}
              <span className="text-amber-500 relative whitespace-nowrap">
                prova
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              , na prática.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
              Assista ao vídeo abaixo e descubra como estudar sem caos, aprender de verdade e parar de repetir o mesmo ciclo todos os anos.
            </p>
            
            {/* --- PLAYER VSL NOVO (ID PÚBLICO FRIO: 6967733435a1be1be44d18e8) --- */}
            <div className="w-full max-w-[320px] sm:max-w-[380px] aspect-[9/16] bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white mb-8 relative group mx-auto">
                {/* @ts-expect-error - Web Component do VTurb não tipado no TS */}
                <vturb-smartplayer
                  id="vid-6967733435a1be1be44d18e8"
                  style={{ display: 'block', margin: '0 auto', width: '100%', height: '100%' }}
                />
            </div>

            {/* CTA DINÂMICO APÓS O PITCH NO MINUTO 16:53 */}
            {showContent && (
                <div className="animate-fade-in-up">
                    <button
                      onClick={openModal}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
                    >
                      <FontAwesomeIcon icon={faTrophy} />
                      Quero garantir minha vaga
                    </button>
                    <p className="mt-4 text-xs text-slate-400">
                        <FontAwesomeIcon icon={faShieldAlt} className="mr-1 text-emerald-500"/> Garantia de 7 dias incondicional
                    </p>
                </div>
            )}
        </div>
      </header>

      {/* --- DIVISÃO COM SETA (INDICADOR DE ROLAGEM) --- */}
      <div className="relative h-4 w-full bg-slate-50 flex justify-center z-30">
        <div className="absolute -top-5 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100 transition-transform hover:scale-110">
          <FontAwesomeIcon icon={faChevronDown} className="text-amber-500 animate-bounce text-sm" />
        </div>
      </div>

      <div className={showContent ? 'block' : 'hidden'}>
        <section className="bg-amber-50 py-4 text-center text-xs sm:text-sm font-medium text-amber-800 tracking-wide shine px-4 border-y border-amber-100">
          <div className="max-w-4xl mx-auto relative z-20">
            <FontAwesomeIcon icon={faBolt} className="mr-2" /> 
            SEM PDF • SEM VIDEOAULA INFINITA • SEM TEORIA QUE VOCÊ NÃO USA
          </div>
        </section>
      </div>
        
        {/* Componentes carregados abaixo da dobra */}
        <TestimonialsSection />
        <VideoTestimonials />

        {/* Bio Mentora */}
        <section className="py-16 bg-gradient-to-r from-amber-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-2/5 lg:w-1/3 text-center px-4">
                <div className="relative inline-block">
                    <Image
                    src="/img/Kyrlla-2.webp"
                    alt="Kyrlla Pattyelly"
                    className="w-full max-w-md rounded-2xl shadow-xl border-4 border-white"
                    width={450}
                    height={560}
                    style={{ minWidth: '280px' }}
                    />
                    <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faMedal} className="mr-1" /> Auditora Fiscal
                    </div>
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-800">
                    Kyrlla Pattyelly — Auditora Fiscal e Criadora do Método SPQ
                </p>
                </div>

                <div className="md:w-2/3">
                <span className="inline-block text-xs sm:text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">
                    <FontAwesomeIcon icon={faUserGraduate} className="mr-1" /> QUEM SOU EU
                </span>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                    Meu nome é <span className="text-amber-600">Kyrlla Pattyelly</span> e eu sou Auditora Fiscal e criadora do Método SPQ.
                </h2>
                
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                    <p>
                    Passei anos estudando do jeito errado, repetindo ciclos de reprovação e acumulando PDFs que não serviram para nada — até descobrir que o que aprova não é quantidade de horas, e sim o jeito de estudar.
                    </p>
                    <p>
                    Nos últimos anos, transformei essa descoberta no SPQ, um método baseado em questões e princípios da neurociência do aprendizado, que já ajudou milhares de alunos a destravarem a mente, estudarem com clareza e avançarem de verdade.
                    </p>
                    <p>
                    Pode ser diferente de tudo que você já ouviu por aí, mas funcionou para muita gente — e vai funcionar para você também.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500 my-8">
                    <p className="text-slate-800 italic font-medium text-lg">
                    “Você não reprova por falta de esforço. Reprova pelo método errado — e isso dá pra consertar.”
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="block text-3xl font-bold text-amber-600">+5</span>
                    <span className="text-xs sm:text-sm text-slate-600 font-semibold uppercase mt-1">anos transformando vidas</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="block text-3xl font-bold text-amber-600">1.000+</span>
                    <span className="text-xs sm:text-sm text-slate-600 font-semibold uppercase mt-1">alunos mentorados</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="block text-3xl font-bold text-amber-600">100%</span>
                    <span className="text-xs sm:text-sm text-slate-600 font-semibold uppercase mt-1">foco em aprovação</span>
                    </div>
                </div>

                </div>
            </div>
            </div>
        </section>

        {/* Seção Comparativa */}
        <section className="bg-slate-50 py-16">
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-rose-400">
                    <h3 className="text-xl font-bold text-rose-500 mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTimesCircle} /> O que o DAQ <span className="underline decoration-2 underline-offset-2">não</span> é
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-slate-600">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-rose-300 mt-1 shrink-0" />
                            <span>Curso com 200h de aula teórica maçante.</span>
                        </li>
                        <li className="flex gap-3 text-slate-600">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-rose-300 mt-1 shrink-0" />
                            <span>PDF de 800 páginas pra você tentar decorar.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-emerald-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                    <h3 className="text-xl font-bold text-emerald-600 mb-6 flex items-center gap-2 relative z-10">
                        <FontAwesomeIcon icon={faCheckCircle} /> O que o DAQ <span className="underline decoration-2 underline-offset-2">é</span>
                    </h3>
                    <ul className="space-y-4 relative z-10">
                        <li className="flex gap-3 text-slate-700 font-medium">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                            <span>Foco no que realmente cai na prova.</span>
                        </li>
                        <li className="flex gap-3 text-slate-700 font-medium">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1 shrink-0" />
                            <span>Adaptável à sua rotina.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Pilares */}
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900">
                        <FontAwesomeIcon icon={faSearch} className="text-amber-500 mr-3" /> 
                        Pilares do Método SPQ
                    </h2>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                    { title: 'Análise do Edital', desc: 'Identifique os tópicos que realmente importam.' },
                    { title: 'Filtro de Questões', desc: 'Filtre as questões mais relevantes.' },
                    { title: 'Estudo Reverso', desc: 'Aprenda estudando questões.' },
                    { title: 'Revisão Ativa', desc: 'Consolide o conhecimento.' },
                    ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                        <span className="text-4xl font-black text-slate-200 group-hover:text-amber-500 transition-colors block mb-4">0{idx + 1}</span>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Arsenal */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-emerald-400 mr-2" /> 
                    O arsenal completo da sua aprovação
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-emerald-400 text-3xl mb-4" />
                        <h3 className="font-bold mb-2">Método SPQ</h3>
                        <p className="text-sm text-slate-300">Treinamento completo em vídeo aulas curtas.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <FontAwesomeIcon icon={faRobot} className="text-emerald-400 text-3xl mb-4" />
                        <h3 className="font-bold mb-2">Tutor IA 24h</h3>
                        <p className="text-sm text-slate-300">Tire dúvidas sobre o método a qualquer hora.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <FontAwesomeIcon icon={faLaptop} className="text-emerald-400 text-3xl mb-4" />
                        <h3 className="font-bold mb-2">Domine o TEC</h3>
                        <p className="text-sm text-slate-300">Aprenda a ferramenta + Cupom de 20% OFF.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <FontAwesomeIcon icon={faPlayCircle} className="text-emerald-400 text-3xl mb-4" />
                        <h3 className="font-bold mb-2">Na Prática</h3>
                        <p className="text-sm text-slate-300">Aulas práticas, mostrando a tela.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ - Método */}
        <FaqSection variant="metodo" />

        {/* CHECKOUT FINAL */}
        <section id="checkout" className="py-20 bg-emerald-50/50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Card de Preço */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-emerald-500 text-center relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        {/* Faixa Garantia */}
                        <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            <FontAwesomeIcon icon={faShieldAlt} className="mr-1"/> 7 DIAS DE GARANTIA
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 mb-2">DAQ Essencial</h3>
                        <p className="text-slate-500 text-sm mb-6">Acesso Imediato + Bônus</p>
                        
                        <div className="mb-6">
                            <p className="text-slate-400 text-sm line-through">de R$ 497,00</p>
                            <p className="text-lg text-emerald-600 font-bold">por apenas 12x de</p>
                            <p className="text-5xl font-black text-emerald-600 tracking-tight font-sans">R$ 29,64</p>
                            <p className="text-slate-500 text-sm mt-1">ou R$ 297 à vista</p>
                        </div>
                        
                        <div className="bg-emerald-50 rounded-lg p-4 mb-6 text-left space-y-2 text-sm text-slate-700">
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> <span>Método SPQ Completo</span></div>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> <span>Planilha de Gestão</span></div>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> <span>Suporte Tutor IA</span></div>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> <span>Cupom TEC Concursos</span></div>
                        </div>

                        <button
                            onClick={openModal}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-lg flex items-center justify-center gap-2"
                        >
                            Quero Ser Aprovado
                            <FontAwesomeIcon icon={faTrophy} /> 
                        </button>
                    </div>

                    {/* Texto de Apoio */}
                    <div className="md:pl-4">
                        <h4 className="text-2xl font-bold text-slate-900 mb-4">Por que entrar agora?</h4>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            O tempo que você perde estudando errado é o tempo que seu concorrente usa para te ultrapassar. O DAQ não é mais um curso, é a ferramenta para <strong>acelerar</strong> seu resultado.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="bg-white p-3 rounded-lg shadow-sm text-amber-500">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-xl"/>
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Risco Zero</h5>
                                    <p className="text-sm text-slate-500">Teste por 7 dias. Se não gostar, devolvemos tudo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ - Geral */}
        <FaqSection variant="geral" />

        <footer className="py-8 bg-slate-900 text-slate-400 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
                <FontAwesomeIcon icon={faCopyright} className="mr-1" /> 2026 DAQ Essencial.
            </p>
            <div className="flex gap-6">
                <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-amber-500 cursor-pointer transition-colors" />
                <FontAwesomeIcon icon={faYoutube} className="text-xl hover:text-amber-500 cursor-pointer transition-colors" />
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
            </div>
        </footer>

      {/* SCRIPT DO PLAYER - ID CORRIGIDO PARA 'COLD' PARA NÃO CONFLITAR COM INSTA */}
      <Script
        id="vturb-player-script-cold"
        src="https://scripts.converteai.net/6386c5ef-c435-4ceb-bd05-bafd8dff4a4e/players/6967733435a1be1be44d18e8/v4/player.js"
        strategy="afterInteractive" 
      />

      {isModalOpen && <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
