// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// --- CONFIGURAÇÃO PÚBLICO FRIO ---
const DELAY_IN_SECONDS = 1013; // 16:53

// Carregamento dinâmico dos componentes
const FaqSection = dynamic(() => import('@/components/FaqSection'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials'));

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
  faCheck,
  faUserGraduate,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);

  // Função de Checkout Direto (Sem Pop-up)
  const handleCheckout = () => {
    // Link direto com o parâmetro OFF correto
    window.location.href = 'https://pay.hotmart.com/K70495535U?off=apdkfkwd&checkoutMode=10';
  };

  // Lógica de Delay
  useEffect(() => {
    const STORAGE_KEY = 'daq_vsl_frio_prod';
    
    const alreadyUnlocked = localStorage.getItem(STORAGE_KEY);
    
    if (alreadyUnlocked === 'true') {
      setShowContent(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowContent(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, DELAY_IN_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-screen font-sans">

      {/* --- HERO SECTION --- */}
      {/* MUDANÇA: Ajuste de padding para centralizar o player visualmente sem o texto acima */}
      <header className="relative bg-gradient-to-b from-white to-slate-50 pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden">
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

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          
            {/* --- PLAYER VSL (ID PÚBLICO FRIO) --- */}
            {/* MUDANÇA TÉCNICA: 
                1. Removidos H1 e P conforme solicitado.
                2. Removido 'aspect-[9/16]' e 'overflow-hidden' para permitir que a Headline 
                   interna do VTurb apareça sem cortes.
                3. Mantido 'max-w' para segurar o layout em telas maiores.
            */}
            <div className="w-full max-w-[320px] sm:max-w-[380px] bg-transparent mb-4 relative group mx-auto">
                {/* @ts-expect-error - Web Component do VTurb não tipado no TS */}
                <vturb-smartplayer
                  id="vid-6967733435a1be1be44d18e8"
                  style={{ display: 'block', margin: '0 auto', width: '100%' }}
                />
            </div>

            {/* CTA DINÂMICO APÓS O PITCH */}
            {showContent && (
                <div className="animate-fade-in-up mt-6">
                    <button
                      onClick={handleCheckout}
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

      {/* --- DIVISÃO COM SETA --- */}
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
        
        <TestimonialsSection />
        <VideoTestimonials />

        {/* BIO MENTORA */}
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
                </div>
                
                <div className="md:w-2/3">
                    <span className="inline-block text-xs sm:text-sm font-semibold text-amber-600 uppercase tracking-widest mb-2">
                        <FontAwesomeIcon icon={faUserGraduate} className="mr-1" /> QUEM SOU EU
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Meu nome é Kyrlla Pattyelly e eu sou Auditora Fiscal e criadora do Método SPQ.
                    </h2>
                    
                    <p className="text-lg text-slate-700 mb-4">
                        Passei anos estudando do jeito errado, repetindo ciclos de reprovação e acumulando PDFs que não serviram
                        para nada — até descobrir que o que aprova não é quantidade de horas, e sim o jeito de estudar.
                    </p>
                    <p className="text-lg text-slate-700 mb-4">
                        Nos últimos anos, transformei essa descoberta no SPQ, um método baseado em questões e princípios da
                        neurociência do aprendizado, que já ajudou milhares de alunos a destravarem a mente, estudarem com
                        clareza e avançarem de verdade.
                    </p>
                    <p className="text-lg text-slate-700 mb-6">
                        Pode ser diferente de tudo que você já ouviu por aí, mas funcionou para muita gente — e vai funcionar
                        para você também.
                    </p>

                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500 mb-6">
                        <p className="text-slate-700 italic mb-2">
                        “Você não reprova por falta de esforço. Reprova pelo método errado — e isso dá pra consertar.”
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <span className="block text-2xl font-bold text-amber-600">+5</span>
                        <span className="text-sm text-slate-600">anos transformando vidas</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <span className="block text-2xl font-bold text-amber-600">1.000+</span>
                        <span className="text-sm text-slate-600">alunos mentorados</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <span className="block text-2xl font-bold text-amber-600">100%</span>
                        <span className="text-sm text-slate-600">comprometida</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>

        {/* O que é / não é */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-rose-500">
            <h2 className="text-xl font-bold text-rose-600 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faTimesCircle} /> O que o DAQ <span className="underline">não</span> é
            </h2>
            <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-rose-400 mt-1" />
                <span>Curso com 200h de aula teórica</span>
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-rose-400 mt-1" />
                <span>PDF de 800 páginas pra decorar</span>
                </li>
            </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-emerald-500">
            <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} /> O que o DAQ <span className="underline">é</span>
            </h2>
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" />
                <span>Foco no que realmente cai na prova</span>
                </li>
                <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mt-1" />
                <span>Adaptável à sua rotina</span>
                </li>
            </ul>
            </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-slate-50 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
                <FontAwesomeIcon icon={faSearch} className="text-amber-500 mr-2" /> Como funciona o Método SPQ
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                {[
                { title: 'Análise do Edital', desc: 'Identifique os tópicos que realmente importam' },
                { title: 'Seleção de Questões', desc: 'Filtre as questões mais relevantes' },
                { title: 'Estudo Ativo', desc: 'Aprenda estudando questões' },
                { title: 'Revisão Estratégica', desc: 'Consolide o conhecimento' },
                ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-400 feature-card hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-amber-500 font-bold text-2xl">{idx + 1}</span>
                    <h3 className="font-semibold mt-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">{item.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
                <FontAwesomeIcon icon={faGraduationCap} className="text-amber-500 mr-2" /> O que você recebe
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 feature-card">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-amber-500 text-3xl mb-4" />
                <h3 className="font-semibold mb-2">Método SPQ</h3>
                <p className="text-sm text-slate-600">O treinamento completo em vídeo</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 feature-card">
                <FontAwesomeIcon icon={faRobot} className="text-amber-500 text-3xl mb-4" />
                <h3 className="font-semibold mb-2">Tutor de IA</h3>
                <p className="text-sm text-slate-600">Suporte 24h para tirar dúvidas imediatas</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 feature-card">
                <FontAwesomeIcon icon={faLaptop} className="text-amber-500 text-3xl mb-4" />
                <h3 className="font-semibold mb-2">TEC Concursos</h3>
                <p className="text-sm text-slate-600">Aprenda a dominar a ferramenta (Cupom 20% OFF)</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 feature-card">
                <FontAwesomeIcon icon={faPlayCircle} className="text-amber-500 text-3xl mb-4" />
                <h3 className="font-semibold mb-2">Aulas Práticas</h3>
                <p className="text-sm text-slate-600">Mostrando a tela, clique a clique</p>
                </div>
            </div>
            </div>
        </section>

        {/* FAQ - PARTE 1: Método */}
        <FaqSection variant="metodo" />

        {/* Checkout - Oferta R$ 297 */}
        <section id="checkout" className="py-16 bg-emerald-50">
            <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                <FontAwesomeIcon icon={faTrophy} className="text-emerald-600 mr-2" /> Investimento
                </h2>
                <p className="text-slate-600">Comece hoje a estudar do jeito certo</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-200 text-center relative transform hover:scale-[1.01] transition-transform">
                <span className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    7 dias de garantia
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-4">DAQ Essencial</h3>
                <p className="text-slate-500 text-lg mb-1">Apenas 12x de</p>
                <p className="text-5xl font-bold text-emerald-600 mb-4 font-poppins">R$ 30,72</p>
                <p className="text-slate-400 text-sm mb-6">ou R$ 297 à vista</p>
                
                <ul className="space-y-2 text-left text-slate-700 mb-6 text-sm bg-slate-50 p-4 rounded-lg">
                    <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> Método SPQ Completo</li>
                    <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> Planilha de Gestão</li>
                    <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="text-emerald-500"/> Suporte Tutor IA 24h</li>
                </ul>

                <button
                    onClick={handleCheckout}
                    className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 text-lg"
                >
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" /> Quero meu plano de aprovação
                </button>
                <a
                    href="https://wa.me/64999965777?text=Oi%20Kyrlla%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20DAQ%20de%20297"
                    target="_blank"
                    className="mt-4 flex items-center justify-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> Dúvidas? Fale com a gente
                </a>
                </div>

                <div>
                <h4 className="text-xl font-semibold text-amber-600 mb-4">Bônus Exclusivos:</h4>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                    <strong className="block text-slate-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTrophy} className="text-amber-500"/> Cupom de 20% no TEC
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">Economia real na assinatura da plataforma.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                    <strong className="block text-slate-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faRobot} className="text-amber-500"/> Suporte Tutor IA
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">Seu mentor particular disponível 24h para dúvidas.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
                    <strong className="block text-slate-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faPlayCircle} className="text-amber-500"/> Mini Treinamento
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">Mapa de Interpretação de Questões.</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Garantia */}
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center bg-slate-50 p-8 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500 mr-2" /> Risco Zero
            </h2>
            <p className="text-slate-600 mb-6">
                Teste por 7 dias. Se achar que não é pra você, devolvemos 100% do valor.
            </p>
            <button
                    onClick={handleCheckout}
                    className="inline-block bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50 font-semibold py-2 px-6 rounded-full transition-colors"
                >
                    Começar teste de 7 dias
            </button>
            </div>
        </section>

        {/* FAQ - PARTE 2: Geral */}
        <FaqSection variant="geral" />

        <footer className="py-8 bg-slate-900 text-slate-400">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
                <FontAwesomeIcon icon={faCopyright} className="mr-1" /> 2026 DAQ Essencial.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-amber-500 cursor-pointer" />
                <FontAwesomeIcon icon={faYoutube} className="text-xl hover:text-amber-500 cursor-pointer" />
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl hover:text-amber-500 cursor-pointer" />
            </div>
            </div>
        </footer>

      </div>

      {/* Script do Player VTurb Específico */}
      <Script
        id="vturb-player-script-cold"
        src="https://scripts.converteai.net/6386c5ef-c435-4ceb-bd05-bafd8dff4a4e/players/6967733435a1be1be44d18e8/v4/player.js"
        strategy="afterInteractive"
      />
    </main>
  );
}