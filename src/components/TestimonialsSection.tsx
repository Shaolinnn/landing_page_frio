// components/TestimonialsSection.tsx

'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

type Testimonial = {
  image: string;
  text: ReactNode;
  author: string;
  role: string;
};

const testimonialsData: Testimonial[] = [
  // ----------------------------------------------------------------------
  // BLOCO 1: TEMPO / RESULTADO RÁPIDO (A PROVA DE QUE O MÉTODO FUNCIONA)
  // ----------------------------------------------------------------------

  // [NOVO - SOLICITAÇÃO KYRLLA] - Superação de platô (79% -> 84%)
  {
    image: '/img/depoimento_13.jpeg', // Corrigido para o arquivo 13 que você enviou
    text: (
      <>
        “Passando pra comemorar o aumento da minha porcentagem de acertos e para agradecer a Kyrlla pelo <strong>excelente método</strong>.
        <br />
        <br />
        Não conseguia passar dos 79% no estudo tradicional e <strong>hoje já passei dos 84%!!!</strong>”
      </>
    ),
    author: 'Aluno DAQ',
    role: 'Rompeu o platô de 79% para 84%',
  },

  // 1) Depoimento da Dashboard (91% em 7 dias)
  {
    image: '/img/depoimento_12.jpg',
    text: (
      <>
        “7 dias testando o DAQ. Sensação de que <strong>VAI DAR CERTO!</strong>
        <br />
        Análise semanal finalizada: <strong>914 questões resolvidas com 91.47% de acertos.</strong>
        <br />
        Meta até próximo domingo é 1.500 questões!”
      </>
    ),
    author: 'Aluno DAQ',
    role: '91% de acerto em 1 semana',
  },

  // 2) 7 dias de método (Resultado Imediato)
  {
    image: '/img/depoimento_8.webp',
    text: (
      <>
        “Em 7 dias aplicando o método, finalizei um caderno com 90% de acertos e cheguei a
        73% de aproveitamento em 602 questões. Esse método reacendeu em mim uma vontade
        insana de estudar.”
      </>
    ),
    author: 'Aluno DAQ',
    role: 'Resultados em 7 dias',
  },

  // 3) Gabriel (Consistência e Metraca - 1 ano)
  {
    image: '/img/depoimento_11.jpg',
    text: (
      <>
        “Hoje faz 1 ano que estou no SPQ e esse print mostra um pouco da minha jornada. Só
        tenho a agradecer à Kyrlla — você abriu meus olhos. Queria ter conhecido esse método
        antes. Em 1 ano, já são{' '}
        <strong>24.607 questões resolvidas, 19.727 acertos e 80,17% de taxa de acerto</strong>.”
      </>
    ),
    author: 'Gabriel',
    role: '1 ano de SPQ — milhares de questões e 80% de acertos',
  },

  // ----------------------------------------------------------------------
  // BLOCO 2: PESSOAS SEM TEMPO / ROTINA DIFÍCIL (MATAR OBJEÇÃO DE TEMPO)
  // ----------------------------------------------------------------------

  // 4) Andressa (Mãe de duas crianças - Sem tempo)
  {
    image: '/img/depoimento_10.jpg',
    text: (
      <>
        “Sou mãe de duas crianças pequenas e PDF + videoaula já estavam inviáveis pra mim.
        Quando entrei no método da Kyrlla, achei caro, mas hoje vejo que{' '}
        <strong>é muito pouco investimento perto do tanto que ela entrega</strong>. Ainda
        estou me adaptando, mas já evoluí muito em rotina: agora consigo{' '}
        <strong>
          estudar sem me sufocar, brincar com meus filhos e ter vida fora dos estudos
        </strong>
        . O método é surreal — é nítido o quanto ela entrega, e já estou trazendo mais
        gente pro DAQ.”
      </>
    ),
    author: 'Andressa',
    role: 'Mãe de duas crianças — rotina mais leve',
  },
  
  // 5) Lucas (Aprovado em < 10 meses com trabalho + faculdade + esporte)
  {
    image: '/img/video-lucas.jpg', 
    text: '“Apliquei o método SPQ com o DAQ Essencial e fui aprovado em menos de 10 meses, mesmo com faculdade, trabalho, estágio e treino de maratona.”',
    author: 'Lucas',
    role: 'Aprovado GCM Poços de Caldas/MG',
  },

  // 6) Fernanda Sodero (Evolução rápida / Otimização de tempo)
  {
    image: '/img/Depoimento_3.webp',
    text: 'Ganhei 1 ano em 1 mês! Estou amando o método e indico demais o DAQ Essencial.',
    author: 'Fernanda Sodero',
    role: 'Evolução rápida',
  },
  
   // 7) Aluno TRE-RJ (Rotina adaptada - 80% aplicado)
   {
    image: '/img/depoimento_5.webp',
    text: 'Não consegui aplicar o método 100% na rotina, mas uns 80% eu apliquei. E deu certo. Deus me deu essa aprovação através do estudo por questões!',
    author: 'Aluno DAQ',
    role: 'Aprovado TRE-RJ',
  },

  // ----------------------------------------------------------------------
  // BLOCO 3: DEMAIS (APROVAÇÕES, NOTAS ALTAS E METODOLOGIA)
  // ----------------------------------------------------------------------

  // 8) Aprovado CNU
  {
    image: '/img/depoimento_1.webp',
    text: 'Não participo dos encontros presenciais e, ainda assim, consegui nota para 12 órgãos. Estou aguardando a nota da redação.',
    author: 'Aluno DAQ',
    role: 'Aprovado CNU',
  },

  // 9) Nota Alta (38 de 40)
  {
    image: '/img/depoimento_2.webp',
    text: 'Saiu o gabarito preliminar e acertei 38 de 40 questões — errei só 2. Nunca imaginei alcançar algo assim. O DAQ mudou minha forma de estudar.',
    author: 'Aluno DAQ',
    role: 'Evolução evidente',
  },

  // 10) Matemática (Superação de dificuldade)
  {
    image: '/img/depoimento_9.jpg',
    text: (
      <>
        “Depois que comecei a aplicar o método SPQ, nunca tinha conseguido tanta constância
        de estudar todos os dias como agora. Isso refletiu em toda a minha vida — e,{' '}
        <strong>mesmo tendo extrema dificuldade em matemática</strong>, insisti no método e
        hoje parece loucura o quanto estou{' '}
        <strong>evoluindo na matéria</strong>.”
      </>
    ),
    author: 'Aluno DAQ',
    role: 'Mais constância e avanço em Matemática',
  },

  // 11) Pulo do Gato (Metodologia)
  {
    image: '/img/depoimento_7.webp',
    text: (
      <>
        “Sou aluno do DAQ/SPQ e o método é ótimo, super recomendo e indico. Ele foi criado
        pensando em{' '}
        <strong>estudar as questões e não apenas resolver questões</strong> — esse é o
        ‘pulo do gato’. A teoria a gente aprende com o estudo das questões, a partir dos
        comentários dos professores e do fórum dos alunos. É um método dinâmico, prático e
        ativo, e é{' '}
        <strong>
          libertador não precisar ficar preso em PDFs gigantes e videoaulas intermináveis
        </strong>
        : já parte logo pras questões, e são elas que vão te ensinar. Está valendo muito a
        pena.”
      </>
    ),
    author: 'Aluno DAQ',
    role: 'Libertador sair dos PDFs e videoaulas',
  },

  // 12) Virada de Chave (Conselho)
  {
    image: '/img/depoimento_6.webp',
    text: (
      <>
        “Se eu puder dar um conselho pra quem ainda está perdido ou sente que estuda muito
        mas não vê resultado:{' '}
        <strong>abandona o excesso de teoria e mergulha nas questões</strong>. Erra,
        aprende, acerta, evolui.{' '}
        <strong>
          Estudar por questões mudou completamente minha forma de aprender
        </strong>{' '}
        — e foi o que me levou a finalmente ver resultado.”
      </>
    ),
    author: 'Aluno DAQ',
    role: 'Virada de chave com estudo por questões',
  },

  // 13) Simplicidade
  {
    image: '/img/depoimento_4.webp',
    text: 'Sem malabarismo mental, planilhas complexas ou cálculos de horas. O DAQ trouxe simplicidade e resultado como eu nunca tinha visto antes.',
    author: 'Aluno DAQ',
    role: 'Método direto ao ponto',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-amber-500 mr-2" />
            Histórias reais de quem aplicou o Método SPQ
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Concurseiros comuns que saíram do caos de PDFs, organizaram os estudos e voltaram
            a acreditar na aprovação estudando por questões.
          </p>
        </div>

        {/* Grid de depoimentos – todos visíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <article
              key={`${testimonial.author}-${index}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Imagem em destaque */}
              <div className="relative h-48 w-full md:h-52">
                <Image
                  src={testimonial.image}
                  alt={`Depoimento de ${testimonial.author}`}
                  fill
                  // Otimização para Mobile (mantida conforme última correção)
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>

              {/* Texto */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="text-amber-400 text-2xl mt-1"
                  />
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>

                <div className="mt-auto border-t border-slate-100 pt-4">
                  <h4 className="font-semibold text-slate-800">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}