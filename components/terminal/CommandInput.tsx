'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

export function CommandInput({ onSubmit, disabled = false }: CommandInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value.trim();
    if (input) {
      onSubmit(input);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-2 px-2 sm:px-4 py-2 sm:py-3 border-t border-primary"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="terminal-glow-info flex-shrink-0">▶</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter command"
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground font-mono text-xs sm:text-sm min-w-0"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-muted-foreground font-mono pl-6 hidden sm:block"
      >
        Hint: Press <span className="terminal-glow-info px-1">⌘K</span> for commands
      </motion.div>
    </motion.form>
  );
}
