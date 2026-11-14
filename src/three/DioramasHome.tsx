// Backdrops for the home section: the multi-agent work described in the About
// card, the impact numbers, education and certifications.
// Floor is y = 0; everything fits inside a radius of about 1.7.
import { useRef } from "react";
import * as THREE from "three";
import { GEO, MOTION, clamp, smooth, smoothstep, useLive, useMats, type V3 } from "./kit";
import { Ball, Box, Cone, Cyl, Limb, Part, Ring } from "./parts";

const HALF_PI = Math.PI / 2;
const TAU = Math.PI * 2;

// ---- About: an orchestrator routing work to the agents around it -----------
const AGENT_COUNT = 6;
const HUB: V3 = [0, 1.42, 0];
const AGENTS = Array.from({ length: AGENT_COUNT }, (_, i) => {
  const a = (i / AGENT_COUNT) * TAU;
  return { a, p: [Math.cos(a) * 1.22, 1.42 + (i % 2 ? 0.4 : -0.32), Math.sin(a) * 1.22] as V3 };
});
const FEEDS: V3[] = [
  [-1.0, 0.24, 0.72],
  [1.0, 0.5, 0.72],
];

export function Agents() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const cage = useRef<THREE.Mesh>(null);
  const packets = useRef<THREE.Group>(null);
  const feeds = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    // The ring of agents turns as you read further into the card.
    orbit.current!.rotation.y = t * 0.22 * MOTION + smooth.progress * 2.4;
    core.current!.rotation.set(t * 0.5, t * 0.8, 0);
    core.current!.scale.setScalar(0.5 + Math.sin(t * 2.4) * 0.035 * MOTION);
    cage.current!.rotation.set(0, -t * 0.3, t * 0.2);

    // Tasks go out along each spoke and results come back.
    packets.current!.children.forEach((p, i) => {
      const f0 = (t * 0.5 * MOTION + i * 0.29) % 1;
      const f = i % 2 ? 1 - f0 : f0;
      const to = AGENTS[i % AGENT_COUNT].p;
      p.position.set(HUB[0] + (to[0] - HUB[0]) * f, HUB[1] + (to[1] - HUB[1]) * f, HUB[2] + (to[2] - HUB[2]) * f);
    });

    // Retrieved context lifts from the document stack and the data store.
    feeds.current!.children.forEach((p, i) => {
      const from = FEEDS[i % FEEDS.length];
      const f = (t * 0.42 * MOTION + i * 0.25) % 1;
      const g = 1 - f;
      p.position.set(
        g * g * from[0] + 2 * g * f * from[0] * 0.5 + f * f * HUB[0],
        g * g * from[1] + 2 * g * f * 1.5 + f * f * (HUB[1] - 0.3),
        g * g * from[2] + 2 * g * f * from[2] * 0.6 + f * f * HUB[2],
      );
      p.scale.setScalar(0.07 * Math.sin(f * Math.PI) + 0.02);
    });
  });

  return (
    <group ref={root}>
      {/* plinth and the orchestrator core */}
      <Cyl m={m.dark} p={[0, 0.06, 0]} s={[0.8, 0.12, 0.8]} />
      <Cyl m={m.body} p={[0, 0.4, 0]} s={[0.3, 0.56, 0.3]} />
      <Ring m={m.glow} p={[0, 0.13, 0]} s={0.42} />
      <Limb m={m.glow} a={[0, 0.68, 0]} b={[0, 1.02, 0]} t={0.03} />
      <mesh ref={core} geometry={GEO.ico1} material={m.glow} position={HUB} scale={0.5} />
      <mesh ref={cage} geometry={GEO.ico1} material={m.wire} position={HUB} scale={0.84} />

      <group ref={orbit}>
        {AGENTS.map(({ a, p }, i) => (
          <group key={i}>
            <Limb m={m.sky} a={HUB} b={p} t={0.018} />
            <group position={p} rotation={[0, HALF_PI - a, 0]}>
              <Box m={m.body} s={[0.32, 0.28, 0.28]} />
              <Box m={i % 3 === 0 ? m.core : m.glow} p={[0, 0.02, 0.145]} s={[0.22, 0.07, 0.01]} />
              <Limb m={m.dark} a={[0, 0.14, 0]} b={[0, 0.26, 0]} t={0.02} />
              <Ball m={i % 3 === 0 ? m.core : m.glow} p={[0, 0.28, 0]} s={0.06} />
            </group>
          </group>
        ))}
        <group ref={packets}>
          {AGENTS.map((_, i) => (
            <Ball key={i} m={i % 3 === 0 ? m.core : m.glow} s={0.08} />
          ))}
        </group>
        <Ring m={m.ring2} p={[0, 1.42, 0]} s={1.22} />
      </group>

      {/* knowledge the agents retrieve from: documents and a data store */}
      <group position={[-1.0, 0, 0.72]} rotation={[0, 0.35, 0]}>
        <Box m={m.body} p={[0, 0.03, 0]} s={[0.5, 0.05, 0.66]} r={[0, 0.12, 0]} />
        <Box m={m.accC} p={[0, 0.09, 0]} s={[0.5, 0.05, 0.66]} r={[0, -0.1, 0]} />
        <Box m={m.body} p={[0, 0.15, 0]} s={[0.5, 0.05, 0.66]} r={[0, 0.05, 0]} />
        <Box m={m.glow} p={[-0.04, 0.18, -0.14]} s={[0.3, 0.008, 0.035]} r={[0, 0.05, 0]} />
        <Box m={m.core} p={[-0.08, 0.18, 0]} s={[0.22, 0.008, 0.035]} r={[0, 0.05, 0]} />
        <Box m={m.glow} p={[-0.02, 0.18, 0.14]} s={[0.34, 0.008, 0.035]} r={[0, 0.05, 0]} />
      </group>
      <group position={[1.0, 0, 0.72]}>
        {[0.09, 0.27, 0.45].map((y) => (
          <Cyl key={y} m={m.accB} p={[0, y, 0]} s={[0.5, 0.15, 0.5]} />
        ))}
        <Ring m={m.glow} p={[0, 0.18, 0]} s={0.252} />
        <Ring m={m.glow} p={[0, 0.36, 0]} s={0.252} />
      </group>
      <group ref={feeds}>
        {[0, 1, 2, 3].map((i) => (
          <Box key={i} m={i % 2 ? m.core : m.glow} s={0.07} />
        ))}
      </group>
    </group>
  );
}

