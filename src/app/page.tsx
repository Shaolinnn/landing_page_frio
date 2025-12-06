'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// --- CONFIGURAÇÃO DO DELAY (Em Segundos) ---
// COLOQUE AQUI O TEMPO DO PITCH DE VENDAS
// Exemplo: 10 minutos = 600 segundos
const DELAY_IN_SECONDS = 270; // ⚠️ MUDE AQUI PARA O TEMPO DESEJADO

// Carregamento dinâmico
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
  faUsers,
  faMedal,
  faTrophy,
  faShieldAlt,
  faCopyright

} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

// REMOVI O BLOCO "declare global" QUE ESTAVA CAUSANDO OS ERROS.
// A solução correta está aplicada diretamente na linha do componente abaixo.

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State para controlar a visibilidade do conteúdo (Delay)
  const [showContent, setShowContent] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const scrollToVSL = () => {
    const element = document.getElementById('vsl');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lógica do Delay com Persistência
  useEffect(() => {
    // 1. Verifica se já existe a flag no LocalStorage
    const alreadyUnlocked = localStorage.getItem('daq_vsl_unlocked');

    // 2. Se o delay for 0 ou já estiver desbloqueado, mostra na hora
    if (DELAY_IN_SECONDS === 270 || alreadyUnlocked === 'true') {
      setShowContent(true);
      return;
    }

    // 3. Caso contrário, inicia o timer
    const timer = setTimeout(() => {
      setShowContent(true);
      localStorage.setItem('daq_vsl_unlocked', 'true');
    }, DELAY_IN_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Seção VSL */}
      <section id="vsl" className="bg-slate-900 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Antes de tomar qualquer decisão, assista a esta apresentação
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Em poucos minutos, a Kyrlla te mostra como funciona o Método SPQ na prática...
          </p>

          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-[400px] rounded-3xl shadow-2xl overflow-hidden border border-slate-700 bg-black">
              
              {/* CORREÇÃO DO ERRO DE TYPE E ESLINT AQUI: */}
              {/* @ts-expect-error - Web Component do VTurb sem tipagem oficial React */}
              <vturb-smartplayer
                id="vid-69332e10f25b44da4d794b4d"
                style={{ display: 'block', margin: '0 auto', width: '100%' }}
              />

            </div>
          </div>

          {/* Botão com Delay */}
          {showContent && (
            <div className="mt-8 flex justify-center animate-fade-in-up">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm sm:text-base font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-900 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5"
              >
                Quero aplicar o Método SPQ depois da VSL
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scripts VTurb */}
      <Script
        id="vturb-player-script"
        src="https://scripts.converteai.net/6386c5ef-c435-4ceb-bd05-bafd8dff4a4e/players/69332e10f25b44da4d794b4d/v4/player.js"
        strategy="afterInteractive"
      />

      {/* CONTEÚDO TRAVADO PELO DELAY */}
      {showContent && (
        <div className="animate-fade-in">
          {/* Faixa */}
          <section className="bg-amber-50 py-4 text-center text-sm font-medium text-amber-800 tracking-wide shine">
            <div className="max-w-4xl mx-auto px-6">
              <FontAwesomeIcon icon={faBolt} className="mr-2" /> SEM PDF • SEM VIDEOAULA INFINITA • SEM TEORIA QUE VOCÊ
              NÃO USA
            </div>
          </section>

          <TestimonialsSection />
          <VideoTestimonials />

          {/* Bio */}
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
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Meu nome é Kyrlla Pattyelly e eu sou Auditora Fiscal e criadora do Método SPQ.
                  </h2>
                  <p className="text-lg text-slate-700 mb-4">
                    Passei anos estudando do jeito errado... até descobrir que o que aprova não é quantidade de horas, e
                    sim o jeito de estudar.
                  </p>
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
                      <span className="text-sm text-slate-600">comprometida com seu sucesso</span>
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
                <FontAwesomeIcon icon={faTimesCircle} /> O que o DAQ{' '}
                <span className="underline decoration-rose-400">não</span> é
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-rose-400 mt-1" />
                  <span>Curso com 200h de aula que você nunca vai terminar</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-rose-400 mt-1" />
                  <span>PDF de 800 páginas pra decorar</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-emerald-500">
              <h2 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} /> O que o DAQ{' '}
                <span className="underline decoration-emerald-400">é</span>
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

          {/* Como funciona */}
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
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-400">
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
                <FontAwesomeIcon icon={faGraduationCap} className="text-amber-500 mr-2" /> O que você vai receber
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                  <FontAwesomeIcon icon={faProjectDiagram} className="text-amber-500 text-3xl mb-4" />
                  <h3 className="font-semibold mb-2">Método SPQ</h3>
                  <p className="text-sm text-slate-600">Passo a passo claro com lógica de prova</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                  <FontAwesomeIcon icon={faPlayCircle} className="text-amber-500 text-3xl mb-4" />
                  <h3 className="font-semibold mb-2">Estudar com IA</h3>
                  <p className="text-sm text-slate-600">Monte questões inéditas e estude discursivas</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                  <FontAwesomeIcon icon={faLaptop} className="text-amber-500 text-3xl mb-4" />
                  <h3 className="font-semibold mb-2">TEC Concursos</h3>
                  <p className="text-sm text-slate-600">Use com intenção estratégica</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                  <FontAwesomeIcon icon={faUsers} className="text-amber-500 text-3xl mb-4" />
                  <h3 className="font-semibold mb-2">Comunidade</h3>
                  <p className="text-sm text-slate-600">Interação e networking exclusivo</p>
                </div>
              </div>
            </div>
          </section>

          {/* Comunidade e Pra quem é */}
          <section className="py-16 bg-gradient-to-r from-amber-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 text-center">
                  <FontAwesomeIcon icon={faUsers} className="text-6xl text-amber-500" />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Você não vai estudar sozinho(a)</h2>
                  <p className="text-lg text-slate-700">
                    O DAQ é uma comunidade vibrante. Troque experiências, tire dúvidas e mantenha o foco.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Checkout */}
          <section id="checkout" className="py-16 bg-emerald-50">
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-emerald-200 text-center relative">
                  <span className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    7 dias de garantia
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">DAQ Essencial</h3>
                  <p className="text-slate-500 text-lg mb-1">Apenas 12x de</p>
                  <p className="text-5xl font-bold text-emerald-600 mb-4 font-poppins">R$ 51,40</p>
                  <button
                    onClick={openModal}
                    className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faTrophy} className="mr-2" /> Quero meu plano de aprovação
                  </button>
                  <a
                    href="https://wa.me/64999965777"
                    className="mt-4 block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> Dúvidas? Fale com a gente
                  </a>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-amber-600 mb-4">Bônus especiais:</h4>
                  <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <strong className="block text-slate-800">Cupom de 20% no TEC</strong>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <strong className="block text-slate-800">Comunidade Exclusiva</strong>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <strong className="block text-slate-800">Mini Treinamento de Interpretação</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Garantia */}
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center bg-slate-50 p-8 rounded-xl border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500 mr-2" /> Garantia de satisfação
              </h2>
              <p className="text-slate-600">
                Você tem 7 dias pra testar. Se não curtir, devolvemos seu dinheiro.
              </p>
            </div>
          </section>

          <FaqSection />

          <footer className="py-8 bg-slate-900 text-slate-400">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">
                <FontAwesomeIcon icon={faCopyright} className="mr-1" /> 2025 DAQ Essencial.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-amber-500 cursor-pointer" />
                <FontAwesomeIcon icon={faYoutube} className="text-xl hover:text-amber-500 cursor-pointer" />
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl hover:text-amber-500 cursor-pointer" />
              </div>
            </div>
          </footer>
        </div>
      )}

      {isModalOpen && <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}