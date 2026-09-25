// ─────────────────────────────────────────────────────────────────────────────
// Stylised 3D model of Al-Masjid an-Nabawi (the Prophet's Mosque, Al-Madinah)
// built procedurally in the Change identity: black stone, glowing amber
// arches and outlines, the iconic Green Dome, lit minarets and the courtyard
// umbrellas. Rendered with react-three-fiber; loaded lazily on the client.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const AMBER = new THREE.Color("#F5A623");
const GOLD = new THREE.Color("#ffc766");

// Building blocks of the mosque footprint: [x1, z1, x2, z2]. The gaps between
// them form the two inner courtyards.
const BLOCKS: [number, number, number, number][] = [
  [-7, -9, -3, 9],   // west wing
  [3, -9, 7, 9],     // east wing
  [-3, -9, 3, -6],   // north strip
  [-3, -1.5, 3, 1.5],// middle
  [-3, 5, 3, 9],     // south (qibla) strip
];
const BUILDING_H = 1.3;
const GREEN_DOME: [number, number] = [1.6, 6.9];

// Minaret positions around the complex.
const MINARETS: [number, number, number][] = [
  // x, z, scale
  [-7.4, -9.4, 1],
  [7.4, -9.4, 1],
  [-7.4, 9.4, 1],
  [7.4, 9.4, 1],
  [-2.6, 9.5, 0.92],
  [-3.2, -9.5, 0.85],
  [3.2, -9.5, 0.85],
];