// ---- Impact by the numbers: a chart that grows as you scroll ---------------
const BARS = [0.5, 0.82, 1.12, 1.5, 2.0];
const BAR_X = (i: number) => -0.95 + i * 0.4;
const PAWNS: V3[] = [
  [-1.1, 0, 0.85],
  [-0.82, 0, 0.98],
  [-0.56, 0, 0.82],
  [-0.96, 0, 1.18],
  [-0.66, 0, 1.2],
];

export function Impact() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Group>(null);
  const caps = useRef<THREE.Group>(null);
  const trend = useRef<THREE.Group>(null);
  const coin = useRef<THREE.Group>(null);
  const pawns = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    const reveal = smooth.progress * 1.7 + 0.15;
    bars.current!.children.forEach((bar, i) => {
      const k = smoothstep(reveal - i * 0.13, 0, 0.7);
      const h = Math.max(0.1, BARS[i] * k) * (1 + Math.sin(t * 1.6 + i) * 0.015 * MOTION);
      bar.scale.y = h;
      caps.current!.children[i].position.y = h + 0.025;
    });
    const grown = smoothstep(reveal, 0.75, 1.25);
    trend.current!.scale.setScalar(Math.max(0.001, grown));
    coin.current!.rotation.y = t * 1.6 * MOTION;
    coin.current!.position.y = 0.72 + Math.sin(t * 1.3) * 0.05 * MOTION;
    pawns.current!.children.forEach((p, i) => {
      p.position.y = Math.max(0, Math.sin(t * 2.2 - i * 0.7)) * 0.06 * MOTION;
    });
  });

  return (
    <group ref={root}>
      <Box m={m.dark} p={[-0.15, 0.03, -0.25]} s={[2.3, 0.06, 0.62]} />
      <group ref={bars}>
        {BARS.map((_, i) => (
          <group key={i} position={[BAR_X(i), 0.06, -0.25]}>
            <Box m={i === BARS.length - 1 ? m.accA : m.accB} p={[0, 0.5, 0]} s={[0.28, 1, 0.28]} />
          </group>
        ))}
      </group>
      <group ref={caps} position={[0, 0.06, -0.25]}>
        {BARS.map((_, i) => (
          <Box key={i} m={m.glow} p={[BAR_X(i), 0, 0]} s={[0.29, 0.05, 0.29]} />
        ))}
      </group>

      {/* the trend line appears once the bars are up */}
      <group position={[BAR_X(0), BARS[0] + 0.42, -0.25]}>
        <group ref={trend}>
          {BARS.slice(1).map((h, i) => (
            <Limb
              key={i}
              m={m.gold}
              a={[i * 0.4, BARS[i] - BARS[0], 0]}
              b={[(i + 1) * 0.4, h - BARS[0], 0]}
              t={0.035}
            />
          ))}
          <Cone m={m.gold} p={[1.68, BARS[4] - BARS[0] + 0.1, 0]} s={[0.16, 0.24, 0.16]} r={[0, 0, -0.67]} />
          {BARS.map((h, i) => (
            <Ball key={i} m={m.gold} p={[i * 0.4, h - BARS[0], 0]} s={0.08} />
          ))}
        </group>
      </group>

      {/* pipeline value */}
      <group position={[1.0, 0, 0.85]}>
        {[0.035, 0.105, 0.175].map((y, i) => (
          <Cyl key={y} m={m.gold} p={[i * 0.02, y, i * 0.015]} s={[0.4, 0.06, 0.4]} />
        ))}
        <group ref={coin} position={[0, 0.72, 0]}>
          <Cyl m={m.gold} s={[0.46, 0.05, 0.46]} r={[HALF_PI, 0, 0]} />
          <Ring m={m.glow} p={[0, 0, 0.028]} s={0.16} r={[0, 0, 0]} />
          <Ring m={m.glow} p={[0, 0, -0.028]} s={0.16} r={[0, 0, 0]} />
        </group>
      </group>

      {/* the practitioners trained */}
      <group ref={pawns}>
        {PAWNS.map((p, i) => (
          <group key={i} position={p}>
            <Cone m={i % 2 ? m.accC : m.accA} p={[0, 0.15, 0]} s={[0.17, 0.3, 0.17]} />
            <Ball m={m.body} p={[0, 0.36, 0]} s={0.13} />
          </group>
        ))}
      </group>
    </group>
  );
}

