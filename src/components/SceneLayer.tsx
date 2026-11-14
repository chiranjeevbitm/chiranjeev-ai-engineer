import { lazy, Suspense, useEffect, useState } from "react";
import { bindInput, onStageChange, stage, type SceneId } from "../three/input";

// three.js and react-three-fiber are only downloaded when 3D mode is switched on.
const Scene3D = lazy(() => import("../three/Scene3D"));

// What the stage is showing, in words. The hero needs no caption.
const CAPTIONS: Record<SceneId, string> = {
  hero: "",
  agents: "Multi-agent systems · RAG · MCP",
  impact: "Impact by the numbers",
  office: "Deloitte · GenAI consulting",
  retail: "Tredence · Retail item matching",
  process: "Soroco · Process mining and A/B tests",
  cloud: "TCS · Cloud services and data pipelines",
  education: "Education",
  skills: "Technical arsenal",
  certs: "Certifications",
  awards: "Awards",
  presence: "Writing and reach",
  projects: "Projects shipped",
  github: "Open source",
  contact: "Let's build something",
};

export default function SceneLayer() {
  const [active, setActive] = useState<SceneId>(stage.active);

  useEffect(() => {
    let unbind: (() => void) | undefined;
    const unsub = onStageChange(setActive);
    const attach = () => {
      const el = document.querySelector<HTMLElement>("[data-scroll-root]");
      unbind = bindInput(el);
    };
    // The scroll container mounts in the same commit, but wait a frame to be safe.
    const raf = requestAnimationFrame(attach);
    return () => {
      cancelAnimationFrame(raf);
      unbind?.();
      unsub();
    };
  }, []);

  const caption = CAPTIONS[active];

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
      {/* Names the backdrop beside the content. Only shown where the stage has its own column. */}
      <div aria-hidden className="stage-caption hidden lg:flex">
        <span key={active} className={caption ? "stage-caption-chip" : "hidden"}>
          {caption}
        </span>
      </div>
    </>
  );
}
