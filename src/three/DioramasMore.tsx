// Backdrops for skills, awards, writing, projects, open source and contact.
// Floor is y = 0; everything fits inside a radius of about 1.7.
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GEO, MOTION, clamp, seeded, smooth, smoothstep, useColors, useLive, useMats, type V3 } from "./kit";
import { Ball, Box, Cone, Cyl, Limb, Part, Ring } from "./parts";

const HALF_PI = Math.PI / 2;
const TAU = Math.PI * 2;
const dummy = new THREE.Object3D();
const tmpColor = new THREE.Color();
const UNLIT = new THREE.Color(0x000000);

// ---- Skills: a chip on a board, driving a small neural network -------------
const LAYERS = [4, 5, 5, 3];
const NET_NODES: V3[] = [];
const NET_LAYER: number[] = [];
LAYERS.forEach((n, l) => {
  for (let i = 0; i < n; i++) {
    NET_NODES.push([-0.96 + l * 0.64, 1.62 + (i - (n - 1) / 2) * 0.32, (l % 2 ? 0.12 : -0.12)]);
    NET_LAYER.push(l);
  }
});
const NET_EDGES: [number, number][] = [];
{
  let start = 0;
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const next = start + LAYERS[l];
    for (let a = 0; a < LAYERS[l]; a++) for (let b = 0; b < LAYERS[l + 1]; b++) NET_EDGES.push([start + a, next + b]);
    start = next;
  }
}
const PULSES = 8;
const PINS = 28;

