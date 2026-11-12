import * as THREE from 'three';

export type VehicleModelType = 'supercar' | 'suv' | 'sedan';

interface ModelMaterials {
  paint: THREE.MeshPhysicalMaterial;
  chassis: THREE.MeshStandardMaterial;
  carbon: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  chrome: THREE.MeshStandardMaterial;
  caliper: THREE.MeshStandardMaterial;
  headlight: THREE.MeshStandardMaterial;
  taillight: THREE.MeshStandardMaterial;
  interior: THREE.MeshStandardMaterial;
}

/**
 * Procedural detailed wheel with alloy multi-spoke rim, low-profile tire, brake rotor & caliper
 */
function createDetailedWheel(
  radius: number,
  width: number,
  materials: ModelMaterials,
  isSoftwareGl: boolean
): THREE.Group {
  const wheel = new THREE.Group();

  // 1. Rubber Tire with subtle rim groove
  const tireGeom = new THREE.CylinderGeometry(radius, radius, width, 24);
  const tire = new THREE.Mesh(tireGeom, materials.chassis);
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = !isSoftwareGl;
  wheel.add(tire);

  // 2. Alloy Rim Base
  const rimRadius = radius * 0.72;
  const rimBaseGeom = new THREE.CylinderGeometry(rimRadius, rimRadius, width + 0.01, 18);
  const rimBase = new THREE.Mesh(rimBaseGeom, materials.chrome);
  rimBase.rotation.z = Math.PI / 2;
  wheel.add(rimBase);

  // 3. Multi-Spoke Center (5 dual spokes = 10 spokes)
  for (let s = 0; s < 5; s++) {
    const spokeAngle = (s * Math.PI * 2) / 5;
    const spokeGeom = new THREE.BoxGeometry(rimRadius * 1.8, 0.04, width * 0.95);
    const spoke = new THREE.Mesh(spokeGeom, materials.carbon);
    spoke.rotation.x = spokeAngle;
    wheel.add(spoke);
  }

  // 4. Center Lug Hub with Samurai Red Ring
  const hubGeom = new THREE.CylinderGeometry(rimRadius * 0.25, rimRadius * 0.25, width + 0.02, 12);
  const hub = new THREE.Mesh(hubGeom, materials.caliper);
  hub.rotation.z = Math.PI / 2;
  wheel.add(hub);

  // 5. Cross-drilled Ventilated Brake Rotor
  const rotorGeom = new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, 0.02, 16);
  const rotor = new THREE.Mesh(rotorGeom, materials.chrome);
  rotor.rotation.z = Math.PI / 2;
  rotor.position.x = -0.02;
  wheel.add(rotor);

  // 6. Samurai Red Sport Brake Caliper
  const caliperGeom = new THREE.BoxGeometry(0.06, radius * 0.32, radius * 0.22);
  const caliper = new THREE.Mesh(caliperGeom, materials.caliper);
  caliper.position.set(-0.02, radius * 0.3, 0);
  wheel.add(caliper);

  return wheel;
}

/**
 * Builds the Supercar GT (Katana Coupé)
 */
