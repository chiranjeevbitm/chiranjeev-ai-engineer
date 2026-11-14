// Shared, mutable input state read every frame by the 3D scene.
// Kept outside React state on purpose: pointer and scroll events fire far more
// often than we want to re-render, and the scene only needs the latest value.

/** One 3D backdrop per piece of content. Elements opt in with `data-scene="<id>"`. */
export type SceneId =
  | "hero"
  | "agents"
  | "impact"
  | "office"
  | "retail"
  | "process"
  | "cloud"
  | "education"
  | "skills"
  | "certs"
  | "awards"
  | "presence"
  | "projects"
  | "github"
  | "contact";

export const input = {
  px: 0, // pointer x, -1 (left) .. 1 (right)
  py: 0, // pointer y, -1 (bottom) .. 1 (top)
  scroll: 0, // scroll progress of the page, 0 .. 1
  scrollPx: 0, // scroll offset in pixels
  viewH: 1, // height of the scroll viewport in pixels
  lastMove: 0, // performance.now() of the last pointer movement
};

/** What the page is showing right now, as far as the 3D stage is concerned. */
export const stage = {
  active: "hero" as SceneId, // backdrop for the content currently in focus
  progress: 0.5, // how far the reader is through that content, 0 .. 1
  dir: 1, // last scroll direction: 1 down, -1 up
};

interface Anchor {
  el: HTMLElement;
  id: SceneId;
  rank: number; // 0 = section-wide fallback, 1 = a specific card
  top: number; // offsets inside the scroll content, in pixels
  bottom: number;
}

const HOVER_DELAY = 260; // ms the pointer must rest on a card before it takes over
const CARD_REACH = 0.4; // viewport heights within which a card beats its section's backdrop
const REMEASURE_EVERY = 600; // ms between re-measures while scrolling (entry animations shift cards)

type StageListener = (id: SceneId) => void;
const listeners = new Set<StageListener>();

/** Calls back whenever a different backdrop takes the stage. Returns an unsubscribe. */
export function onStageChange(cb: StageListener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function setActive(id: SceneId, scrollEl: HTMLElement | null) {
  if (id === stage.active) return;
  stage.active = id;
  if (scrollEl) scrollEl.dataset.activeScene = id;
  listeners.forEach((cb) => cb(id));
}

export function bindInput(scrollEl: HTMLElement | null) {
  let anchors: Anchor[] = [];
  let measureRaf = 0;
  let hover: Anchor | null = null;
  let hoverScroll = 0;
  let pendingEl: Element | null = null;
  let hoverTimer = 0;
  let lastMeasure = 0;

  // The scene follows whatever sits on the horizontal middle of the viewport.
  // Anchor positions are cached, so a scroll event costs a few comparisons and
  // never forces a layout.
  const pick = () => {
    if (!scrollEl) return;
    const top = scrollEl.scrollTop;
    const focus = top + input.viewH * 0.5;

    // The nearest card wins (distance 0 when it is under the focus line, and
    // the earlier one on a tie). A section's own backdrop only shows where no
    // card is within reach, so the short gaps between cards never flash it.
    let card: Anchor | undefined;
    let cardDist = Infinity;
    let section: Anchor | undefined;
    for (const a of anchors) {
      const d = focus < a.top ? a.top - focus : focus > a.bottom ? focus - a.bottom : 0;
      if (a.rank === 0) {
        if (d === 0) section = a;
      } else if (d < cardDist) {
        cardDist = d;
        card = a;
      }
    }
    let best = card && (!section || cardDist <= input.viewH * CARD_REACH) ? card : (section ?? card);

    // A card the pointer is resting on wins while it stays on screen.
    if (hover) {
      const onScreen = hover.bottom > top && hover.top < top + input.viewH;
      if (onScreen && Math.abs(top - hoverScroll) < input.viewH * 0.2) best = hover;
      else hover = null;
    }
    if (!best) return;

    const span = Math.max(1, best.bottom - best.top);
    stage.progress = Math.min(1, Math.max(0, (focus - best.top) / span));
    setActive(best.id, scrollEl);
  };

  const measure = () => {
    measureRaf = 0;
    lastMeasure = performance.now();
    if (!scrollEl) return;
    const rootTop = scrollEl.getBoundingClientRect().top;
    const top = scrollEl.scrollTop;
    const next: Anchor[] = [];
    scrollEl.querySelectorAll<HTMLElement>("[data-scene]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 1) return;
      next.push({
        el,
        id: el.dataset.scene as SceneId,
        rank: el.dataset.sceneRank === "0" ? 0 : 1,
        top: r.top - rootTop + top,
        bottom: r.bottom - rootTop + top,
      });
    });
    anchors = next;
    if (hover) hover = anchors.find((a) => a.el === hover!.el) ?? null;
    input.viewH = Math.max(1, scrollEl.clientHeight);
    onScroll();
  };
  const queueMeasure = () => {
    if (!measureRaf) measureRaf = requestAnimationFrame(measure);
  };

  const onScroll = () => {
    if (!scrollEl) return;
    const top = scrollEl.scrollTop;
    const max = scrollEl.scrollHeight - scrollEl.clientHeight;
    if (Math.abs(top - input.scrollPx) > 0.5) stage.dir = top > input.scrollPx ? 1 : -1;
    input.scrollPx = top;
    input.scroll = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;
    pick();
    if (performance.now() - lastMeasure > REMEASURE_EVERY) queueMeasure();
  };

  const onMove = (e: PointerEvent) => {
    input.px = (e.clientX / window.innerWidth) * 2 - 1;
    input.py = -((e.clientY / window.innerHeight) * 2 - 1);
    input.lastMove = performance.now();

    if (e.pointerType !== "mouse" || !scrollEl) return;
    const target = e.target instanceof Element ? e.target.closest("[data-scene]") : null;
    if (target === pendingEl) return;
    pendingEl = target;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => {
      const a = anchors.find((x) => x.el === pendingEl);
      hover = a && a.rank > 0 ? a : null;
      hoverScroll = scrollEl.scrollTop;
      pick();
    }, HOVER_DELAY);
  };

  // Cards open, close and reflow; re-measure whenever the content changes size.
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queueMeasure) : null;
  if (scrollEl && ro) {
    ro.observe(scrollEl);
    const content = scrollEl.querySelector("[data-scroll-content]") ?? scrollEl;
    ro.observe(content);
    Array.from(content.children).forEach((c) => ro.observe(c));
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("resize", queueMeasure, { passive: true });
  scrollEl?.addEventListener("scroll", onScroll, { passive: true });
  measure();

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", queueMeasure);
    scrollEl?.removeEventListener("scroll", onScroll);
    ro?.disconnect();
    window.clearTimeout(hoverTimer);
    if (measureRaf) cancelAnimationFrame(measureRaf);
    setActive("hero", null);
    if (scrollEl) delete scrollEl.dataset.activeScene;
    stage.progress = 0.5;
  };
}