export function Skills() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const net = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const pins = useRef<THREE.InstancedMesh>(null);
  const pulses = useRef<THREE.Group>(null);
  const die = useRef<THREE.Mesh>(null);
  const tick = useRef(-1);
  const tones = useMemo(() => ({ on: new THREE.Color(c.glow), mid: new THREE.Color(c.core), off: new THREE.Color(c.dark) }), [c]);

  const edges = useMemo(() => {
    const pos = new Float32Array(NET_EDGES.length * 6);
    NET_EDGES.forEach(([a, b], i) => {
      pos.set(NET_NODES[a], i * 6);
      pos.set(NET_NODES[b], i * 6 + 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => edges.dispose(), [edges]);

  useLayoutEffect(() => {
    const im = nodes.current!;
    NET_NODES.forEach((p, i) => {
      dummy.position.set(p[0], p[1], p[2]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.15);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
      im.setColorAt(i, UNLIT);
    });
    im.instanceMatrix.needsUpdate = true;

    // Pins on all four sides of the chip: one draw call.
    const pm = pins.current!;
    const perSide = PINS / 4;
    for (let i = 0; i < PINS; i++) {
      const side = Math.floor(i / perSide);
      const u = ((i % perSide) - (perSide - 1) / 2) * 0.15;
      const edge = 0.62;
      if (side < 2) dummy.position.set(u, 0.16, side === 0 ? edge : -edge);
      else dummy.position.set(side === 2 ? edge : -edge, 0.16, u);
      dummy.rotation.set(0, side < 2 ? 0 : HALF_PI, 0);
      dummy.scale.set(0.06, 0.04, 0.2);
      dummy.updateMatrix();
      pm.setMatrixAt(i, dummy.matrix);
    }
    pm.instanceMatrix.needsUpdate = true;
  }, []);

  useLayoutEffect(() => {
    tick.current = -1; // repaint the nodes after a palette change
  }, [tones]);

  useLive(root, (t) => {
    // The turntable already sweeps with the scroll; the net only sways, so its
    // layers never end up edge-on to the camera.
    net.current!.rotation.y = Math.sin(t * 0.4) * 0.22 * MOTION;

    // An activation wave runs through the layers a few times a second.
    const step = Math.floor(t * 8);
    if (step !== tick.current) {
      tick.current = step;
      const im = nodes.current!;
      const front = (t * 1.4) % (LAYERS.length + 1);
      for (let i = 0; i < NET_NODES.length; i++) {
        const d = Math.abs(NET_LAYER[i] + 0.5 - front);
        const lit = d < 0.7 && (i * 7 + step) % 5 !== 0;
        im.setColorAt(i, lit ? (i % 4 === 0 ? tones.mid : tones.on) : tones.off);
      }
      im.instanceColor!.needsUpdate = true;
    }

    pulses.current!.children.forEach((p, i) => {
      const cycle = t * 0.7 * MOTION + i * 0.37;
      const [a, b] = NET_EDGES[(Math.floor(cycle) * 13 + i * 11) % NET_EDGES.length];
      const f = cycle % 1;
      p.position.set(
        NET_NODES[a][0] + (NET_NODES[b][0] - NET_NODES[a][0]) * f,
        NET_NODES[a][1] + (NET_NODES[b][1] - NET_NODES[a][1]) * f,
        NET_NODES[a][2] + (NET_NODES[b][2] - NET_NODES[a][2]) * f,
      );
    });
    die.current!.scale.setScalar(0.5 + Math.sin(t * 3) * 0.03 * MOTION);
  });

  return (
    <group ref={root}>
      {/* board and chip */}
      <Box m={m.accB} p={[0, 0.04, 0]} s={[2.3, 0.08, 1.9]} />
      {([[-0.9, 0.55], [0.9, 0.55], [-0.9, -0.55], [0.9, -0.55]] as const).map(([x, z], i) => (
        <group key={i}>
          <Limb m={m.gold} a={[x * 0.72, 0.085, z]} b={[x, 0.085, z]} t={0.025} square />
          <Cyl m={m.gold} p={[x, 0.1, z]} s={[0.12, 0.04, 0.12]} />
        </group>
      ))}
      <Box m={m.dark} p={[0, 0.2, 0]} s={[1.1, 0.2, 1.1]} />
      <instancedMesh ref={pins} args={[GEO.box, m.gold, PINS]} />
      <mesh ref={die} geometry={GEO.box} material={m.glow} position={[0, 0.31, 0]} scale={[0.5, 0.02, 0.5]} />
      <Limb m={m.glow} a={[0, 0.32, 0]} b={[0, 0.82, 0]} t={0.03} />
      <Ring m={m.ring2} p={[0, 0.84, 0]} s={0.3} />

      {/* the network */}
      <group ref={net}>
        <lineSegments geometry={edges} material={m.line} />
        <instancedMesh ref={nodes} args={[GEO.sphere, m.lamp, NET_NODES.length]} />
        <group ref={pulses}>
          {Array.from({ length: PULSES }, (_, i) => (
            <Ball key={i} m={m.glow} s={0.07} />
          ))}
        </group>
      </group>
    </group>
  );
}

// ---- Awards: a trophy on the podium, with confetti -------------------------
const CONFETTI = 44;
const FLAKES = (() => {
  const r = seeded(71);
  return Array.from({ length: CONFETTI }, () => ({
    x: (r() - 0.5) * 2.6,
    z: (r() - 0.5) * 2.0,
    phase: r(),
    speed: 0.16 + r() * 0.2,
    spin: 1.5 + r() * 3,
    tone: Math.floor(r() * 5),
  }));
})();

export function Awards() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const trophy = useRef<THREE.Group>(null);
  const star = useRef<THREE.Mesh>(null);
  const confetti = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const im = confetti.current!;
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const tones = [c.glow, c.core, c.ring2, c.sky, "#f2c14e"].map((hex) => new THREE.Color(hex));
    FLAKES.forEach((f, i) => im.setColorAt(i, tones[f.tone]));
    im.instanceColor!.needsUpdate = true;
  }, [c]);

  useLive(root, (t) => {
    const tr = trophy.current!;
    tr.rotation.y = t * 0.5 * MOTION + smooth.progress * 2;
    tr.position.y = 0.72 + Math.sin(t * 1.4) * 0.03 * MOTION + smoothstep(smooth.progress, 0.2, 0.9) * 0.22;
    star.current!.rotation.y = -t * 2 * MOTION;
    star.current!.position.y = 1.22 + Math.sin(t * 2.2) * 0.04 * MOTION;

    const im = confetti.current!;
    FLAKES.forEach((f, i) => {
      const fall = (f.phase + t * f.speed * MOTION) % 1;
      dummy.position.set(f.x + Math.sin(t * 1.3 + i) * 0.08, 2.7 - fall * 2.7, f.z);
      dummy.rotation.set(t * f.spin, i, t * f.spin * 0.6);
      // Flakes shrink away as they reach the floor, so the loop has no pop.
      dummy.scale.setScalar(0.07 * Math.min(1, fall * 8, (1 - fall) * 5));
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={root}>
      {/* podium */}
      <Box m={m.body} p={[0, 0.35, -0.1]} s={[0.8, 0.7, 0.8]} />
      <Box m={m.body} p={[-0.8, 0.24, -0.1]} s={[0.8, 0.48, 0.8]} />
      <Box m={m.body} p={[0.8, 0.16, -0.1]} s={[0.8, 0.32, 0.8]} />
      <Box m={m.glow} p={[0, 0.5, 0.305]} s={[0.36, 0.06, 0.01]} />
      <Box m={m.core} p={[-0.8, 0.32, 0.305]} s={[0.26, 0.05, 0.01]} />
      <Box m={m.sky} p={[0.8, 0.2, 0.305]} s={[0.18, 0.05, 0.01]} />
      <Box m={m.dark} p={[0, 0.02, -0.1]} s={[2.6, 0.04, 1.0]} />

      {/* trophy */}
      <group ref={trophy} position={[0, 0.72, -0.1]}>
        <Box m={m.dark} p={[0, 0.06, 0]} s={[0.4, 0.12, 0.4]} />
        <Cyl m={m.gold} p={[0, 0.17, 0]} s={[0.26, 0.06, 0.26]} />
        <Cyl m={m.gold} p={[0, 0.34, 0]} s={[0.09, 0.3, 0.09]} />
        <Part g={GEO.cup} m={m.gold} p={[0, 0.74, 0]} s={[0.56, 0.52, 0.56]} />
        <Cyl m={m.gold} p={[0, 1.01, 0]} s={[0.6, 0.03, 0.6]} />
        <Part g={GEO.arc} m={m.gold} p={[0.3, 0.76, 0]} s={0.17} r={[0, 0, -HALF_PI]} />
        <Part g={GEO.arc} m={m.gold} p={[-0.3, 0.76, 0]} s={0.17} r={[0, 0, HALF_PI]} />
        <mesh ref={star} geometry={GEO.oct} material={m.glow} position={[0, 1.22, 0]} scale={[0.26, 0.34, 0.26]} />
      </group>

      {/* runners-up */}
      <group position={[-0.8, 0.48, -0.1]}>
        <Cyl m={m.accC} p={[0, 0.2, 0]} s={[0.06, 0.4, 0.06]} />
        <Part g={GEO.hex} m={m.accC} p={[0, 0.48, 0]} s={[0.34, 0.06, 0.34]} r={[HALF_PI, 0, 0]} />
      </group>
      <group position={[0.8, 0.32, -0.1]}>
        <Cyl m={m.accB} p={[0, 0.17, 0]} s={[0.06, 0.34, 0.06]} />
        <Part g={GEO.hex} m={m.accB} p={[0, 0.42, 0]} s={[0.3, 0.06, 0.3]} r={[HALF_PI, 0, 0]} />
      </group>

      <instancedMesh ref={confetti} args={[GEO.box, m.tint, CONFETTI]} frustumCulled={false} />
    </group>
  );
}

// ---- Writing & reach: posts circling a globe, a signal going out -----------
const GLOBE: V3 = [0, 1.45, 0];
const PIN_COUNT = 9;
const GLOBE_PINS: V3[] = (() => {
  const r = seeded(97);
  return Array.from({ length: PIN_COUNT }, () => {
    const u = r() * 2 - 1;
    const a = r() * TAU;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(a) * 0.72, u * 0.72, s * Math.sin(a) * 0.72] as V3;
  });
})();
const POSTS = 4;

export function Presence() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Group>(null);
  const posts = useRef<THREE.Group>(null);
  const waves = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    globe.current!.rotation.y = t * 0.25 * MOTION + smooth.progress * 2.5;
    posts.current!.rotation.y = -t * 0.3 * MOTION - smooth.progress * 1.5;
    posts.current!.children.forEach((p, i) => {
      p.position.y = (i % 2 ? 0.28 : -0.28) + Math.sin(t * 1.2 + i * 1.6) * 0.07 * MOTION;
    });
    // Rings widen away from the antenna and restart.
    waves.current!.children.forEach((w, i) => {
      const f = (t * 0.45 * MOTION + i / 3) % 1;
      w.scale.setScalar(0.08 + f * 0.5);
      w.position.y = f * 0.36;
    });
  });

  return (
    <group ref={root}>
      <Cyl m={m.dark} p={[0, 0.05, 0]} s={[0.7, 0.1, 0.7]} />
      <Limb m={m.body} a={[0, 0.1, 0]} b={[0, 0.7, 0]} t={0.07} />
      <group ref={globe} position={GLOBE}>
        <Part g={GEO.ico1} m={m.dark} s={1.38} />
        <Part g={GEO.ico1} m={m.wire} s={1.46} />
        <Ring m={m.glow} s={0.76} />
        {GLOBE_PINS.map((p, i) => (
          <Ball key={i} m={i % 3 ? m.glow : m.core} p={p} s={0.09} />
        ))}
      </group>
      <Ring m={m.ring2} p={GLOBE} s={1.42} r={[HALF_PI + 0.22, 0, 0.16]} />

      {/* posts */}
      <group ref={posts} position={GLOBE} rotation={[0.22, 0, 0.16]}>
        {Array.from({ length: POSTS }, (_, i) => {
          const a = (i / POSTS) * TAU;
          return (
            <group key={i} position={[Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42]} rotation={[0, HALF_PI - a, 0]}>
              <Box m={m.body} s={[0.48, 0.36, 0.03]} />
              <Box m={i % 2 ? m.core : m.glow} p={[-0.08, 0.1, 0.02]} s={[0.24, 0.04, 0.006]} />
              <Box m={m.dark} p={[0, 0.01, 0.02]} s={[0.38, 0.025, 0.006]} />
              <Box m={m.dark} p={[-0.04, -0.07, 0.02]} s={[0.3, 0.025, 0.006]} />
              <Ball m={m.accA} p={[0.17, -0.11, 0.02]} s={[0.07, 0.07, 0.02]} />
            </group>
          );
        })}
      </group>

      {/* antenna */}
      <group position={[1.05, 0, 0.85]}>
        <Limb m={m.dark} a={[-0.16, 0, 0]} b={[0, 0.7, 0]} t={0.03} />
        <Limb m={m.dark} a={[0.16, 0, 0]} b={[0, 0.7, 0]} t={0.03} />
        <Limb m={m.dark} a={[0, 0, -0.16]} b={[0, 0.7, 0]} t={0.03} />
        <Ball m={m.core} p={[0, 0.74, 0]} s={0.1} />
        <group ref={waves} position={[0, 0.74, 0]}>
          {[0, 1, 2].map((i) => (
            <Part key={i} g={GEO.ring} m={m.glow} r={[HALF_PI, 0, 0]} />
          ))}
        </group>
      </group>
    </group>
  );
}

