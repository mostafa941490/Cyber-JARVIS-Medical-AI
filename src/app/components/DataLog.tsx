import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface DataLogProps {
  entries: LogEntry[];
}

export function DataLog({ entries }: DataLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-pink-400";
      default:
        return "text-cyan-400";
    }
  };

  const getTypeIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "✓";
      case "warning":
        return "⚠";
      case "error":
        return "✗";
      default:
        return "●";
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-64 overflow-y-auto bg-black/40 rounded-lg p-4 border border-cyan-500/20 
        scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
      style={{
        fontFamily: "monospace",
      }}
    >
      <AnimatePresence initial={false}>
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`mb-2 text-sm ${getTypeColor(entry.type)}`}
          >
            <span className="text-cyan-500/50 text-xs">[{entry.timestamp}]</span>{" "}
            <span className="text-cyan-300/70">{getTypeIcon(entry.type)}</span>{" "}
            <span>{entry.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {entries.length === 0 && (
        <div className="text-center text-cyan-500/30 text-sm mt-8">
          <div className="mb-2">نظام السجل جاهز</div>
          <div className="text-xs">System Log Ready</div>
        </div>
      )}
    </div>
  );
}
