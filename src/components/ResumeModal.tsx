import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-5xl h-[85vh] max-h-[900px] flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            <motion.div
              className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-2xl rounded-t-2xl border-b border-white/10"
              variants={contentVariants}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">
                    description
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-headline-lg-mobile text-white font-semibold">
                    Resume
                  </h3>
                  <p className="font-code-sm text-code-sm text-white/60">
                    Chiranjeev Kumar • GenAI Engineer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Download Button */}
                <motion.a
                  href="/Chiranjeev_GenAI_5+years.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-caps text-label-caps hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  Download
                </motion.a>

                {/* Minimize Button */}
                <motion.button
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-symbols-outlined">minimize</span>
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-symbols-outlined">close</span>
                </motion.button>
              </div>
            </motion.div>

            {/* PDF Viewer */}
            <motion.div
              className="flex-1 bg-white rounded-b-2xl overflow-hidden"
              variants={contentVariants}
            >
              <iframe
                src="/Chiranjeev_GenAI_5+years.pdf#toolbar=0"
                className="w-full h-full"
                title="Resume PDF"
              />
            </motion.div>

            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}