// ---- Projects: a rocket on the pad, and the apps it shipped ----------------
const WINDOWS = 3;

export function Projects() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const rocket = useRef<THREE.Group>(null);
  const flame = useRef<THREE.Mesh>(null);
  const flameCore = useRef<THREE.Mesh>(null);
  const apps = useRef<THREE.Group>(null);
  const smoke = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    // It lifts off as you scroll through the work, and burns harder while you scroll.
    const lift = smoothstep(smooth.progress, 0.05, 0.95);
    const burn = Math.min(1.6, Math.abs(smooth.vel) * 0.7);
    const r = rocket.current!;
    r.position.y = 0.3 + lift * 0.7 + Math.sin(t * 1.7) * 0.03 * MOTION;
    r.rotation.z = Math.sin(t * 0.9) * 0.03 * MOTION;
    r.rotation.y = t * 0.25 * MOTION;
    const f = 0.55 + lift * 0.5 + burn * 0.5 + Math.sin(t * 22) * 0.07 * MOTION;
    flame.current!.scale.set(0.3, f, 0.3);
    flame.current!.position.y = -0.08 - f / 2;
    flameCore.current!.scale.set(0.16, f * 0.6, 0.16);
    flameCore.current!.position.y = -0.08 - f * 0.3;

    apps.current!.rotation.y = -t * 0.28 * MOTION - smooth.progress * 2.2;
    apps.current!.children.forEach((w, i) => {
      w.position.y = 1.05 + i * 0.45 + Math.sin(t * 1.1 + i * 2) * 0.06 * MOTION;
    });
    smoke.current!.children.forEach((p, i) => {
      const s = (t * 0.5 * MOTION + i / 5) % 1;
      p.scale.setScalar(0.12 + s * (0.3 + lift * 0.25));
      p.position.set(Math.cos(i * 1.26) * s * 0.75, 0.1 + s * 0.12, Math.sin(i * 1.26) * s * 0.75);
    });
  });

  return (
    <group ref={root}>
      {/* pad and gantry */}
      <Cyl m={m.dark} p={[0, 0.04, 0]} s={[1.5, 0.08, 1.5]} />
      <Ring m={m.glow} p={[0, 0.085, 0]} s={0.6} />
      <Limb m={m.dark} a={[-0.62, 0.08, -0.3]} b={[-0.62, 1.45, -0.3]} t={0.05} square />
      <Limb m={m.dark} a={[-0.62, 0.9, -0.3]} b={[-0.28, 0.9, -0.14]} t={0.035} square />
      <Limb m={m.dark} a={[-0.62, 1.3, -0.3]} b={[-0.3, 1.3, -0.14]} t={0.035} square />
      <Ball m={m.core} p={[-0.62, 1.5, -0.3]} s={0.08} />

      <group ref={rocket} position={[0, 0.3, 0]}>
        <Cyl m={m.body} p={[0, 0.62, 0]} s={[0.44, 1.05, 0.44]} />
        <Cone m={m.accA} p={[0, 1.4, 0]} s={[0.44, 0.52, 0.44]} />
        <Cyl m={m.accA} p={[0, 0.3, 0]} s={[0.455, 0.08, 0.455]} />
        <Ball m={m.dark} p={[0, 0.86, 0.2]} s={[0.2, 0.2, 0.08]} />
        <Ball m={m.glow} p={[0, 0.86, 0.215]} s={[0.14, 0.14, 0.06]} />
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, (i / 3) * TAU, 0]}>
            <Box m={m.accA} p={[0, 0.2, 0.3]} s={[0.04, 0.42, 0.26]} r={[0.35, 0, 0]} />
          </group>
        ))}
        <Part g={GEO.cup} m={m.dark} p={[0, 0.02, 0]} s={[0.3, 0.2, 0.3]} r={[Math.PI, 0, 0]} />
        <mesh ref={flame} geometry={GEO.cone} material={m.core} rotation={[Math.PI, 0, 0]} />
        <mesh ref={flameCore} geometry={GEO.cone} material={m.glow} rotation={[Math.PI, 0, 0]} />
      </group>

      <group ref={smoke}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Ball key={i} m={m.body} s={0.2} />
        ))}
      </group>

      {/* shipped apps */}
      <group ref={apps}>
        {Array.from({ length: WINDOWS }, (_, i) => {
          const a = (i / WINDOWS) * TAU;
          return (
            <group key={i} position={[Math.cos(a) * 1.3, 1.05 + i * 0.45, Math.sin(a) * 1.3]} rotation={[0, HALF_PI - a, 0]}>
              <Box m={m.dark} s={[0.72, 0.5, 0.035]} />
              <Box m={m.screen} p={[0, -0.03, 0.02]} s={[0.66, 0.38, 0.006]} />
              <Box m={i === 1 ? m.core : m.glow} p={[0, 0.2, 0.02]} s={[0.66, 0.05, 0.006]} />
              <Box m={m.sky} p={[-0.14, 0.04, 0.026]} s={[0.3, 0.14, 0.004]} />
              <Box m={m.ring2} p={[0.18, 0.07, 0.026]} s={[0.22, 0.03, 0.004]} />
              <Box m={m.ring2} p={[0.15, 0.01, 0.026]} s={[0.16, 0.03, 0.004]} />
              <Box m={m.glow} p={[-0.06, -0.13, 0.026]} s={[0.46, 0.03, 0.004]} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

// ---- Open source: a contribution skyline, and a branch merging back --------
const WEEKS = 13;
const DAYS = 6;
const CELLS = WEEKS * DAYS;
const ACTIVITY = (() => {
  const r = seeded(131);
  return Array.from({ length: CELLS }, (_, i) => {
    const week = Math.floor(i / DAYS);
    const wave = 0.5 + 0.5 * Math.sin(week * 0.7 + 0.4);
    return clamp(r() * 0.75 + wave * 0.45 - 0.12, 0, 1);
  });
})();
const COMMITS: V3[] = [
  [-1.2, 1.5, 0.1],
  [-0.6, 1.5, 0.1],
  [0, 1.5, 0.1],
  [0.6, 1.5, 0.1],
  [1.2, 1.5, 0.1],
];
const BRANCH: V3[] = [
  [-0.3, 2.0, 0.1],
  [0.3, 2.0, 0.1],
];
const GIT_PATH: V3[] = [COMMITS[0], COMMITS[1], BRANCH[0], BRANCH[1], COMMITS[3], COMMITS[4]];

export function Github() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const cells = useRef<THREE.InstancedMesh>(null);
  const head = useRef<THREE.Mesh>(null);
  const star = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    const im = cells.current!;
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const low = new THREE.Color(c.dark);
    const high = new THREE.Color(c.glow);
    ACTIVITY.forEach((a, i) => im.setColorAt(i, tmpColor.copy(low).lerp(high, a < 0.12 ? 0 : 0.25 + a * 0.75)));
    im.instanceColor!.needsUpdate = true;
  }, [c]);

  useLive(root, (t) => {
    // The weeks fill in from left to right as you scroll.
    const reveal = smooth.progress * 1.5 + 0.35;
    const im = cells.current!;
    for (let i = 0; i < CELLS; i++) {
      const week = Math.floor(i / DAYS);
      const day = i % DAYS;
      const k = smoothstep(reveal * (WEEKS + 3) - week, 0, 3);
      const h = 0.04 + ACTIVITY[i] * 0.62 * k * (1 + Math.sin(t * 1.5 + week * 0.5 + day) * 0.06 * MOTION);
      dummy.position.set(-1.14 + week * 0.19, 0.08 + h / 2, -0.42 + day * 0.19);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.15, h, 0.15);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    }
    im.instanceMatrix.needsUpdate = true;

    // HEAD walks main, takes the feature branch, and merges back.
    const seg = (t * 0.55 * MOTION) % (GIT_PATH.length - 1);
    const i = Math.floor(seg);
    const f = seg - i;
    const a = GIT_PATH[i];
    const b = GIT_PATH[i + 1];
    head.current!.position.set(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + 0.02);
    star.current!.rotation.y = t * 1.2 * MOTION;
    star.current!.position.y = 2.45 + Math.sin(t * 1.6) * 0.05 * MOTION;
  });

  return (
    <group ref={root}>
      <Box m={m.dark} p={[0, 0.04, 0.05]} s={[2.7, 0.08, 1.4]} />
      <instancedMesh ref={cells} args={[GEO.box, m.tint, CELLS]} frustumCulled={false} />

      {/* history */}
      {COMMITS.slice(1).map((p, i) => (
        <Limb key={i} m={m.sky} a={COMMITS[i]} b={p} t={0.03} />
      ))}
      <Limb m={m.core} a={COMMITS[1]} b={BRANCH[0]} t={0.03} />
      <Limb m={m.core} a={BRANCH[0]} b={BRANCH[1]} t={0.03} />
      <Limb m={m.core} a={BRANCH[1]} b={COMMITS[3]} t={0.03} />
      {COMMITS.map((p, i) => (
        <Ball key={i} m={m.body} p={p} s={0.2} />
      ))}
      {BRANCH.map((p, i) => (
        <Ball key={i} m={m.accA} p={p} s={0.2} />
      ))}
      <mesh ref={head} geometry={GEO.sphere} material={m.glow} position={COMMITS[0]} scale={0.14} />
      <mesh ref={star} geometry={GEO.oct} material={m.gold} position={[1.2, 2.45, 0.1]} scale={[0.26, 0.34, 0.26]} />
    </group>
  );
}

