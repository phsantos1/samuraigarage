import * as THREE from 'three';
import { MaterialType } from '../types/build';
import { getProceduralTexture } from './proceduralTextures';

const materialCache = new Map<string, THREE.Material>();

export function getBuildMaterial(matType: MaterialType, isSoftwareGl = false): THREE.Material {
  const cacheKey = `${matType}_${isSoftwareGl}`;
  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey)!;
  }

  let material: THREE.Material;

  switch (matType) {
    case 'wood': {
      const tex = getProceduralTexture('wood');
      material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#b47746'),
        roughness: 0.65,
        metalness: 0.05,
      });
      break;
    }

    case 'stone': {
      const tex = getProceduralTexture('stone');
      material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#78716c'),
        roughness: 0.85,
        metalness: 0.08,
      });
      break;
    }

    case 'metal': {
      const tex = getProceduralTexture('metal');
      material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#64748b'),
        roughness: 0.35,
        metalness: 0.85,
      });
      break;
    }

    case 'marble': {
      const tex = getProceduralTexture('marble');
      material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#f8fafc'),
        roughness: 0.15,
        metalness: 0.05,
      });
      break;
    }

    case 'glass': {
      material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#67e8f9'),
        metalness: 0.1,
        roughness: 0.05,
        transmission: isSoftwareGl ? 0 : 0.85,
        transparent: true,
        opacity: isSoftwareGl ? 0.35 : 0.6,
        ior: 1.52,
        reflectivity: 0.9,
      });
      break;
    }

    case 'neon_cyan': {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#06b6d4'),
        emissive: new THREE.Color('#22d3ee'),
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.1,
      });
      break;
    }

    case 'neon_orange': {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ea580c'),
        emissive: new THREE.Color('#f97316'),
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.1,
      });
      break;
    }

    case 'cyber_dark': {
      const tex = getProceduralTexture('cyber_grid');
      material = new THREE.MeshStandardMaterial({
        map: tex,
        color: new THREE.Color('#0f172a'),
        roughness: 0.4,
        metalness: 0.6,
      });
      break;
    }

    case 'concrete':
    default: {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#94a3b8'),
        roughness: 0.8,
        metalness: 0.1,
      });
      break;
    }
  }

  materialCache.set(cacheKey, material);
  return material;
}

export function getGhostMaterial(isValid: boolean = true): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: isValid ? 0x06b6d4 : 0xef4444,
    transparent: true,
    opacity: 0.45,
    wireframe: false,
    depthWrite: false,
  });
}

export function getGhostWireMaterial(isValid: boolean = true): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: isValid ? 0x38bdf8 : 0xf87171,
    transparent: true,
    opacity: 0.8,
    linewidth: 2,
  });
}

export function getSelectionOutlineMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: 0xfacc15, // Golden yellow
    wireframe: true,
    transparent: true,
    opacity: 0.9,
  });
}
