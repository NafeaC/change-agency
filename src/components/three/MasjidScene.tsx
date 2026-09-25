// ─────────────────────────────────────────────────────────────────────────────
// Premium 3D centrepiece: the Green Dome and a minaret of Al-Masjid an-Nabawi.
// White marble, polished gold and a ribbed emerald dome, lit like a studio
// product shot on Change black, standing on a reflective floor.
// Built procedurally with react-three-fiber; loaded lazily on the client.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshReflectorMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

// ── Materials ───────────────────────────────────────────────────────────────
function marbleTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f2efe9";
  g.fillRect(0, 0, 512, 512);
  // soft cloudy patches
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512, y = Math.random() * 512, r = 40 + Math.random() * 120;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, "rgba(205,200,192,0.25)");
    grd.addColorStop(1, "rgba(205,200,192,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 512, 512);
  }
  // grey veins
  for (let v = 0; v < 14; v++) {
    g.strokeStyle = `rgba(120,118,112,${0.12 + Math.random() * 0.25})`;
    g.lineWidth = 0.6 + Math.random() * 1.6;
    g.beginPath();
    let x = Math.random() * 512, y = Math.random() * 512;
    g.moveTo(x, y);
    for (let s = 0; s < 18; s++) {
      x += (Math.random() - 0.3) * 40;
      y += (Math.random() - 0.5) * 40;
      g.lineTo(x, y);
    }
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// Gold chevron band (the zig-zag section of the minaret).
function chevronTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f4efe6";
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "#c9962e";
  g.lineWidth = 16;
  g.lineJoin = "miter";
  for (let y = -32; y < 300; y += 48) {
    g.beginPath();
    for (let x = 0; x <= 256; x += 32) g.lineTo(x, y + ((x / 32) % 2 === 0 ? 0 : 20));
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1.5);
  return t;
}

// Green drum band with arched windows glowing warm from inside.
function drumTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#1a7a3c";
  g.fillRect(0, 0, 1024, 128);
  const n = 16;
  for (let i = 0; i < n; i++) {
    const cx = (i + 0.5) * (1024 / n);
    for (const off of [-11, 11]) {
      const x = cx + off;
      g.fillStyle = "#ffd98a";
      g.beginPath();
      g.moveTo(x - 8, 104);
      g.lineTo(x - 8, 58);
      g.quadraticCurveTo(x - 8, 36, x, 30);
      g.quadraticCurveTo(x + 8, 36, x + 8, 58);
      g.lineTo(x + 8, 104);
      g.closePath();
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

function useMaterials() {
  return useMemo(() => {
    const marbleMap = marbleTexture();
    const marble = new THREE.MeshPhysicalMaterial({
      map: marbleMap,
      roughness: 0.28,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
    });
    const gold = new THREE.MeshStandardMaterial({ color: "#e3b04b", metalness: 1, roughness: 0.18 });
    const goldGlow = new THREE.MeshStandardMaterial({
      color: "#ffd27a",
      metalness: 1,
      roughness: 0.2,
      emissive: "#f5a623",
      emissiveIntensity: 0.6,
    });
    const green = new THREE.MeshPhysicalMaterial({
      color: "#15803d",
      metalness: 0.35,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const drumMap = drumTexture();
    const drum = new THREE.MeshPhysicalMaterial({
      map: drumMap,
      emissiveMap: drumMap,
      emissive: new THREE.Color("#ffb347"),
      emissiveIntensity: 0.0,
      metalness: 0.3,
      roughness: 0.35,
      clearcoat: 1,
    });
    // only the windows glow: emissive colour × map, dark green contributes little
    drum.emissiveIntensity = 0.55;
    const chevron = new THREE.MeshStandardMaterial({ map: chevronTexture(), metalness: 0.55, roughness: 0.25 });
    const dark = new THREE.MeshStandardMaterial({ color: "#1b1712", roughness: 0.6 });
    const recess = new THREE.MeshPhysicalMaterial({ map: marbleMap, color: "#cdc6b8", roughness: 0.35, clearcoat: 0.4 });
    const glass = new THREE.MeshStandardMaterial({ color: "#0e1512", metalness: 0.8, roughness: 0.1 });
    return { marble, gold, goldGlow, green, drum, chevron, dark, glass, recess };
  }, []);
}

type Mats = ReturnType<typeof useMaterials>;

// ── Shared ornaments ────────────────────────────────────────────────────────
function Finial({ m, scale = 1, crescent = true }: { m: Mats; scale?: number; crescent?: boolean }) {
  return (
    <group scale={scale}>
      <mesh material={m.gold} position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.13, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={m.gold} position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.02, 0.035, 0.36, 12]} />
      </mesh>
      {[0.2, 0.36, 0.5].map((y, i) => (
        <mesh key={y} material={m.gold} position={[0, y, 0]}>
          <sphereGeometry args={[0.055 - i * 0.01, 24, 12]} />
        </mesh>
      ))}
      <mesh material={m.gold} position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.01, 0.02, 0.22, 8]} />
      </mesh>
      {crescent && (
        <mesh material={m.goldGlow} position={[0, 0.9, 0]} rotation={[0, 0, Math.PI * 0.5 + 0.35]}>
          <torusGeometry args={[0.13, 0.026, 12, 48, Math.PI * 1.55]} />
        </mesh>
      )}
    </group>
  );
}