export function buildSupercar(materials: ModelMaterials, isSoftwareGl = false): THREE.Group {
  const car = new THREE.Group();
  car.name = 'supercar_gt';

  // 1. Lower Monocoque Chassis
  const chassisGeom = new THREE.BoxGeometry(2.1, 0.42, 4.4);
  const mainChassis = new THREE.Mesh(chassisGeom, materials.paint);
  mainChassis.position.set(0, 0.46, 0);
  mainChassis.castShadow = !isSoftwareGl;
  mainChassis.receiveShadow = !isSoftwareGl;
  car.add(mainChassis);

  // 2. Sculpted Front Hood with Inset Center Scoop
  const hoodGeom = new THREE.BoxGeometry(1.88, 0.14, 1.45);
  const hood = new THREE.Mesh(hoodGeom, materials.paint);
  hood.position.set(0, 0.62, 1.35);
  hood.rotation.x = 0.09;
  car.add(hood);

  // Carbon Hood Air Extractors
  const ventL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.5), materials.carbon);
  ventL.position.set(-0.5, 0.69, 1.25);
  ventL.rotation.x = 0.09;
  const ventR = ventL.clone();
  ventR.position.x = 0.5;
  car.add(ventL, ventR);

  // 3. Low Slung Aerodynamic Cabin (Greenhouse)
  const cabinGeom = new THREE.BoxGeometry(1.58, 0.46, 2.1);
  const cabin = new THREE.Mesh(cabinGeom, materials.paint);
  cabin.position.set(0, 0.88, -0.22);
  car.add(cabin);

  // Panoramic Raked Front Windshield
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.44, 0.75), materials.glass);
  windshield.position.set(0, 0.87, 0.72);
  windshield.rotation.x = -0.52;
  car.add(windshield);

  // Rear Engine Glass Hatch
  const rearHatch = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.42, 0.9), materials.glass);
  rearHatch.position.set(0, 0.87, -1.18);
  rearHatch.rotation.x = 0.45;
  car.add(rearHatch);

  // Side Glass Windows
  const sideGlassL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.35, 1.35), materials.glass);
  sideGlassL.position.set(-0.79, 0.88, -0.22);
  const sideGlassR = sideGlassL.clone();
  sideGlassR.position.x = 0.79;
  car.add(sideGlassL, sideGlassR);

  // 4. Aero Carbon Front Splitter
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.07, 0.4), materials.carbon);
  splitter.position.set(0, 0.22, 2.2);
  car.add(splitter);

  // Front Radiator Grille
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.22, 0.06), materials.chassis);
  grille.position.set(0, 0.38, 2.21);
  car.add(grille);

  // Dual Projector LED Headlights with Angel Eyes
  const headL = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.22), materials.headlight);
  headL.position.set(-0.78, 0.54, 2.12);
  headL.rotation.y = -0.16;
  const headR = headL.clone();
  headR.position.x = 0.78;
  headR.rotation.y = 0.16;
  car.add(headL, headR);

  // 5. Rear Haunches & GT Ducktail Spoiler
  const spoilerStrutL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.12), materials.carbon);
  spoilerStrutL.position.set(-0.6, 0.82, -2.1);
  const spoilerStrutR = spoilerStrutL.clone();
  spoilerStrutR.position.x = 0.6;
  car.add(spoilerStrutL, spoilerStrutR);

  const wingWing = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.04, 0.28), materials.carbon);
  wingWing.position.set(0, 0.94, -2.12);
  wingWing.rotation.x = 0.08;
  car.add(wingWing);

  // Cyber Full-Width Neon Tail Light Bar
  const tailLight = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.06, 0.06), materials.taillight);
  tailLight.position.set(0, 0.62, -2.2);
  car.add(tailLight);

  // Rear Quad Diffuser
  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.18, 0.32), materials.carbon);
  diffuser.position.set(0, 0.25, -2.16);
  car.add(diffuser);

  // Titanium Quad Exhausts
  for (const ex of [-0.62, -0.46, 0.46, 0.62]) {
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 12), materials.chrome);
    tip.rotation.x = Math.PI / 2;
    tip.position.set(ex, 0.24, -2.25);
    car.add(tip);
  }

  // 6. Side Rocker Skirts & Carbon Mirrors
  const skirtL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 2.2), materials.carbon);
  skirtL.position.set(-1.06, 0.25, 0);
  const skirtR = skirtL.clone();
  skirtR.position.x = 1.06;
  car.add(skirtL, skirtR);

  const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.12), materials.carbon);
  mirrorL.position.set(-0.95, 0.88, 0.55);
  const mirrorR = mirrorL.clone();
  mirrorR.position.x = 0.95;
  car.add(mirrorL, mirrorR);

  // 7. Four Wheels
  const wheelPositions = [
    { x: -1.04, y: 0.34, z: 1.4 },
    { x: 1.04, y: 0.34, z: 1.4 },
    { x: -1.04, y: 0.34, z: -1.35 },
    { x: 1.04, y: 0.34, z: -1.35 },
  ];
  wheelPositions.forEach((p) => {
    const w = createDetailedWheel(0.34, 0.24, materials, isSoftwareGl);
    w.position.set(p.x, p.y, p.z);
    if (p.x > 0) w.rotation.y = Math.PI;
    car.add(w);
  });

  return car;
}

