// The 3D backdrop. One canvas and one scene graph for the whole page: the
// content in focus picks a diorama (see input.ts), and scrolling turns it,
// builds it up and swaps it for the next one. Nothing here re-renders React
// while the page moves; every frame reads plain mutable values.
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, addEffect, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { input, stage } from "./input";
import {
  ColorsContext,
  GEO,
  MOTION,
  MatsContext,
  clamp,
  colorsFor,
  damp,
  disposeMats,
  lerp,
  makeMats,
  paintMats,
  seeded,
  smooth,
  stagePos,
  useColors,
  useMats,
  type SceneColors,
} from "./kit";
import { Slot } from "./parts";
import Robot from "./Robot";
import { Agents, Certs, Education, Impact } from "./DioramasHome";
import { CloudOps, Office, Process, Retail } from "./DioramasWork";
import { Awards, ContactExtras, Github, Presence, Projects, Skills } from "./DioramasMore";
import { startSmoothScroll, tickSmoothScroll } from "../lib/scroll";

const WIDE = 1024; // px: from here up the stage gets its own column (see index.css)
const MAX_DPR = 1.5;
// A long lens from further back: little perspective distortion, so a diorama
// off to the side of the screen is not stretched toward the edge.
const CAM_FOV = 30;
const CAM_Z = 11;

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

/**
 * Eased scrolling runs on the renderer's own frame loop, so the page and the
 * scene read the same scroll position in the same frame.
 */
function ScrollSync() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-scroll-root]");
    if (!el) return;
    const stop = startSmoothScroll(el);
    const unsub = addEffect((time) => tickSmoothScroll(time));
    return () => {
      unsub();
      stop();
    };
  }, []);
  return null;
}

/** Smooths pointer and scroll once per frame, before anything else reads them. */
function Driver() {
  const last = useRef({ px: -1 });
  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    // With no recent pointer movement (phones, idle desktop) the eyes wander
    // on their own so the scene never looks frozen.
    const idle = performance.now() - input.lastMove > 2500;
    const tx = idle ? Math.sin(t * 0.5) * 0.55 : input.px;
    const ty = idle ? Math.cos(t * 0.4) * 0.25 : input.py;
    smooth.x = damp(smooth.x, tx, 5, dt);
    smooth.y = damp(smooth.y, ty, 5, dt);

    smooth.scroll = damp(smooth.scroll, input.scroll, 9, dt);
    smooth.progress = damp(smooth.progress, stage.progress, 7, dt);
    smooth.travel = damp(smooth.travel, input.scrollPx / input.viewH, 10, dt);
    smooth.docked = damp(smooth.docked, stage.active === "hero" ? 0 : 1, 5, dt);

    const l = last.current;
    if (l.px < 0) l.px = input.scrollPx;
    const speed = rawDt > 0 ? (input.scrollPx - l.px) / input.viewH / rawDt : 0;
    l.px = input.scrollPx;
    smooth.vel = damp(smooth.vel, clamp(speed, -6, 6), 8, dt);
  }, -1);
  return null;
}

function CameraRig() {
  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const cam = state.camera;
    cam.position.x = damp(cam.position.x, smooth.x * 0.3 * MOTION, 3, dt);
    cam.position.y = damp(cam.position.y, smooth.y * 0.2 * MOTION, 3, dt);
    // A fast scroll pulls the camera back a touch, like a breath.
    cam.position.z = damp(cam.position.z, CAM_Z + Math.min(0.8, Math.abs(smooth.vel) * 0.25) * MOTION, 4, dt);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

const DPR_STEPS = [0.85, 1, 1.25, MAX_DPR];

/**
 * Trades resolution for frame rate. The frame rate is averaged over one-second
 * windows; two slow windows in a row drop the pixel ratio a step, and a long
 * smooth stretch raises it again. After a few reversals it stays put, so a
 * device on the edge never flickers between two resolutions.
 */
function AdaptiveQuality() {
  const setDpr = useThree((s) => s.setDpr);
  const q = useRef({ level: DPR_STEPS.length - 1, frames: 0, time: 0, slow: 0, fast: 0, flips: 0, warm: 2 });

  useFrame((_, rawDt) => {
    const s = q.current;
    if (rawDt > 0.25) return; // a tab switch or a long task, not the renderer
    s.frames++;
    s.time += rawDt;
    if (s.time < 1) return;
    const fps = s.frames / s.time;
    s.frames = 0;
    s.time = 0;
    if (s.warm > 0) {
      s.warm--; // the first seconds include shader compilation
      return;
    }
    s.slow = fps < 48 ? s.slow + 1 : 0;
    s.fast = fps > 57 ? s.fast + 1 : 0;
    let next = s.level;
    if (s.slow >= 2 && s.level > 0) next = s.level - 1;
    else if (s.fast >= 6 && s.level < DPR_STEPS.length - 1 && s.flips < 3) next = s.level + 1;
    if (next === s.level) return;
    if (next > s.level) s.flips++;
    s.level = next;
    s.slow = 0;
    s.fast = 0;
    setDpr(Math.min(window.devicePixelRatio || 1, DPR_STEPS[next]));
  });
  return null;
}

/**
 * Pays every first-use cost while the page is still loading: compiles all the
 * shaders, then draws each diorama once into a single pixel so its buffers
 * are on the GPU before it is ever scrolled to. The next frame clears it.
 */
function Warmup() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    let cancelled = false;
    gl.compileAsync(scene, camera)
      .then(() => {
        if (cancelled) return;
        const hidden: THREE.Object3D[] = [];
        scene.traverse((o) => {
          if (!o.visible) {
            hidden.push(o);
            o.visible = true;
          }
        });
        gl.setScissorTest(true);
        gl.setScissor(0, 0, 1, 1);
        gl.render(scene, camera);
        gl.setScissorTest(false);
        hidden.forEach((o) => (o.visible = false));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera]);
  return null;
}

