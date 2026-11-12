import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { autoAudio } from '../audio/automotiveAudio';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  stats: { label: string; value: string }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'polimento',
    title: 'Polimento Técnico Multi-Etapas',
    category: 'Estética Automotiva',
    description: 'Remoção de 95% de riscos circulares (swirl marks), teias de aranha e oxidação do verniz com corte, refino e lustro.',
    beforeImg: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=95',
    beforeLabel: 'Antes: Verniz Opaco & Hologramas',
    afterLabel: 'Depois: Brilho Espelhado Profundo',
    stats: [
      { label: 'Tempo Médio', value: '8 a 12 horas' },
      { label: 'Correção', value: 'Até 95% dos riscos' },
      { label: 'Proteção', value: 'Selante de Cera & Sílica' },
    ]
  },
  {
    id: 'funilaria',
    title: 'Funilaria e Alinhamento Estrutural',
    category: 'Funilaria Artesanal',
    description: 'Recuperação minuciosa de vincos originais sem excesso de massa plástica, preservando a originalidade do painel.',
    beforeImg: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=95',
    beforeLabel: 'Antes: Amassado e Vincos Deformados',
    afterLabel: 'Depois: Alinhamento Milimétrico Original',
    stats: [
      { label: 'Técnica', value: 'Martelinho & Estiramento' },
      { label: 'Preservação', value: 'Chapa Original Mantida' },
      { label: 'Garantia', value: '1 Ano de Alinhamento' },
    ]
  },
  {
    id: 'pintura',
    title: 'Pintura Completa em Cabine Pressurizada',
    category: 'Pintura Automotiva',
    description: 'Aplicação com pistola alemã de alta precisão em estufa com secagem infravermelha, livre de poeiras ou contaminações.',
    beforeImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=95',
    beforeLabel: 'Antes: Pintura Arranhada e Descascada',
    afterLabel: 'Depois: Tom 100% Fiel & Verniz Alto Sólido',
    stats: [
      { label: 'Pigmentação', value: 'Espectrofotômetro Digital' },
      { label: 'Cabine', value: 'Filtros de Carvão Ativado' },
      { label: 'Garantia', value: '2 Anos contra descascamento' },
    ]
  },
  {
    id: 'vitrificacao',
    title: 'Vitrificação Cerâmica 9H (Proteção Longa)',
    category: 'Nano Proteção',
    description: 'Formação de escudo de sílica (SiO2) que repele água, sujeira e protege contra dejetos corrosivos e raios ultravioleta.',
    beforeImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=95',
    beforeLabel: 'Antes: Superfície Desprotegida',
    afterLabel: 'Depois: Efeito Hidrofóbico Extremo',
    stats: [
      { label: 'Dureza', value: '9H Resistência Química' },
      { label: 'Durabilidade', value: 'Até 3 Anos de Proteção' },
      { label: 'Benefício', value: 'Lavagem 3x mais rápida' },
    ]
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = CASE_STUDIES[activeTab];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const selectCase = (idx: number) => {
    setActiveTab(idx);
    setSliderPosition(50);
    autoAudio.playKatanaSlash();
  };

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {CASE_STUDIES.map((study, idx) => (
          <button
            key={study.id}
            onClick={() => selectCase(idx)}
            className={`px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === idx
                ? 'bg-[#E5004F] text-white font-bold shadow-lg shadow-[#E5004F]/30 scale-105'
                : 'bg-[#141414] text-zinc-400 hover:text-white border border-[#242424]'
            }`}
          >
            <span>{study.title.split(' ')[0]}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">
              ({study.category})
            </span>
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
            className="relative w-full h-[380px] sm:h-[460px] rounded-sm overflow-hidden select-none border border-[#2A2A2A] shadow-2xl cursor-ew-resize group"
          >
            {/* 1. DEPOIS (Background / Base Image) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCase.afterImg}
                alt={currentCase.afterLabel}
                className="w-full h-full object-cover filter contrast-125 brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 bg-[#E5004F] text-white px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest font-black rounded-sm shadow-xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DEPOIS (Finalizado)</span>
              </div>
            </div>

            {/* 2. ANTES (Clipped Left Layer) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="relative h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
              >
                <img
                  src={currentCase.beforeImg}
                  alt={currentCase.beforeLabel}
                  className="w-full h-full object-cover filter grayscale contrast-75 brightness-75 blur-[1px]"
                  style={{ minWidth: '100%' }}
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                <div className="absolute top-4 left-4 bg-zinc-950/90 text-zinc-300 border border-zinc-700 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest font-bold rounded-sm shadow-xl">
                  <span>ANTES (Estado Inicial)</span>
                </div>
              </div>
            </div>

            {/* 3. Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#E5004F] shadow-[0_0_15px_#E5004F] z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-[#E5004F] text-white flex items-center justify-center shadow-2xl border-2 border-[#0D0D0D] group-hover:scale-110 transition-transform">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom instruction hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 backdrop-blur-md pointer-events-none">
              ◄ Arraste para comparar ►
            </div>
          </div>
        </div>

        {/* Right: Technical Details & Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5004F] font-bold">
              {currentCase.category}
            </span>
            <h3 className="text-2xl font-black uppercase text-white mt-1">
              {currentCase.title}
            </h3>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentCase.stats.map((st, i) => (
              <div
                key={i}
                className="p-3.5 rounded-sm bg-[#121212] border-l-2 border-[#E5004F] border-t border-r border-b border-[#222222] flex items-center justify-between"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {st.label}
                </span>
                <span className="text-xs font-bold text-white font-mono">
                  {st.value}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/5511997078462?text=Ol%C3%A1%2C%20Garage%20Samurai!%20Vi%20o%20Antes%20e%20Depois%20e%20gostaria%20de%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-sm text-xs uppercase tracking-[0.2em] font-black bg-[#E5004F] hover:bg-[#c90044] text-white transition-all shadow-xl shadow-[#E5004F]/25 flex items-center justify-center gap-2.5 group"
          >
            <span>Quero esse resultado</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
