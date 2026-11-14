// Scrolling helpers shared by the navbar, the page and the 3D scene.
//
// In 3D mode wheel scrolling is eased by Lenis, so the page and the scene
// behind it move with the same inertia. Lenis is only downloaded when 3D mode
// is switched on, and it is stepped from the renderer's frame loop (see
// ScrollSync in three/Scene3D.tsx) rather than from a loop of its own. Touch
// scrolling stays native.
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function scrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-scroll-root]");
}

export function startSmoothScroll(wrapper: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const content = wrapper.querySelector<HTMLElement>("[data-scroll-content]") ?? wrapper;
  let cancelled = false;
  let instance: Lenis | null = null;

  import("lenis").then(({ default: LenisCtor }) => {
    if (cancelled) return;
    instance = new LenisCtor({
      wrapper,
      content,
      lerp: 0.14, // higher than the default 0.1: quicker to settle, still eased
      wheelMultiplier: 1.05,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    lenis = instance;
  });

  return () => {
    cancelled = true;
    instance?.destroy();
    if (lenis === instance) lenis = null;
  };
}

/** Advances the eased scroll by one frame. `time` is a requestAnimationFrame timestamp. */
export function tickSmoothScroll(time: number) {
  lenis?.raf(time);
}

/** Scrolls the page to an element or an offset, eased when 3D mode is on. */
export function scrollPageTo(target: HTMLElement | number, offset = 0) {
  const root = scrollRoot();
  if (!root) return;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop + offset;
  root.scrollTo({ top, behavior: "smooth" });
}

/**
 * Scrolls to one of the page sections by id. Each section already pads its own
 * top to clear the fixed navbar, so the section edge goes to the top of the view.
 */
export function scrollToSection(id: string): boolean {
  const el = scrollRoot()?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
  if (!el) return false;
  scrollPageTo(el);
  window.history.replaceState(null, "", `#${id}`);
  return true;
}
