'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TerminalButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export function TerminalButton({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: TerminalButtonProps) {
  const baseStyles = 'px-6 py-3 font-mono text-sm font-bold transition-all duration-200';
  
  const variants = {
    primary: 'border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background',
    secondary: 'border-2 border-muted text-muted hover:border-foreground hover:text-foreground',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
}