// ---- Contact: a message leaving, around the robot that waves goodbye -------
const TRAIL = 6;

export function ContactExtras() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const plane = useRef<THREE.Group>(null);
  const trail = useRef<THREE.Group>(null);
  const mail = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    const at = (time: number, out: THREE.Object3D) => {
      const a = time * 0.9 * MOTION;
      out.position.set(Math.cos(a) * 1.55, 1.5 + Math.sin(a * 2) * 0.35, Math.sin(a) * 1.55);
      return a;
    };
    const p = plane.current!;
    const a = at(t, p);
    p.rotation.set(0, -a, Math.cos(a * 2) * 0.35);
    trail.current!.children.forEach((dot, i) => {
      at(t - (i + 1) * 0.09, dot);
      dot.scale.setScalar(0.07 * (1 - i / TRAIL));
    });
    mail.current!.position.y = 0.55 + Math.sin(t * 1.4) * 0.06 * MOTION;
    mail.current!.rotation.y = 0.5 + Math.sin(t * 0.8) * 0.3 * MOTION;
  });

  return (
    <group ref={root}>
      <group ref={plane}>
        {/* a folded paper dart, nose along the direction of travel */}
        <Part g={GEO.dart} m={m.body} s={[0.34, 0.6, 0.05]} r={[HALF_PI, 0, 0]} />
        <Part g={GEO.dart} m={m.accA} p={[0, -0.05, 0.03]} s={[0.05, 0.56, 0.2]} r={[HALF_PI, 0, 0]} />
      </group>
      <group ref={trail}>
        {Array.from({ length: TRAIL }, (_, i) => (
          <Ball key={i} m={m.glow} s={0.07} />
        ))}
      </group>
      <group ref={mail} position={[-1.2, 0.55, 0.75]}>
        <Box m={m.body} s={[0.62, 0.42, 0.05]} />
        <Part g={GEO.prism} m={m.accB} p={[0, 0.12, 0.03]} s={[0.7, 0.012, 0.36]} r={[HALF_PI, 0, 0]} />
        <Ball m={m.core} p={[0, -0.02, 0.04]} s={[0.1, 0.1, 0.03]} />
      </group>
    </group>
  );
}
