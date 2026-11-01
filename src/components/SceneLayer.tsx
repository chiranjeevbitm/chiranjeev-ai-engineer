import { lazy, Suspense, useEffect } from "react";
import { bindInput } from "../three/input";

// three.js and react-three-fiber are only downloaded when 3D mode is switched on.
const Scene3D = lazy(() => import("../three/Scene3D"));

export default function SceneLayer() {
  useEffect(() => {
    let unbind: (() => void) | undefined;
    const attach = () => {
      const el = document.querySelector<HTMLElement>("[data-scroll-root]");
      unbind = bindInput(el);
    };
    // The scroll container mounts in the same commit, but wait a frame to be safe.
    const raf = requestAnimationFrame(attach);
    return () => {
      cancelAnimationFrame(raf);
      unbind?.();
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "var(--scene-bg)" }}
      />
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </>
  );
}
