import { useCallback, useEffect, useState } from "react";

export type Palette =
  | "light"
  | "light-warm"
  | "warm"
  | "claude"
  | "dark"
  | "warm-dark"
  | "claude-dark";

export interface PaletteOption {
  id: Palette;
  label: string;
  dark: boolean;
  /** [page background, accent] — used for the swatch in the picker */
  swatch: [string, string];
}

export const PALETTES: PaletteOption[] = [
  { id: "light", label: "Light", dark: false, swatch: ["#f8fafc", "#0ea5e9"] },
  { id: "light-warm", label: "Light Warm", dark: false, swatch: ["#FBF8F2", "#0ea5e9"] },
  { id: "warm", label: "Warm", dark: false, swatch: ["#F3E9D9", "#0ea5e9"] },
  { id: "claude", label: "Claude", dark: false, swatch: ["#FAF9F5", "#C15F3C"] },
  { id: "dark", label: "Dark", dark: true, swatch: ["#131313", "#d0bcff"] },
  { id: "warm-dark", label: "Warm Dark", dark: true, swatch: ["#1B1814", "#d0bcff"] },
  { id: "claude-dark", label: "Claude Dark", dark: true, swatch: ["#262624", "#D97757"] },
];

const CHANGE_EVENT = "palette-change";

function isPalette(value: unknown): value is Palette {
  return PALETTES.some((p) => p.id === value);
}

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function initialPalette(): Palette {
  const saved = readStored("palette");
  if (isPalette(saved)) return saved;
  // Visitors from before palettes existed keep their light/dark choice.
  const legacy = readStored("theme");
  if (legacy === "dark" || legacy === "light") return legacy;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [palette, setPaletteState] = useState<Palette>(initialPalette);
  const option = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];
  const isDark = option.dark;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("palette", palette);
      // ModeContext reads "theme" when leaving 3D mode, so keep it in step.
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* storage unavailable: the palette still applies for this visit */
    }
  }, [palette, isDark]);

  // The navbar renders one picker for desktop and one for mobile; keep them in sync.
  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<Palette>).detail;
      if (isPalette(next)) setPaletteState(next);
    };
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  const setPalette = useCallback((next: Palette) => {
    setPaletteState(next);
    window.dispatchEvent(new CustomEvent<Palette>(CHANGE_EVENT, { detail: next }));
  }, []);

  return {
    palette,
    setPalette,
    palettes: PALETTES,
    theme: (isDark ? "dark" : "light") as "light" | "dark",
    isDark,
    toggle: () => setPalette(isDark ? "light" : "dark"),
    set: (t: "light" | "dark") => setPalette(t),
  };
}
