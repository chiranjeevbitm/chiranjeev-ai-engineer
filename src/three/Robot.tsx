// The guide character. It greets you on the hero, hands the stage over to the
// dioramas while you read, and comes back to wave goodbye at the contact card.
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { stage } from "./input";
import { GEO, MOTION, clamp, damp, smooth, stagePos, useColors, useLive, useMats } from "./kit";

const GREETING = 3.2; // seconds of waving after the scene first appears
// Eye size: a soft oval, a little taller than wide. Blinking and smiling scale
// the height from this base; they never replace it.
const EYE_W = 0.2;
const EYE_H = 0.24;

export default function Robot() {
  const m = useMats();
  const c = useColors();
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
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
  const state = useRef({ blinkAt: 2.5, blinkStart: -1, wave: 0, born: -1 });

  // A handful of materials and three rounded boxes for the whole character.
  const mats = useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({ metalness: 0.55, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15 }),
      dark: new THREE.MeshStandardMaterial({ color: "#1a2238", metalness: 0.6, roughness: 0.35 }),
      visor: new THREE.MeshPhysicalMaterial({ color: "#060a16", metalness: 0.9, roughness: 0.08, clearcoat: 1 }),
      flame: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.75, toneMapped: false }),
    }),
    [],
  );
  const geos = useMemo(
    () => ({
      torso: new RoundedBoxGeometry(1.15, 0.95, 0.75, 4, 0.22),
      head: new RoundedBoxGeometry(1.55, 1.25, 1.25, 5, 0.3),
      visor: new RoundedBoxGeometry(1.22, 0.78, 0.14, 3, 0.07),
    }),
    [],
  );
  useEffect(() => () => Object.values(geos).forEach((g) => g.dispose()), [geos]);
  useLayoutEffect(() => {
    mats.shell.color.set(c.shell);
    mats.flame.color.set(c.glow);
  }, [mats, c]);
  useEffect(() => () => Object.values(mats).forEach((mat) => mat.dispose()), [mats]);

  useLive(root, (t, dt) => {
    const st = state.current;
    if (st.born < 0) st.born = t;

    // The turntable under the robot keeps turning with the page; the robot
    // itself stays facing the reader.
    root.current!.rotation.y = -stagePos.yaw * 0.85;

    const b = body.current!;
    b.position.y = Math.sin(t * 1.2) * 0.07 * MOTION;
    // Lean into the direction of travel while the page is moving.
    b.rotation.x = damp(b.rotation.x, clamp(smooth.vel * 0.07, -0.28, 0.28) * MOTION, 6, dt);

    const dx = smooth.x - stagePos.ndcX;
    const dy = smooth.y - (stagePos.ndcY + 0.15);

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

    // Waving: on arrival, and for as long as the contact card is in view.
    const waving = stage.active === "contact" || t - st.born < GREETING;
    st.wave = damp(st.wave, waving ? 1 : 0, 5, dt);
    const w = st.wave;
    // Eyes narrow into a smile while waving.
    const eyeH = EYE_H * lid * (1 - w * 0.35);
    eyeL.current!.scale.y = eyeH;
    eyeR.current!.scale.y = eyeH;

    // Torso follows the head with a lag.
    const tr = torso.current!;
    tr.rotation.y = damp(tr.rotation.y, h.rotation.y * 0.35, 4, dt);
    tr.rotation.z = damp(tr.rotation.z, clamp(-dx * 0.04, -0.06, 0.06) - w * 0.05, 4, dt);

    // Secondary motion: antenna whips against the head's turning speed.
    antenna.current!.rotation.z = damp(
      antenna.current!.rotation.z,
      clamp(-yawVel * 0.05, -0.6, 0.6) + Math.sin(t * 2.1) * 0.04 * MOTION,
      9,
      dt,
    );

    armL.current!.rotation.z = (0.14 + Math.sin(t * 1.3) * 0.05 * MOTION) * (1 - w) + (2.45 + Math.sin(t * 7) * 0.33) * w;
    armR.current!.rotation.z = -0.14 - Math.sin(t * 1.3 + 1.2) * 0.05 * MOTION;

    // Rings and thruster pick up speed with the scroll.
    const rush = 1 + Math.min(3, Math.abs(smooth.vel) * 1.4);
    ring1.current!.rotation.x += dt * 0.6 * MOTION * rush;
    ring1.current!.rotation.y += dt * 0.25 * MOTION * rush;
    ring2.current!.rotation.y += dt * 0.45 * MOTION * rush;
    ring2.current!.rotation.z -= dt * 0.2 * MOTION * rush;

    chest.current!.scale.setScalar(0.26 * (1 + Math.sin(t * 3) * 0.1 * MOTION));
    flame.current!.scale.y = 0.5 * (0.8 + rush * 0.2 + Math.sin(t * 18) * 0.12 * MOTION);
  });

  return (
    <group ref={root} position={[0, 1.52, 0]} scale={0.74}>
      <group ref={body}>
        {/* torso */}
        <group ref={torso} position={[0, -0.45, 0]}>
          <mesh geometry={geos.torso} material={mats.shell} />
          <mesh ref={chest} geometry={GEO.disc} material={m.core} position={[0, 0.02, 0.39]} scale={0.26} />
          <mesh geometry={GEO.hoop} material={m.glow} position={[0, 0.02, 0.385]} scale={0.185} />
          {/* arms */}
          <group ref={armL} position={[0.74, 0.28, 0]}>
            <mesh geometry={GEO.sphere} material={mats.dark} scale={0.34} />
            <mesh geometry={GEO.capsule} material={mats.shell} position={[0.03, -0.38, 0]} scale={[0.2, 0.3, 0.2]} />
          </group>
          <group ref={armR} position={[-0.74, 0.28, 0]}>
            <mesh geometry={GEO.sphere} material={mats.dark} scale={0.34} />
            <mesh geometry={GEO.capsule} material={mats.shell} position={[-0.03, -0.38, 0]} scale={[0.2, 0.3, 0.2]} />
          </group>
          {/* thruster */}
          <mesh
            ref={flame}
            geometry={GEO.cone}
            material={mats.flame}
            position={[0, -0.78, 0]}
            rotation={[Math.PI, 0, 0]}
            scale={[0.48, 0.5, 0.48]}
          />
        </group>

        {/* neck */}
        <mesh geometry={GEO.cyl} material={mats.dark} position={[0, 0.1, 0]} scale={[0.36, 0.2, 0.36]} />

        {/* head */}
        <group ref={head} position={[0, 0.85, 0]}>
          <mesh geometry={geos.head} material={mats.shell} />
          <mesh geometry={geos.visor} material={mats.visor} position={[0, 0.02, 0.6]} />
          <group ref={eyes} position={[0, 0.06, 0.685]}>
            <mesh ref={eyeL} geometry={GEO.sphere} material={m.glow} position={[-0.27, 0, 0]} scale={[EYE_W, EYE_H, 0.08]} />
            <mesh ref={eyeR} geometry={GEO.sphere} material={m.glow} position={[0.27, 0, 0]} scale={[EYE_W, EYE_H, 0.08]} />
            <mesh geometry={GEO.arc} material={m.glow} position={[0, -0.25, 0]} rotation={[0, 0, Math.PI]} scale={0.12} />
          </group>
          {/* ears */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              geometry={GEO.cyl}
              material={m.core}
              position={[side * 0.82, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.4, 0.16, 0.4]}
            />
          ))}
          {/* antenna */}
          <group ref={antenna} position={[0, 0.62, 0]}>
            <mesh geometry={GEO.cyl} material={mats.dark} position={[0, 0.2, 0]} scale={[0.04, 0.4, 0.04]} />
            <mesh geometry={GEO.sphere} material={m.glow} position={[0, 0.46, 0]} scale={0.14} />
          </group>
        </group>

        {/* orbit rings */}
        <mesh ref={ring1} geometry={GEO.ring} material={m.glow} position={[0, 0.2, 0]} rotation={[1.2, 0, 0]} scale={1.55} />
        <mesh ref={ring2} geometry={GEO.ring} material={m.ring2} position={[0, 0.2, 0]} rotation={[0.3, 0, 0.5]} scale={1.9} />
      </group>
    </group>
  );
}
