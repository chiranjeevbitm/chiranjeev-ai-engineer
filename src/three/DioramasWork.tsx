// Backdrops for the Experience timeline: one small diorama per role.
// Floor is y = 0; everything fits inside a radius of about 1.7.
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GEO, MOTION, seeded, smooth, useColors, useLive, useMats, type V3 } from "./kit";
import { Badge, Ball, Box, Cone, Cyl, Limb, Ring } from "./parts";

const HALF_PI = Math.PI / 2;
const dummy = new THREE.Object3D();
// Instance colours are allocated at mount, so the shader variant that reads
// them is part of the warm-up compile and never built mid-scroll.
const UNLIT = new THREE.Color(0x000000);

// ---- Deloitte: an office tower, and a consultant at a laptop ---------------
const WIN_COLS = 4;
const WIN_ROWS = 8;
const WIN_COUNT = WIN_COLS * WIN_ROWS * 2;
const WIN_SEED = (() => {
  const r = seeded(11);
  return Array.from({ length: WIN_COUNT }, () => r());
})();
const CODE_LINES = [0.26, 0.18, 0.3, 0.14, 0.22];

export function Office() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const windows = useRef<THREE.InstancedMesh>(null);
  const handL = useRef<THREE.Mesh>(null);
  const handR = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const code = useRef<THREE.Group>(null);
  const helpers = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.Mesh>(null);
  const litStep = useRef(-1);
  const tones = useMemo(() => ({ on: new THREE.Color(c.glow), warm: new THREE.Color(c.ring2), off: new THREE.Color(c.screen) }), [c]);

  // Two glass faces of the tower: one draw call for all 64 windows.
  useLayoutEffect(() => {
    const im = windows.current!;
    let i = 0;
    for (let face = 0; face < 2; face++) {
      for (let row = 0; row < WIN_ROWS; row++) {
        for (let col = 0; col < WIN_COLS; col++) {
          const u = (col - (WIN_COLS - 1) / 2) * 0.19;
          const y = 0.46 + row * 0.225;
          if (face === 0) {
            dummy.position.set(u, y, 0.436);
            dummy.rotation.set(0, 0, 0);
          } else {
            dummy.position.set(0.436, y, -u);
            dummy.rotation.set(0, HALF_PI, 0);
          }
          dummy.scale.set(0.13, 0.15, 1);
          dummy.updateMatrix();
          im.setColorAt(i, UNLIT);
          im.setMatrixAt(i++, dummy.matrix);
        }
      }
    }
    im.instanceMatrix.needsUpdate = true;
  }, []);

  useLayoutEffect(() => {
    litStep.current = -1; // repaint the windows after a palette change
  }, [tones]);

  useLive(root, (t) => {
    // More of the office lights up the further you read into the role.
    const step = Math.round(smooth.progress * 14);
    if (step !== litStep.current) {
      litStep.current = step;
      const share = 0.3 + (step / 14) * 0.7;
      const im = windows.current!;
      for (let i = 0; i < WIN_COUNT; i++) {
        const lit = WIN_SEED[i] < share;
        im.setColorAt(i, lit ? (WIN_SEED[i] < 0.12 ? tones.warm : tones.on) : tones.off);
      }
      im.instanceColor!.needsUpdate = true;
    }

    // Typing.
    handL.current!.position.y = 0.685 + Math.abs(Math.sin(t * 11)) * 0.014 * MOTION;
    handR.current!.position.y = 0.685 + Math.abs(Math.sin(t * 11 + 1.3)) * 0.014 * MOTION;
    head.current!.rotation.x = Math.sin(t * 0.7) * 0.05 * MOTION;
    head.current!.rotation.y = Math.sin(t * 0.45) * 0.12 * MOTION;

    // Lines of code write themselves onto the laptop screen.
    const cycle = (t * 0.32) % 1;
    code.current!.children.forEach((line, i) => {
      const k = THREE.MathUtils.clamp(cycle * (CODE_LINES.length + 2) - i, 0.02, 1);
      const w = CODE_LINES[i] * k;
      line.scale.x = w;
      line.position.x = -0.165 + w / 2;
    });

    helpers.current!.rotation.y = t * 0.9 * MOTION;
    helpers.current!.position.y = 1.36 + Math.sin(t * 1.4) * 0.03 * MOTION;
    beacon.current!.scale.setScalar(0.07 + (Math.sin(t * 4) > 0.6 ? 0.04 : 0));
  });

  return (
    <group ref={root}>
      {/* tower */}
      <group position={[-0.85, 0, -0.55]}>
        <Box m={m.dark} p={[0, 1.1, 0]} s={[0.86, 2.2, 0.86]} />
        <Box m={m.body} p={[0, 2.23, 0]} s={[0.94, 0.06, 0.94]} />
        <Box m={m.body} p={[0, 0.03, 0]} s={[1.0, 0.06, 1.0]} />
        <Box m={m.glow} p={[0, 0.18, 0.436]} s={[0.22, 0.26, 0.01]} />
        <instancedMesh ref={windows} args={[GEO.plane, m.lamp, WIN_COUNT]} />
        <Limb m={m.body} a={[0.28, 2.26, -0.26]} b={[0.28, 2.66, -0.26]} t={0.02} />
        <mesh ref={beacon} geometry={GEO.sphere} material={m.core} position={[0.28, 2.68, -0.26]} scale={0.07} />
        {/* rooftop sign: the company initial, as on the timeline */}
        <Limb m={m.body} a={[-0.2, 2.26, 0.3]} b={[-0.2, 2.42, 0.3]} t={0.025} />
        <Limb m={m.body} a={[0.06, 2.26, 0.3]} b={[0.06, 2.42, 0.3]} t={0.025} />
        <Badge text="D" p={[-0.07, 2.62, 0.3]} s={0.5} sway={false} />
      </group>

      {/* workstation: the consultant faces the laptop, back three-quarters to us */}
      <group position={[0.55, 0, 0.5]} rotation={[0, 0.5, 0]}>
        {/* desk */}
        <Box m={m.body} p={[0, 0.62, -0.38]} s={[1.25, 0.05, 0.6]} />
        {([[-0.56, -0.62], [0.56, -0.62], [-0.56, -0.14], [0.56, -0.14]] as const).map(([x, z], i) => (
          <Limb key={i} m={m.dark} a={[x, 0, z]} b={[x, 0.6, z]} t={0.05} square />
        ))}
        {/* laptop */}
        <Box m={m.dark} p={[0, 0.655, -0.3]} s={[0.42, 0.02, 0.28]} />
        <group position={[0, 0.665, -0.44]} rotation={[-0.22, 0, 0]}>
          <Box m={m.dark} p={[0, 0.14, 0]} s={[0.42, 0.28, 0.016]} />
          <Box m={m.screen} p={[0, 0.14, 0.009]} s={[0.38, 0.24, 0.004]} />
          <group ref={code}>
            {CODE_LINES.map((w, i) => (
              <Box key={i} m={i % 2 ? m.core : m.glow} p={[0, 0.225 - i * 0.042, 0.013]} s={[w, 0.016, 0.003]} />
            ))}
          </group>
        </group>
        <Cyl m={m.accB} p={[0.44, 0.69, -0.3]} s={[0.075, 0.09, 0.075]} />
        {/* desk lamp */}
        <Limb m={m.dark} a={[-0.5, 0.645, -0.55]} b={[-0.5, 0.96, -0.55]} t={0.025} />
        <Limb m={m.dark} a={[-0.5, 0.96, -0.55]} b={[-0.36, 1.03, -0.43]} t={0.025} />
        <Ball m={m.glow} p={[-0.35, 1.02, -0.42]} s={0.08} />

        {/* chair */}
        <Box m={m.dark} p={[0, 0.42, 0.2]} s={[0.4, 0.05, 0.4]} />
        <Box m={m.dark} p={[0, 0.7, 0.41]} s={[0.4, 0.46, 0.05]} />
        <Cyl m={m.dark} p={[0, 0.21, 0.2]} s={[0.06, 0.4, 0.06]} />
        <Cyl m={m.dark} p={[0, 0.015, 0.2]} s={[0.42, 0.03, 0.42]} />

        {/* the professional */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <Limb m={m.accC} a={[side * 0.09, 0.5, 0.22]} b={[side * 0.09, 0.5, -0.14]} t={0.12} square />
            <Limb m={m.accC} a={[side * 0.09, 0.52, -0.13]} b={[side * 0.09, 0.05, -0.11]} t={0.1} square />
            <Box m={m.dark} p={[side * 0.09, 0.03, -0.16]} s={[0.1, 0.06, 0.2]} />
            <Limb m={m.accA} a={[side * 0.2, 0.93, 0.17]} b={[side * 0.23, 0.7, 0]} t={0.085} />
            <Limb m={m.body} a={[side * 0.23, 0.7, 0]} b={[side * 0.1, 0.68, -0.24]} t={0.07} />
          </group>
        ))}
        <mesh ref={handL} geometry={GEO.sphere} material={m.body} position={[-0.1, 0.685, -0.26]} scale={0.085} />
        <mesh ref={handR} geometry={GEO.sphere} material={m.body} position={[0.1, 0.685, -0.26]} scale={0.085} />
        <Box m={m.accA} p={[0, 0.76, 0.2]} s={[0.36, 0.46, 0.2]} r={[-0.1, 0, 0]} />
        <Cyl m={m.body} p={[0, 1.02, 0.17]} s={[0.085, 0.08, 0.085]} />
        <group ref={head} position={[0, 1.15, 0.15]}>
          <Ball m={m.body} s={0.25} />
          <Ball m={m.dark} p={[0, 0.045, 0.03]} s={[0.268, 0.2, 0.268]} />
        </group>

        {/* the agents he orchestrates, circling above the screen */}
        <group ref={helpers} position={[0, 1.36, -0.42]}>
          <Ring m={m.ring2} s={0.22} />
          <mesh geometry={GEO.ico} material={m.glow} position={[0.22, 0, 0]} scale={0.1} />
          <mesh geometry={GEO.ico} material={m.core} position={[-0.11, 0, 0.19]} scale={0.1} />
          <mesh geometry={GEO.ico} material={m.sky} position={[-0.11, 0, -0.19]} scale={0.1} />
        </group>
      </group>
    </group>
  );
}

