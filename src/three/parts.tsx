// Small mesh components the dioramas are assembled from. They all reuse the
// shared unit geometries and materials from kit.ts.
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stage, type SceneId } from "./input";
import { GEO, MOTION, damp, letterTexture, useColors, useLive, useMats, type V3 } from "./kit";

type Size = number | V3;
interface PartProps {
  m: THREE.Material;
  p?: V3;
  s?: Size;
  r?: V3;
}

const ZERO: V3 = [0, 0, 0];

export function Box({ m, p = ZERO, s = 1, r = ZERO }: PartProps) {
  return <mesh geometry={GEO.box} material={m} position={p} scale={s} rotation={r} />;
}

export function Cyl({ m, p = ZERO, s = 1, r = ZERO }: PartProps) {
  return <mesh geometry={GEO.cyl} material={m} position={p} scale={s} rotation={r} />;
}

export function Ball({ m, p = ZERO, s = 1, r = ZERO }: PartProps) {
  return <mesh geometry={GEO.sphere} material={m} position={p} scale={s} rotation={r} />;
}

export function Cone({ m, p = ZERO, s = 1, r = ZERO }: PartProps) {
  return <mesh geometry={GEO.cone} material={m} position={p} scale={s} rotation={r} />;
}

/** Any of the shared unit geometries, for the shapes without a shorthand above. */
export function Part({ g, m, p = ZERO, s = 1, r = ZERO }: PartProps & { g: THREE.BufferGeometry }) {
  return <mesh geometry={g} material={m} position={p} scale={s} rotation={r} />;
}

/** A thin ring lying flat (or rotated with `r`); `s` is its radius. */
export function Ring({ m, p = ZERO, s = 1, r = [Math.PI / 2, 0, 0] }: PartProps) {
  return <mesh geometry={GEO.ring} material={m} position={p} scale={s} rotation={r} />;
}

const UP = new THREE.Vector3(0, 1, 0);

/** A rod between two points: limbs, table legs, graph edges. `t` is its thickness. */
export function Limb({ m, a, b, t = 0.04, square = false }: { m: THREE.Material; a: V3; b: V3; t?: number; square?: boolean }) {
  const { pos, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const length = dir.length();
    return {
      pos: va.add(vb).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize()),
      len: length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a[0], a[1], a[2], b[0], b[1], b[2]]);
  return (
    <mesh geometry={square ? GEO.box : GEO.cyl} material={m} position={pos} quaternion={quat} scale={[t, len, t]} />
  );
}

/** A round plaque with a letter on it: the company initial, as on the timeline. */
export function Badge({ text, p = ZERO, s = 0.5, sway = true }: { text: string; p?: V3; s?: number; sway?: boolean }) {
  const m = useMats();
  const c = useColors();
  const ref = useRef<THREE.Group>(null);
  const tex = useMemo(() => letterTexture(text), [text]);
  useEffect(() => () => tex.dispose(), [tex]);

  useLive(ref, (t) => {
    if (!sway) return;
    ref.current!.rotation.y = Math.sin(t * 0.8) * 0.45 * MOTION;
    ref.current!.position.y = p[1] + Math.sin(t * 1.3) * 0.03 * MOTION;
  });

  return (
    <group ref={ref} position={p} scale={s}>
      <Cyl m={m.dark} s={[1, 0.1, 1]} r={[Math.PI / 2, 0, 0]} />
      <Ring m={m.glow} p={[0, 0, 0.055]} s={0.5} r={ZERO} />
      <mesh geometry={GEO.plane} position={[0, 0, 0.06]} scale={0.78}>
        <meshBasicMaterial map={tex} color={c.glow} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

/**
 * Holds one diorama on the stage. Only the active one is visible; the others
 * are hidden (not unmounted), so switching never allocates or compiles
 * anything. Scrolling down, the old diorama lifts away and the new one rises
 * from below; scrolling up runs it the other way round.
 */
export function Slot({ id, children }: { id: SceneId | SceneId[]; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const vis = useRef(0);

  useFrame((_, rawDt) => {
    const g = ref.current!;
    const dt = Math.min(rawDt, 0.05);
    const on = typeof id === "string" ? stage.active === id : id.includes(stage.active);
    vis.current = damp(vis.current, on ? 1 : 0, on ? 6.5 : 11, dt);
    const v = vis.current;
    if (!on && v < 0.004) {
      g.visible = false;
      return;
    }
    g.visible = true;
    const e = v * v * (3 - 2 * v);
    const away = (on ? -1 : 1) * stage.dir * (1 - e);
    g.scale.setScalar(Math.max(e, 0.0001));
    g.position.y = away * 1.5 * MOTION;
    g.rotation.y = away * 0.9 * MOTION;
  });

  return (
    <group ref={ref} visible={false}>
      {children}
    </group>
  );
}
