import React from 'react';

interface SamuraiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'horizontal';
  showSubtext?: boolean;
  animated?: boolean;
}

export const SamuraiLogo: React.FC<SamuraiLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtext = true,
  animated = true,
}) => {
  // Height & scale presets
  const sizeMap = {
    sm: { height: 36, badgeSize: 34, titleSize: 'text-base', subSize: 'text-[8px]', kanjiSize: 22 },
    md: { height: 46, badgeSize: 42, titleSize: 'text-xl', subSize: 'text-[9.5px]', kanjiSize: 26 },
    lg: { height: 56, badgeSize: 52, titleSize: 'text-2xl', subSize: 'text-[11px]', kanjiSize: 32 },
    xl: { height: 72, badgeSize: 66, titleSize: 'text-3xl sm:text-4xl', subSize: 'text-xs', kanjiSize: 42 },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none group ${className}`}>
      {/* 1. EMBLEMA KANJI (Samurai 侍) */}
      <div 
        className={`relative flex items-center justify-center shrink-0 rounded-xl bg-[#0d0d0d] border border-white/10 shadow-lg shadow-black/80 transition-all duration-300 ${
          animated ? 'group-hover:border-[#E5004F] group-hover:shadow-[0_0_20px_rgba(229,0,79,0.4)] group-hover:scale-105' : ''
        }`}
        style={{ width: current.badgeSize, height: current.badgeSize }}
      >
        {/* Subtle neon corner highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        {/* Kanji Glyph: 侍 (Samurai) - Vector SVG for infinite razor-sharp resolution */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-[72%] h-[72%] text-white fill-current transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {/* Radical: 人/亻 (left) + 寺 (right) authentic calligraphy paths */}
          <path d="M 32 18 C 30 25 24 38 15 48 C 13.5 50 14.5 51.5 16.5 50 C 23 45 28 38 31 29 C 32 37 32 60 32 82 C 32 86 30 87 28 87 C 27 87 27 89 29.5 89 C 33 89 36 86 36 82 L 36 22 Z" />
          <path d="M 44 26 L 86 26 C 88 26 89 24.5 87 24 C 76 21 68 21 46 21 C 43 21 43 26 44 26 Z" />
          <path d="M 64 12 L 64 38 C 64 41 68 41 68 38 L 68 12 C 68 9 64 9 64 12 Z" />
          <path d="M 38 41 L 92 41 C 94.5 41 94.5 37 91 37 L 39 37 C 36 37 36 41 38 41 Z" />
          <path d="M 48 57 L 82 57 C 84 57 85 53 82 53 L 48 53 C 45 53 45 57 48 57 Z" />
          <path d="M 72 40 L 72 73 C 72 80 69 84 62 86 C 59.5 87 60.5 89 62.5 88.5 C 72 86 77 81 77 71 L 77 40 Z" />
          <path d="M 50 67 C 49 71 45 78 41 83 C 39.5 85 41.5 86 43 85 C 47 81 51 74 53 68 C 53.5 66 50.5 65 50 67 Z" />
        </svg>

        {/* Bottom accent glow strip */}
        <div className="absolute inset-x-2 bottom-0 h-[2px] bg-[#E5004F] rounded-full opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#E5004F] transition-all" />
      </div>

      {/* 2. TEXTO TIPOGRÁFICO DA LOGO */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center">
          {/* Top Line: SAMURAI with the iconic Katana / Crosshair motif in the R */}
          <div className={`font-black tracking-[0.14em] uppercase leading-none text-white ${current.titleSize} flex items-center`}>
            <span>SAMU</span>
            {/* The Stylized R with the Japanese Red Cross/Target accent */}
            <span className="relative inline-block text-[#E5004F] mx-[0.5px]">
              R
              {/* Subtle precision reticle line */}
              <span className="absolute left-[-2px] right-[-2px] top-[46%] h-[1.5px] bg-[#E5004F] pointer-events-none opacity-90 shadow-[0_0_4px_#E5004F]" />
            </span>
            <span>AI</span>
          </div>

          {/* Bottom Line: G A R A G E */}
          {showSubtext && (
            <div className={`uppercase tracking-[0.52em] text-zinc-400 font-mono font-bold mt-1 leading-none ${current.subSize} group-hover:text-zinc-200 transition-colors`}>
              GARAGE
            </div>
          )}
        </div>
      )}
    </div>
  );
};