/**
 * Builds the SUV Imperial (Samurai Urban SUV)
 */
export function buildSuv(materials: ModelMaterials, isSoftwareGl = false): THREE.Group {
  const suv = new THREE.Group();
  suv.name = 'suv_imperial';

  // 1. Elevated SUV Body
  const bodyGeom = new THREE.BoxGeometry(2.18, 0.72, 4.5);
  const body = new THREE.Mesh(bodyGeom, materials.paint);
  body.position.set(0, 0.76, 0);
  body.castShadow = !isSoftwareGl;
  suv.add(body);

  // 2. High SUV Cabin / Greenhouse
  const cabinGeom = new THREE.BoxGeometry(1.88, 0.65, 2.8);
  const cabin = new THREE.Mesh(cabinGeom, materials.paint);
  cabin.position.set(0, 1.38, -0.2);
  suv.add(cabin);

  // Windshield & Windows
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.6, 0.7), materials.glass);
  windshield.position.set(0, 1.34, 1.05);
  windshield.rotation.x = -0.42;
  suv.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.58, 0.5), materials.glass);
  rearGlass.position.set(0, 1.34, -1.5);
  rearGlass.rotation.x = 0.3;
  suv.add(rearGlass);

  // Panoramic Roof Rails
  for (const rx of [-0.85, 0.85]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 2.4), materials.chrome);
    rail.position.set(rx, 1.74, -0.2);
    suv.add(rail);
  }

  // 3. Sturdy Front Bumper & Grille
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.3, 0.3), materials.carbon);
  bumper.position.set(0, 0.42, 2.25);
  suv.add(bumper);

  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.38, 0.05), materials.chassis);
  grille.position.set(0, 0.68, 2.26);
  suv.add(grille);

  // Matrix LED Headlights
  const headL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.14, 0.2), materials.headlight);
  headL.position.set(-0.82, 0.82, 2.2);
  const headR = headL.clone();
  headR.position.x = 0.82;
  suv.add(headL, headR);

  // 4. Rear Tail Lights
  const tailLight = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.06), materials.taillight);
  tailLight.position.set(0, 0.95, -2.26);
  suv.add(tailLight);

  // 5. Large 22-inch Wheels with All-Terrain Profile
  const wheelPositions = [
    { x: -1.08, y: 0.44, z: 1.45 },
    { x: 1.08, y: 0.44, z: 1.45 },
    { x: -1.08, y: 0.44, z: -1.45 },
    { x: 1.08, y: 0.44, z: -1.45 },
  ];
  wheelPositions.forEach((p) => {
    const w = createDetailedWheel(0.44, 0.26, materials, isSoftwareGl);
    w.position.set(p.x, p.y, p.z);
    if (p.x > 0) w.rotation.y = Math.PI;
    suv.add(w);
  });

  return suv;
}

/**
 * Builds the Sedan Executivo M (Kyoto Sedan)
 */
