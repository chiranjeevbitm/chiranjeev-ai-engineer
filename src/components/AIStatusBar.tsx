import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const statusMessages = [
  "Initializing multimodal pipeline...",
  "Vector index connected.",
  "Agent orchestration active.",
  "RAG context loaded.",
  "LLM inference ready.",
  "System monitoring active.",
];

export default function AIStatusBar() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % statusMessages.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-sm text-xs font-code-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <motion.span
        key={msgIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-[var(--text-muted)]"
      >
        {statusMessages[msgIndex]}
      </motion.span>
    </motion.div>
  );
}