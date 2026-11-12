import * as THREE from 'three';

/**
 * Creates procedural textures via HTML5 2D Canvas.
 * Strictly adheres to Three.js guidelines:
 * - SRGBColorSpace for color maps
 * - High grazing-angle sharpness (anisotropy)
 * - Zero external image dependencies
 */

const textureCache = new Map<string, THREE.CanvasTexture>();

export function getProceduralTexture(type: string, maxAnisotropy = 8): THREE.CanvasTexture {
  if (textureCache.has(type)) {
    return textureCache.get(type)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  switch (type) {
    case 'wood': {
      // Warm timber planks with grain
      ctx.fillStyle = '#9c5e31';
      ctx.fillRect(0, 0, 512, 512);

      // Planks
      for (let y = 0; y < 512; y += 64) {
        ctx.fillStyle = 'rgba(60, 30, 10, 0.45)';
        ctx.fillRect(0, y, 512, 3);
      }

      // Fine grain streaks
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const w = 40 + Math.random() * 120;
        const h = 1 + Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 35, 10, 0.18)' : 'rgba(190, 120, 60, 0.15)';
        ctx.fillRect(x, y, w, h);
      }
      break;
    }

    case 'stone': {
      // Ashlar stone brick pattern
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(0, 0, 512, 512);

      // Texture stipples
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mortar lines
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 4;
      const brickH = 64;
      for (let y = 0; y <= 512; y += brickH) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();

        const offset = (y / brickH) % 2 === 0 ? 0 : 64;
        for (let x = offset; x <= 512; x += 128) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + brickH);
          ctx.stroke();
        }
      }
      break;
    }

    case 'metal': {
      // Steel tread plate / brushed aluminum
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, 512, 512);

      // Fine brushed lines
      for (let x = 0; x < 512; x += 2) {
        ctx.fillStyle = (x % 4 === 0) ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
        ctx.fillRect(x, 0, 1, 512);
      }

      // Diagonal tread grips
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 3;
      for (let i = -512; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
      }
      break;
    }

    case 'marble': {
      // Carrara white marble with veining
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, 512, 512);

      // Veins
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)';
      ctx.lineWidth = 2;
      for (let v = 0; v < 8; v++) {
        ctx.beginPath();
        let currX = Math.random() * 512;
        let currY = 0;
        ctx.moveTo(currX, currY);
        while (currY < 512) {
          currX += (Math.random() - 0.48) * 40;
          currY += 20 + Math.random() * 40;
          ctx.lineTo(currX, currY);
        }
        ctx.stroke();
      }
      break;
    }

    case 'cyber_grid': {
      // Dark cyber matrix with glowing cyan grid lines
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Small accent nodes
      ctx.fillStyle = '#22d3ee';
      for (let x = 0; x <= 512; x += 64) {
        for (let y = 0; y <= 512; y += 64) {
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }
      break;
    }

    case 'contact_shadow': {
      // Soft radial gradient for contact shadows
      const radGrad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      radGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 512, 512);
      break;
    }

    default: {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, 0, 512, 512);
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;

  textureCache.set(type, texture);
  return texture;
}
