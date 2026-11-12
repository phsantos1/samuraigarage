import { ElementDefinition, ElementType, MaterialType } from '../types/build';

export const ELEMENTS_CATALOG: ElementDefinition[] = [
  // --- TACTICAL (Battle Royale / Speed Build) ---
  {
    type: 'wall',
    name: 'Tactical Wall',
    namePt: 'Parede Tática',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'Layers',
    hotkey: 'Z',
    description: 'Standard 1x1 structural wall',
    descriptionPt: 'Parede estrutural padrão 1x1 com reforços cruzados',
    dimensions: [2, 2.5, 0.15],
    cost: { wood: 10 }
  },
  {
    type: 'ramp',
    name: 'Ramp / Stairs',
    namePt: 'Rampa / Escada',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'TrendingUp',
    hotkey: 'C',
    description: 'Angled ramp for vertical elevation',
    descriptionPt: 'Rampa inclinada para subir andares rapidamente',
    dimensions: [2, 2.5, 2],
    cost: { wood: 10 }
  },
  {
    type: 'floor',
    name: 'Floor / Ceiling',
    namePt: 'Piso / Chão',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'Square',
    hotkey: 'X',
    description: 'Horizontal floor or ceiling tile',
    descriptionPt: 'Chão ou teto plano de 2x2m',
    dimensions: [2, 0.15, 2],
    cost: { wood: 10 }
  },
  {
    type: 'cone',
    name: 'Roof / Cone',
    namePt: 'Cone / Pirâmide',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'Triangle',
    hotkey: 'V',
    description: 'Pyramid roof piece for high ground protection',
    descriptionPt: 'Pirâmide para defesa e controle de altura',
    dimensions: [2, 1.25, 2],
    cost: { wood: 10 }
  },
  {
    type: 'wall_door',
    name: 'Wall with Door',
    namePt: 'Parede c/ Porta',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'DoorOpen',
    hotkey: '1',
    description: 'Wall with open pass-through doorway',
    descriptionPt: 'Parede com vão de porta navegável no modo jogar',
    dimensions: [2, 2.5, 0.15],
    cost: { wood: 12 }
  },
  {
    type: 'wall_window',
    name: 'Wall with Window',
    namePt: 'Parede c/ Janela',
    category: 'tactical',
    defaultMaterial: 'wood',
    icon: 'Scan',
    hotkey: '2',
    description: 'Tactical peek window for defense',
    descriptionPt: 'Abertura para observação tática',
    dimensions: [2, 2.5, 0.15],
    cost: { wood: 12 }
  },

  // --- ARCHITECTURE ---
  {
    type: 'arch_wall',
    name: 'Architectural Wall',
    namePt: 'Parede Arquitetônica',
    category: 'architecture',
    defaultMaterial: 'concrete',
    icon: 'Maximize2',
    description: 'Smooth modern wall with subtle bevels',
    descriptionPt: 'Parede minimalista lisa para casas e lofts',
    dimensions: [2, 2.5, 0.2],
    cost: { stone: 15 }
  },
  {
    type: 'glass_wall',
    name: 'Glass Curtain Wall',
    namePt: 'Vidro Panorâmico',
    category: 'architecture',
    defaultMaterial: 'glass',
    icon: 'Grid',
    description: 'Floor-to-ceiling modern architectural glass',
    descriptionPt: 'Painel envidraçado com perfis metálicos escuros',
    dimensions: [2, 2.5, 0.1],
    cost: { metal: 20 }
  },
  {
    type: 'pillar',
    name: 'Structural Pillar',
    namePt: 'Pilar / Coluna',
    category: 'architecture',
    defaultMaterial: 'marble',
    icon: 'MinusSquare',
    description: 'Heavy duty load bearing column',
    descriptionPt: 'Coluna de sustentação moderna',
    dimensions: [0.4, 2.5, 0.4],
    cost: { stone: 20 }
  },
  {
    type: 'arch_roof',
    name: 'Modern Slanted Roof',
    namePt: 'Telhado Moderno',
    category: 'architecture',
    defaultMaterial: 'cyber_dark',
    icon: 'ChevronsUp',
    description: 'Contemporary pitched roof element',
    descriptionPt: 'Telhado com inclinação moderna e beiral',
    dimensions: [2, 1, 2],
    cost: { stone: 15 }
  },
  {
    type: 'arch_door',
    name: 'Modern Pivot Door',
    namePt: 'Porta Pivotante',
    category: 'architecture',
    defaultMaterial: 'wood',
    icon: 'DoorClosed',
    description: 'Grand luxury pivot entrance',
    descriptionPt: 'Porta nobre de madeira com puxador metálico',
    dimensions: [2, 2.5, 0.2],
    cost: { wood: 25 }
  },
  {
    type: 'modern_stairs',
    name: 'Floating Stairs',
    namePt: 'Escada Flutuante',
    category: 'architecture',
    defaultMaterial: 'metal',
    icon: 'Sliders',
    description: 'Floating cantilever architectural steps',
    descriptionPt: 'Escadaria moderna com degraus em balanço',
    dimensions: [2, 2.5, 2],
    cost: { metal: 25 }
  },
  {
    type: 'balcony_rail',
    name: 'Glass Balcony Rail',
    namePt: 'Guarda-Corpo de Vidro',
    category: 'architecture',
    defaultMaterial: 'glass',
    icon: 'Shield',
    description: 'Tempered glass safety railing',
    descriptionPt: 'Guarda-corpo de vidro para varandas e mezaninos',
    dimensions: [2, 1, 0.1],
    cost: { metal: 10 }
  },

  // --- FURNITURE & DECOR ---
  {
    type: 'sofa_modern',
    name: 'Modern Lounge Sofa',
    namePt: 'Sofá Minimalista',
    category: 'furniture',
    defaultMaterial: 'concrete',
    icon: 'Armchair',
    description: 'Comfortable 3-seater modular sofa',
    descriptionPt: 'Sofá estofado modular com almofadas',
    dimensions: [1.8, 0.75, 0.85],
    cost: { wood: 15 }
  },
  {
    type: 'workstation',
    name: 'Gamer / Dev Workstation',
    namePt: 'Bancada Gamer / Setup',
    category: 'furniture',
    defaultMaterial: 'cyber_dark',
    icon: 'Monitor',
    description: 'Modern desk with ultra-wide screens & chair',
    descriptionPt: 'Mesa de trabalho com monitores e teclado iluminado',
    dimensions: [1.6, 1.2, 0.8],
    cost: { metal: 30 }
  },
  {
    type: 'cyber_lamp',
    name: 'Neon Ambient Lamp',
    namePt: 'Luminária Neon',
    category: 'furniture',
    defaultMaterial: 'neon_cyan',
    icon: 'Zap',
    description: 'Ambient LED standing light fixture',
    descriptionPt: 'Coluna de luz ambiente com emissão suave',
    dimensions: [0.3, 1.8, 0.3],
    cost: { metal: 10 }
  },
  {
    type: 'kitchen_counter',
    name: 'Kitchen Island',
    namePt: 'Bancada de Cozinha',
    category: 'furniture',
    defaultMaterial: 'marble',
    icon: 'Box',
    description: 'Marble countertop with cooking hob',
    descriptionPt: 'Ilha gourmet com tampo de mármore e banquetas',
    dimensions: [2, 0.9, 0.9],
    cost: { stone: 35 }
  },
  {
    type: 'dining_table',
    name: 'Nordic Dining Table',
    namePt: 'Mesa de Jantar',
    category: 'furniture',
    defaultMaterial: 'wood',
    icon: 'LayoutGrid',
    description: 'Warm oak dining table with chairs',
    descriptionPt: 'Mesa de jantar de madeira maciça com 4 cadeiras',
    dimensions: [1.8, 0.8, 1.0],
    cost: { wood: 20 }
  },
  {
    type: 'plant_pot',
    name: 'Indoor Monstera Plant',
    namePt: 'Vaso de Planta & Costela',
    category: 'furniture',
    defaultMaterial: 'concrete',
    icon: 'Sun',
    description: 'Ceramic pot with tropical leaves',
    descriptionPt: 'Vaso cerâmico com vegetação viva',
    dimensions: [0.6, 1.3, 0.6],
    cost: { stone: 5 }
  },

  // --- VOXEL / SANDBOX ---
  {
    type: 'voxel_cube',
    name: 'Voxel Block',
    namePt: 'Bloco Voxel 1m',
    category: 'voxel',
    defaultMaterial: 'stone',
    icon: 'Box',
    description: '1x1x1 solid voxel unit',
    descriptionPt: 'Bloco cúbico de 1m para esculturas e pixel art 3D',
    dimensions: [1, 1, 1],
    cost: { stone: 5 }
  }
];