// ---- Tredence: supermarket shelves, a scanner matching items, a cart -------
const SHELF_Y = [0.1, 0.52, 0.94];
const ITEM_COLS = 9;
const ITEMS = (() => {
  const r = seeded(29);
  const list: { x: number; y: number; h: number; tone: number }[] = [];
  SHELF_Y.forEach((y) => {
    for (let col = 0; col < ITEM_COLS; col++) {
      list.push({ x: -0.8 + col * 0.2, y, h: 0.16 + r() * 0.16, tone: Math.floor(r() * 5) });
    }
  });
  return list;
})();

export function Retail() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const items = useRef<THREE.InstancedMesh>(null);
  const beam = useRef<THREE.Group>(null);
  const cart = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const im = items.current!;
    const tones = [c.glow, c.core, c.ring2, c.sky, "#f2c14e"].map((hex) => new THREE.Color(hex));
    ITEMS.forEach((it, i) => im.setColorAt(i, tones[it.tone]));
    im.instanceColor!.needsUpdate = true;
  }, [c]);

  useLive(root, (t) => {
    // The scanner sweeps the shelf; each item lifts as it is matched.
    const bx = Math.sin(t * 0.9) * 0.86;
    beam.current!.position.x = bx;
    const im = items.current!;
    ITEMS.forEach((it, i) => {
      const near = Math.max(0, 1 - Math.abs(it.x - bx) / 0.22) * MOTION;
      const h = it.h * (1 + near * 0.18);
      dummy.position.set(it.x, it.y + 0.02 + h / 2 + near * 0.03, 0.02);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.14, h, 0.2);
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
    cart.current!.position.x = 0.92 + Math.sin(t * 0.6) * 0.08 * MOTION;
  });

  return (
    <group ref={root}>
      <group position={[-0.2, 0, -0.45]}>
        <Box m={m.dark} p={[0, 0.72, -0.19]} s={[1.96, 1.44, 0.05]} />
        <Box m={m.dark} p={[-0.98, 0.72, 0]} s={[0.05, 1.44, 0.4]} />
        <Box m={m.dark} p={[0.98, 0.72, 0]} s={[0.05, 1.44, 0.4]} />
        {SHELF_Y.map((y) => (
          <Box key={y} m={m.body} p={[0, y, 0]} s={[1.92, 0.04, 0.4]} />
        ))}
        <Box m={m.body} p={[0, 1.46, 0]} s={[2.02, 0.05, 0.44]} />
        <instancedMesh ref={items} args={[GEO.box, m.tint, ITEMS.length]} frustumCulled={false} />
        <group ref={beam}>
          <Box m={m.dark} p={[0, 1.53, 0.05]} s={[0.14, 0.09, 0.5]} />
          <Box m={m.glow} p={[0, 0.77, 0.245]} s={[0.014, 1.42, 0.014]} />
          <Box m={m.glow} p={[0, 1.47, 0.245]} s={[0.1, 0.02, 0.03]} />
        </group>
      </group>

      {/* shopping cart */}
      <group ref={cart} position={[0.92, 0, 0.62]} rotation={[0, -0.5, 0]}>
        <Box m={m.wire} p={[0, 0.44, 0]} s={[0.54, 0.3, 0.38]} />
        <Box m={m.body} p={[0, 0.285, 0]} s={[0.54, 0.02, 0.38]} />
        <Limb m={m.dark} a={[-0.27, 0.58, 0.19]} b={[-0.4, 0.74, 0.19]} t={0.022} />
        <Limb m={m.dark} a={[-0.27, 0.58, -0.19]} b={[-0.4, 0.74, -0.19]} t={0.022} />
        <Limb m={m.glow} a={[-0.4, 0.74, -0.2]} b={[-0.4, 0.74, 0.2]} t={0.035} />
        {([[-0.2, -0.15], [0.2, -0.15], [-0.2, 0.15], [0.2, 0.15]] as const).map(([x, z], i) => (
          <group key={i}>
            <Limb m={m.dark} a={[x, 0.28, z]} b={[x, 0.07, z]} t={0.022} />
            <Cyl m={m.dark} p={[x, 0.05, z]} s={[0.1, 0.04, 0.1]} r={[HALF_PI, 0, 0]} />
          </group>
        ))}
        <Box m={m.accA} p={[-0.1, 0.48, 0.03]} s={[0.16, 0.34, 0.16]} r={[0, 0.3, 0.1]} />
        <Box m={m.gold} p={[0.1, 0.44, -0.05]} s={[0.14, 0.24, 0.18]} r={[0, -0.2, 0]} />
        <Cyl m={m.accB} p={[0.12, 0.47, 0.1]} s={[0.1, 0.28, 0.1]} />
      </group>
      <Badge text="T" p={[1.15, 1.75, -0.2]} s={0.44} />
    </group>
  );
}

