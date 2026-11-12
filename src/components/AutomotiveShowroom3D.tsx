import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { autoAudio } from '../audio/automotiveAudio';
import {
  buildSupercar,
  buildSuv,
  buildSedan,
  buildHexagonLightRig,
  VehicleModelType
} from '../three/carModelFactory';
import { 
  Rotate3d, 
  Sparkles, 
  Droplets, 
  Maximize2, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  VolumeX,
  Camera,
  Sun,
  Moon,
  Lightbulb,
  Car,
  Compass,
  CheckCircle2,
  Wand2
} from 'lucide-react';

interface PaintColor {
  id: string;
  name: string;
  nameShort: string;
  hex: string;
  metalness: number;
  roughness: number;
}

const PAINT_COLORS: PaintColor[] = [
  { id: 'samurai-red', name: 'Vermelho Samurai Perolizado', nameShort: 'Vermelho Samurai', hex: '#E5004F', metalness: 0.5, roughness: 0.08 },
  { id: 'obsidian-black', name: 'Preto Vulcano Espelhado', nameShort: 'Preto Espelhado', hex: '#09090b', metalness: 0.75, roughness: 0.04 },
  { id: 'pearl-white', name: 'Branco Kyōto Pérola', nameShort: 'Branco Pérola', hex: '#f8fafc', metalness: 0.35, roughness: 0.08 },
  { id: 'midnight-blue', name: 'Azul Noturno Cerâmico', nameShort: 'Azul Cerâmico', hex: '#1e3a8a', metalness: 0.65, roughness: 0.08 },
  { id: 'nardo-grey', name: 'Cinza Nardo Acetinado', nameShort: 'Cinza Nardo', hex: '#475569', metalness: 0.3, roughness: 0.15 },
  { id: 'champagne-gold', name: 'Dourado Imperial Metálico', nameShort: 'Dourado Imperial', hex: '#b4833e', metalness: 0.8, roughness: 0.12 },
];

