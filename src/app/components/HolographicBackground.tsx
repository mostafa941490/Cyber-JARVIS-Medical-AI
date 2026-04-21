import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function HolographicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05010f] via-[#0a0520] to-[#12002b]" />

      {/* Animated perspective grid */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" style={{ perspective: "1000px" }}>
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(0, 234, 255, 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <animate
                attributeName="y1"
                values="0%;100%;0%"
                dur="20s"
                repeatCount="indefinite"
              />
              <stop offset="0%" stopColor="rgba(0, 234, 255, 0.8)" />
              <stop offset="50%" stopColor="rgba(179, 0, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(0, 234, 255, 0.8)" />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(60deg) translateZ(-100px)",
            }}
          />
        </svg>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(0, 234, 255, 0.8), rgba(179, 0, 255, 0.4))`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(0, 234, 255, 0.6)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Neon energy waves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${20 + i * 15}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(0, 234, 255, 0.5), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Digital rain effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`rain-${i}`}
            className="absolute w-px"
            style={{
              left: `${i * 5}%`,
              height: "100%",
              background:
                "linear-gradient(180deg, transparent, rgba(57, 255, 20, 0.3), transparent)",
            }}
            animate={{
              y: ["-100%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Atmospheric glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />

      {/* Scan line effect */}
      <motion.div
        className="absolute w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 234, 255, 0.8), transparent)",
          boxShadow: "0 0 20px rgba(0, 234, 255, 0.8)",
        }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
