import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PALETTES, useTheme } from "../context/ThemeContext";

const GROUPS = [
  { label: "Light", items: PALETTES.filter((p) => !p.dark) },
  { label: "Dark", items: PALETTES.filter((p) => p.dark) },
];

export default function ThemeToggle() {
  const { palette, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="relative p-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden shadow-md cursor-pointer focus:outline-none flex items-center justify-center"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Choose colour theme"
      >
        <span className="material-symbols-outlined text-[20px] text-[var(--accent)]">palette</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Colour theme"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 z-[60] rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-xl p-1.5"
          >
            {GROUPS.map((group) => (
              <div key={group.label}>
                <div className="px-2.5 pt-2 pb-1 font-label-caps text-label-caps text-[var(--text-muted)]">
                  {group.label}
                </div>
                {group.items.map((p) => {
                  const active = p.id === palette;
                  return (
                    <button
                      key={p.id}
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => setPalette(p.id)}
                      className="w-full !min-h-[40px] flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      style={active ? { background: "color-mix(in srgb, var(--accent) 12%, transparent)" } : undefined}
                    >
                      <span
                        className="w-[18px] h-[18px] rounded-full border border-[var(--border)] shrink-0"
                        style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 55%, ${p.swatch[1]} 55%)` }}
                      />
                      <span className="font-body-md text-sm text-[var(--text)]">{p.label}</span>
                      <span
                        className={`material-symbols-outlined text-[18px] ml-auto text-[var(--accent)] ${active ? "opacity-100" : "opacity-0"}`}
                        aria-hidden="true"
                      >
                        check
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
