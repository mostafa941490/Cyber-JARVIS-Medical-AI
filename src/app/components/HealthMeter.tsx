import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface HealthMeterProps {
  value: number;
  label: string;
  labelEn: string;
  max?: number;
}

export function HealthMeter({ value, label, labelEn, max = 100 }: HealthMeterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 80) return "#39ff14"; // Green
    if (percentage >= 60) return "#ffeb3b"; // Yellow
    if (percentage >= 40) return "#ff9800"; // Orange
    return "#ff2bd6"; // Pink/Red
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="rgba(0, 234, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl font-bold" style={{ color }}>
              {displayValue.toFixed(0)}
              <span className="text-sm">%</span>
            </div>
          </motion.div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Labels */}
      <div className="mt-4 text-center">
        <div className="text-cyan-400 font-bold text-sm">{label}</div>
        <div className="text-cyan-300/60 text-xs">{labelEn}</div>
      </div>
    </div>
  );
}
