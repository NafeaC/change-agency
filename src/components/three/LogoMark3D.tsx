// The Change brand mark (the "e" speech bubble) extruded into a glossy 3D
// object that floats, spins and follows the pointer.
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

const MARK_PATHS = [
  "M33.72,32.78l14.28.44-6.56-8.43h-3.21c-.82,2.92-2.33,5.68-4.51,8",
  "M31.6,34.73c.76-.61,1.47-1.26,2.12-1.96l-13.73-.42c-4.01.15-8.03-1.56-10.68-4.97-4.37-5.61-3.35-13.71,2.26-18.08,5.61-4.37,13.71-3.35,18.08,2.26,2,2.58,2.87,5.68,2.68,8.69l-7.8.51c.39-1.51.1-3.18-.93-4.51-1.77-2.28-5.06-2.69-7.34-.91-2.28,1.77-2.69,5.05-.92,7.34.96,1.23,2.36,1.91,3.8,2h.05c.19,0,.38.02.57,0l13.33.05,5.11.02c1.62-5.74.57-12.16-3.37-17.23C28.25-.97,16.01-2.5,7.52,4.11-.97,10.71-2.5,22.94,4.11,31.43c2.97,3.81,7.06,6.21,11.45,7.12l3.27-1.37-1.82,2.81-.94,6.81,15.53-12.08v.02Z",
];

function Mark() {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 47">${MARK_PATHS.map((d) => `<path d="${d}"/>`).join("")}</svg>`;
    const data = new SVGLoader().parse(svg);
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 4,
      bevelEnabled: true,
      bevelThickness: 1.2,
      bevelSize: 0.8,
      bevelSegments: 6,
      curveSegments: 32,
    });
    geo.center();
    geo.scale(0.06, -0.06, 0.06); // SVG y-axis points down
    return geo;
  }, []);

  useFrame(({ clock, pointer }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // swing (never edge-on) and lean towards the pointer
    g.rotation.y = Math.sin(t * 0.7) * 0.55 + pointer.x * 0.35;
    g.rotation.x = Math.sin(t * 0.9) * 0.12 - pointer.y * 0.25;
    g.position.y = Math.sin(t * 1.2) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial color="#0d0c0b" metalness={0.1} roughness={0.3} clearcoat={0.4} clearcoatRoughness={0.15} />
      </mesh>
    </group>
  );
}

// Procedural studio lighting for glossy reflections (no external HDR files).
function Studio() {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.35;
    pmrem.dispose();
  }, [gl, scene]);
  return null;
}

export default function LogoMark3D() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.2], fov: 35 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-5, -3, 2]} intensity={2.5} color="#ffb347" />
      <Studio />
      <Mark />
    </Canvas>
  );
}