// ── Procedural textures ─────────────────────────────────────────────────────
function makeArchTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#17120d";
  g.fillRect(0, 0, 128, 128);
  // Arched opening with a warm, lit interior.
  const grad = g.createLinearGradient(0, 30, 0, 118);
  grad.addColorStop(0, "#ffe2a6");
  grad.addColorStop(1, "#f5a623");
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(34, 118);
  g.lineTo(34, 62);
  g.quadraticCurveTo(34, 30, 64, 22);
  g.quadraticCurveTo(94, 30, 94, 62);
  g.lineTo(94, 118);
  g.closePath();
  g.fill();
  // Cornice line.
  g.fillStyle = "#3a2c1a";
  g.fillRect(0, 0, 128, 8);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(255,190,90,0.28)");
  grad.addColorStop(0.35, "rgba(245,166,35,0.08)");
  grad.addColorStop(1, "rgba(245,166,35,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ── Building ────────────────────────────────────────────────────────────────
function Block({ rect, arch }: { rect: [number, number, number, number]; arch: THREE.Texture }) {
  const [x1, z1, x2, z2] = rect;
  const w = x2 - x1;
  const d = z2 - z1;

  const { geometry, materials, edges } = useMemo(() => {
    const geometry = new THREE.BoxGeometry(w, BUILDING_H, d);
    const wall = (len: number) => {
      const t = arch.clone();
      t.needsUpdate = true;
      t.repeat.set(Math.round(len / 0.9), 1);
      return new THREE.MeshStandardMaterial({
        map: t,
        emissiveMap: t,
        emissive: new THREE.Color("#ffb347"),
        emissiveIntensity: 1.4,
        roughness: 0.85,
      });
    };
    const roof = new THREE.MeshStandardMaterial({ color: "#221b14", roughness: 0.95 });
    const materials = [wall(d), wall(d), roof, roof, wall(w), wall(w)];
    const edges = new THREE.EdgesGeometry(geometry);
    return { geometry, materials, edges };
  }, [w, d, arch]);

  return (
    <group position={[(x1 + x2) / 2, BUILDING_H / 2, (z1 + z2) / 2]}>
      <mesh geometry={geometry} material={materials} castShadow receiveShadow />
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={GOLD} toneMapped={false} transparent opacity={0.9} />
      </lineSegments>
    </group>
  );
}

// Small domes that cover the roof of the mosque.
function RoofDomes() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const positions = useMemo(() => {
    const out: [number, number][] = [];
    for (const [x1, z1, x2, z2] of BLOCKS) {
      for (let x = x1 + 1; x < x2 - 0.5; x += 2) {
        for (let z = z1 + 1; z < z2 - 0.5; z += 2) {
          // keep the area around the Green Dome clear
          if (Math.hypot(x - GREEN_DOME[0], z - GREEN_DOME[1]) < 2.6) continue;
          out.push([x, z]);
        }
      }
    }
    return out;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    positions.forEach(([x, z], i) => {
      m.makeTranslation(x, BUILDING_H, z);
      ref.current!.setMatrixAt(i, m);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[0.5, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#cdb07a" metalness={0.35} roughness={0.4} emissive="#6b4a18" emissiveIntensity={0.4} />
    </instancedMesh>
  );
}

// Onion-like pointed dome profile used for the Green Dome.
function domeGeometry(radius: number, height: number) {
  const pts: THREE.Vector2[] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * (Math.PI / 2);
    // near-hemispherical with a gentle bulge, rising to a soft point
    const r = radius * Math.pow(Math.cos(a), 0.85) * (1 + 0.05 * Math.sin((i / n) * Math.PI));
    pts.push(new THREE.Vector2(Math.max(r, 0.001), height * Math.sin(a)));
  }
  pts.push(new THREE.Vector2(0.001, height * 1.1));
  return new THREE.LatheGeometry(pts, 48);
}

function Crescent({ y, size = 1 }: { y: number; size?: number }) {
  return (
    <group position={[0, y, 0]} scale={size}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.012, 0.03, 0.35, 8]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} metalness={0.8} roughness={0.25} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.36, 0]} rotation={[0, 0, Math.PI * 0.3]}>
        <torusGeometry args={[0.09, 0.018, 8, 24, Math.PI * 1.35]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GreenDome() {
  const dome = useMemo(() => domeGeometry(1.25, 1.45), []);
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.emissiveIntensity = 0.55 + Math.sin(clock.elapsedTime * 1.2) * 0.12;
  });
  return (
    <group position={[GREEN_DOME[0], BUILDING_H, GREEN_DOME[1]]}>
      {/* drum */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.38, 1.46, 1, 8]} />
        <meshStandardMaterial ref={ref} color="#1e8a52" emissive="#1fae5f" emissiveIntensity={0.55} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1, 0]} geometry={dome}>
        <meshStandardMaterial color="#1f8f55" emissive="#138a4a" emissiveIntensity={0.45} roughness={0.35} metalness={0.2} />
      </mesh>
      <Crescent y={2.55} size={1.7} />
      <pointLight position={[0, 1.6, 1.8]} color="#37d67a" intensity={6} distance={7} decay={2} />
      {/* neighbouring silver dome */}
      <mesh position={[-3, 0, -0.4]}>
        <sphereGeometry args={[0.6, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c7c9cc" metalness={0.6} roughness={0.3} emissive="#6b6f75" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// A single minaret: square base, octagonal shafts with three lit galleries,
// cylindrical top, small dome and a golden crescent.
function Minaret({ position, scale }: { position: [number, number, number]; scale: number }) {
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d9c6a0", roughness: 0.7, emissive: "#6b4d22", emissiveIntensity: 0.35 }),
    [],
  );
  const ring = useMemo(
    () => new THREE.MeshStandardMaterial({ color: AMBER, emissive: AMBER, emissiveIntensity: 2.6, toneMapped: false }),
    [],
  );

  const gallery = (y: number, r: number) => (
    <group position={[0, y, 0]}>
      <mesh material={stone}>
        <cylinderGeometry args={[r, r * 0.8, 0.14, 8]} />
      </mesh>
      <mesh material={ring} position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r * 0.98, 0.022, 6, 32]} />
      </mesh>
    </group>
  );

  return (
    <group position={position} scale={scale}>
      <mesh material={stone} position={[0, 1.1, 0]}>
        <boxGeometry args={[0.72, 2.2, 0.72]} />
      </mesh>
      <mesh material={stone} position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 2, 8]} />
      </mesh>
      {gallery(4.25, 0.5)}
      <mesh material={stone} position={[0, 5.1, 0]}>
        <cylinderGeometry args={[0.25, 0.28, 1.6, 8]} />
      </mesh>
      {gallery(5.95, 0.42)}
      <mesh material={stone} position={[0, 6.6, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 1.2, 16]} />
      </mesh>
      {gallery(7.25, 0.34)}
      <mesh material={stone} position={[0, 7.6, 0]}>
        <cylinderGeometry args={[0.17, 0.18, 0.55, 16]} />
      </mesh>
      <mesh position={[0, 7.88, 0]} scale={[1, 1.35, 1]}>
        <sphereGeometry args={[0.19, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e6d6b4" emissive="#7a5a22" emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      <Crescent y={8.1} />
    </group>
  );
}

// Giant courtyard umbrellas, instanced across the surrounding plaza.
function Umbrellas() {
  const canopy = useRef<THREE.InstancedMesh>(null);
  const pole = useRef<THREE.InstancedMesh>(null);

  const spots = useMemo(() => {
    const out: [number, number][] = [];
    for (let x = -15.5; x <= 15.5; x += 2.6) {
      for (let z = -17; z <= 17; z += 2.6) {
        const insideBuilding = x > -8.4 && x < 8.4 && z > -10.4 && z < 10.4;
        if (insideBuilding || Math.hypot(x * 1.15, z) > 17) continue;
        out.push([x, z]);
      }
    }
    // inside the two courtyards
    for (const z of [-4.6, -3, 3]) for (const x of [-1.6, 1.6]) out.push([x, z]);
    return out;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI / 4, 0));
    const s = new THREE.Vector3(1, 1, 1);
    spots.forEach(([x, z], i) => {
      m.compose(new THREE.Vector3(x, 1.25, z), q, s);
      canopy.current!.setMatrixAt(i, m);
      m.makeTranslation(x, 0.55, z);
      pole.current!.setMatrixAt(i, m);
    });
    canopy.current!.instanceMatrix.needsUpdate = true;
    pole.current!.instanceMatrix.needsUpdate = true;
  }, [spots]);

  return (
    <group>
      <instancedMesh ref={canopy} args={[undefined, undefined, spots.length]}>
        <coneGeometry args={[0.85, 0.45, 4, 1, true]} />
        <meshStandardMaterial color="#a8987c" emissive="#ffb347" emissiveIntensity={0.12} side={THREE.DoubleSide} roughness={0.7} />
      </instancedMesh>
      <instancedMesh ref={pole} args={[undefined, undefined, spots.length]}>
        <cylinderGeometry args={[0.035, 0.05, 1.1, 6]} />
        <meshStandardMaterial color="#e8dcc4" emissive="#8a6a30" emissiveIntensity={0.4} />
      </instancedMesh>
    </group>
  );
}

