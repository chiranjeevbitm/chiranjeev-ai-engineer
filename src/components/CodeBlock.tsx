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

  const tokenize = (code: string) => {
    const tokens: { text: string; color: string }[] = [];
    let i = 0;
    while (i < code.length) {
      if (code[i] === "\n") {
        tokens.push({ text: "\n", color: "transparent" });
        i++;
        continue;
      }
      if (code[i] === " ") {
        tokens.push({ text: " ", color: "var(--text-muted)" });
        i++;
        continue;
      }
      // Keywords
      if (/^(const|let|var|return|export|default|function)/.test(code.slice(i))) {
        const match = code.slice(i).match(/^(const|let|var|return|export|default|function)/)![0];
        tokens.push({ text: match, color: "#c084fc" });
        i += match.length;
        continue;
      }
      // Numbers
      if (/[0-9]/.test(code[i])) {
        let num = "";
        while (i < code.length && /[0-9]/.test(code[i])) { num += code[i]; i++; }
        tokens.push({ text: num, color: "#f59e0b" });
        continue;
      }
      // String literals
      if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
        const quote = code[i];
        let str = quote;
        i++;
        while (i < code.length && code[i] !== quote) { str += code[i]; i++; }
        if (i < code.length) { str += code[i]; i++; }
        tokens.push({ text: str, color: "#10b981" });
        continue;
      }
      // Property access (word after dot)
      if (code[i] === ".") {
        let dot = ".";
        i++;
        while (i < code.length && /[a-zA-Z]/.test(code[i])) {
          // Check if it's a keyword like "split", "map", etc.
          dot += code[i]; i++;
        }
        tokens.push({ text: dot, color: "#60a5fa" });
        continue;
      }
      // Comments
      if (code[i] === "/" && code[i+1] === "/") {
        let comment = "";
        while (i < code.length && code[i] !== "\n") { comment += code[i]; i++; }
        tokens.push({ text: comment, color: "#6b7280" });
        continue;
      }
      // Punctuation
      if (/[{}(),;:[\]<>]/.test(code[i])) {
        tokens.push({ text: code[i], color: "var(--text)" });
        i++;
        continue;
      }
      // Default: word characters
      let word = "";
      while (i < code.length && /[a-zA-Z_]/.test(code[i])) { word += code[i]; i++; }
      if (word) {
        tokens.push({ text: word, color: word === "name" || word === "role" || word === "languages" || word === "expertise" || word === "experience" || word === "passion" ? "#7dd3fc" : "var(--text-muted)" });
        continue;
      }
      // Fallback
      tokens.push({ text: code[i], color: "var(--text-muted)" });
      i++;
    }
    return tokens;
  };

  const allTokens = tokenize(codeSnippet);
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
      <div className="p-4 font-code-sm text-sm leading-relaxed overflow-x-auto select-none bg-[var(--bg-surface)] min-h-[200px]">
        <pre className="whitespace-pre-wrap break-all font-code-sm text-sm leading-relaxed m-0">
          <code>
            {completed ? (
              // Full rendered code with proper syntax highlighting
              allTokens.map((token, i) => (
                <span key={i} style={{ color: token.color }}>{token.text}</span>
              ))
            ) : (
              // Character-by-character typing animation
              codeSnippet.split("").slice(0, displayed).map((char, i) => {
                let color = "var(--text-muted)";
                if (/["'`:;,{}]/.test(char)) color = "var(--text)";
                if (/[0-9]/.test(char)) color = "#f59e0b";
                if (char === '"' || char === "'") color = "#f59e0b";
                return (
                  <span key={i} style={{ color }}>
                    {char === "\n" ? "\n" : char}
                  </span>
                );
              })
            )}
            {!completed && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[2px] h-4 bg-[var(--accent)] ml-0.5 align-middle"
              />
            )}
            {completed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleReplay}
                className="ml-2 text-[10px] px-2 py-0.5 rounded bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--accent)] transition-colors align-middle"
              >
                ↻ replay
              </motion.button>
            )}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}