const ARC_SEGMENTS = 96;

/**
 * The turntable. It carries whichever diorama is active, places it beside the
 * content (or behind it on narrow screens), and turns with the scroll.
 */
function Stage({ children }: { children: ReactNode }) {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const turn = useRef<THREE.Group>(null);
  const arcStep = useRef(-1);
  const placed = useRef(false);

  // A flat ring that fills as you read through the content in focus.
  const arc = useMemo(() => new THREE.RingGeometry(1.8, 1.87, ARC_SEGMENTS, 1), []);
  useEffect(() => () => arc.dispose(), [arc]);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const { viewport, size } = state;
    const g = root.current!;

    let x: number;
    let centerY: number;
    let scale: number;
    if (size.width >= WIDE) {
      // Same formula as --stage-w in index.css.
      const colPx = clamp(size.width * 0.32, 320, 600);
      const col = (colPx / size.width) * viewport.width;
      x = viewport.width / 2 - col / 2 - viewport.width * 0.012;
      scale = Math.min(col / 4.0, (viewport.height * 0.66) / 3.3);
      centerY = -viewport.height * 0.03;
    } else {
      // Narrow screens: above the hero text first, then low behind the cards.
      const d = smooth.docked;
      x = 0;
      // Docked, it is smaller and sits in the lower third so text stays readable over it.
      scale = lerp(Math.min(viewport.width / 4.6, (viewport.height * 0.26) / 3.3), viewport.width / 5.4, d);
      centerY = lerp(viewport.height * 0.27, -viewport.height * 0.3, d);
    }
    const y = centerY - 1.38 * scale;

    if (!placed.current) {
      placed.current = true;
      g.position.set(x, y, 0);
      g.scale.setScalar(scale);
    } else {
      g.position.x = damp(g.position.x, x, 5, dt);
      // The whole stage dips against the scroll, then springs back.
      g.position.y = damp(g.position.y, y - clamp(smooth.vel * 0.07, -0.22, 0.22) * MOTION, 5, dt);
      g.scale.setScalar(damp(g.scale.x, scale, 5, dt));
    }

    // Face the camera from wherever the stage sits, then sweep with progress.
    const face = -Math.atan2(g.position.x, CAM_Z);
    const yaw = face + (smooth.progress - 0.5) * 1.15 * MOTION + smooth.x * 0.16 * MOTION;
    turn.current!.rotation.y = damp(turn.current!.rotation.y, yaw, 5, dt);
    tilt.current!.rotation.x = damp(
      tilt.current!.rotation.x,
      0.27 - smooth.y * 0.05 * MOTION + clamp(smooth.vel * 0.035, -0.12, 0.12) * MOTION,
      5,
      dt,
    );

    stagePos.ndcX = g.position.x / (viewport.width / 2);
    stagePos.ndcY = centerY / (viewport.height / 2);
    stagePos.yaw = turn.current!.rotation.y - face;

    const step = Math.round(clamp(smooth.progress, 0, 1) * ARC_SEGMENTS);
    if (step !== arcStep.current) {
      arcStep.current = step;
      arc.setDrawRange(0, step * 6);
    }
  });

  return (
    <group ref={root}>
      <group ref={tilt}>
        <mesh geometry={GEO.disc} material={m.floor} rotation={[-Math.PI / 2, 0, 0]} scale={3.74} position={[0, -0.012, 0]} />
        <mesh geometry={GEO.ring} material={m.ring2} rotation={[Math.PI / 2, 0, 0]} scale={1.835} position={[0, -0.01, 0]} />
        <mesh geometry={arc} material={m.glow} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0, -0.004, 0]} />
        <group ref={turn}>{children}</group>
      </group>
    </group>
  );
}

function paintStars(material: THREE.PointsMaterial, c: SceneColors) {
  material.color.set(c.particle);
  material.opacity = c.particleOpacity;
  // Additive stars only read well on dark backdrops.
  material.blending = c.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
  material.needsUpdate = true;
}

const STAR_SPAN = 16; // the star field repeats every 16 units, so it can scroll forever