export function buildSedan(materials: ModelMaterials, isSoftwareGl = false): THREE.Group {
  const sedan = new THREE.Group();
  sedan.name = 'sedan_executivo';

  // 1. Sleek Long Wheelbase Body
  const bodyGeom = new THREE.BoxGeometry(2.05, 0.48, 4.6);
  const body = new THREE.Mesh(bodyGeom, materials.paint);
  body.position.set(0, 0.54, 0);
  body.castShadow = !isSoftwareGl;
  sedan.add(body);

  // 2. 3-Box Sedan Profile Cabin
  const cabinGeom = new THREE.BoxGeometry(1.68, 0.52, 2.4);
  const cabin = new THREE.Mesh(cabinGeom, materials.paint);
  cabin.position.set(0, 1.02, -0.15);
  sedan.add(cabin);

  // Windshield Front & Rear
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.48, 0.8), materials.glass);
  windshield.position.set(0, 0.98, 0.95);
  windshield.rotation.x = -0.48;
  sedan.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.46, 0.8), materials.glass);
  rearGlass.position.set(0, 0.98, -1.25);
  rearGlass.rotation.x = 0.48;
  sedan.add(rearGlass);

  // Shark Fin Antenna
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.15), materials.paint);
  fin.position.set(0, 1.32, -1.05);
  sedan.add(fin);

  // 3. Executive Front Fascia
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.08, 0.35), materials.carbon);
  splitter.position.set(0, 0.24, 2.3);
  sedan.add(splitter);

  const kidneyGrille = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.28, 0.05), materials.chrome);
  kidneyGrille.position.set(0, 0.46, 2.31);
  sedan.add(kidneyGrille);

  const headL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.2), materials.headlight);
  headL.position.set(-0.75, 0.6, 2.25);
  const headR = headL.clone();
  headR.position.x = 0.75;
  sedan.add(headL, headR);

  // 4. Rear Trunk Lid & Tail Lights
  const trunkLip = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.03, 0.1), materials.carbon);
  trunkLip.position.set(0, 0.78, -2.25);
  sedan.add(trunkLip);

  const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.08), materials.taillight);
  tailL.position.set(-0.68, 0.68, -2.31);
  const tailR = tailL.clone();
  tailR.position.x = 0.68;
  sedan.add(tailL, tailR);

  // 5. Executive Sport Wheels
  const wheelPositions = [
    { x: -1.02, y: 0.36, z: 1.48 },
    { x: 1.02, y: 0.36, z: 1.48 },
    { x: -1.02, y: 0.36, z: -1.45 },
    { x: 1.02, y: 0.36, z: -1.45 },
  ];
  wheelPositions.forEach((p) => {
    const w = createDetailedWheel(0.36, 0.24, materials, isSoftwareGl);
    w.position.set(p.x, p.y, p.z);
    if (p.x > 0) w.rotation.y = Math.PI;
    sedan.add(w);
  });

  return sedan;
}

/**
 * Builds the Detailing Hexagonal Ceiling LED Honeycomb Light Rig (Colmeia de LED)
 */
export function buildHexagonLightRig(): THREE.Group {
  const rig = new THREE.Group();
  rig.name = 'hex_led_ceiling';

  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xf1f5f9,
    emissiveIntensity: 2.2,
    roughness: 0.1,
  });

  const tubeRadius = 0.025;
  const hexRadius = 0.75;

  // Grid of 3x2 hexagons over the ceiling
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      const hexGroup = new THREE.Group();
      const xOffset = col * (hexRadius * 1.75);
      const zOffset = row * (hexRadius * 1.5) + (col % 2 !== 0 ? hexRadius * 0.75 : 0);
      hexGroup.position.set(xOffset, 4.4, zOffset);

      // 6 sides of hexagon
      for (let i = 0; i < 6; i++) {
        const a1 = (i * Math.PI) / 3;
        const a2 = ((i + 1) * Math.PI) / 3;
        const p1 = new THREE.Vector3(Math.cos(a1) * hexRadius, 0, Math.sin(a1) * hexRadius);
        const p2 = new THREE.Vector3(Math.cos(a2) * hexRadius, 0, Math.sin(a2) * hexRadius);

        const edgeLen = p1.distanceTo(p2);
        const tubeGeom = new THREE.CylinderGeometry(tubeRadius, tubeRadius, edgeLen, 8);
        const tube = new THREE.Mesh(tubeGeom, ledMat);

        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        tube.position.copy(mid);

        tube.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(p2, p1).normalize()
        );

        hexGroup.add(tube);
      }
      rig.add(hexGroup);
    }
  }

  return rig;
}