export const AutomotiveShowroom3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // State
  const [selectedModel, setSelectedModel] = useState<VehicleModelType>('supercar');
  const [selectedColor, setSelectedColor] = useState<PaintColor>(PAINT_COLORS[0]);
  const [finishType, setFinishType] = useState<'before' | 'polished' | 'ceramic'>('ceramic');
  const [studioEnvironment, setStudioEnvironment] = useState<'hex_led' | 'cyber_night' | 'daylight'>('hex_led');
  const [isRotating, setIsRotating] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isWaterSpraying, setIsWaterSpraying] = useState(false);
  const [waterBeadCount, setWaterBeadCount] = useState(0);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carPaintMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const currentCarRef = useRef<THREE.Group | null>(null);
  const hexRigRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const dropletsGroupRef = useRef<THREE.Group | null>(null);

  // Initialize Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') || probe.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as unknown as { RENDERER: number }).RENDERER;
      const gpu = String((gl as unknown as { getParameter: (p: unknown) => string }).getParameter(param));
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#08080a');
    scene.fog = new THREE.Fog('#08080a', 14, 38);
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(5.8, 2.5, 6.2);
    cameraRef.current = camera;

    // 2. High-Fidelity Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true, // Allows high-res screenshot capture
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Studio Reflections Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight('#ffffff', 3.0);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight('#E5004F', 2.0);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const hemiLight = new THREE.HemisphereLight('#67e8f9', '#0f172a', 0.8);
    scene.add(hemiLight);

    // 5. Overhead Hexagonal LED Honeycomb Ceiling
    const hexRig = buildHexagonLightRig();
    scene.add(hexRig);
    hexRigRef.current = hexRig;

    // 6. Contact Shadow & Radial Ground Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(256, 256, 30, 256, 256, 256);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 6.4),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.01;
    scene.add(contactShadow);

    // Technical Grid Floor
    const floorGrid = new THREE.GridHelper(26, 26, 0xE5004F, 0x1f293d);
    floorGrid.position.y = 0;
    (floorGrid.material as THREE.Material).transparent = true;
    (floorGrid.material as THREE.Material).opacity = 0.3;
    scene.add(floorGrid);

    // Water Droplets Simulation Group
    const dropletsGroup = new THREE.Group();
    scene.add(dropletsGroup);
    dropletsGroupRef.current = dropletsGroup;

    // 7. Controls with Mobile Touch-Safety
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 3.2;
    controls.maxDistance = 15;
    controls.target.set(0, 0.65, 0);
    // Safe touch interaction: one finger rotates, two fingers zoom/pan
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    controlsRef.current = controls;

    // 8. Shared Materials
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      metalness: 0.5,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 0.95,
    });
    carPaintMatRef.current = carPaintMat;

    const materials = {
      paint: carPaintMat,
      chassis: new THREE.MeshStandardMaterial({ color: 0x0f1115, metalness: 0.8, roughness: 0.3 }),
      carbon: new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.35, roughness: 0.35 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x08090d,
        metalness: 0.1,
        roughness: 0.02,
        transmission: isSoftwareGl ? 0 : 0.85,
        transparent: true,
        opacity: isSoftwareGl ? 0.35 : 0.75,
        ior: 1.52,
      }),
      chrome: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.05 }),
      caliper: new THREE.MeshStandardMaterial({ color: 0xE5004F, metalness: 0.4, roughness: 0.2 }),
      headlight: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x93c5fd, emissiveIntensity: 2.2, roughness: 0.1 }),
      taillight: new THREE.MeshStandardMaterial({ color: 0xE5004F, emissive: 0xE5004F, emissiveIntensity: 2.5, roughness: 0.1 }),
      interior: new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 }),
    };

    // Build Initial Car Model
    const car = buildSupercar(materials, isSoftwareGl);
    scene.add(car);
    currentCarRef.current = car;

    // 9. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      if (isRotating && currentCarRef.current) {
        currentCarRef.current.rotation.y += 0.004;
      }

      // Animate water droplets if active
      if (dropletsGroupRef.current && dropletsGroupRef.current.children.length > 0) {
        dropletsGroupRef.current.children.forEach((drop) => {
          drop.position.y -= 0.02;
          if (drop.position.y < 0.6) {
            drop.position.y = 1.3 + Math.random() * 0.4;
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 10. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update vehicle model when changed
  useEffect(() => {
    if (!sceneRef.current || !carPaintMatRef.current) return;

    if (currentCarRef.current) {
      sceneRef.current.remove(currentCarRef.current);
    }

    const materials = {
      paint: carPaintMatRef.current,
      chassis: new THREE.MeshStandardMaterial({ color: 0x0f1115, metalness: 0.8, roughness: 0.3 }),
      carbon: new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.35, roughness: 0.35 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x08090d,
        metalness: 0.1,
        roughness: 0.02,
        transparent: true,
        opacity: 0.75,
        ior: 1.52,
      }),
      chrome: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.05 }),
      caliper: new THREE.MeshStandardMaterial({ color: 0xE5004F, metalness: 0.4, roughness: 0.2 }),
      headlight: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x93c5fd, emissiveIntensity: 2.2, roughness: 0.1 }),
      taillight: new THREE.MeshStandardMaterial({ color: 0xE5004F, emissive: 0xE5004F, emissiveIntensity: 2.5, roughness: 0.1 }),
      interior: new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 }),
    };

    let newCar: THREE.Group;
    if (selectedModel === 'suv') {
      newCar = buildSuv(materials);
    } else if (selectedModel === 'sedan') {
      newCar = buildSedan(materials);
    } else {
      newCar = buildSupercar(materials);
    }

    sceneRef.current.add(newCar);
    currentCarRef.current = newCar;
  }, [selectedModel]);

  // Update Paint Material when color or finish changes
  useEffect(() => {
    if (!carPaintMatRef.current) return;
    const mat = carPaintMatRef.current;
    mat.color.set(selectedColor.hex);

    if (finishType === 'before') {
      // Verniz oxidado, fosco e riscado
      mat.roughness = 0.68;
      mat.metalness = 0.05;
      mat.clearcoat = 0.04;
      mat.clearcoatRoughness = 0.85;
    } else if (finishType === 'polished') {
      // Polimento técnico espelhado
      mat.roughness = 0.12;
      mat.metalness = selectedColor.metalness;
      mat.clearcoat = 0.85;
      mat.clearcoatRoughness = 0.08;
    } else {
      // Vitrificação Cerâmica 9H (Super Wet Gloss)
      mat.roughness = 0.015;
      mat.metalness = Math.min(selectedColor.metalness + 0.12, 0.85);
      mat.clearcoat = 1.0;
      mat.clearcoatRoughness = 0.01;
    }
    mat.needsUpdate = true;
  }, [selectedColor, finishType]);

  // Update Studio Environment & Lighting
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current || !sceneRef.current) return;

    if (studioEnvironment === 'hex_led') {
      // Inspection Detailing Studio
      keyLightRef.current.color.set('#ffffff');
      keyLightRef.current.intensity = 3.2;
      rimLightRef.current.color.set('#E5004F');
      rimLightRef.current.intensity = 2.0;
      sceneRef.current.background = new THREE.Color('#08080a');
      if (hexRigRef.current) hexRigRef.current.visible = true;
    } else if (studioEnvironment === 'cyber_night') {
      // Cyber Neon Night
      keyLightRef.current.color.set('#38bdf8');
      keyLightRef.current.intensity = 1.8;
      rimLightRef.current.color.set('#E5004F');
      rimLightRef.current.intensity = 3.5;
      sceneRef.current.background = new THREE.Color('#050508');
      if (hexRigRef.current) hexRigRef.current.visible = false;
    } else {
      // Daylight Exterior
      keyLightRef.current.color.set('#fef08a');
      keyLightRef.current.intensity = 3.6;
      rimLightRef.current.color.set('#93c5fd');
      rimLightRef.current.intensity = 1.5;
      sceneRef.current.background = new THREE.Color('#0f172a');
      if (hexRigRef.current) hexRigRef.current.visible = false;
    }
  }, [studioEnvironment]);

  // Water Spray / Hydrophobic Test Simulation
  const triggerWaterSprayTest = () => {
    if (!dropletsGroupRef.current) return;
    setIsWaterSpraying(true);
    setWaterBeadCount(prev => prev + 1);
    autoAudio.playWaterDrop();

    // Clear old droplets
    while (dropletsGroupRef.current.children.length > 0) {
      dropletsGroupRef.current.remove(dropletsGroupRef.current.children[0]);
    }

    // Spawn 60 bead spheres simulating hydrophobic water beading
    const beadMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      transparent: true,
      roughness: 0.02,
      ior: 1.33,
    });
    const beadGeom = new THREE.SphereGeometry(0.025, 12, 12);

    for (let i = 0; i < 60; i++) {
      const drop = new THREE.Mesh(beadGeom, beadMat);
      // Scatter over the hood area
      drop.position.set(
        (Math.random() - 0.5) * 1.5,
        0.75 + Math.random() * 0.4,
        0.8 + Math.random() * 1.2
      );
      dropletsGroupRef.current.add(drop);
    }

    setTimeout(() => {
      setIsWaterSpraying(false);
    }, 4000);
  };

  // Camera Presets
  const setCameraView = (view: 'front' | 'side' | 'rear' | 'hood' | 'top') => {
    if (!cameraRef.current || !controlsRef.current) return;
    autoAudio.playClick();
    setIsRotating(false);

    switch (view) {
      case 'front':
        cameraRef.current.position.set(0, 1.4, 5.8);
        controlsRef.current.target.set(0, 0.65, 0);
        break;
      case 'side':
        cameraRef.current.position.set(6.2, 1.4, 0);
        controlsRef.current.target.set(0, 0.65, 0);
        break;
      case 'rear':
        cameraRef.current.position.set(0, 1.6, -5.8);
        controlsRef.current.target.set(0, 0.65, 0);
        break;
      case 'hood':
        cameraRef.current.position.set(1.5, 2.2, 2.8);
        controlsRef.current.target.set(0, 0.7, 1.2);
        break;
      case 'top':
        cameraRef.current.position.set(0.1, 7.5, 0.1);
        controlsRef.current.target.set(0, 0, 0);
        break;
    }
    controlsRef.current.update();
  };

  // Screenshot / Snapshot Capture
  const captureSnapshot = () => {
    if (!rendererRef.current) return;
    autoAudio.playKatanaSlash();
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `garage-samurai-${selectedModel}-${selectedColor.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[720px] bg-[#08080a] rounded-2xl overflow-hidden border border-[#222228] shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Arraste para girar em 360° | Use dois dedos para dar zoom"
      />

      {/* TOP HEADER CONTROLS (Multi-Model Switcher & Spec Status) */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        {/* Model Switcher ("Showrooms") */}
        <div className="pointer-events-auto flex items-center bg-[#0d0d10]/95 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
          <span className="text-[10px] font-mono uppercase text-zinc-400 px-2.5 hidden md:inline font-bold">
            Modelo:
          </span>
          <button
            onClick={() => {
              setSelectedModel('supercar');
              autoAudio.playKatanaSlash();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              selectedModel === 'supercar'
                ? 'bg-[#E5004F] text-white font-bold shadow-md shadow-[#E5004F]/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Supercar GT</span>
          </button>

          <button
            onClick={() => {
              setSelectedModel('suv');
              autoAudio.playKatanaSlash();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              selectedModel === 'suv'
                ? 'bg-[#E5004F] text-white font-bold shadow-md shadow-[#E5004F]/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>SUV Imperial</span>
          </button>

          <button
            onClick={() => {
              setSelectedModel('sedan');
              autoAudio.playKatanaSlash();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              selectedModel === 'sedan'
                ? 'bg-[#E5004F] text-white font-bold shadow-md shadow-[#E5004F]/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Sedan M</span>
          </button>
        </div>

        {/* Studio Presets & Action Tools */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Environment Lighting Modes */}
          <div className="flex bg-[#0d0d10]/95 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button
              onClick={() => {
                setStudioEnvironment('hex_led');
                autoAudio.playClick();
              }}
              title="Estúdio Colmeia de LED (Inspeção Técnica)"
              className={`p-2 rounded-lg text-xs transition-all ${
                studioEnvironment === 'hex_led'
                  ? 'bg-white/15 text-[#E5004F]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setStudioEnvironment('cyber_night');
                autoAudio.playClick();
              }}
              title="Cyber Noturno"
              className={`p-2 rounded-lg text-xs transition-all ${
                studioEnvironment === 'cyber_night'
                  ? 'bg-white/15 text-[#E5004F]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setStudioEnvironment('daylight');
                autoAudio.playClick();
              }}
              title="Luz do Dia / Solar"
              className={`p-2 rounded-lg text-xs transition-all ${
                studioEnvironment === 'daylight'
                  ? 'bg-white/15 text-[#E5004F]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
          </div>

          {/* Screenshot capture */}
          <button
            onClick={captureSnapshot}
            title="Baixar Foto HD da Personalização"
            className="p-2 rounded-xl bg-[#0d0d10]/95 border border-white/10 text-zinc-300 hover:text-white hover:border-[#E5004F] transition-all backdrop-blur-md"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Auto rotate toggle */}
          <button
            onClick={() => {
              setIsRotating(!isRotating);
              autoAudio.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider border backdrop-blur-md flex items-center gap-1.5 transition-all ${
              isRotating
                ? 'bg-[#E5004F]/15 border-[#E5004F] text-[#E5004F]'
                : 'bg-[#0d0d10]/95 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? 'Giro Ativo' : 'Pausado'}</span>
          </button>
        </div>
      </div>

      {/* QUICK CAMERA VIEW ANGLE PILLS (Left Side) */}
      <div className="absolute top-20 left-4 pointer-events-none z-10 hidden md:flex flex-col gap-1.5">
        <span className="text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 mb-1 px-1">
          Ângulos da Câmera:
        </span>
        {[
          { id: 'front', label: 'Frente 3/4' },
          { id: 'hood', label: 'Capô & Reflexo LED' },
          { id: 'side', label: 'Perfil Lateral' },
          { id: 'rear', label: 'Traseira & Difusor' },
          { id: 'top', label: 'Vista Aérea' },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => setCameraView(v.id as any)}
            className="pointer-events-auto px-2.5 py-1 rounded-md bg-[#111114]/85 border border-white/10 hover:border-[#E5004F] text-zinc-300 hover:text-white text-[11px] font-mono text-left transition-all backdrop-blur-sm"
          >
            • {v.label}
          </button>
        ))}

        {/* Interactive Hydrophobic Water Spray Button */}
        <button
          onClick={triggerWaterSprayTest}
          disabled={isWaterSpraying}
          className="pointer-events-auto mt-2 px-3 py-2 rounded-lg bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg backdrop-blur-md group"
        >
          <Droplets className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>{isWaterSpraying ? 'Pulverizando Gotas...' : 'Testar Hidrorrepelência'}</span>
        </button>
      </div>

      {/* UNIFIED COLLAPSIBLE BOTTOM DOCK (Three.js Skill: Zero Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-20 transition-all duration-300">
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => {
              setIsDockCollapsed(!isDockCollapsed);
              autoAudio.playClick();
            }}
            className="px-4 py-1 rounded-t-lg bg-[#141417] border-t border-x border-white/10 text-[10.5px] font-mono uppercase tracking-widest text-zinc-300 hover:text-white hover:border-[#E5004F]/60 transition-all flex items-center gap-2 shadow-2xl"
          >
            {isDockCollapsed ? (
              <>
                <span>Expandir Personalização</span>
                <ChevronUp className="w-3.5 h-3.5 text-[#E5004F]" />
              </>
            ) : (
              <>
                <span>Recolher Painel</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#E5004F]" />
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        {!isDockCollapsed && (
          <div className="p-4 rounded-xl bg-[#0e0e12]/95 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col gap-3.5">
            {/* Row 1: Finish Mode (Before vs Polish vs Ceramic) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[10px] font-mono uppercase text-zinc-400 shrink-0 font-bold hidden sm:inline">
                  Etapa:
                </span>
                <div className="flex bg-[#16161a] p-1 rounded-lg border border-white/5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setFinishType('before');
                      autoAudio.playClick();
                    }}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      finishType === 'before'
                        ? 'bg-zinc-800 text-zinc-200 border border-zinc-600 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Antes (Opaco)</span>
                  </button>

                  <button
                    onClick={() => {
                      setFinishType('polished');
                      autoAudio.playKatanaSlash();
                    }}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      finishType === 'polished'
                        ? 'bg-zinc-800 text-white border border-white/20 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E5004F]" />
                    <span>Polimento Técnico</span>
                  </button>

                  <button
                    onClick={() => {
                      setFinishType('ceramic');
                      autoAudio.playWaterDrop();
                    }}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      finishType === 'ceramic'
                        ? 'bg-[#E5004F] text-white font-black shadow-lg shadow-[#E5004F]/40'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Vitrificação 9H</span>
                  </button>
                </div>
              </div>

              {/* Direct Quote for this model */}
              <a
                href={`https://wa.me/5511997078462?text=Ol%C3%A1%2C%20Garage%20Samurai!%20Personalizei%20o%20${selectedModel.toUpperCase()}%20no%20showroom%20com%20${selectedColor.name}%20e%20gostaria%20de%20um%20or%C3%A7amento.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => autoAudio.playKatanaSlash()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-[#E5004F]/20 hover:bg-[#E5004F] text-[#E5004F] hover:text-white border border-[#E5004F]/40 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Orçar Este Carro</span>
                <ChevronUp className="w-3.5 h-3.5 rotate-90" />
              </a>
            </div>

            {/* Row 2: Color Palette Swatches */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold hidden sm:inline">
                  Tinta Samurai:
                </span>
                <span className="text-xs text-white font-mono font-bold">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {PAINT_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setSelectedColor(color);
                      autoAudio.playKatanaSlash();
                    }}
                    className={`w-7 h-7 rounded-full transition-all relative ${
                      selectedColor.id === color.id
                        ? 'ring-2 ring-[#E5004F] ring-offset-2 ring-offset-[#0e0e12] scale-115 shadow-xl'
                        : 'opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