// ---- Education: a campus front, books, and a cap that lifts off ------------
const COLUMNS = [-0.54, -0.18, 0.18, 0.54];

export function Education() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const tassel = useRef<THREE.Group>(null);
  const sparks = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    // The cap is tossed higher the further you read.
    const lift = smoothstep(smooth.progress, 0.15, 0.9);
    const c = cap.current!;
    c.position.y = 0.66 + lift * 0.85 + Math.sin(t * 1.5) * 0.04 * MOTION;
    c.rotation.y = t * 0.5 * MOTION + lift * 2.2;
    c.rotation.z = Math.sin(t * 1.1) * 0.08 * MOTION + lift * 0.18;
    tassel.current!.rotation.z = Math.sin(t * 2.3) * 0.3 * MOTION;
    sparks.current!.rotation.y = -t * 0.6 * MOTION;
    sparks.current!.position.y = c.position.y + 0.05;
  });

  return (
    <group ref={root}>
      {/* campus front */}
      <group position={[0.1, 0, -0.75]}>
        <Box m={m.body} p={[0, 0.05, 0]} s={[1.9, 0.1, 0.62]} />
        <Box m={m.body} p={[0, 0.14, 0.02]} s={[1.66, 0.08, 0.5]} />
        {COLUMNS.map((x) => (
          <group key={x}>
            <Cyl m={m.body} p={[x, 0.72, 0.1]} s={[0.15, 1.08, 0.15]} />
            <Box m={m.dark} p={[x, 0.2, 0.1]} s={[0.2, 0.05, 0.2]} />
            <Box m={m.dark} p={[x, 1.27, 0.1]} s={[0.2, 0.05, 0.2]} />
          </group>
        ))}
        <Box m={m.dark} p={[0, 0.72, -0.14]} s={[1.4, 1.08, 0.06]} />
        <Box m={m.glow} p={[0, 0.5, -0.1]} s={[0.3, 0.6, 0.02]} />
        <Box m={m.body} p={[0, 1.36, 0.04]} s={[1.6, 0.12, 0.46]} />
        <Part g={GEO.prism} m={m.accA} p={[0, 1.62, 0.04]} s={[1.84, 0.44, 0.52]} r={[-HALF_PI, 0, 0]} />
        <Ball m={m.glow} p={[0, 1.6, 0.27]} s={0.14} />
      </group>

      {/* three degrees, three books */}
      <group position={[-0.5, 0, 0.55]} rotation={[0, 0.3, 0]}>
        <Box m={m.accB} p={[0, 0.08, 0]} s={[0.72, 0.16, 0.54]} />
        <Box m={m.body} p={[0.012, 0.08, 0.012]} s={[0.72, 0.11, 0.54]} />
        <Box m={m.accA} p={[0.03, 0.24, 0]} s={[0.66, 0.16, 0.5]} r={[0, 0.2, 0]} />
        <Box m={m.accC} p={[0, 0.4, 0.01]} s={[0.6, 0.16, 0.46]} r={[0, -0.14, 0]} />
        <Box m={m.gold} p={[0, 0.4, 0.236]} s={[0.36, 0.03, 0.012]} r={[0, -0.14, 0]} />
      </group>
      <group ref={cap} position={[-0.5, 0.66, 0.55]}>
        <Cyl m={m.dark} p={[0, 0.07, 0]} s={[0.46, 0.2, 0.46]} />
        <Box m={m.dark} p={[0, 0.19, 0]} s={[0.84, 0.04, 0.84]} r={[0, Math.PI / 4, 0]} />
        <Ball m={m.gold} p={[0, 0.22, 0]} s={0.07} />
        <group ref={tassel} position={[0, 0.22, 0]}>
          <Limb m={m.gold} a={[0, 0, 0]} b={[0.4, -0.02, 0]} t={0.018} />
          <Limb m={m.gold} a={[0.4, -0.02, 0]} b={[0.4, -0.26, 0]} t={0.018} />
          <Cyl m={m.gold} p={[0.4, -0.31, 0]} s={[0.05, 0.12, 0.05]} />
        </group>
      </group>
      <group ref={sparks} position={[-0.5, 0.7, 0.55]}>
        {[0, 1, 2].map((i) => (
          <Part
            key={i}
            g={GEO.oct}
            m={i === 1 ? m.core : m.glow}
            p={[Math.cos((i / 3) * TAU) * 0.72, 0.16 + i * 0.07, Math.sin((i / 3) * TAU) * 0.72]}
            s={0.1}
          />
        ))}
      </group>

      {/* diploma */}
      <group position={[0.9, 0.09, 0.8]} rotation={[0, -0.5, 0]}>
        <Cyl m={m.body} s={[0.17, 0.78, 0.17]} r={[0, 0, HALF_PI]} />
        <Cyl m={m.accA} s={[0.185, 0.1, 0.185]} r={[0, 0, HALF_PI]} />
        <Cyl m={m.gold} p={[0, 0.02, 0.1]} s={[0.12, 0.03, 0.12]} r={[HALF_PI, 0, 0]} />
      </group>
    </group>
  );
}

