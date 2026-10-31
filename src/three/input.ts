// Shared, mutable input state read every frame by the 3D scene.
// Kept outside React state on purpose: pointer and scroll events fire far more
// often than we want to re-render, and the scene only needs the latest value.
export const input = {
  px: 0, // pointer x, -1 (left) .. 1 (right)
  py: 0, // pointer y, -1 (bottom) .. 1 (top)
  scroll: 0, // scroll progress of the page, 0 .. 1
  lastMove: 0, // performance.now() of the last pointer movement
};

export function bindInput(scrollEl: HTMLElement | null) {
  const onMove = (e: PointerEvent) => {
    input.px = (e.clientX / window.innerWidth) * 2 - 1;
    input.py = -((e.clientY / window.innerHeight) * 2 - 1);
    input.lastMove = performance.now();
  };
  const onScroll = () => {
    if (!scrollEl) return;
    const max = scrollEl.scrollHeight - scrollEl.clientHeight;
    input.scroll = max > 0 ? Math.min(1, Math.max(0, scrollEl.scrollTop / max)) : 0;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  scrollEl?.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener("pointermove", onMove);
    scrollEl?.removeEventListener("scroll", onScroll);
  };
}
