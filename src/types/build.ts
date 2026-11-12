export type ElementCategory = 'tactical' | 'architecture' | 'furniture' | 'voxel';

export type TacticalElementType = 
  | 'wall' 
  | 'ramp' 
  | 'floor' 
  | 'cone' 
  | 'wall_door' 
  | 'wall_window';

export type ArchElementType = 
  | 'arch_wall'
  | 'glass_wall'
  | 'pillar'
  | 'arch_roof'
  | 'arch_door'
  | 'modern_stairs'
  | 'balcony_rail';

export type FurnitureElementType = 
  | 'sofa_modern'
  | 'workstation'
  | 'cyber_lamp'
  | 'plant_pot'
  | 'kitchen_counter'
  | 'dining_table';

export type VoxelElementType = 
  | 'voxel_cube';

export type ElementType = TacticalElementType | ArchElementType | FurnitureElementType | VoxelElementType;

export type MaterialType = 
  | 'wood' 
  | 'stone' 
  | 'metal' 
  | 'neon_cyan' 
  | 'neon_orange' 
  | 'marble' 
  | 'glass' 
  | 'concrete' 
  | 'cyber_dark';

export interface StructureItem {
  id: string;
  type: ElementType;
  category: ElementCategory;
  material: MaterialType;
  position: [number, number, number]; // [x, y, z] in grid units or meters
  rotationY: number; // 0, 90, 180, 270 in degrees
  level: number;
  color?: string;
  timestamp: number;
}

export type ToolMode = 
  | 'build'       // Modo Construção / Placement
  | 'select'      // Inspecionar / Mover
  | 'paint'       // Pintar / Mudar Material
  | 'demolish'    // Demolição / Marreta
  | 'play'        // Modo Jogar / Primeira Pessoa FPS
  | 'drill';      // Modo Treino 90s / Speed Drill

export type CameraViewPreset = 'perspective' | 'isometric' | 'top_down';

export type GridSnapSize = 1 | 0.5 | 0.25;

export interface ElementDefinition {
  type: ElementType;
  name: string;
  namePt: string;
  category: ElementCategory;
  defaultMaterial: MaterialType;
  icon: string;
  hotkey?: string;
  description: string;
  descriptionPt: string;
  dimensions: [number, number, number]; // [width, height, depth]
  cost: {
    wood?: number;
    stone?: number;
    metal?: number;
  };
}

export interface Blueprint {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  author: string;
  items: StructureItem[];
  thumbnailColor: string;
  tag: string;
}

export interface DrillChallenge {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  difficulty: 'fácil' | 'médio' | 'pro';
  targetCount: number;
  steps: {
    instruction: string;
    instructionPt: string;
    type: ElementType;
    relativePos: [number, number, number];
    rotationY: number;
  }[];
}
