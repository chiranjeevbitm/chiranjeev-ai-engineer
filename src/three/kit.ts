// Shared building blocks for the 3D scene: palette colours, one set of
// materials, one set of unit geometries, and the per-frame smoothed inputs.
// Every diorama is assembled from these, so the whole backdrop compiles a
// handful of shader programs and uploads a handful of buffers.
import { createContext, useContext, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type V3 = [number, number, number];

export const damp = THREE.MathUtils.damp;
export const clamp = THREE.MathUtils.clamp;
export const lerp = THREE.MathUtils.lerp;
export const smoothstep = THREE.MathUtils.smoothstep;

export const REDUCED =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const MOTION = REDUCED ? 0.25 : 1;

// Pointer and scroll after smoothing. One driver updates it first each frame so
// every object reads the same, already-eased values (no per-object jitter).
export const smooth = {
  x: 0,
  y: 0,
  scroll: 0, // page progress 0 .. 1
  progress: 0.5, // progress through the content in focus, 0 .. 1
  travel: 0, // distance scrolled, in viewport heights (for parallax)
  vel: 0, // scroll speed in viewport heights per second, signed
  docked: 0, // 0 on the hero, 1 once the page has moved on to content
};

// Where the stage sits this frame, so the robot can look at the cursor from there.
export const stagePos = {
  ndcX: 0, // stage centre on screen, -1 .. 1
  ndcY: 0,
  yaw: 0, // current turntable angle
};

// ---- Palette-aware scene colours -------------------------------------------
// The scene follows the palette picked in the navbar (html[data-palette]).
export interface SceneColors {
  glow: string; // eyes, rings, thruster
  core: string; // chest light, ears
  ring2: string;
  sky: string;
  particle: string;
  additive: boolean; // additive particles only read well on dark backdrops
  particleOpacity: number;
  shapeOpacity: number;
  shell: string;
  dark: string; // structural parts of the dioramas
  screen: string;
  lightA: string;
  lightB: string;
}

const NIGHT: SceneColors = {
  glow: "#5ee7ff", core: "#8b5cf6", ring2: "#a78bfa", sky: "#38bdf8", particle: "#9bd9ff",
  additive: true, particleOpacity: 0.7, shapeOpacity: 0.35, shell: "#d7e0f0", dark: "#27314f", screen: "#0a1024",
  lightA: "#38bdf8", lightB: "#8b5cf6",
};
const DAY: SceneColors = {
  glow: "#0ea5e9", core: "#7c3aed", ring2: "#8b5cf6", sky: "#0284c7", particle: "#0ea5e9",
  additive: false, particleOpacity: 0.45, shapeOpacity: 0.45, shell: "#eef2f9", dark: "#33405f", screen: "#101a36",
  lightA: "#38bdf8", lightB: "#8b5cf6",
};
const CLAUDE_DAY: SceneColors = {
  glow: "#d97757", core: "#c15f3c", ring2: "#c2a27c", sky: "#c15f3c", particle: "#c15f3c",
  additive: false, particleOpacity: 0.4, shapeOpacity: 0.45, shell: "#f4efe6", dark: "#4a4038", screen: "#231c17",
  lightA: "#d97757", lightB: "#c2a27c",
};
const CLAUDE_NIGHT: SceneColors = {
  glow: "#f0a47f", core: "#d97757", ring2: "#c2a27c", sky: "#d97757", particle: "#e8b49a",
  additive: true, particleOpacity: 0.6, shapeOpacity: 0.35, shell: "#e6e0d4", dark: "#463d36", screen: "#191512",
  lightA: "#d97757", lightB: "#c2a27c",
};

export function colorsFor(palette: string | undefined): SceneColors {
  switch (palette) {
    case "claude": return CLAUDE_DAY;
    case "claude-dark": return CLAUDE_NIGHT;
    case "light": case "light-warm": case "warm": return DAY;
    default: return NIGHT; // dark, warm-dark
  }
}

// ---- Geometries -------------------------------------------------------------
// Unit-sized and shared: a mesh sets its size with `scale`, so no diorama ever
// allocates geometry of its own.
export const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1),
  sphere: new THREE.SphereGeometry(0.5, 20, 14),
  cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 24),
  cone: new THREE.ConeGeometry(0.5, 1, 20),
  cup: new THREE.CylinderGeometry(0.5, 0.2, 1, 24),
  ring: new THREE.TorusGeometry(1, 0.012, 8, 72),
  hoop: new THREE.TorusGeometry(1, 0.07, 10, 40),
  arc: new THREE.TorusGeometry(1, 0.12, 8, 20, Math.PI),
  plane: new THREE.PlaneGeometry(1, 1),
  disc: new THREE.CircleGeometry(0.5, 28),
  ico: new THREE.IcosahedronGeometry(0.5, 0),
  ico1: new THREE.IcosahedronGeometry(0.5, 1),
  oct: new THREE.OctahedronGeometry(0.5, 0),
  dart: new THREE.ConeGeometry(0.5, 1, 3),
  prism: new THREE.CylinderGeometry(0.5, 0.5, 1, 3),
  hex: new THREE.CylinderGeometry(0.5, 0.5, 1, 6),
  capsule: new THREE.CapsuleGeometry(0.5, 1, 6, 14),
};

