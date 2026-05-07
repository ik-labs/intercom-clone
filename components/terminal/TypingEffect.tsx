'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function TypingEffect({ text, speed = 50, delay = 0 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timeout = setTimeout(() => {
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1));
      } else {
        setIsComplete(true);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, isComplete]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayText}
      {!isComplete && <span className="animate-pulse">▌</span>}
    </motion.span>
  );
}
