import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  open: boolean;
  children: ReactNode;
}

/** Height-animated disclosure body. */
export function Collapsible({ open, children }: CollapsibleProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ToggleButtonProps {
  open: boolean;
  onClick: () => void;
  closedLabel: string;
  openLabel?: string;
  className?: string;
}

/** Small "Show more / Show less" button with a rotating chevron. */
export function ToggleButton({ open, onClick, closedLabel, openLabel = "Show less", className = "" }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`inline-flex items-center gap-1.5 !min-h-0 py-1.5 text-sm font-code-sm text-primary dark:text-[#d0bcff] hover:underline ${className}`}
    >
      {open ? openLabel : closedLabel}
      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
    </button>
  );
}
