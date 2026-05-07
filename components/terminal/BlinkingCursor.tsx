'use client';

import { motion } from 'framer-motion';

export function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="terminal-glow-success"
    >
      ▮
    </motion.span>
  );
}
