import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const codeSnippet = `const developer = {
  name: "Chiranjeev Kumar",
  role: "Full-Stack AI Engineer",
  languages: ["Python", "TypeScript", "SQL"],
  expertise: ["GenAI", "RAG", "Agentic Systems", "React"],
  experience: "${'>'}5 years",
  passion: "Building intelligent interfaces",
};`;

export default function CodeBlock() {
  const [displayed, setDisplayed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev >= codeSnippet.length) {
          clearInterval(intervalRef.current!);
          setCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 15);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Replay on click
  const handleReplay = () => {
    setDisplayed(0);
    setCompleted(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev >= codeSnippet.length) {
          clearInterval(intervalRef.current!);
          setCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 15);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-lg mx-auto mt-6 rounded-xl overflow-hidden border border-[var(--border)] shadow-xl"
    >
      {/* Editor header */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border)]">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 font-code-sm text-xs text-[var(--text-muted)]">developer.js</span>
      </div>

      {/* Code content */}
      <div className="p-4 font-code-sm text-sm leading-relaxed overflow-x-auto select-none bg-[var(--bg-surface)]">
        <pre className="whitespace-pre">
          {codeSnippet
            .split("")
            .slice(0, displayed)
            .map((char, i) => {
              // Colorize based on content
              let color = "var(--text-muted)";
              if (/["'`:;,{}]/.test(char)) color = "var(--text)";
              if (/[0-9]/.test(char)) color = "#f59e0b";
              if (char === ">" || char === "5") color = "#10b981";
              if (char === '"' || char === "'") color = "#f59e0b";
              if (/[a-zA-Z]/.test(char) && i > 0 && codeSnippet[i - 1] === ".") color = "#60a5fa";

              return (
                <span key={i} style={{ color }}>
                  {char === "\n" ? "\n" : char}
                </span>
              );
            })}
          {!completed && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[2px] h-4 bg-[var(--accent)] ml-0.5 align-middle"
            />
          )}
          {completed && (
            <motion.button
              onClick={handleReplay}
              className="ml-2 text-[10px] px-2 py-0.5 rounded bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--accent)] transition-colors align-middle"
            >
              ↻ replay
            </motion.button>
          )}
        </pre>
      </div>
    </motion.div>
  );
}