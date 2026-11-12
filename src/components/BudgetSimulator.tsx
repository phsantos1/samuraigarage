import React, { useState } from 'react';
import { Send, Check, Calculator, Car, Calendar, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { autoAudio } from '../audio/automotiveAudio';

interface VehicleCategory {
  id: string;
  name: string;
  desc: string;
}

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  baseEstimate: string;
  duration: string;
}

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { id: 'hatch', name: 'Hatch / Compacto', desc: 'Ex: Polo, Onix, HB20, Golf, Sandero' },
  { id: 'sedan', name: 'Sedan Médio', desc: 'Ex: Corolla, Civic, Cruze, Jetta, Virtus' },
  { id: 'suv', name: 'SUV / Crossover', desc: 'Ex: Compass, Creta, T-Cross, Renegade, HR-V' },
  { id: 'picape', name: 'Picape / Grande', desc: 'Ex: Hilux, Ranger, Toro, Amarok, SW4' },
  { id: 'premium', name: 'Esportivo / Luxo', desc: 'Ex: BMW, Porsche, Mercedes-Benz, Audi' },
];

const SERVICES: ServiceOption[] = [
  { id: 'funilaria', name: 'Funilaria / Martelinho de Ouro', category: 'Estrutura', baseEstimate: 'Sob Avaliação Técnica', duration: '1 a 3 dias' },
  { id: 'pintura', name: 'Pintura em Cabine Pressurizada', category: 'Pintura', baseEstimate: 'Por peça ou geral', duration: '2 a 4 dias' },
  { id: 'polimento', name: 'Polimento Técnico Multi-Etapas', category: 'Estética', baseEstimate: 'Correção de verniz 95%', duration: '1 dia' },
  { id: 'vitrificacao', name: 'Vitrificação Cerâmica 9H (Gtechniq/Kisho)', category: 'Proteção', baseEstimate: 'Até 3 anos de garantia', duration: '1 a 2 dias' },
  { id: 'revitalizacao', name: 'Revitalização de Plásticos & Faróis', category: 'Detalhes', baseEstimate: 'Proteção UV', duration: '4 horas' },
  { id: 'combo_completo', name: 'Combo Completo Garage Samurai', category: 'Pacote VIP', baseEstimate: 'Tratamento 360° com desconto', duration: '3 a 5 dias' },
];

