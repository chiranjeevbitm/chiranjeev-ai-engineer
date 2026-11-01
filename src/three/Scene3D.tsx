import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { input } from "./input";

const damp = THREE.MathUtils.damp;
const clamp = THREE.MathUtils.clamp;
const smoothstep = THREE.MathUtils.smoothstep;

// Pointer and scroll after smoothing. One driver updates it first each frame so
// every object reads the same, already-eased values (no per-object jitter).
const smooth = { x: 0, y: 0, scroll: 0 };

const REDUCED =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MOTION = REDUCED ? 0.25 : 1;

// ---- Palette-aware scene colours -------------------------------------------
// The scene follows the palette picked in the navbar (html[data-palette]).
interface SceneColors {
  glow: string; // eyes, rings, thruster
  core: string; // chest light, ears
  ring2: string;
  sky: string;
  particle: string;
  additive: boolean; // additive particles only read well on dark backdrops
  particleOpacity: number;
  shapeOpacity: number;
  shell: string;
  lightA: string;
  lightB: string;
}

const NIGHT: SceneColors = {
  glow: "#5ee7ff", core: "#8b5cf6", ring2: "#a78bfa", sky: "#38bdf8", particle: "#9bd9ff",
  additive: true, particleOpacity: 0.7, shapeOpacity: 0.35, shell: "#d7e0f0", lightA: "#38bdf8", lightB: "#8b5cf6",
};
const DAY: SceneColors = {
  glow: "#0ea5e9", core: "#7c3aed", ring2: "#8b5cf6", sky: "#0284c7", particle: "#0ea5e9",
  additive: false, particleOpacity: 0.45, shapeOpacity: 0.45, shell: "#d7e0f0", lightA: "#38bdf8", lightB: "#8b5cf6",
};
const CLAUDE_DAY: SceneColors = {
  glow: "#d97757", core: "#c15f3c", ring2: "#c2a27c", sky: "#c15f3c", particle: "#c15f3c",
  additive: false, particleOpacity: 0.4, shapeOpacity: 0.45, shell: "#ece7dd", lightA: "#d97757", lightB: "#c2a27c",
};
const CLAUDE_NIGHT: SceneColors = {
  glow: "#f0a47f", core: "#d97757", ring2: "#c2a27c", sky: "#d97757", particle: "#e8b49a",
  additive: true, particleOpacity: 0.6, shapeOpacity: 0.35, shell: "#e6e0d4", lightA: "#d97757", lightB: "#c2a27c",
};

function colorsFor(palette: string | undefined): SceneColors {
  switch (palette) {
    case "claude": return CLAUDE_DAY;
    case "claude-dark": return CLAUDE_NIGHT;
    case "light": case "light-warm": case "warm": return DAY;
    default: return NIGHT; // dark, warm-dark
  }
}

function useSceneColors(): SceneColors {
  const [palette, setPalette] = useState(() => document.documentElement.dataset.palette);
  useEffect(() => {
    const root = document.documentElement;
    const mo = new MutationObserver(() => setPalette(root.dataset.palette));
    mo.observe(root, { attributes: true, attributeFilter: ["data-palette"] });
    return () => mo.disconnect();
  }, []);
  return useMemo(() => colorsFor(palette), [palette]);
}

function Driver() {
  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    // With no recent pointer movement (phones, idle desktop) the character
    // wanders on its own so the scene never looks frozen.
    const idle = performance.now() - input.lastMove > 2500;
    const tx = idle ? Math.sin(t * 0.5) * 0.55 : input.px;
    const ty = idle ? Math.cos(t * 0.4) * 0.25 : input.py;
    smooth.x = damp(smooth.x, tx, 5, dt);
    smooth.y = damp(smooth.y, ty, 5, dt);
    smooth.scroll = damp(smooth.scroll, input.scroll, 3, dt);
  }, -1);
  return null;
}

function CameraRig() {
  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const cam = state.camera;
    cam.position.x = damp(cam.position.x, smooth.x * 0.35 * MOTION, 3, dt);
    cam.position.y = damp(cam.position.y, smooth.y * 0.22 * MOTION - smooth.scroll * 0.9, 3, dt);
    cam.lookAt(0, -smooth.scroll * 0.4, 0);
  });
  return null;
}