// Floating golden dust and a starfield.
function Particles({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      speeds[i] = 0.15 + Math.random() * 0.45;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    const attr = ref.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      if (arr[i * 3 + 1] > 16) arr[i * 3 + 1] = 0;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.09} sizeAttenuation transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

function Stars({ count = 900 }: { count?: number }) {
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.42;
      const r = 90;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.cos(phi);
      p[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return p;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fff3dc" size={0.35} sizeAttenuation transparent opacity={0.7} depthWrite={false} fog={false} />
    </points>
  );
}

function Ground() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(80, 40, AMBER, AMBER);
    const mat = g.material as THREE.LineBasicMaterial;
    mat.transparent = true;
    mat.opacity = 0.13;
    mat.depthWrite = false;
    return g;
  }, []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0b0907" roughness={1} />
      </mesh>
      {/* marble plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[21, 64]} />
        <meshStandardMaterial color="#1f1a14" roughness={0.55} metalness={0.1} />
      </mesh>
      <primitive object={grid} position={[0, 0.02, 0]} />
    </group>
  );
}

function Masjid() {
  const arch = useMemo(() => makeArchTexture(), []);
  const glow = useMemo(() => makeGlowTexture(), []);
  return (
    <group>
      <Ground />
      {BLOCKS.map((b, i) => (
        <Block key={i} rect={b} arch={arch} />
      ))}
      <RoofDomes />
      <GreenDome />
      {MINARETS.map(([x, z, s], i) => (
        <Minaret key={i} position={[x, 0, z]} scale={s} />
      ))}
      <Umbrellas />
      {/* warm halo behind the complex */}
      <sprite position={[0, 5, -16]} scale={[46, 26, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} />
      </sprite>
    </group>
  );
}

// ── Camera rig: intro fly-in, idle drift, pointer parallax and scroll ───────
function Rig({ scroll, shift }: { scroll?: MotionValue<number>; shift: number }) {
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Vector3(0, 2.4, 0), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Shift the rendered frame sideways so the model sits beside the headline.
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // Portrait screens: lift the model into the upper part, above the copy.
    const shiftY = size.width < size.height ? size.height * 0.2 : 0;
    if (shift || shiftY) cam.setViewOffset(size.width, size.height, -size.width * shift, shiftY, size.width, size.height);
    else cam.clearViewOffset();
    cam.updateProjectionMatrix();
  }, [camera, size, shift]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const intro = 1 - Math.pow(1 - Math.min(t / 4, 1), 3);
    const s = scroll ? scroll.get() : 0;
    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.04;

    const portrait = size.width < size.height;
    const radius = (THREE.MathUtils.lerp(58, 33, intro) - s * 10) * (portrait ? 1.75 : 1);
    const theta = THREE.MathUtils.lerp(-0.35, 0.7, intro) + Math.sin(t * 0.07) * 0.14 + smooth.current.x * 0.12 + s * 0.5;
    const height = THREE.MathUtils.lerp(34, 12.5, intro) + smooth.current.y * 1.6 + s * 7;

    camera.position.set(Math.sin(theta) * radius, height, Math.cos(theta) * radius);
    camera.lookAt(target);
  });
  return null;
}

export default function MasjidScene({
  scroll,
  shift = 0,
  paused = false,
  lowPower = false,
}: {
  scroll?: MotionValue<number>;
  shift?: number;
  paused?: boolean;
  lowPower?: boolean;
}) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      camera={{ fov: 32, near: 0.5, far: 300, position: [0, 30, 58] }}
      gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#050403")}
    >
      <fog attach="fog" args={["#050403", 38, 95]} />
      <ambientLight intensity={0.35} color="#ffe6c0" />
      <hemisphereLight args={["#2a3550", "#0b0806", 0.6]} />
      <directionalLight position={[-12, 22, 10]} intensity={0.9} color="#c4d0ff" />
      <pointLight position={[0, 4, 14]} intensity={60} distance={40} decay={2} color="#ffb347" />
      <pointLight position={[-10, 5, -4]} intensity={30} distance={30} decay={2} color="#f5a623" />

      <Masjid />
      <Particles count={lowPower ? 200 : 420} />
      <Stars count={lowPower ? 450 : 900} />
      <Rig scroll={scroll} shift={shift} />

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={lowPower ? 0.8 : 1.15} luminanceThreshold={0.55} luminanceSmoothing={0.2} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