function Particles() {
  const c = useColors();
  const a = useRef<THREE.Points>(null);
  const b = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 520;
    const arr = new Float32Array(count * 3);
    // Seeded so the star field is identical on every render and every visit.
    const rand = seeded(1337);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 24;
      arr[i * 3 + 1] = (rand() - 0.5) * STAR_SPAN;
      arr[i * 3 + 2] = -9 + rand() * 11;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  const material = useMemo(
    () => new THREE.PointsMaterial({ size: 0.045, sizeAttenuation: true, transparent: true, depthWrite: false }),
    [],
  );
  useLayoutEffect(() => paintStars(material, c), [material, c]);
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    // The field rises with the page at a fraction of its speed; a second copy
    // one span below keeps the view filled across the wrap.
    const t = state.clock.elapsedTime;
    const shift = (((smooth.travel * 0.85 + t * 0.02 * MOTION) % STAR_SPAN) + STAR_SPAN) % STAR_SPAN;
    const px = -smooth.x * 0.5 * MOTION;
    const py = -smooth.y * 0.3 * MOTION;
    a.current!.position.set(px, py + shift, 0);
    b.current!.position.set(px, py + shift - STAR_SPAN, 0);
  });

  return (
    <>
      <points ref={a} geometry={geometry} material={material} frustumCulled={false} />
      <points ref={b} geometry={geometry} material={material} frustumCulled={false} />
    </>
  );
}

// Wireframe solids drifting behind the content. Each rises at its own rate as
// the page scrolls, which reads as depth.
const SHAPES = [
  { geo: GEO.ico, pos: [-5.4, 2.2, -2.5], scale: 1.1, rate: 0.9, speed: 0.25 },
  { geo: GEO.oct, pos: [-2.2, -1.6, -4], scale: 0.9, rate: 0.55, speed: 0.3 },
  { geo: GEO.ico1, pos: [-6.2, -3.4, -5], scale: 1.5, rate: 0.4, speed: 0.18 },
  { geo: GEO.oct, pos: [1.4, 3.6, -5.5], scale: 1.0, rate: 0.35, speed: 0.22 },
  { geo: GEO.ico, pos: [-3.6, 4.6, -3.2], scale: 0.7, rate: 0.7, speed: 0.32 },
] as const;
const SHAPE_SPAN = 11.5;

function Shapes() {
  const m = useMats();
  const group = useRef<THREE.Group>(null);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const rush = 1 + Math.min(4, Math.abs(smooth.vel) * 2);
    group.current!.children.forEach((child, i) => {
      const sh = SHAPES[i];
      child.rotation.x += dt * sh.speed * MOTION * rush;
      child.rotation.y += dt * sh.speed * 0.7 * MOTION * rush;
      const raw = sh.pos[1] + smooth.travel * sh.rate * 1.6 + Math.sin(t * 0.6 + i * 1.7) * 0.18 * MOTION;
      child.position.y = ((((raw + SHAPE_SPAN / 2) % SHAPE_SPAN) + SHAPE_SPAN) % SHAPE_SPAN) - SHAPE_SPAN / 2;
    });
    group.current!.position.x = damp(group.current!.position.x, -smooth.x * 0.25 * MOTION, 3, dt);
  });

  return (
    <group ref={group}>
      {SHAPES.map((s, i) => (
        <mesh key={i} geometry={s.geo} material={m.wire} position={[s.pos[0], s.pos[1], s.pos[2]]} scale={s.scale} />
      ))}
    </group>
  );
}

export default function Scene3D() {
  const c = useSceneColors();
  const mats = useMemo(() => makeMats(), []);
  useLayoutEffect(() => paintMats(mats, c), [mats, c]);
  useEffect(() => () => disposeMats(mats), [mats]);

  return (
    <Canvas
      dpr={[1, MAX_DPR]}
      camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, stencil: false, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <MatsContext.Provider value={mats}>
        <ColorsContext.Provider value={c}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 4, 5]} intensity={2.4} />
          <pointLight position={[-4, 2, 4]} intensity={40} color={c.lightA} />
          <pointLight position={[4, -2, 3]} intensity={30} color={c.lightB} />
          <AdaptiveQuality />
          <ScrollSync />
          <Driver />
          <CameraRig />
          <Particles />
          <Shapes />
          <Stage>
            <Slot id={["hero", "contact"]}>
              <Robot />
            </Slot>
            <Slot id="agents">
              <Agents />
            </Slot>
            <Slot id="impact">
              <Impact />
            </Slot>
            <Slot id="office">
              <Office />
            </Slot>
            <Slot id="retail">
              <Retail />
            </Slot>
            <Slot id="process">
              <Process />
            </Slot>
            <Slot id="cloud">
              <CloudOps />
            </Slot>
            <Slot id="education">
              <Education />
            </Slot>
            <Slot id="skills">
              <Skills />
            </Slot>
            <Slot id="certs">
              <Certs />
            </Slot>
            <Slot id="awards">
              <Awards />
            </Slot>
            <Slot id="presence">
              <Presence />
            </Slot>
            <Slot id="projects">
              <Projects />
            </Slot>
            <Slot id="github">
              <Github />
            </Slot>
            <Slot id="contact">
              <ContactExtras />
            </Slot>
          </Stage>
          <Warmup />
        </ColorsContext.Provider>
      </MatsContext.Provider>
    </Canvas>
  );
}
