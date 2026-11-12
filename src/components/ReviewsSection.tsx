import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  vehicle: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Rodrigo M. Fernandes',
    vehicle: 'BMW 320i M Sport',
    service: 'Polimento Técnico + Vitrificação 9H',
    rating: 5,
    date: 'Há 2 semanas',
    comment: 'Trabalho de outro planeta! Meu carro preto estava cheio de teias de aranha do lava-rápido anterior. A Garage Samurai entregou o carro parecendo um espelho molhado. Atendimento com extrema disciplina e pontualidade.'
  },
  {
    id: 'r2',
    author: 'Mariana Azevedo',
    vehicle: 'Jeep Compass Limited',
    service: 'Funilaria Artesanal + Pintura de Para-choque',
    rating: 5,
    date: 'Há 1 mês',
    comment: 'Bateram no meu para-choque traseiro e amassaram a tampa. Fiquei com medo de dar diferença de tom no branco perolizado. Ficou 100% perfeito, ninguém diz que foi repintado. Super recomendo!'
  },
  {
    id: 'r3',
    author: 'Felipe Santana',
    vehicle: 'Honda Civic Si',
    service: 'Restauração Completa & Revitalização',
    rating: 5,
    date: 'Há 3 semanas',
    comment: 'Precisão de samurai de verdade. Desde o orçamento transparente pelo WhatsApp até a entrega técnica com explicações de manutenção. Vale cada centavo investido no carro.'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <div>
      {/* Header and Google Rating Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>AVALIAÇÕES 100% REAIS NO GOOGLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
            A Opinião de Quem Confia
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-lg">
            O rigor e o respeito pelo veículo refletidos na satisfação dos nossos clientes em Guarulhos e Grande São Paulo.
          </p>
        </div>

        {/* Big 5-Star Trust Badge */}
        <div className="p-4 rounded-xl bg-[#141417] border border-[#26262a] flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-black text-white font-mono leading-none">5.0</div>
            <div className="flex text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
          <div className="border-l border-zinc-700 pl-4 text-xs">
            <div className="font-bold text-white uppercase tracking-wider">Nota Máxima</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Baseado em clientes verificados</div>
          </div>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-xl bg-[#121215] border border-[#222226] hover:border-[#E5004F]/60 transition-all flex flex-col justify-between shadow-lg relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-zinc-400">{rev.date}</span>
              </div>

              <Quote className="w-6 h-6 text-[#E5004F]/30 mb-2" />
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f1f23]">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {rev.author}
              </h4>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5 flex items-center justify-between">
                <span>{rev.vehicle}</span>
                <span className="text-[#E5004F] text-[10px] font-semibold">{rev.service}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metric Counters Banner */}
      <div className="mt-14 p-8 rounded-xl bg-[#141418] border border-[#242428] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">+1.200</div>
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">Carros Atendidos</p>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-[#E5004F] font-mono">100%</div>
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">Fidelidade de Cor</p>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono">9H</div>
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">Dureza Cerâmica</p>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-[#E5004F] font-mono">5.0★</div>
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">Avaliação Google</p>
        </div>
      </div>
    </div>
  );
};
