import React, { useMemo } from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink, Navigation, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  // Real-time operating hours check
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = now.getHours();

    if (day === 0) return false; // Closed Sunday
    if (day === 6) return hour >= 8 && hour < 13; // Saturday 8am - 1pm
    return hour >= 8 && hour < 18; // Mon-Fri 8am - 6pm
  }, []);

  return (
    <div className="bg-[#121215] rounded-2xl border border-[#26262a] p-8 sm:p-12 overflow-hidden shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Info Left */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5004F] shadow-[0_0_8px_#E5004F]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5004F] font-bold">
              OFICINA & ATENDIMENTO
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
            Venha Conhecer a <br />
            <span className="text-[#E5004F]">Garage Samurai</span>
          </h2>

          <p className="text-zinc-300 text-sm leading-relaxed">
            Localização privilegiada no Macedo em Guarulhos - SP. Espaço estruturado com cabine de pintura de última geração, iluminação técnica para polimento e área climatizada para vitrificação.
          </p>

          {/* Operating Status Badge */}
          <div className="p-3 rounded-lg bg-[#18181c] border border-white/5 flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${isOpenNow ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-amber-400'}`} />
            <div className="text-xs">
              <span className="font-bold text-white">
                {isOpenNow ? 'Oficina Aberta no Momento' : 'Atendimento Online 24h'}
              </span>
              <span className="text-zinc-400 ml-2">
                {isOpenNow ? 'Segunda a Sexta (08:00 - 18:00)' : 'Envie sua mensagem no WhatsApp para agendar'}
              </span>
            </div>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#E5004F]/10 border border-[#E5004F]/30 flex items-center justify-center text-[#E5004F] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Endereço Oficial</h4>
                <p className="text-sm font-bold text-white mt-0.5">
                  Av. Papa Pio XII, 608 - Macedo, Guarulhos - SP
                </p>
                <p className="text-xs text-zinc-400">CEP: 07113-000 • Próximo ao Centro e fácil acesso à Dutra</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#E5004F]/10 border border-[#E5004F]/30 flex items-center justify-center text-[#E5004F] shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">WhatsApp & Telefone</h4>
                <a
                  href="https://wa.me/5511997078462"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-[#E5004F] transition-colors mt-0.5 block"
                >
                  (11) 99707-8462
                </a>
                <p className="text-xs text-zinc-400">Atendimento rápido para envio de fotos e cotações</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#E5004F]/10 border border-[#E5004F]/30 flex items-center justify-center text-[#E5004F] shrink-0 mt-0.5">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">Instagram Oficial</h4>
                <a
                  href="https://www.instagram.com/garage.samurai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-[#E5004F] transition-colors mt-0.5 block"
                >
                  @garage.samurai
                </a>
                <p className="text-xs text-zinc-400">Acompanhe os bastidores e os novos projetos semanais</p>
              </div>
            </div>
          </div>

          {/* Action Route Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+Papa+Pio+XII,+608+-+Macedo,+Guarulhos+-+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-[#E5004F] hover:bg-[#c90044] text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E5004F]/20"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Traçar Rota no Maps</span>
            </a>

            <a
              href="https://waze.com/ul?q=Av.+Papa+Pio+XII,+608+-+Macedo,+Guarulhos+-+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-[#1e1e24] hover:bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center gap-2 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#E5004F]" />
              <span>Abrir no Waze</span>
            </a>
          </div>
        </div>

        {/* Visual Map Card / Workshop Facade Right */}
        <div className="lg:col-span-6">
          <div className="relative rounded-xl overflow-hidden border border-[#2a2a30] shadow-2xl group">
            {/* Embedded Google Maps View or Interactive Map Preview */}
            <iframe
              title="Localização Garage Samurai"
              src="https://maps.google.com/maps?q=Av.+Papa+Pio+XII,+608+-+Macedo,+Guarulhos+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[380px] sm:h-[440px] border-0 filter invert contrast-125 opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />

            {/* Floating Overlay Badge on Map */}
            <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#0e0e11]/95 border border-[#E5004F]/60 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#E5004F] shadow-[0_0_8px_#E5004F]" />
                <span className="text-xs font-mono uppercase font-black text-white">GARAGE SAMURAI</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-mono mt-1">Guarulhos - SP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
