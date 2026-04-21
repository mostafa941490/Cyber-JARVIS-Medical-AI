import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlassPanel({ children, className = "", animate = true }: GlassPanelProps) {
  const panel = (
    <div
      className={`relative backdrop-blur-md bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 
        border border-cyan-500/30 rounded-2xl p-6 shadow-2xl
        ${className}`}
      style={{
        boxShadow:
          "0 0 40px rgba(0, 234, 255, 0.15), inset 0 0 40px rgba(0, 234, 255, 0.05)",
      }}
    >
      {/* Animated border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background:
            "linear-gradient(45deg, transparent, rgba(0, 234, 255, 0.1), transparent)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (!animate) return panel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 60px rgba(0, 234, 255, 0.3)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {panel}
      </motion.div>
    </motion.div>
  );
}