function Robot({ c }: { c: SceneColors }) {
  const viewport = useThree((s) => s.viewport);
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const chest = useRef<THREE.Mesh>(null);
  const flame = useRef<THREE.Mesh>(null);
  const state = useRef({ yaw: 0, blinkAt: 2.5, blinkStart: -1, ndcX: 0, ndcY: 0 });

  useFrame((fs, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = fs.clock.elapsedTime;
    const r = root.current!;
    const st = state.current;

    // Layout: sits beside the hero text, then docks small in the corner as the
    // page scrolls. Portrait screens centre it above the text instead.
    const wide = viewport.width / viewport.height > 1.15;
    const dock = smoothstep(smooth.scroll, 0.02, 0.14);
    const heroX = wide ? viewport.width * 0.26 : 0;
    const heroY = wide ? 0.05 : viewport.height * 0.27;
    const dockX = wide ? viewport.width * 0.4 : viewport.width * 0.33;
    const dockY = wide ? -viewport.height * 0.26 : -viewport.height * 0.34;
    const baseScale = wide
      ? Math.min(1, viewport.height / 5.2)
      : Math.min(viewport.height / 5.2, viewport.width / 4.6) * 0.95;
    const targetScale = THREE.MathUtils.lerp(baseScale, baseScale * (wide ? 0.42 : 0.3), dock);

    r.position.x = damp(r.position.x, THREE.MathUtils.lerp(heroX, dockX, dock), 4, dt);
    r.position.y = damp(r.position.y, THREE.MathUtils.lerp(heroY, dockY, dock), 4, dt);
    const s = damp(r.scale.x, targetScale, 4, dt);
    r.scale.setScalar(s);

    const bob = Math.sin(t * 1.2) * 0.07 * MOTION;
    r.children[0].position.y = bob; // inner bob group, keeps the layout damping above clean

    // Where the robot is on screen, so "look at the cursor" is relative to it.
    st.ndcX = r.position.x / (viewport.width / 2);
    st.ndcY = r.position.y / (viewport.height / 2);
    const dx = smooth.x - st.ndcX;
    const dy = smooth.y - (st.ndcY + 0.15);

    // Head: eased yaw / pitch toward the cursor.
    const h = head.current!;
    const prevYaw = h.rotation.y;
    h.rotation.y = damp(h.rotation.y, clamp(dx * 0.95, -0.95, 0.95) * MOTION, 7, dt);
    h.rotation.x = damp(h.rotation.x, clamp(-dy * 0.5, -0.45, 0.45) * MOTION, 7, dt);
    h.rotation.z = damp(h.rotation.z, clamp(-dx * 0.08, -0.12, 0.12) * MOTION, 5, dt);
    const yawVel = (h.rotation.y - prevYaw) / Math.max(dt, 1e-4);

    // Eyes slide slightly further than the head turns, which sells the look.
    const e = eyes.current!;
    e.position.x = damp(e.position.x, clamp(dx * 0.14, -0.15, 0.15) * MOTION, 10, dt);
    e.position.y = damp(e.position.y, clamp(dy * 0.09, -0.09, 0.09) * MOTION + 0.06, 10, dt);

    // Blink every few seconds.
    if (t > st.blinkAt && st.blinkStart < 0) st.blinkStart = t;
    let lid = 1;
    if (st.blinkStart >= 0) {
      const p = (t - st.blinkStart) / 0.16;
      lid = p < 0.5 ? 1 - p * 2 * 0.9 : 0.1 + (p - 0.5) * 2 * 0.9;
      if (p >= 1) {
        lid = 1;
        st.blinkStart = -1;
        st.blinkAt = t + 2.2 + Math.random() * 3;
      }
    }
    eyeL.current!.scale.y = lid;
    eyeR.current!.scale.y = lid;

    // Torso follows the head with a lag.
    const tr = torso.current!;
    tr.rotation.y = damp(tr.rotation.y, h.rotation.y * 0.35, 4, dt);
    tr.rotation.z = damp(tr.rotation.z, clamp(-dx * 0.04, -0.06, 0.06), 4, dt);

    // Secondary motion: antenna whips against the head's turning speed.
    antenna.current!.rotation.z = damp(
      antenna.current!.rotation.z,
      clamp(-yawVel * 0.05, -0.6, 0.6) + Math.sin(t * 2.1) * 0.04 * MOTION,
      9,
      dt,
    );

    armL.current!.rotation.z = 0.14 + Math.sin(t * 1.3) * 0.05 * MOTION;
    armR.current!.rotation.z = -0.14 - Math.sin(t * 1.3 + 1.2) * 0.05 * MOTION;

    ring1.current!.rotation.x += dt * 0.6 * MOTION;
    ring1.current!.rotation.y += dt * 0.25 * MOTION;
    ring2.current!.rotation.y += dt * 0.45 * MOTION;
    ring2.current!.rotation.z -= dt * 0.2 * MOTION;

    chest.current!.scale.setScalar(1 + Math.sin(t * 3) * 0.1 * MOTION);
    flame.current!.scale.y = 1 + Math.sin(t * 18) * 0.12 * MOTION;
  });

  const shell = (
    <meshPhysicalMaterial color={c.shell} metalness={0.55} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />
  );
  const dark = <meshStandardMaterial color="#1a2238" metalness={0.6} roughness={0.35} />;

  return (
    <group ref={root}>
      <group>
        {/* torso */}
        <group ref={torso} position={[0, -0.45, 0]}>
          <RoundedBox args={[1.15, 0.95, 0.75]} radius={0.22} smoothness={4}>
            {shell}
          </RoundedBox>
          <mesh position={[0, 0.02, 0.39]} ref={chest}>
            <circleGeometry args={[0.13, 24]} />
            <meshBasicMaterial color={c.core} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.02, 0.385]}>
            <ringGeometry args={[0.17, 0.2, 32]} />
            <meshBasicMaterial color={c.glow} toneMapped={false} />
          </mesh>
          {/* arms */}
          <group ref={armL} position={[0.74, 0.28, 0]}>
            <mesh>
              <sphereGeometry args={[0.17, 20, 20]} />
              {dark}
            </mesh>
            <mesh position={[0.03, -0.38, 0]}>
              <capsuleGeometry args={[0.1, 0.4, 6, 14]} />
              {shell}
            </mesh>
          </group>
          <group ref={armR} position={[-0.74, 0.28, 0]}>
            <mesh>
              <sphereGeometry args={[0.17, 20, 20]} />
              {dark}
            </mesh>
            <mesh position={[-0.03, -0.38, 0]}>
              <capsuleGeometry args={[0.1, 0.4, 6, 14]} />
              {shell}
            </mesh>
          </group>
          {/* thruster */}
          <mesh position={[0, -0.78, 0]} rotation={[Math.PI, 0, 0]} ref={flame}>
            <coneGeometry args={[0.24, 0.5, 20]} />
            <meshBasicMaterial color={c.glow} transparent opacity={0.75} toneMapped={false} />
          </mesh>
        </group>

        {/* neck */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.2, 16]} />
          {dark}
        </mesh>

        {/* head */}
        <group ref={head} position={[0, 0.85, 0]}>
          <RoundedBox args={[1.55, 1.25, 1.25]} radius={0.3} smoothness={5}>
            {shell}
          </RoundedBox>
          <RoundedBox args={[1.22, 0.78, 0.14]} radius={0.12} smoothness={4} position={[0, 0.02, 0.6]}>
            <meshPhysicalMaterial color="#060a16" metalness={0.9} roughness={0.08} clearcoat={1} />
          </RoundedBox>
          <group ref={eyes} position={[0, 0.06, 0.685]}>
            <mesh ref={eyeL} position={[-0.27, 0, 0]}>
              <capsuleGeometry args={[0.075, 0.13, 6, 14]} />
              <meshBasicMaterial color={c.glow} toneMapped={false} />
            </mesh>
            <mesh ref={eyeR} position={[0.27, 0, 0]}>
              <capsuleGeometry args={[0.075, 0.13, 6, 14]} />
              <meshBasicMaterial color={c.glow} toneMapped={false} />
            </mesh>
            <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.12, 0.016, 8, 24, Math.PI]} />
              <meshBasicMaterial color={c.glow} toneMapped={false} />
            </mesh>
          </group>
          {/* ears */}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />
              <meshStandardMaterial color={c.core} emissive={c.core} emissiveIntensity={1.1} />
            </mesh>
          ))}
          {/* antenna */}
          <group ref={antenna} position={[0, 0.62, 0]}>
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              {dark}
            </mesh>
            <mesh position={[0, 0.46, 0]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={c.glow} toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* orbit rings */}
        <mesh ref={ring1} position={[0, 0.2, 0]} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[1.55, 0.012, 8, 120]} />
          <meshBasicMaterial color={c.glow} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={ring2} position={[0, 0.2, 0]} rotation={[0.3, 0, 0.5]}>
          <torusGeometry args={[1.9, 0.01, 8, 120]} />
          <meshBasicMaterial color={c.ring2} transparent opacity={0.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Particles({ c }: { c: SceneColors }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 700;
    const arr = new Float32Array(count * 3);
    // Seeded so the star field is identical on every render and every visit.
    let seed = 1337;
    const rand = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 22;
      arr[i * 3 + 1] = (rand() - 0.5) * 14;
      arr[i * 3 + 2] = -9 + rand() * 12;
    }
    return arr;
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const p = ref.current!;
    p.rotation.y += dt * 0.012 * MOTION;
    p.position.x = damp(p.position.x, -smooth.x * 0.5 * MOTION, 3, dt);
    p.position.y = damp(p.position.y, smooth.scroll * 3 - smooth.y * 0.3 * MOTION, 3, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        key={c.additive ? "add" : "normal"}
        size={0.04}
        sizeAttenuation
        color={c.particle}
        transparent
        opacity={c.particleOpacity}
        depthWrite={false}
        blending={c.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

const SHAPES = [
  { kind: "ico", pos: [-5.2, 2.2, -2], scale: 0.6, tone: "sky", speed: 0.25 },
  { kind: "oct", pos: [4.8, 2.6, -3], scale: 0.5, tone: "ring2", speed: 0.3 },
  { kind: "knot", pos: [-4.4, -2.4, -1.5], scale: 0.38, tone: "ring2", speed: 0.2 },
  { kind: "torus", pos: [5.4, -2.2, -2.5], scale: 0.55, tone: "sky", speed: 0.28 },
  { kind: "dode", pos: [0.6, 3.1, -4], scale: 0.45, tone: "glow", speed: 0.22 },
  { kind: "ico", pos: [-1.8, -3.2, -3], scale: 0.35, tone: "core", speed: 0.32 },
] as const;

function Shapes({ c }: { c: SceneColors }) {
  const group = useRef<THREE.Group>(null);

  useFrame((fs, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = fs.clock.elapsedTime;
    const g = group.current!;
    g.children.forEach((child, i) => {
      const sh = SHAPES[i];
      child.rotation.x += dt * sh.speed * MOTION;
      child.rotation.y += dt * sh.speed * 0.7 * MOTION;
      child.position.y = sh.pos[1] + Math.sin(t * 0.6 + i * 1.7) * 0.18 * MOTION;
    });
    g.rotation.y = damp(g.rotation.y, smooth.scroll * 0.9 + smooth.x * 0.05 * MOTION, 3, dt);
  });

  return (
    <group ref={group}>
      {SHAPES.map((s, i) => (
        <mesh key={i} position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale}>
          {s.kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
          {s.kind === "oct" && <octahedronGeometry args={[1, 0]} />}
          {s.kind === "dode" && <dodecahedronGeometry args={[1, 0]} />}
          {s.kind === "torus" && <torusGeometry args={[1, 0.28, 12, 32]} />}
          {s.kind === "knot" && <torusKnotGeometry args={[1, 0.26, 72, 10]} />}
          <meshBasicMaterial color={c[s.tone]} wireframe transparent opacity={c.shapeOpacity} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  const c = useSceneColors();
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.75]);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr([1, 1.75])}
        onFallback={() => setDpr(0.85)}
      />
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} />
      <pointLight position={[-4, 2, 4]} intensity={40} color={c.lightA} />
      <pointLight position={[4, -2, 3]} intensity={30} color={c.lightB} />
      <Driver />
      <CameraRig />
      <Particles c={c} />
      <Shapes c={c} />
      <Robot c={c} />
    </Canvas>
  );
}
