import React, { useState } from 'react';
import { Sparkles, Maximize2, X, CheckCircle, ArrowRight } from 'lucide-react';
import { autoAudio } from '../audio/automotiveAudio';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'funilaria' | 'pintura' | 'polimento' | 'vitrificacao' | 'revitalizacao';
  categoryLabel: string;
  imgUrl: string;
  subtitle: string;
  specs: string[];
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Pintura Completa em Estufa Térmica',
    category: 'pintura',
    categoryLabel: 'Pintura',
    imgUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Aplicação de verniz alto sólido com cabine pressurizada e secagem infravermelha.',
    specs: ['Verniz UHS Alemão', 'Filtro Antipoeira', 'Garantia de Tom']
  },
  {
    id: 'p2',
    title: 'Proteção Cerâmica 9H Hidrofóbica',
    category: 'vitrificacao',
    categoryLabel: 'Vitrificação',
    imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Camada de vidro líquido com repelência de água extrema e proteção contra raios solares UV.',
    specs: ['Dureza 9H Certificada', 'Repelência H2O', '3 Anos de Brilho']
  },
  {
    id: 'p3',
    title: 'Funilaria Artesanal & Martelinho Fino',
    category: 'funilaria',
    categoryLabel: 'Funilaria',
    imgUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Restauração da geometria de lataria sem remoção desnecessária da pintura original.',
    specs: ['Sem Massa Excessiva', 'Alinhamento a Laser', 'Estrutura Intacta']
  },
  {
    id: 'p4',
    title: 'Polimento Técnico Multi-Etapas Black Piano',
    category: 'polimento',
    categoryLabel: 'Polimento',
    imgUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Eliminação de micro-riscos, swirls e hologramas com politrizes roto-orbitais.',
    specs: ['Corte + Refino + Lustro', 'Zero Hologramas', 'Reflexo Puro']
  },
  {
    id: 'p5',
    title: 'Revitalização de Plásticos & Emborrachados',
    category: 'revitalizacao',
    categoryLabel: 'Revitalização',
    imgUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Tratamento condicionador profundo que restaura a pigmentação preta original sem deixar grudento.',
    specs: ['Proteção Sílica', 'Anti-Ressecamento', 'Acabamento Acetinado']
  },
  {
    id: 'p6',
    title: 'Detalhamento Estético & Vitrificação de Rodas',
    category: 'vitrificacao',
    categoryLabel: 'Vitrificação',
    imgUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
    subtitle: 'Proteção de pinças de freio e rodas de liga leve contra poeira de pastilha e fuligem quente.',
    specs: ['Resistência a 700°C', 'Fácil Limpeza', 'Brilho Forjado']
  }
];

export const PortfolioGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filterItems = (cat: string) => {
    setActiveFilter(cat);
    autoAudio.playClick();
  };

  const filtered = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(it => it.category === activeFilter);

  return (
    <div>
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">
            PORTFÓLIO SAMURAI
          </span>
          <h2 className="text-3xl font-black uppercase text-white mt-1">
            A Arte da Transformação
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'funilaria', label: 'Funilaria' },
            { id: 'pintura', label: 'Pintura' },
            { id: 'polimento', label: 'Polimento' },
            { id: 'vitrificacao', label: 'Vitrificação' },
            { id: 'revitalizacao', label: 'Revitalização' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => filterItems(btn.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === btn.id
                  ? 'bg-[#E5004F] text-white font-bold shadow-md shadow-[#E5004F]/30'
                  : 'bg-[#141414] text-zinc-400 hover:text-white border border-[#242424]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              autoAudio.playKatanaSlash();
            }}
            className="group relative h-84 rounded-xl overflow-hidden bg-[#121214] border border-[#222226] hover:border-[#E5004F] transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#E5004F]/20"
          >
            <img
              src={item.imgUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded bg-[#0e0e0e]/90 text-[10.5px] font-mono uppercase tracking-wider text-[#E5004F] border border-[#E5004F]/40 font-bold backdrop-blur-md">
                {item.categoryLabel}
              </span>
            </div>

            {/* Click to expand hint */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#E5004F] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2">
                {item.subtitle}
              </p>

              {/* Quick specs pill row */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                {item.specs.map((sp, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded"
                  >
                    • {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121214] rounded-2xl overflow-hidden border border-[#E5004F] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-[#E5004F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 h-72 md:h-[460px]">
                <img
                  src={selectedItem.imgUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5004F] font-bold">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white mt-2 leading-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-zinc-300 text-sm mt-4 leading-relaxed">
                    {selectedItem.subtitle}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {selectedItem.specs.map((sp, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                        <CheckCircle className="w-4 h-4 text-[#E5004F]" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href="https://wa.me/5511997078462?text=Ol%C3%A1%2C%20Garage%20Samurai!%20Gostei%20do%20projeto%20no%20portf%C3%B3lio%20e%20gostaria%20de%20fazer%20no%20meu%20carro."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg text-xs uppercase tracking-widest font-black bg-[#E5004F] hover:bg-[#c90044] text-white flex items-center justify-center gap-2"
                  >
                    <span>Quero esse padrão</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