// A circular balcony with a gold railing.
function Balcony({ m, y, r }: { m: Mats; y: number; r: number }) {
  const bars = 28;
  return (
    <group position={[0, y, 0]}>
      <mesh material={m.marble}>
        <cylinderGeometry args={[r, r * 0.86, 0.12, 48]} />
      </mesh>
      <mesh material={m.gold} position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, 0.018, 8, 64]} />
      </mesh>
      <mesh material={m.gold} position={[0, 0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r * 0.98, 0.022, 8, 64]} />
      </mesh>
      {Array.from({ length: bars }, (_, i) => {
        const a = (i / bars) * Math.PI * 2;
        return (
          <mesh key={i} material={m.gold} position={[Math.cos(a) * r * 0.98, 0.2, Math.sin(a) * r * 0.98]}>
            <cylinderGeometry args={[0.008, 0.008, 0.28, 6]} />
          </mesh>
        );
      })}
    </group>
  );
}

function GoldBand({ m, y, r }: { m: Mats; y: number; r: number }) {
  return (
    <mesh material={m.gold} position={[0, y, 0]}>
      <cylinderGeometry args={[r, r, 0.06, 48]} />
    </mesh>
  );
}

// Small dark arched window, facing outward at radius r and angle a.
function ArchWindow({ m, r, a, y, w = 0.1, h = 0.22, recess = false }: { m: Mats; r: number; a: number; y: number; w?: number; h?: number; recess?: boolean }) {
  const mat = recess ? m.recess : m.glass;
  return (
    <group position={[Math.sin(a) * r, y, Math.cos(a) * r]} rotation={[0, a, 0]}>
      {recess && (
        <mesh material={m.gold} position={[0, 0.02, -0.004]}>
          <boxGeometry args={[w + 0.05, h + w * 0.5 + 0.04, 0.012]} />
        </mesh>
      )}
      <mesh material={mat}>
        <boxGeometry args={[w, h, 0.02]} />
      </mesh>
      <mesh material={mat} position={[0, h / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[w / 2, w / 2, 0.02, 16, 1, false, 0, Math.PI]} />
      </mesh>
    </group>
  );
}

// ── Minaret ─────────────────────────────────────────────────────────────────
function Minaret({ m }: { m: Mats }) {
  const merlons = useMemo(() => {
    const out: [number, number][] = [];
    const s = 0.88;
    for (let i = -3; i <= 3; i++) {
      const v = (i / 3) * s;
      out.push([v, s], [v, -s], [s, v], [-s, v]);
    }
    return out;
  }, []);

  return (
    <group>
      {/* plinth + square marble base with gold columns and arch niches */}
      <mesh material={m.marble} position={[0, 0.12, 0]}>
        <boxGeometry args={[1.9, 0.24, 1.9]} />
      </mesh>
      <mesh material={m.marble} position={[0, 1.55, 0]}>
        <boxGeometry args={[1.5, 2.7, 1.5]} />
      </mesh>
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}${sz}`} material={m.gold} position={[sx * 0.78, 1.45, sz * 0.78]}>
            <cylinderGeometry args={[0.045, 0.045, 2.3, 16]} />
          </mesh>
        )),
      )}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a) => (
        <group key={a}>
          <ArchWindow m={m} r={0.76} a={a} y={1.15} w={0.4} h={0.9} recess />
          <ArchWindow m={m} r={0.76} a={a} y={2.35} w={0.14} h={0.26} />
        </group>
      ))}
      {/* stepped cornice */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} material={i === 1 ? m.gold : m.marble} position={[0, 2.97 + i * 0.1, 0]}>
          <boxGeometry args={[1.56 + i * 0.1, 0.1, 1.56 + i * 0.1]} />
        </mesh>
      ))}
      {/* square balcony with crenellations */}
      <mesh material={m.marble} position={[0, 3.3, 0]}>
        <boxGeometry args={[1.9, 0.12, 1.9]} />
      </mesh>
      {merlons.map(([x, z], i) => (
        <mesh key={i} material={m.marble} position={[x, 3.47, z]}>
          <boxGeometry args={[0.13, 0.24, 0.13]} />
        </mesh>
      ))}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`f${sx}${sz}`} material={m.gold} position={[sx * 0.88, 3.66, sz * 0.88]}>
            <sphereGeometry args={[0.06, 16, 12]} />
          </mesh>
        )),
      )}

      {/* gold chevron octagon */}
      <mesh material={m.chevron} position={[0, 4.25, 0]}>
        <cylinderGeometry args={[0.56, 0.6, 1.7, 8]} />
      </mesh>
      <GoldBand m={m} y={5.12} r={0.62} />

      {/* white shaft with bands and first balcony */}
      <mesh material={m.marble} position={[0, 5.6, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.9, 32]} />
      </mesh>
      <Balcony m={m} y={6.1} r={0.72} />
      <mesh material={m.marble} position={[0, 6.75, 0]}>
        <cylinderGeometry args={[0.44, 0.47, 1.2, 32]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ArchWindow key={i} m={m} r={0.455} a={(i / 6) * Math.PI * 2} y={6.72} />
      ))}
      <GoldBand m={m} y={6.35} r={0.475} />
      <GoldBand m={m} y={7.2} r={0.45} />
      <Balcony m={m} y={7.4} r={0.62} />

      {/* upper shaft and lantern */}
      <mesh material={m.marble} position={[0, 7.95, 0]}>
        <cylinderGeometry args={[0.36, 0.39, 1, 32]} />
      </mesh>
      <GoldBand m={m} y={8.3} r={0.38} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ArchWindow key={i} m={m} r={0.375} a={(i / 6) * Math.PI * 2 + 0.5} y={7.9} w={0.08} h={0.18} />
      ))}
      <mesh material={m.marble} position={[0, 8.65, 0]}>
        <cylinderGeometry args={[0.26, 0.3, 0.6, 32]} />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} material={m.gold} position={[Math.cos(a) * 0.3, 8.65, Math.sin(a) * 0.3]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
          </mesh>
        );
      })}
      <mesh material={m.marble} position={[0, 9.0, 0]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <group position={[0, 9.28, 0]}>
        <Finial m={m} scale={1.1} />
      </group>
    </group>
  );
}

// ── Green Dome ──────────────────────────────────────────────────────────────
function ribbedDome(radius: number, height: number, ribs = 16) {
  const pts: THREE.Vector2[] = [];
  const n = 48;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * (Math.PI / 2);
    const r = radius * Math.pow(Math.cos(a), 0.9);
    pts.push(new THREE.Vector2(Math.max(r, 0.0005), height * Math.sin(a)));
  }
  const geo = new THREE.LatheGeometry(pts, 128);
  // raise thin ribs around the dome
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    const rib = Math.pow(Math.abs(Math.cos((theta * ribs) / 2)), 14);
    const k = 1 + 0.03 * rib * (1 - v.y / height);
    pos.setXYZ(i, v.x * k, v.y, v.z * k);
  }
  geo.computeVertexNormals();
  return geo;
}

function GreenDome({ m }: { m: Mats }) {
  const dome = useMemo(() => ribbedDome(1.5, 1.55), []);
  const gables = useMemo(() => {
    const out: { p: [number, number, number]; r: number }[] = [];
    const s = 1.85;
    for (let i = -2; i <= 2; i++) {
      const v = (i / 2) * (s - 0.4);
      out.push({ p: [v, 0, s], r: 0 }, { p: [v, 0, -s], r: 0 }, { p: [s, 0, v], r: Math.PI / 2 }, { p: [-s, 0, v], r: Math.PI / 2 });
    }
    return out;
  }, []);
  const prism = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.34, 0);
    shape.lineTo(0, 0.42);
    shape.lineTo(0.34, 0);
    shape.lineTo(-0.34, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
    g.translate(0, 0, -0.1);
    return g;
  }, []);

  return (
    <group>
      {/* marble base with triangular gables and round windows */}
      <mesh material={m.marble} position={[0, 0.7, 0]}>
        <boxGeometry args={[3.7, 1.4, 3.7]} />
      </mesh>
      {gables.map((g, i) => (
        <mesh key={i} geometry={prism} material={m.marble} position={[g.p[0], 1.4, g.p[2]]} rotation={[0, g.r, 0]} />
      ))}
      {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a) =>
        [-1, 1].map((side) =>
          (
            [
              [-0.13, 0.95],
              [0.13, 0.95],
              [0, 0.72],
            ] as const
          ).map(([dx, y], j) => {
            const x = side * 1.15 + dx;
            return (
              <group key={`${a}${side}${j}`} rotation={[0, a, 0]}>
                <mesh material={m.gold} position={[x, y, 1.855]}>
                  <torusGeometry args={[0.1, 0.014, 8, 32]} />
                </mesh>
                <mesh material={m.glass} position={[x, y, 1.852]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.09, 0.09, 0.01, 24]} />
                </mesh>
              </group>
            );
          }),
        ),
      )}

      {/* green drum: skirt, windowed band, ledge */}
      <mesh material={m.green} position={[0, 1.55, 0]}>
        <cylinderGeometry args={[1.82, 1.9, 0.14, 64]} />
      </mesh>
      <mesh material={m.drum} position={[0, 1.95, 0]}>
        <cylinderGeometry args={[1.62, 1.72, 0.7, 64]} />
      </mesh>
      <mesh material={m.green} position={[0, 2.34, 0]}>
        <cylinderGeometry args={[1.66, 1.64, 0.1, 64]} />
      </mesh>
      <mesh material={m.drum} position={[0, 2.62, 0]} scale={[0.95, 0.75, 0.95]}>
        <cylinderGeometry args={[1.58, 1.62, 0.6, 64]} />
      </mesh>

      {/* ribbed dome + gold crown */}
      <mesh geometry={dome} material={m.green} position={[0, 2.84, 0]} />
      <group position={[0, 4.36, 0]}>
        <Finial m={m} scale={1.35} crescent={false} />
      </group>
    </group>
  );
}

// ── Scene ───────────────────────────────────────────────────────────────────
function Monument({ scroll }: { scroll?: MotionValue<number> }) {
  const m = useMaterials();
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const drag = useRef({ active: false, x: 0, v: 0 });

  // drag to rotate (desktop + touch), with inertia
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.x = e.clientX;
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      drag.current.v = dx * 0.006;
      spin.current += drag.current.v;
    };
    const up = () => (drag.current.active = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    el.style.cursor = "grab";
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (!drag.current.active) {
      drag.current.v *= 0.94;
      spin.current += drag.current.v + dt * 0.12; // slow turntable
    }
    const s = scroll ? scroll.get() : 0;
    // starts exactly in the pose of the static poster, then turns slowly
    g.rotation.y = -0.55 + spin.current + s * 1.2;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
  });

  return (
    <group ref={group}>
      <group position={[-1.55, 0, -0.9]}>
        <Minaret m={m} />
      </group>
      <group position={[1.2, 0, 0.45]}>
        <GreenDome m={m} />
      </group>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <circleGeometry args={[70, 64]} />
      <MeshReflectorMaterial
        blur={[400, 120]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={0.6}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0908"
        metalness={0.6}
        mirror={0.8}
      />
    </mesh>
  );
}

// Fog tuned to the camera distance (further away on portrait screens).
function SceneFog() {
  const { scene, size } = useThree();
  useEffect(() => {
    const portrait = size.width < size.height;
    scene.fog = portrait ? new THREE.Fog("#050403", 46, 90) : new THREE.Fog("#050403", 24, 50);
  }, [scene, size]);
  return null;
}

// Camera: pointer parallax, scroll dolly, and side offset for the headline.
function Rig({ scroll, shift }: { scroll?: MotionValue<number>; shift: number }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 4.2, 0), []);
  const smooth = useRef({ x: 0, y: 0 });

  const offsetKey = useRef("");

  useFrame(({ pointer }) => {
    // Side/vertical frame offset, applied before the very first render so
    // the model never flashes in the wrong place.
    const cam = camera as THREE.PerspectiveCamera;
    const key = `${size.width}x${size.height}:${shift}`;
    if (offsetKey.current !== key) {
      offsetKey.current = key;
      const shiftY = size.width < size.height ? size.height * 0.24 : 0;
      if (shift || shiftY) cam.setViewOffset(size.width, size.height, -size.width * shift, shiftY, size.width, size.height);
      else cam.clearViewOffset();
      cam.updateProjectionMatrix();
    }

    smooth.current.x += (pointer.x - smooth.current.x) * 0.05;
    smooth.current.y += (pointer.y - smooth.current.y) * 0.05;
    const s = scroll ? scroll.get() : 0;
    const portrait = size.width < size.height;
    const dist = (portrait ? 48 : 28.5) - s * 4;
    camera.position.set(smooth.current.x * 1.6, 4.2 + smooth.current.y * 0.8 + s * 2.5, dist);
    camera.lookAt(target);
  });
  return null;
}

// Tells the page once a few frames have actually been drawn.
function ReadySignal({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 8) onReady?.();
  });
  return null;
}

export default function MasjidScene({
  scroll,
  shift = 0,
  paused = false,
  lowPower = false,
  onReady,
}: {
  scroll?: MotionValue<number>;
  shift?: number;
  paused?: boolean;
  lowPower?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      camera={{ fov: 30, near: 0.5, far: 120, position: [0, 4.2, 22] }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <SceneFog />

      {/* studio lighting: warm key, cool fill, amber rim */}
      <ambientLight intensity={0.15} />
      <spotLight position={[6, 12, 8]} angle={0.45} penumbra={1} intensity={220} color="#fff3e0" />
      <spotLight position={[-8, 6, -6]} angle={0.6} penumbra={1} intensity={160} color="#f5a623" />
      <pointLight position={[-4, 3, 6]} intensity={18} color="#dfe8ff" />

      {/* procedural reflections — no external HDR files */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, 6]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2.4} color="#f5a623" position={[-7, 3, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#ffe2b0" position={[7, 2, -2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 10, -4]} scale={3} />
      </Environment>

      <Monument scroll={scroll} />
      {!lowPower && <Floor />}
      {lowPower && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[70, 48]} />
          <meshStandardMaterial color="#0a0908" metalness={0.2} roughness={0.6} />
        </mesh>
      )}
      <Sparkles count={lowPower ? 40 : 90} scale={[14, 10, 8]} position={[0, 5, 0]} size={2.2} speed={0.3} color="#ffc766" opacity={0.8} />
      <Rig scroll={scroll} shift={shift} />
      <ReadySignal onReady={onReady} />

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.85} luminanceSmoothing={0.15} />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