export const BudgetSimulator: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('sedan');
  const [selectedServices, setSelectedServices] = useState<string[]>(['polimento', 'vitrificacao']);
  const [name, setName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState('Manhã');
  const [sendPhotos, setSendPhotos] = useState(true);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
    autoAudio.playClick();
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCat(id);
    autoAudio.playClick();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    autoAudio.playKatanaSlash();

    const catObj = VEHICLE_CATEGORIES.find(c => c.id === selectedCat);
    const serviceNames = selectedServices
      .map(id => SERVICES.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join('\n- ');

    const message = `Olá, Garage Samurai! Gostaria de um orçamento detalhado.

👤 *Cliente:* ${name || 'Não informado'}
🚗 *Veículo:* ${carModel || 'Não informado'} ${carYear ? '(' + carYear + ')' : ''}
🏷️ *Porte:* ${catObj?.name || 'Sedan'}

🔧 *Serviços de Interesse:*
- ${serviceNames || 'Avaliação Geral'}

📝 *Detalhes:* ${notes || 'Gostaria de agendar uma avaliação'}
📅 *Data preferencial:* ${preferredDate || 'A combinar'} (${preferredPeriod})
📸 *Fotos:* ${sendPhotos ? 'Irei enviar fotos a seguir' : 'Avaliação presencial'}

Aguardo o retorno para prosseguirmos!`;

    window.open(`https://wa.me/5511997078462?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#101012] p-6 sm:p-10 rounded-xl border border-[#26262a] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5004F] to-transparent" />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5004F] font-bold">
          SIMULADOR & PRÉ-AGENDAMENTO
        </span>
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mt-2">
          Personalize seu Atendimento
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-3">
          Selecione a categoria do seu veículo e os serviços desejados para gerar sua proposta oficial no WhatsApp da Garage Samurai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {/* 1. SELEÇÃO DA CATEGORIA DO VEÍCULO */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
            <Car className="w-4 h-4 text-[#E5004F]" />
            <span>1. Escolha a Categoria do seu Automóvel</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {VEHICLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  selectedCat === cat.id
                    ? 'bg-[#E5004F]/15 border-[#E5004F] text-white shadow-md shadow-[#E5004F]/20'
                    : 'bg-[#151518] border-[#26262a] text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-tight">{cat.name}</div>
                  <div className="text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-tight">{cat.desc}</div>
                </div>
                {selectedCat === cat.id && (
                  <div className="mt-2 text-[#E5004F] text-[10px] font-mono flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Selecionado
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SELEÇÃO DOS SERVIÇOS */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5004F]" />
            <span>2. Selecione os Serviços Desejados (Pode marcar mais de um)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((serv) => {
              const isChecked = selectedServices.includes(serv.id);
              return (
                <div
                  key={serv.id}
                  onClick={() => toggleService(serv.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-[#E5004F]/10 border-[#E5004F] shadow-sm shadow-[#E5004F]/30'
                      : 'bg-[#151518] border-[#26262a] hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                    isChecked ? 'bg-[#E5004F] border-[#E5004F] text-white' : 'border-zinc-700 bg-zinc-900'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5004F] font-bold block">
                      {serv.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{serv.name}</h4>
                    <div className="flex items-center justify-between text-[10.5px] text-zinc-400 font-mono mt-2 pt-2 border-t border-white/5">
                      <span>{serv.baseEstimate}</span>
                      <span className="text-zinc-400">⏱ {serv.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. DADOS DO CLIENTE & VEÍCULO */}
        <div className="p-6 rounded-xl bg-[#141417] border border-[#26262a] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Silva"
                className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-white text-xs rounded px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                Modelo do Veículo *
              </label>
              <input
                type="text"
                required
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Ex: Honda Civic Touring"
                className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-white text-xs rounded px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                Ano de Fabricação
              </label>
              <input
                type="text"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                placeholder="Ex: 2022"
                className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-white text-xs rounded px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Detalhes do que precisa ser feito ou danos a reparar:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descreva arranhões, mossas, retoques necessários ou o estado atual da pintura..."
              className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-white text-xs rounded px-3.5 py-2.5 outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                Data Preferencial de Entrada
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-zinc-300 text-xs rounded px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
                Período Preferido
              </label>
              <select
                value={preferredPeriod}
                onChange={(e) => setPreferredPeriod(e.target.value)}
                className="w-full bg-[#1b1b20] border border-[#2e2e34] focus:border-[#E5004F] text-white text-xs rounded px-3.5 py-2.5 outline-none transition-colors"
              >
                <option value="Manhã (08:00 - 12:00)">Manhã (08:00 às 12:00)</option>
                <option value="Tarde (13:00 - 18:00)">Tarde (13:00 às 18:00)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="sendPhotosCheck"
              checked={sendPhotos}
              onChange={(e) => setSendPhotos(e.target.checked)}
              className="w-4 h-4 accent-[#E5004F] rounded cursor-pointer"
            />
            <label htmlFor="sendPhotosCheck" className="text-xs text-zinc-300 cursor-pointer">
              Vou enviar fotos ou vídeos do carro na conversa para agilizar o orçamento
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-lg text-xs uppercase tracking-[0.2em] font-black bg-[#E5004F] hover:bg-[#c90044] text-white transition-all shadow-xl shadow-[#E5004F]/30 flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <span>ENVIAR SOLICITAÇÃO DIRETO NO WHATSAPP</span>
        </button>
      </form>
    </div>
  );
};
