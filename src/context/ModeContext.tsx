import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ViewMode = "normal" | "3d";

interface ModeValue {
  mode: ViewMode;
  is3D: boolean;
  setMode: (m: ViewMode) => void;
  webglOk: boolean;
}

const STORAGE_KEY = "view-mode";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const ModeContext = createContext<ModeValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [webglOk] = useState(detectWebGL);
  const [mode, setModeState] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "3d" ? "3d" : "normal";
  });

  const effective: ViewMode = mode === "3d" && webglOk ? "3d" : "normal";

  const setMode = useCallback((m: ViewMode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEY, m);
  }, []);

  // 3D mode is designed on a dark canvas, so it forces the dark palette while
  // active and puts the user's saved theme back when they return to normal.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("mode-3d", effective === "3d");
    if (effective === "3d") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      return () => {
        const saved = localStorage.getItem("theme");
        const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", dark);
        root.setAttribute("data-theme", dark ? "dark" : "light");
      };
    }
  }, [effective]);

  const value = useMemo<ModeValue>(
    () => ({ mode: effective, is3D: effective === "3d", setMode, webglOk }),
    [effective, setMode, webglOk],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMode(): ModeValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}
