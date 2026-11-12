import React, { useState } from 'react';
import { 
  Phone, 
  Instagram, 
  ChevronRight, 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  ArrowUpRight, 
  MessageCircle, 
  Volume2, 
  VolumeX,
  Layers,
  Award,
  Clock,
  MapPin,
  Check
} from 'lucide-react';
import { SamuraiLogo } from './components/SamuraiLogo';
import { AutomotiveShowroom3D } from './components/AutomotiveShowroom3D';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BudgetSimulator } from './components/BudgetSimulator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HeroVisualEffects } from './components/HeroVisualEffects';
import { autoAudio } from './audio/automotiveAudio';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const next = autoAudio.toggleMute();
    setIsMuted(next);
  };

  const navLinks = [
    { label: 'Showroom 3D', href: '#showroom' },
    { label: 'Filosofia', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Antes & Depois', href: '#comparador' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Pilares', href: '#diferenciais' },
    { label: 'Orçamento', href: '#agendamento' },
    { label: 'Localização', href: '#localizacao' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    autoAudio.playClick();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#E5004F] selection:text-white antialiased overflow-x-hidden">
      {/* ================= 1. BARRA SUPERIOR DE INFORMAÇÕES ================= */}
      <div className="bg-[#0e0e11] border-b border-[#1c1c20] text-xs py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-zinc-300">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#E5004F] inline-block shadow-[0_0_8px_#E5004F]" />
            <span className="text-zinc-200 font-bold">OFICINA ESPECIALIZADA • GUARULHOS - SP</span>
            <span className="text-zinc-500 hidden sm:inline">• Av. Papa Pio XII, 608</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Ativar Efeitos Sonoros' : 'Mutar Efeitos Sonoros'}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors font-mono text-[11px]"
              title={isMuted ? 'Ativar Efeitos Sonoros' : 'Mutar Efeitos Sonoros'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E5004F]" />}
              <span className="hidden md:inline">{isMuted ? 'Sons: Desativados' : 'Sons: Ativos'}</span>
            </button>

            <a
              href="https://wa.me/5511997078462"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5004F] transition-colors flex items-center gap-1.5 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5004F]" />
              <span>(11) 99707-8462</span>
            </a>

            <a
              href="https://www.instagram.com/garage.samurai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5004F] transition-colors flex items-center gap-1.5 font-medium hidden sm:flex"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E5004F]" />
              <span>@garage.samurai</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= 2. HEADER PRINCIPAL / NAVEGAÇÃO ================= */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Principal Usando a Imagem Enviada */}
          <a href="#hero" className="flex items-center focus:outline-none" onClick={() => autoAudio.playKatanaSlash()}>
            <SamuraiLogo size="md" />
          </a>

          {/* Menu Desktop */}
          <nav className="hidden xl:flex items-center gap-6 text-xs uppercase font-bold tracking-widest text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => autoAudio.playClick()}
                className="hover:text-[#E5004F] transition-colors py-2 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E5004F] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Botão de Orçamento no Header */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#agendamento"
              onClick={() => autoAudio.playKatanaSlash()}
              className="px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-black bg-[#E5004F] hover:bg-[#c90044] text-white shadow-lg shadow-[#E5004F]/30 transition-all flex items-center gap-2 group"
            >
              <span>Solicitar Orçamento</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-zinc-300 hover:text-[#E5004F]"
            aria-label="Abrir Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0d0d10] border-b border-[#242424] px-6 py-6 space-y-4 text-xs font-bold uppercase tracking-widest animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block text-zinc-300 hover:text-[#E5004F] py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#agendamento"
              onClick={handleNavClick}
              className="block pt-2 text-[#E5004F] font-black"
            >
              Fazer Orçamento pelo WhatsApp →
            </a>
          </div>
        )}
      </header>

      {/* ================= 3. HERO SECTION ================= */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Effects */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2200&q=85"
            alt="Estúdio Automotivo Garage Samurai"
            className="w-full h-full object-cover object-center brightness-40 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
          <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[#E5004F]/20 rounded-full blur-[160px] pointer-events-none" />

          {/* Interactive Particle Embers Effect */}
          <HeroVisualEffects />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414]/90 border border-[#E5004F]/40 backdrop-blur-md mb-6 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#E5004F] shadow-[0_0_8px_#E5004F]" />
              <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-white font-bold">
                GARAGE SAMURAI — AUTOMOTIVE SPECIALISTS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] uppercase text-white mb-6">
              Precisão em cada detalhe.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E5004F]">
                Excelência em cada acabamento.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mb-10">
              Funilaria, pintura e estética automotiva com o cuidado e a precisão que seu veículo merece. A união da técnica artesanal com a paixão por automóveis.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#agendamento"
                onClick={() => autoAudio.playKatanaSlash()}
                className="px-8 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-black bg-[#E5004F] hover:bg-[#c90044] text-white transition-all shadow-xl shadow-[#E5004F]/30 flex items-center justify-center gap-3 group"
              >
                <span>Solicitar Orçamento</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#showroom"
                onClick={() => autoAudio.playClick()}
                className="px-8 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-bold bg-[#141414] hover:bg-[#1C1C1C] text-white border border-[#2A2A2A] hover:border-[#E5004F]/50 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Interagir no Showroom 3D</span>
                <ArrowUpRight className="w-4 h-4 text-[#E5004F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Quality Specs Row */}
            <div className="mt-14 pt-8 border-t border-[#1F1F1F] grid grid-cols-2 sm:grid-cols-3 gap-6 text-zinc-400">
              <div>
                <p className="text-[#E5004F] font-mono text-xs uppercase tracking-wider font-bold">CABINE MODERNA</p>
                <p className="text-xs text-zinc-400 mt-1">Pintura livre de impurezas</p>
              </div>
              <div>
                <p className="text-white font-mono text-xs uppercase tracking-wider font-bold">ALINHAMENTO PRECISO</p>
                <p className="text-xs text-zinc-400 mt-1">Funilaria e martelinho fino</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[#E5004F] font-mono text-xs uppercase tracking-wider font-bold">BRILHO ESPELHADO</p>
                <p className="text-xs text-zinc-400 mt-1">Polimento técnico & vitrificação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. SHOWROOM 3D INTERATIVO (SKILL THREE.JS) ================= */}
      <section id="showroom" className="py-24 bg-[#0a0a0d] border-t border-[#1C1C1C] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">
              EXPERIÊNCIA IMERSIVA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-2">
              Showroom 3D <span className="text-[#E5004F]">Garage Samurai</span>
            </h2>
            <div className="w-16 h-1 bg-[#E5004F] mx-auto mt-4" />
            <p className="text-zinc-400 text-sm mt-4">
              Gire e inspecione o veículo em 360°. Experimente cores e teste a diferença visual entre o verniz oxidado, o polimento técnico e a vitrificação cerâmica 9H.
            </p>
          </div>

          {/* Three.js Canvas Component */}
          <AutomotiveShowroom3D />
        </div>
      </section>

      {/* ================= 5. SEÇÃO DE IDENTIDADE / FILOSOFIA SAMURAI ================= */}
      <section id="sobre" className="py-24 bg-[#080808] border-t border-[#1C1C1C] relative overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/[0.02] text-[320px] font-black select-none pointer-events-none">
          武士
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Foto Editorial com Kanji Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-[#262626] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                  alt="Profissional executando funilaria e pintura"
                  className="w-full h-[470px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-[#121212]/95 border border-[#E5004F]/40 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SamuraiLogo size="sm" showSubtext={false} />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-white">GARAGE SAMURAI</h4>
                      <p className="text-[11px] text-zinc-400">Tradição de precisão e disciplina</p>
                    </div>
                  </div>
                  <span className="text-[#E5004F] font-mono text-sm font-bold">武士道</span>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-[#E5004F]" />
            </div>

            {/* Texto Editorial */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#E5004F]" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">
                  O CAMINHO DO SAMURAI
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Mais que um serviço.
                <span className="block text-[#E5004F]">Um compromisso com a perfeição.</span>
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed">
                Cada veículo merece atenção aos mínimos detalhes. Na Garage Samurai, acreditamos que um acabamento excepcional começa com precisão, cuidado e dedicação em cada etapa do processo.
              </p>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Inspirados no rigor dos mestres japoneses, executamos funilaria fina, repintura com fidelidade de tom e tratamentos estéticos que resgatam o brilho e valorizam o veículo.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-[#141414] border-l-2 border-[#E5004F]">
                  <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-1">CUIDADO ARTESANAL</h5>
                  <p className="text-zinc-400 text-xs">Atenção minuciosa a cada centímetro da lataria.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#141414] border-l-2 border-white">
                  <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-1">PADRÃO SUPERIOR</h5>
                  <p className="text-zinc-400 text-xs">Acabamento com reflexo nítido e proteção duradoura.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/5511997078462?text=Ol%C3%A1%2C%20Garage%20Samurai!%20Gostaria%20de%20conversar%20sobre%20o%20cuidado%20do%20meu%20carro."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#E5004F] hover:text-white transition-colors"
                >
                  <span>Falar com o especialista</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. SEÇÃO DE SERVIÇOS ================= */}
      <section id="servicos" className="py-24 bg-[#0a0a0d] relative border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">ESPECIALIDADES</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-2">
              Serviços <span className="text-[#E5004F]">Garage Samurai</span>
            </h2>
            <div className="w-16 h-1 bg-[#E5004F] mx-auto mt-4" />
            <p className="text-zinc-400 text-sm mt-4">
              Técnicas especializadas para devolver a harmonia estrutural e o brilho autêntico da pintura do seu carro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Funilaria */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80" alt="Funilaria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">板金</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Funilaria Artesanal</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Recuperação da estrutura e da aparência do veículo, com atenção aos detalhes e ao acabamento milimétrico sem massa pesada.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20FUNILARIA." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Pintura Automotiva */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80" alt="Pintura Automotiva" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">塗装</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Pintura em Estufa</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Renovação da pintura com foco na uniformidade, qualidade visual, verniz de alto sólido e fidelidade de tom 100% precisa.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20PINTURA%20AUTOMOTIVA." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Polimento Técnico */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80" alt="Polimento" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">研磨</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Polimento Técnico</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Tratamento multi-etapas para eliminar hologramas, manchas ácidas e riscos leves, restaurando o reflexo vítreo.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20POLIMENTO." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 4. Revitalização */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" alt="Revitalização" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">再生</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Revitalização & Detalhes</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Cuidados minuciosos para recuperar a cor dos plásticos ressecados, faróis amarelados e guarnições de borracha.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20REVITALIZA%C3%87%C3%83O." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 5. Vitrificação */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80" alt="Vitrificação" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">玻璃</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Vitrificação Cerâmica 9H</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Nano-revestimento cerâmico que cria uma carapaça de proteção contra dejetos, seiva, chuva ácida e confere hidrorrepelência.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20VITRIFICA%C3%87%C3%83O." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 6. Estética Automotiva Completa */}
            <div className="group bg-[#101012] rounded-sm overflow-hidden border border-[#202024] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between">
              <div className="relative h-56 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" alt="Estética Automotiva" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#0A0A0A]/85 text-[11px] font-mono tracking-widest text-[#E5004F] border border-[#2A2A2A] font-bold">美学</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase text-white tracking-wider group-hover:text-[#E5004F] transition-colors">Estética Automotiva VIP</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5">Detalhamento completo interno e externo, descontaminação ferrosa, lavagem detalhada de chassi e proteção de estofados.</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
                  <a href="https://wa.me/5511997078462?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20EST%C3%89TICA%20AUTOMOTIVA." target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 rounded-sm text-[11px] font-black uppercase tracking-widest bg-[#171717] hover:bg-[#E5004F] text-white border border-[#262626] hover:border-[#E5004F] transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Solicitar Orçamento</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. ANTES & DEPOIS INTERATIVO ================= */}
      <section id="comparador" className="py-24 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">
              TRANSFORMAÇÃO REAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-2">
              Antes & Depois Interativo
            </h2>
            <div className="w-16 h-1 bg-[#E5004F] mx-auto mt-4" />
            <p className="text-zinc-400 text-sm mt-4">
              Arraste o divisor horizontal para comparar o estado anterior e posterior ao polimento técnico, funilaria e pintura.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* ================= 8. PORTFÓLIO DE PROJETOS ================= */}
      <section id="portfolio" className="py-24 bg-[#0a0a0d] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGallery />
        </div>
      </section>

      {/* ================= 9. OS 4 PILARES DA GARAGE SAMURAI ================= */}
      <section id="diferenciais" className="py-24 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">DIFERENCIAIS</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-2">Nossos Quatro Pilares</h2>
            <div className="w-16 h-1 bg-[#E5004F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-sm bg-[#111114] border border-[#222226] hover:border-[#E5004F]/70 transition-all group">
              <span className="text-3xl font-black font-mono text-[#E5004F]">01</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mt-4 group-hover:text-[#E5004F] transition-colors">Precisão</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">Atenção rigorosa aos detalhes em cada centímetro da lataria e pintura.</p>
            </div>

            <div className="p-8 rounded-sm bg-[#111114] border border-[#222226] hover:border-[#E5004F]/70 transition-all group">
              <span className="text-3xl font-black font-mono text-white">02</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mt-4 group-hover:text-[#E5004F] transition-colors">Cuidado</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">Respeito total ao veículo e compromisso com o acabamento autêntico.</p>
            </div>

            <div className="p-8 rounded-sm bg-[#111114] border border-[#222226] hover:border-[#E5004F]/70 transition-all group">
              <span className="text-3xl font-black font-mono text-[#E5004F]">03</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mt-4 group-hover:text-[#E5004F] transition-colors">Qualidade</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">Utilização de insumos nobres alemães e japoneses de alta durabilidade.</p>
            </div>

            <div className="p-8 rounded-sm bg-[#111114] border border-[#222226] hover:border-[#E5004F]/70 transition-all group">
              <span className="text-3xl font-black font-mono text-white">04</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-white mt-4 group-hover:text-[#E5004F] transition-colors">Personalidade</h3>
              <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">Identidade exclusiva inspirada na disciplina e na filosofia milenar samurai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. SIMULADOR & ORÇAMENTO WHATSAPP ================= */}
      <section id="agendamento" className="py-24 bg-[#0a0a0d] border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetSimulator />
        </div>
      </section>

      {/* ================= 11. DEPOIMENTOS DE CLIENTES ================= */}
      <section className="py-24 bg-[#080808] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsSection />
        </div>
      </section>

      {/* ================= 12. OFICINA & LOCALIZAÇÃO ================= */}
      <section id="localizacao" className="py-24 bg-[#0a0a0d] border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationSection />
        </div>
      </section>

      {/* ================= 13. INSTAGRAM FEED SECTION ================= */}
      <section id="instagram" className="py-20 bg-[#080808] border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">INSTAGRAM OFICIAL</span>
              <h2 className="text-3xl font-black uppercase text-white mt-1">Acompanhe Nossos Projetos</h2>
              <p className="text-zinc-400 text-sm mt-1">
                Vídeos em 4K de antes e depois, stories diários e transformações reais.
              </p>
            </div>

            <a
              href="https://www.instagram.com/garage.samurai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-sm bg-[#171717] hover:bg-[#E5004F] text-white border border-[#2E2E2E] hover:border-[#E5004F] text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center gap-2.5"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir @garage.samurai</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80', label: 'Pintura' },
              { img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80', label: 'Polimento' },
              { img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', label: 'Funilaria' },
              { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', label: 'Vitrificação' },
              { img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80', label: 'Acabamento' },
              { img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80', label: 'Revitalização' },
            ].map((post, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/garage.samurai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-48 rounded-sm overflow-hidden bg-[#151515] border border-[#262626]"
              >
                <img
                  src={post.img}
                  alt={post.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#E5004F]/0 group-hover:bg-[#E5004F]/75 transition-colors flex flex-col items-center justify-center gap-1">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] font-mono uppercase text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {post.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 14. CTA FINAL ================= */}
      <section className="relative py-28 overflow-hidden bg-[#080808] border-t border-[#202020]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
            alt="Fundo automotivo"
            className="w-full h-full object-cover opacity-20 filter contrast-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#E5004F]/20 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <SamuraiLogo size="lg" className="justify-center mb-6" />

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Seu carro merece um <br />
            <span className="text-[#E5004F]">tratamento à altura.</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto mt-6 leading-relaxed">
            Conte com a Garage Samurai para cuidar de cada detalhe com rigor, tecnologia e paixão automotiva.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5511997078462?text=Ol%C3%A1%2C%20Garage%20Samurai!%20Gostaria%20de%20solicitar%20meu%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => autoAudio.playKatanaSlash()}
              className="px-8 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-black bg-[#E5004F] hover:bg-[#c90044] text-white transition-all shadow-xl shadow-[#E5004F]/30 flex items-center justify-center gap-3 group"
            >
              <span>SOLICITAR MEU ORÇAMENTO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= 15. RODAPÉ COM A LOGO ================= */}
      <footer className="bg-[#050505] border-t border-[#1C1C1C] text-zinc-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Coluna 1 - Logo & Marca */}
            <div className="space-y-4">
              <SamuraiLogo size="sm" />
              <p className="text-zinc-400 text-xs leading-relaxed">
                Especialistas em: Funilaria | Pintura | Polimento | Revitalização | Vitrificação 9H.
              </p>
              <div className="text-[11px] text-[#E5004F] font-mono font-bold tracking-widest uppercase">
                Precisão que se vê. Qualidade que se sente.
              </div>
            </div>

            {/* Coluna 2 - Serviços */}
            <div>
              <h4 className="text-white font-mono uppercase tracking-widest text-xs font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-zinc-400 text-xs">
                <li><a href="#servicos" className="hover:text-white transition-colors">Funilaria Artesanal</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Pintura em Estufa</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Polimento Técnico</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Revitalização de Detalhes</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Vitrificação Cerâmica 9H</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Estética Automotiva VIP</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Links Rápidos */}
            <div>
              <h4 className="text-white font-mono uppercase tracking-widest text-xs font-bold mb-4">Navegação</h4>
              <ul className="space-y-2 text-zinc-400 text-xs">
                <li><a href="#hero" className="hover:text-[#E5004F] transition-colors">Início</a></li>
                <li><a href="#showroom" className="hover:text-[#E5004F] transition-colors">Showroom 3D</a></li>
                <li><a href="#sobre" className="hover:text-[#E5004F] transition-colors">Filosofia</a></li>
                <li><a href="#comparador" className="hover:text-[#E5004F] transition-colors">Antes & Depois</a></li>
                <li><a href="#portfolio" className="hover:text-[#E5004F] transition-colors">Portfólio</a></li>
                <li><a href="#agendamento" className="hover:text-[#E5004F] transition-colors">Orçamento WhatsApp</a></li>
              </ul>
            </div>

            {/* Coluna 4 - Oficina & Contato */}
            <div className="space-y-3">
              <h4 className="text-white font-mono uppercase tracking-widest text-xs font-bold mb-4">Oficina</h4>
              <p className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-[#E5004F] shrink-0 mt-0.5" />
                <span>Av. Papa Pio XII, 608 - Macedo, Guarulhos - SP</span>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-[#E5004F] shrink-0" />
                <a href="https://wa.me/5511997078462" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  (11) 99707-8462
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Instagram className="w-4 h-4 text-[#E5004F] shrink-0" />
                <a href="https://www.instagram.com/garage.samurai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @garage.samurai
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-400 text-[11px] font-mono">
                <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Seg a Sex: 08h às 18h | Sáb: 08h às 13h</span>
              </p>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
            <div>© {new Date().getFullYear()} GARAGE SAMURAI. Todos os direitos reservados.</div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span>Samurai Precision</span>
              <span className="w-2 h-2 rounded-full bg-[#E5004F]" />
              <span>Guarulhos - SP</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= 16. BOTÃO FLUTUANTE DO WHATSAPP ================= */}
      <a
        href="https://wa.me/5511997078462"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp da Garage Samurai"
        onClick={() => autoAudio.playKatanaSlash()}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#E5004F] hover:bg-[#c90044] text-white flex items-center justify-center shadow-2xl shadow-[#E5004F]/60 transition-all hover:scale-110 active:scale-95 group"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#080808] animate-ping" />
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
