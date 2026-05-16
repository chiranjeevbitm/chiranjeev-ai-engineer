import { motion } from "framer-motion";

export default function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at center, #60a5fa 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0, -50, 0],
          y: [0, -50, 80, 30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle at center, #a078ff 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -60, 40, -30, 0],
          y: [0, 70, -30, 50, 0],
          scale: [1, 0.9, 1.15, 1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full opacity-[0.05] dark:opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle at center, #0ea5e9 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, -30, 70, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}