// ---- Certifications: a medal, the certificate, and badges collected --------
const BADGES = 7;

export function Certs() {
  const m = useMats();
  const root = useRef<THREE.Group>(null);
  const medal = useRef<THREE.Group>(null);
  const star = useRef<THREE.Mesh>(null);
  const badges = useRef<THREE.Group>(null);

  useLive(root, (t) => {
    medal.current!.rotation.y = Math.sin(t * 0.9) * 0.55 * MOTION;
    medal.current!.rotation.z = Math.sin(t * 1.3) * 0.05 * MOTION;
    star.current!.rotation.z = t * 0.8 * MOTION;

    // Badges fall into orbit one by one as you move down the list.
    const earned = clamp(smooth.progress * 1.5 + 0.25, 0, 1) * BADGES;
    const b = badges.current!;
    b.rotation.y = t * 0.3 * MOTION + smooth.progress * 1.6;
    b.children.forEach((badge, i) => {
      const k = smoothstep(earned - i, 0, 1);
      badge.scale.setScalar(Math.max(0.001, k));
      badge.position.y = 1.0 + (i % 3) * 0.34 + (1 - k) * 0.5 + Math.sin(t * 1.4 + i) * 0.04 * MOTION;
      badge.rotation.y = t * 1.1 * MOTION + i;
    });
  });

  return (
    <group ref={root}>
      {/* certificate on an easel */}
      <group position={[-0.35, 0, -0.6]} rotation={[0, 0.25, 0]}>
        <Limb m={m.dark} a={[-0.5, 0, 0.12]} b={[-0.3, 1.9, -0.1]} t={0.045} square />
        <Limb m={m.dark} a={[0.5, 0, 0.12]} b={[0.3, 1.9, -0.1]} t={0.045} square />
        <Limb m={m.dark} a={[0, 0, -0.5]} b={[0, 1.8, -0.12]} t={0.045} square />
        <Box m={m.dark} p={[0, 0.62, 0.08]} s={[1.2, 0.05, 0.1]} />
        <group position={[0, 1.18, 0.04]} rotation={[-0.11, 0, 0]}>
          <Box m={m.gold} s={[1.36, 1.02, 0.03]} />
          <Box m={m.body} p={[0, 0, 0.012]} s={[1.24, 0.9, 0.02]} />
          <Box m={m.accA} p={[0, 0.28, 0.026]} s={[0.66, 0.07, 0.006]} />
          {[0.1, 0, -0.1].map((y, i) => (
            <Box key={y} m={m.dark} p={[0, y, 0.026]} s={[0.92 - i * 0.14, 0.028, 0.006]} />
          ))}
          <Box m={m.dark} p={[-0.28, -0.3, 0.026]} s={[0.36, 0.02, 0.006]} />
          <Cyl m={m.gold} p={[0.36, -0.26, 0.03]} s={[0.22, 0.03, 0.22]} r={[HALF_PI, 0, 0]} />
          <Part g={GEO.oct} m={m.glow} p={[0.36, -0.26, 0.05]} s={[0.1, 0.1, 0.02]} />
        </group>
      </group>

      {/* medal */}
      <group position={[0.75, 1.9, 0.45]}>
        <group ref={medal}>
          <Limb m={m.accA} a={[-0.2, 0.42, 0]} b={[-0.04, -0.12, 0]} t={0.15} square />
          <Limb m={m.accB} a={[0.2, 0.42, 0]} b={[0.04, -0.12, 0]} t={0.15} square />
          <group position={[0, -0.52, 0]}>
            <Part g={GEO.hex} m={m.gold} s={[0.86, 0.07, 0.86]} r={[HALF_PI, 0, 0]} />
            <Cyl m={m.accA} s={[0.62, 0.09, 0.62]} r={[HALF_PI, 0, 0]} />
            <mesh ref={star} geometry={GEO.oct} material={m.glow} scale={[0.34, 0.34, 0.14]} />
          </group>
        </group>
      </group>

      {/* the collection */}
      <group ref={badges}>
        {Array.from({ length: BADGES }, (_, i) => {
          const a = (i / BADGES) * TAU;
          const mat = [m.accB, m.gold, m.accA, m.accC][i % 4];
          return (
            <group key={i} position={[Math.cos(a) * 1.45, 1.0, Math.sin(a) * 1.45]}>
              <Part g={GEO.hex} m={mat} s={[0.3, 0.05, 0.3]} r={[HALF_PI, 0, 0]} />
              <Ball m={m.glow} s={[0.11, 0.11, 0.07]} />
            </group>
          );
        })}
      </group>
      <Ring m={m.ring2} p={[0, 1.0, 0]} s={1.45} />
    </group>
  );
}