export const MATERIAL_SPECS: Record<MaterialType, {
  name: string;
  namePt: string;
  colorHex: string;
  roughness: number;
  metalness: number;
  isTransparent?: boolean;
  opacity?: number;
  emissive?: string;
  emissiveIntensity?: number;
}> = {
  wood: {
    name: 'Oak Timber',
    namePt: 'Madeira Maciça',
    colorHex: '#b47746',
    roughness: 0.7,
    metalness: 0.05
  },
  stone: {
    name: 'Cut Stone',
    namePt: 'Pedra / Tijolo',
    colorHex: '#78716c',
    roughness: 0.85,
    metalness: 0.1
  },
  metal: {
    name: 'Reinforced Steel',
    namePt: 'Metal & Aço',
    colorHex: '#475569',
    roughness: 0.35,
    metalness: 0.85
  },
  neon_cyan: {
    name: 'Cyan Neon',
    namePt: 'Neon Ciano',
    colorHex: '#06b6d4',
    roughness: 0.2,
    metalness: 0.1,
    emissive: '#06b6d4',
    emissiveIntensity: 0.8
  },
  neon_orange: {
    name: 'Cyber Orange',
    namePt: 'Laranja Cyber',
    colorHex: '#f97316',
    roughness: 0.2,
    metalness: 0.1,
    emissive: '#f97316',
    emissiveIntensity: 0.8
  },
  marble: {
    name: 'White Marble',
    namePt: 'Mármore Carrara',
    colorHex: '#e2e8f0',
    roughness: 0.15,
    metalness: 0.05
  },
  glass: {
    name: 'Tinted Glass',
    namePt: 'Vidro Fumê',
    colorHex: '#38bdf8',
    roughness: 0.05,
    metalness: 0.1,
    isTransparent: true,
    opacity: 0.45
  },
  concrete: {
    name: 'Smooth Concrete',
    namePt: 'Concreto Aparente',
    colorHex: '#94a3b8',
    roughness: 0.8,
    metalness: 0.05
  },
  cyber_dark: {
    name: 'Obsidian Matte',
    namePt: 'Obsidiana / Carbono',
    colorHex: '#1e293b',
    roughness: 0.4,
    metalness: 0.5
  }
};