// ---- Soroco: a process map being mined, with an A/B test ------------------
const NODES: V3[] = [
  [-1.25, 1.1, 0],
  [-0.55, 1.7, -0.15],
  [-0.55, 0.55, 0.15],
  [0.2, 1.98, 0.1],
  [0.2, 1.15, -0.1],
  [0.2, 0.4, 0.1],
  [1.05, 1.1, 0],
];
const EDGES: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6]];

export function Process() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);
  const lens = useRef<THREE.Group>(null);
  const barA = useRef<THREE.Group>(null);
  const barB = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    packets.current!.children.forEach((p, i) => {
      const [a, b] = EDGES[i];
      const f = (t * 0.45 * MOTION + i * 0.37) % 1;
      p.position.set(
        NODES[a][0] + (NODES[b][0] - NODES[a][0]) * f,
        NODES[a][1] + (NODES[b][1] - NODES[a][1]) * f,
        NODES[a][2] + (NODES[b][2] - NODES[a][2]) * f,
      );
    });
    const l = lens.current!;
    l.position.set(Math.sin(t * 0.5) * 0.85 * MOTION, 1.15 + Math.sin(t * 0.8) * 0.5 * MOTION, 0.5);
    barA.current!.scale.y = 0.5 + Math.sin(t * 1.1) * 0.06 * MOTION;
    barB.current!.scale.y = 0.72 + Math.sin(t * 1.1 + 1) * 0.08 * MOTION;
  });

  return (
    <group ref={root}>
      {EDGES.map(([a, b], i) => (
        <Limb key={i} m={m.sky} a={NODES[a]} b={NODES[b]} t={0.022} />
      ))}
      <Ball m={m.accA} p={NODES[0]} s={0.34} />
      {NODES.slice(1, 6).map((p, i) => (
        <group key={i} position={p}>
          <Box m={m.body} s={[0.36, 0.26, 0.2]} />
          <Box m={i % 2 ? m.core : m.glow} p={[0, 0, 0.105]} s={[0.22, 0.04, 0.01]} />
        </group>
      ))}
      <mesh geometry={GEO.oct} material={m.gold} position={NODES[6]} scale={0.42} />
      <group ref={packets}>
        {EDGES.map((_, i) => (
          <Ball key={i} m={m.glow} s={0.085} />
        ))}
      </group>

      {/* magnifier roaming over the map */}
      <group ref={lens} position={[0, 1.15, 0.5]}>
        <mesh geometry={GEO.hoop} material={m.body} scale={0.3} />
        <Limb m={m.dark} a={[0.22, -0.22, 0]} b={[0.42, -0.44, 0]} t={0.05} />
      </group>

      {/* A/B test: variant B wins */}
      <group position={[0.95, 0, 0.75]}>
        <Box m={m.dark} p={[0, 0.03, 0]} s={[0.62, 0.06, 0.34]} />
        <group ref={barA} position={[-0.14, 0.06, 0]}>
          <Box m={m.accC} p={[0, 0.5, 0]} s={[0.2, 1, 0.2]} />
        </group>
        <group ref={barB} position={[0.14, 0.06, 0]}>
          <Box m={m.glow} p={[0, 0.5, 0]} s={[0.2, 1, 0.2]} />
        </group>
      </group>
      <Badge text="S" p={[-1.2, 2.1, 0]} s={0.44} />
    </group>
  );
}