// ---- Materials --------------------------------------------------------------
export interface Mats {
  body: THREE.MeshStandardMaterial; // light casing
  dark: THREE.MeshStandardMaterial; // structure
  accA: THREE.MeshStandardMaterial; // lit accents
  accB: THREE.MeshStandardMaterial;
  accC: THREE.MeshStandardMaterial;
  gold: THREE.MeshStandardMaterial;
  tint: THREE.MeshStandardMaterial; // white, coloured per instance
  glow: THREE.MeshBasicMaterial; // unlit accents (screens, lights, signals)
  core: THREE.MeshBasicMaterial;
  sky: THREE.MeshBasicMaterial;
  ring2: THREE.MeshBasicMaterial;
  lamp: THREE.MeshBasicMaterial; // white, coloured per instance
  screen: THREE.MeshBasicMaterial;
  wire: THREE.MeshBasicMaterial;
  floor: THREE.MeshBasicMaterial; // the translucent turntable under every diorama
  line: THREE.LineBasicMaterial;
}

export function makeMats(): Mats {
  const std = (metalness: number, roughness: number) => new THREE.MeshStandardMaterial({ metalness, roughness });
  const lit = () => new THREE.MeshBasicMaterial({ toneMapped: false });
  return {
    body: std(0.35, 0.36),
    dark: std(0.55, 0.42),
    accA: std(0.25, 0.45),
    accB: std(0.25, 0.45),
    accC: std(0.25, 0.45),
    gold: new THREE.MeshStandardMaterial({ color: "#f2c14e", metalness: 0.75, roughness: 0.28 }),
    tint: std(0.2, 0.5),
    glow: lit(),
    core: lit(),
    sky: lit(),
    ring2: lit(),
    lamp: lit(),
    screen: new THREE.MeshBasicMaterial(),
    wire: new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, toneMapped: false }),
    floor: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false }),
    line: new THREE.LineBasicMaterial({ transparent: true, toneMapped: false }),
  };
}

/** Re-colours the shared materials in place, so a palette change never recompiles a shader. */
export function paintMats(m: Mats, c: SceneColors) {
  m.body.color.set(c.shell);
  m.dark.color.set(c.dark);
  m.accA.color.set(c.core);
  m.accB.color.set(c.sky);
  m.accC.color.set(c.ring2);
  m.glow.color.set(c.glow);
  m.core.color.set(c.core);
  m.sky.color.set(c.sky);
  m.ring2.color.set(c.ring2);
  m.screen.color.set(c.screen);
  m.wire.color.set(c.sky);
  m.wire.opacity = c.shapeOpacity + 0.1;
  m.floor.color.set(c.sky);
  m.floor.opacity = c.additive ? 0.1 : 0.13;
  m.line.color.set(c.sky);
  m.line.opacity = c.additive ? 0.55 : 0.7;
}

export function disposeMats(m: Mats) {
  Object.values(m).forEach((mat) => (mat as THREE.Material).dispose());
}

export const MatsContext = createContext<Mats | null>(null);
export const ColorsContext = createContext<SceneColors>(NIGHT);

export function useMats(): Mats {
  const m = useContext(MatsContext);
  if (!m) throw new Error("useMats must be used inside the 3D scene");
  return m;
}

export function useColors(): SceneColors {
  return useContext(ColorsContext);
}

/**
 * Per-frame animation for a diorama. The callback is skipped while the diorama
 * is off stage, so only the one on screen costs anything.
 */
export function useLive(ref: RefObject<THREE.Object3D | null>, cb: (t: number, dt: number) => void) {
  useFrame((state, rawDt) => {
    const g = ref.current;
    if (!g) return;
    for (let o: THREE.Object3D | null = g; o; o = o.parent) if (!o.visible) return;
    cb(state.clock.elapsedTime, Math.min(rawDt, 0.05));
  });
}

/** Deterministic pseudo-random numbers, so the scene looks the same on every visit. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A small texture with one or two letters, used for the company badges. */
export function letterTexture(text: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${text.length > 1 ? 62 : 84}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, size / 2, size / 2 + 4);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
