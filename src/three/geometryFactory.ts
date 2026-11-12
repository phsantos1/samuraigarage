import * as THREE from 'three';
import { ElementType, MaterialType } from '../types/build';
import { getBuildMaterial } from './materials';

/**
 * Procedural Composite 3-12 Part Models.
 * Follows Three.js architectural guidelines:
 * - Minimum 3-12 distinct parts per model across Primary, Secondary, and Accent scales.
 * - Bottom-center pivot (0, 0, 0) so elements sit flush on the floor grid.
 * - Contrasting roughness/metalness between frame and body.
 */

export function createCompositeModel(
  type: ElementType,
  materialType: MaterialType,
  isSoftwareGl = false
): THREE.Group {
  const group = new THREE.Group();
  group.name = `element_${type}`;

  const mainMat = getBuildMaterial(materialType, isSoftwareGl);
  const darkMetalMat = getBuildMaterial('metal', isSoftwareGl);
  const woodMat = getBuildMaterial('wood', isSoftwareGl);
  const concreteMat = getBuildMaterial('concrete', isSoftwareGl);
  const neonMat = getBuildMaterial('neon_cyan', isSoftwareGl);
  const marbleMat = getBuildMaterial('marble', isSoftwareGl);
  const glassMat = getBuildMaterial('glass', isSoftwareGl);

  switch (type) {
    case 'wall': {
      // 1. Primary: Main center panel
      const panelGeom = new THREE.BoxGeometry(1.85, 2.38, 0.08);
      const panel = new THREE.Mesh(panelGeom, mainMat);
      panel.position.set(0, 1.25, 0);
      panel.castShadow = !isSoftwareGl;
      panel.receiveShadow = !isSoftwareGl;
      group.add(panel);

      // 2. Secondary: Left & Right Studs
      const studGeom = new THREE.BoxGeometry(0.08, 2.48, 0.12);
      const leftStud = new THREE.Mesh(studGeom, darkMetalMat);
      leftStud.position.set(-0.96, 1.25, 0);
      leftStud.castShadow = !isSoftwareGl;
      group.add(leftStud);

      const rightStud = new THREE.Mesh(studGeom, darkMetalMat);
      rightStud.position.set(0.96, 1.25, 0);
      rightStud.castShadow = !isSoftwareGl;
      group.add(rightStud);

      // 3. Secondary: Top Header & Bottom Footer plates
      const headerGeom = new THREE.BoxGeometry(2.0, 0.08, 0.12);
      const header = new THREE.Mesh(headerGeom, darkMetalMat);
      header.position.set(0, 2.46, 0);
      group.add(header);

      const footer = new THREE.Mesh(headerGeom, darkMetalMat);
      footer.position.set(0, 0.04, 0);
      group.add(footer);

      // 4. Accent: Cross brace reinforcement
      const braceGeom = new THREE.BoxGeometry(2.4, 0.04, 0.09);
      const brace1 = new THREE.Mesh(braceGeom, darkMetalMat);
      brace1.rotation.z = Math.PI / 4;
      brace1.position.set(0, 1.25, 0);
      group.add(brace1);
      break;
    }

    case 'ramp': {
      // 1. Primary: Sloped floor plane (angled at ~38 degrees)
      const rampLen = Math.hypot(2.0, 2.45);
      const angle = Math.atan2(2.45, 2.0);

      const rampGeom = new THREE.BoxGeometry(1.9, 0.08, rampLen);
      const ramp = new THREE.Mesh(rampGeom, mainMat);
      ramp.position.set(0, 1.22, 0);
      ramp.rotation.x = angle;
      ramp.castShadow = !isSoftwareGl;
      ramp.receiveShadow = !isSoftwareGl;
      group.add(ramp);

      // 2. Secondary: Left & Right stringer beams
      const stringerGeom = new THREE.BoxGeometry(0.06, 0.16, rampLen + 0.1);
      const leftStringer = new THREE.Mesh(stringerGeom, darkMetalMat);
      leftStringer.position.set(-0.97, 1.25, 0);
      leftStringer.rotation.x = angle;
      group.add(leftStringer);

      const rightStringer = new THREE.Mesh(stringerGeom, darkMetalMat);
      rightStringer.position.set(0.97, 1.25, 0);
      rightStringer.rotation.x = angle;
      group.add(rightStringer);

      // 3. Secondary: Rear vertical stanchions
      const postGeom = new THREE.BoxGeometry(0.08, 2.45, 0.08);
      const postLeft = new THREE.Mesh(postGeom, darkMetalMat);
      postLeft.position.set(-0.95, 1.22, -0.95);
      group.add(postLeft);

      const postRight = new THREE.Mesh(postGeom, darkMetalMat);
      postRight.position.set(0.95, 1.22, -0.95);
      group.add(postRight);

      // 4. Accent: 4 tread grip strips along the incline
      const gripGeom = new THREE.BoxGeometry(1.7, 0.02, 0.05);
      for (let i = -1; i <= 1.2; i += 0.6) {
        const grip = new THREE.Mesh(gripGeom, darkMetalMat);
        const yOff = 1.22 + i * Math.sin(angle);
        const zOff = -i * Math.cos(angle);
        grip.position.set(0, yOff, zOff);
        grip.rotation.x = angle;
        group.add(grip);
      }
      break;
    }

    case 'floor': {
      // 1. Primary: Floor slab
      const slabGeom = new THREE.BoxGeometry(1.98, 0.1, 1.98);
      const slab = new THREE.Mesh(slabGeom, mainMat);
      slab.position.set(0, 0.05, 0);
      slab.castShadow = !isSoftwareGl;
      slab.receiveShadow = !isSoftwareGl;
      group.add(slab);

      // 2. Secondary: Perimeter steel border frame
      const rimGeomX = new THREE.BoxGeometry(2.0, 0.12, 0.04);
      const rimGeomZ = new THREE.BoxGeometry(0.04, 0.12, 2.0);

      const rimN = new THREE.Mesh(rimGeomX, darkMetalMat);
      rimN.position.set(0, 0.05, -0.98);
      const rimS = new THREE.Mesh(rimGeomX, darkMetalMat);
      rimS.position.set(0, 0.05, 0.98);
      const rimW = new THREE.Mesh(rimGeomZ, darkMetalMat);
      rimW.position.set(-0.98, 0.05, 0);
      const rimE = new THREE.Mesh(rimGeomZ, darkMetalMat);
      rimE.position.set(0.98, 0.05, 0);

      group.add(rimN, rimS, rimW, rimE);

      // 3. Accent: Central structural underside cross
      const underX = new THREE.BoxGeometry(1.9, 0.06, 0.06);
      const underCrossX = new THREE.Mesh(underX, darkMetalMat);
      underCrossX.position.set(0, -0.01, 0);
      const underZ = new THREE.BoxGeometry(0.06, 0.06, 1.9);
      const underCrossZ = new THREE.Mesh(underZ, darkMetalMat);
      underCrossZ.position.set(0, -0.01, 0);

      group.add(underCrossX, underCrossZ);
      break;
    }

    case 'cone': {
      // 1. Primary: 4-sided pyramid / cone roof
      const pyrGeom = new THREE.ConeGeometry(1.414, 1.25, 4, 1);
      pyrGeom.rotateY(Math.PI / 4);
      const pyramid = new THREE.Mesh(pyrGeom, mainMat);
      pyramid.position.set(0, 0.625, 0);
      pyramid.castShadow = !isSoftwareGl;
      pyramid.receiveShadow = !isSoftwareGl;
      group.add(pyramid);

      // 2. Secondary: Bottom edge skirt base
      const skirtGeom = new THREE.BoxGeometry(2.0, 0.06, 2.0);
      const skirt = new THREE.Mesh(skirtGeom, darkMetalMat);
      skirt.position.set(0, 0.03, 0);
      group.add(skirt);

      // 3. Accent: Ridge caps along the 4 corners
      const apexPinGeom = new THREE.CylinderGeometry(0.04, 0.08, 0.25, 6);
      const apexPin = new THREE.Mesh(apexPinGeom, darkMetalMat);
      apexPin.position.set(0, 1.35, 0);
      group.add(apexPin);
      break;
    }

    case 'wall_door': {
      // 1. Left wall segment
      const leftGeom = new THREE.BoxGeometry(0.55, 2.45, 0.12);
      const leftWall = new THREE.Mesh(leftGeom, mainMat);
      leftWall.position.set(-0.725, 1.225, 0);
      leftWall.castShadow = !isSoftwareGl;
      group.add(leftWall);

      // 2. Right wall segment
      const rightWall = new THREE.Mesh(leftGeom, mainMat);
      rightWall.position.set(0.725, 1.225, 0);
      rightWall.castShadow = !isSoftwareGl;
      group.add(rightWall);

      // 3. Top header / lintel segment
      const headerGeom = new THREE.BoxGeometry(0.9, 0.55, 0.12);
      const header = new THREE.Mesh(headerGeom, mainMat);
      header.position.set(0, 2.175, 0);
      header.castShadow = !isSoftwareGl;
      group.add(header);

      // 4. Accent: Dark door jamb frame lining
      const jambGeomY = new THREE.BoxGeometry(0.05, 1.9, 0.14);
      const leftJamb = new THREE.Mesh(jambGeomY, darkMetalMat);
      leftJamb.position.set(-0.45, 0.95, 0);
      const rightJamb = new THREE.Mesh(jambGeomY, darkMetalMat);
      rightJamb.position.set(0.45, 0.95, 0);
      const topJambGeom = new THREE.BoxGeometry(0.95, 0.05, 0.14);
      const topJamb = new THREE.Mesh(topJambGeom, darkMetalMat);
      topJamb.position.set(0, 1.9, 0);
      group.add(leftJamb, rightJamb, topJamb);
      break;
    }

    case 'wall_window': {
      // 1. Lower sill wall
      const bottomGeom = new THREE.BoxGeometry(2.0, 0.9, 0.12);
      const bottomWall = new THREE.Mesh(bottomGeom, mainMat);
      bottomWall.position.set(0, 0.45, 0);
      group.add(bottomWall);

      // 2. Upper header wall
      const topGeom = new THREE.BoxGeometry(2.0, 0.55, 0.12);
      const topWall = new THREE.Mesh(topGeom, mainMat);
      topWall.position.set(0, 2.175, 0);
      group.add(topWall);

      // 3. Left and right piers
      const sideGeom = new THREE.BoxGeometry(0.45, 1.0, 0.12);
      const leftPier = new THREE.Mesh(sideGeom, mainMat);
      leftPier.position.set(-0.775, 1.4, 0);
      const rightPier = new THREE.Mesh(sideGeom, mainMat);
      rightPier.position.set(0.775, 1.4, 0);
      group.add(leftPier, rightPier);

      // 4. Accent: Window casing & glass pane
      const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.98, 0.02), glassMat);
      windowGlass.position.set(0, 1.4, 0);
      group.add(windowGlass);

      const sillGeom = new THREE.BoxGeometry(1.2, 0.04, 0.2);
      const sill = new THREE.Mesh(sillGeom, darkMetalMat);
      sill.position.set(0, 0.9, 0);
      group.add(sill);
      break;
    }

    case 'glass_wall': {
      // Modern architectural floor-to-ceiling glass
      const glassPane = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.38, 0.04), glassMat);
      glassPane.position.set(0, 1.25, 0);
      group.add(glassPane);

      // Dark minimalist aluminum perimeter frame
      const borderGeomX = new THREE.BoxGeometry(2.0, 0.06, 0.08);
      const borderGeomY = new THREE.BoxGeometry(0.06, 2.46, 0.08);

      const topF = new THREE.Mesh(borderGeomX, darkMetalMat);
      topF.position.set(0, 2.47, 0);
      const botF = new THREE.Mesh(borderGeomX, darkMetalMat);
      botF.position.set(0, 0.03, 0);
      const leftF = new THREE.Mesh(borderGeomY, darkMetalMat);
      leftF.position.set(-0.97, 1.25, 0);
      const rightF = new THREE.Mesh(borderGeomY, darkMetalMat);
      rightF.position.set(0.97, 1.25, 0);

      // Center transom bar
      const transom = new THREE.Mesh(borderGeomX, darkMetalMat);
      transom.position.set(0, 1.25, 0);

      group.add(topF, botF, leftF, rightF, transom);
      break;
    }

    case 'arch_wall': {
      // Solid clean architectural wall with baseboard and shadow gap
      const mainWall = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.38, 0.18), mainMat);
      mainWall.position.set(0, 1.25, 0);
      mainWall.castShadow = !isSoftwareGl;
      mainWall.receiveShadow = !isSoftwareGl;
      group.add(mainWall);

      // Baseboard trim
      const baseboard = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.1, 0.2), darkMetalMat);
      baseboard.position.set(0, 0.05, 0);
      group.add(baseboard);

      // Top ceiling reveal channel
      const reveal = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.04, 0.16), darkMetalMat);
      reveal.position.set(0, 2.46, 0);
      group.add(reveal);
      break;
    }

    case 'pillar': {
      // Heavy architectural column with capital & plinth
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.3, 16), mainMat);
      shaft.position.set(0, 1.25, 0);
      shaft.castShadow = !isSoftwareGl;
      group.add(shaft);

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.1, 0.48), darkMetalMat);
      plinth.position.set(0, 0.05, 0);
      group.add(plinth);

      const capital = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.1, 0.48), darkMetalMat);
      capital.position.set(0, 2.45, 0);
      group.add(capital);
      break;
    }

    case 'arch_roof': {
      // Contemporary slanted roof profile
      const slabGeom = new THREE.BoxGeometry(2.1, 0.12, 2.2);
      const slab = new THREE.Mesh(slabGeom, mainMat);
      slab.position.set(0, 0.6, 0);
      slab.rotation.x = 0.25;
      slab.castShadow = !isSoftwareGl;
      group.add(slab);

      // Fascia edge board
      const fascia = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.16, 0.04), darkMetalMat);
      fascia.position.set(0, 0.32, 1.08);
      group.add(fascia);
      break;
    }

    case 'arch_door': {
      // Grand pivot door with sleek metallic frame and handle
      const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.46, 0.18), darkMetalMat);
      frameL.position.set(-0.96, 1.25, 0);
      const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.46, 0.18), darkMetalMat);
      frameR.position.set(0.96, 1.25, 0);
      const frameT = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.18), darkMetalMat);
      frameT.position.set(0, 2.46, 0);
      group.add(frameL, frameR, frameT);

      // Door Leaf (pivot wood leaf)
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.38, 0.08), mainMat);
      leaf.position.set(0, 1.23, 0);
      group.add(leaf);

      // Long vertical handle
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), darkMetalMat);
      handle.position.set(0.7, 1.2, 0.08);
      group.add(handle);
      break;
    }

    case 'modern_stairs': {
      // Floating cantilever stairs
      for (let i = 0; i < 8; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.28), mainMat);
        step.position.set(0, 0.16 + i * 0.3, -0.8 + i * 0.24);
        step.castShadow = !isSoftwareGl;
        group.add(step);

        // Spine support under step
        const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), darkMetalMat);
        spine.position.set(0, 0.02 + i * 0.3, -0.8 + i * 0.24);
        group.add(spine);
      }
      break;
    }

    case 'balcony_rail': {
      // Glass balcony railing
      const railGlass = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 0.03), glassMat);
      railGlass.position.set(0, 0.5, 0);
      group.add(railGlass);

      const topRail = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.08), darkMetalMat);
      topRail.position.set(0, 0.98, 0);
      const botRail = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.08), darkMetalMat);
      botRail.position.set(0, 0.03, 0);
      group.add(topRail, botRail);
      break;
    }

    case 'sofa_modern': {
      // Modular designer sofa
      // 1. Base frame
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, 0.85), darkMetalMat);
      base.position.set(0, 0.18, 0);
      group.add(base);

      // 2. Three seat cushions
      for (let s = -1; s <= 1; s++) {
        const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.18, 0.72), mainMat);
        cushion.position.set(s * 0.58, 0.35, 0.04);
        group.add(cushion);

        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.35, 0.15), mainMat);
        pillow.position.set(s * 0.58, 0.56, -0.28);
        pillow.rotation.x = -0.15;
        group.add(pillow);
      }

      // 3. Armrests
      const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.38, 0.85), mainMat);
      armL.position.set(-0.92, 0.42, 0);
      const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.38, 0.85), mainMat);
      armR.position.set(0.92, 0.42, 0);
      group.add(armL, armR);

      // 4. Slender legs
      for (const lx of [-0.85, 0.85]) {
        for (const lz of [-0.35, 0.35]) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.015, 0.18, 8), darkMetalMat);
          leg.position.set(lx, 0.09, lz);
          group.add(leg);
        }
      }
      break;
    }

    case 'workstation': {
      // Dev / Gamer desk setup
      // Desk top
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.75), mainMat);
      deskTop.position.set(0, 0.75, 0);
      group.add(deskTop);

      // Frame legs
      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.73, 0.7), darkMetalMat);
      legL.position.set(-0.75, 0.375, 0);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.73, 0.7), darkMetalMat);
      legR.position.set(0.75, 0.375, 0);
      group.add(legL, legR);

      // Dual Monitors
      const monStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), darkMetalMat);
      monStand.position.set(0, 0.95, -0.25);
      group.add(monStand);

      const monScreen = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.4, 0.03), darkMetalMat);
      monScreen.position.set(0, 1.15, -0.22);
      const monDisplay = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.36, 0.01), neonMat);
      monDisplay.position.set(0, 1.15, -0.20);
      group.add(monScreen, monDisplay);

      // Keyboard & pad
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.005, 0.3), darkMetalMat);
      pad.position.set(0, 0.78, 0.1);
      const kb = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.015, 0.12), darkMetalMat);
      kb.position.set(-0.1, 0.79, 0.12);
      group.add(pad, kb);
      break;
    }

    case 'cyber_lamp': {
      // Modern vertical ambient neon bar
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.06, 16), darkMetalMat);
      base.position.set(0, 0.03, 0);
      group.add(base);

      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 12), darkMetalMat);
      rod.position.set(0, 0.85, 0);
      group.add(rod);

      // Glowing light channel
      const lightTube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 12), neonMat);
      lightTube.position.set(0, 0.9, 0.03);
      group.add(lightTube);
      break;
    }

    case 'kitchen_counter': {
      // Marble island counter
      const baseBox = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.85, 0.8), darkMetalMat);
      baseBox.position.set(0, 0.425, 0);
      group.add(baseBox);

      // Overhanging marble top
      const topSlab = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.9), marbleMat);
      topSlab.position.set(0, 0.89, 0);
      group.add(topSlab);

      // Cooktop glass burner
      const cooktop = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.01, 0.45), darkMetalMat);
      cooktop.position.set(-0.4, 0.935, 0);
      group.add(cooktop);

      // Modern gooseneck faucet
      const tapGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8);
      const tap = new THREE.Mesh(tapGeom, darkMetalMat);
      tap.position.set(0.5, 1.05, -0.1);
      group.add(tap);
      break;
    }

    case 'dining_table': {
      // Oak table with 4 tapered legs
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.95), mainMat);
      top.position.set(0, 0.74, 0);
      group.add(top);

      for (const tx of [-0.8, 0.8]) {
        for (const tz of [-0.38, 0.38]) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.72, 8), darkMetalMat);
          leg.position.set(tx, 0.36, tz);
          group.add(leg);
        }
      }
      break;
    }

    case 'plant_pot': {
      // Ceramic geometric planter with monstera foliage
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.5, 12), concreteMat);
      pot.position.set(0, 0.25, 0);
      group.add(pot);

      const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12), darkMetalMat);
      soil.position.set(0, 0.48, 0);
      group.add(soil);

      // 5 procedural leaves
      const foliageMat = new THREE.MeshStandardMaterial({
        color: 0x15803d, // Emerald green
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.DoubleSide
      });

      for (let l = 0; l < 5; l++) {
        const leafGroup = new THREE.Group();
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.6, 6), foliageMat);
        stalk.position.set(0, 0.3, 0);
        leafGroup.add(stalk);

        const leafBlade = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.4, 0.01), foliageMat);
        leafBlade.position.set(0, 0.6, 0.08);
        leafBlade.rotation.x = 0.4;
        leafGroup.add(leafBlade);

        leafGroup.position.set(0, 0.48, 0);
        leafGroup.rotation.y = (l * Math.PI * 2) / 5;
        leafGroup.rotation.z = 0.25;
        group.add(leafGroup);
      }
      break;
    }

    case 'voxel_cube':
    default: {
      // 1x1x1 beveled voxel with recessed inner relief
      const cubeGeom = new THREE.BoxGeometry(0.98, 0.98, 0.98);
      const cube = new THREE.Mesh(cubeGeom, mainMat);
      cube.position.set(0, 0.5, 0);
      cube.castShadow = !isSoftwareGl;
      cube.receiveShadow = !isSoftwareGl;
      group.add(cube);

      // Inset face relief for high detail read
      const trimGeom = new THREE.BoxGeometry(1.0, 1.0, 1.0);
      const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(trimGeom),
        new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true })
      );
      wireframe.position.set(0, 0.5, 0);
      group.add(wireframe);
      break;
    }
  }

  return group;
}