// ---- TCS: server racks feeding a cloud and a data store --------------------
const RACK_X = [-0.95, -0.35, 0.25];
const LED_ROWS = 7;
const LED_COUNT = RACK_X.length * LED_ROWS;
const UPLINKS = 9;
const CLOUD: V3 = [0.8, 2.0, 0.1];

export function CloudOps() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const leds = useRef<THREE.InstancedMesh>(null);
  const cloud = useRef<THREE.Group>(null);
  const uplinks = useRef<THREE.Group>(null);
  const beads = useRef<THREE.Group>(null);
  const tick = useRef(-1);
  const rand = useMemo(() => seeded(53), []);
  const tones = useMemo(() => [new THREE.Color(c.glow), new THREE.Color(c.core), new THREE.Color(c.screen)], [c]);

  useLayoutEffect(() => {
    const im = leds.current!;
    let i = 0;
    RACK_X.forEach((x) => {
      for (let row = 0; row < LED_ROWS; row++) {
        dummy.position.set(x, 0.24 + row * 0.17, -0.094);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(0.34, 0.04, 0.012);
        dummy.updateMatrix();
        im.setColorAt(i, UNLIT);
        im.setMatrixAt(i++, dummy.matrix);
      }
    });
    im.instanceMatrix.needsUpdate = true;
  }, []);

  useLive(root, (t) => {
    // Activity lights change a few times a second, not every frame.
    const step = Math.floor(t * 6);
    if (step !== tick.current) {
      tick.current = step;
      const im = leds.current!;
      for (let i = 0; i < LED_COUNT; i++) {
        const r = rand();
        im.setColorAt(i, r < 0.66 ? tones[0] : r < 0.86 ? tones[1] : tones[2]);
      }
      im.instanceColor!.needsUpdate = true;
    }

    cloud.current!.position.y = CLOUD[1] + Math.sin(t * 0.9) * 0.05 * MOTION;

    // Data lifts from the racks into the cloud along an arc.
    uplinks.current!.children.forEach((p, i) => {
      const f = (t * 0.4 * MOTION + i / UPLINKS) % 1;
      const x0 = RACK_X[i % RACK_X.length];
      const g = 1 - f;
      p.position.set(
        g * g * x0 + 2 * g * f * x0 + f * f * CLOUD[0],
        g * g * 1.48 + 2 * g * f * 2.15 + f * f * (CLOUD[1] - 0.12),
        g * g * -0.35 + 2 * g * f * -0.1 + f * f * CLOUD[2],
      );
      p.scale.setScalar(0.07 * Math.sin(f * Math.PI) + 0.015);
    });
    beads.current!.children.forEach((p, i) => {
      const f = (t * 0.5 * MOTION + i / 3) % 1;
      p.position.set(0.5 + 0.4 * f, 0.36, -0.3 + 0.7 * f);
    });
  });

  return (
    <group ref={root}>
      {RACK_X.map((x) => (
        <group key={x} position={[x, 0, -0.35]}>
          <Box m={m.dark} p={[0, 0.7, 0]} s={[0.46, 1.4, 0.5]} />
          <Box m={m.body} p={[0, 1.42, 0]} s={[0.5, 0.04, 0.54]} />
          <Box m={m.body} p={[0, 0.02, 0]} s={[0.5, 0.04, 0.54]} />
        </group>
      ))}
      <instancedMesh ref={leds} args={[GEO.box, m.lamp, LED_COUNT]} />

      <group ref={cloud} position={CLOUD}>
        <Ball m={m.body} s={0.6} />
        <Ball m={m.body} p={[-0.36, -0.07, 0]} s={0.44} />
        <Ball m={m.body} p={[0.36, -0.08, 0]} s={0.42} />
        <Ball m={m.body} p={[0.1, 0.16, -0.1]} s={0.42} />
        <Ball m={m.body} p={[-0.14, -0.1, 0.12]} s={0.4} />
      </group>
      <group ref={uplinks}>
        {Array.from({ length: UPLINKS }, (_, i) => (
          <Box key={i} m={i % 3 === 0 ? m.core : m.glow} s={0.07} />
        ))}
      </group>

      {/* pipeline into the data store */}
      <Limb m={m.body} a={[0.48, 0.3, -0.32]} b={[0.92, 0.3, 0.42]} t={0.07} />
      <group ref={beads}>
        <Ball m={m.glow} s={0.07} />
        <Ball m={m.glow} s={0.07} />
        <Ball m={m.glow} s={0.07} />
      </group>
      <group position={[1.05, 0, 0.6]}>
        {[0.1, 0.31, 0.52].map((y) => (
          <Cyl key={y} m={m.accB} p={[0, y, 0]} s={[0.52, 0.17, 0.52]} />
        ))}
        <Ring m={m.glow} p={[0, 0.205, 0]} s={0.262} />
        <Ring m={m.glow} p={[0, 0.415, 0]} s={0.262} />
      </group>
      <Cone m={m.glow} p={[CLOUD[0], CLOUD[1] - 0.42, CLOUD[2]]} s={[0.12, 0.14, 0.12]} />
      <Badge text="T" p={[-0.35, 1.9, -0.35]} s={0.44} />
    </group>
  );
}
