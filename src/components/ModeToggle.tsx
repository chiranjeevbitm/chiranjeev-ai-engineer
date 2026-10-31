import { motion } from "framer-motion";
import { useMode } from "../context/ModeContext";

export default function ModeToggle() {
  const { mode, setMode, webglOk } = useMode();
  const options: { id: "normal" | "3d"; label: string }[] = [
    { id: "normal", label: "Normal" },
    { id: "3d", label: "3D" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      title={webglOk ? "Switch between the normal and 3D experience" : "3D mode needs WebGL, which this browser doesn't provide"}
      className="relative flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] shadow-md"
    >
      {options.map((o) => {
        const active = mode === o.id;
        const disabled = o.id === "3d" && !webglOk;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => setMode(o.id)}
            className={`relative z-10 !min-h-0 !min-w-0 px-3 py-1.5 rounded-full font-label-caps text-label-caps transition-colors disabled:opacity-40 ${
              active ? "text-white" : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
