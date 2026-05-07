'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CommandInput } from './CommandInput';
import { CommandOutput } from './CommandOutput';
import { StatusBar } from './StatusBar';
import { OperationsDashboard } from './OperationsDashboard';
import { CommandPalette } from './CommandPalette';
import { executeCommand, CommandResult } from '@/lib/terminal';

export function TerminalHero() {
  const [commands, setCommands] = useState<CommandResult[]>([]);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (input: string) => {
    const result = executeCommand(input);
    
    if (input.toLowerCase().includes('/clear')) {
      setCommands([]);
    } else {
      setCommands([...commands, result]);
    }
  };

  const handlePaletteSelect = (commandId: string) => {
    handleCommand(commandId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-background text-foreground min-h-screen flex flex-col relative"
    >
      {/* Command Palette */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectCommand={handlePaletteSelect}
      />

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-2 sm:px-4 py-2 sm:py-3 border-b border-primary font-mono text-xs space-y-1 overflow-hidden"
      >
        <div className="terminal-glow-info text-center">
          <div className="hidden sm:block">╔═══════════════════════════════════════════════════════════════════════════════╗</div>
          <div className="sm:hidden">┌──────────────────────────────────────┐</div>
        </div>
        <div className="terminal-glow-info text-center">
          <div className="hidden sm:block">║                     INTERCOM TERMINAL - SUPPORT OS                            ║</div>
          <div className="sm:hidden">│ INTERCOM TERMINAL                    │</div>
        </div>
        <div className="terminal-glow-info text-center">
          <div className="hidden sm:block">║                          v2.1 | Production Ready                              ║</div>
          <div className="sm:hidden">│ v2.1 | Production Ready              │</div>
        </div>
        <div className="terminal-glow-info text-center">
          <div className="hidden sm:block">╚═══════════════════════════════════════════════════════════════════════════════╝</div>
          <div className="sm:hidden">└──────────────────────────────────────┘</div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground text-xs mt-2"
        >
          Press <span className="terminal-glow-info px-1">⌘K</span> to open palette
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 overflow-hidden">
        {/* Left Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="lg:col-span-2 border border-primary bg-primary flex flex-col overflow-hidden rounded-none"
        >
          <CommandOutput results={commands} />
          <CommandInput onSubmit={handleCommand} />
        </motion.div>

        {/* Right Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="lg:col-span-1"
        >
          <OperationsDashboard />
        </motion.div>
      </div>

      {/* Status Bar */}
      <StatusBar theme="dark" />

      {/* Bottom ASCII Border */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="px-2 sm:px-4 py-2 sm:py-3 border-t border-primary font-mono text-xs text-muted-foreground overflow-hidden"
      >
        <div className="hidden sm:block">╔═══════════════════════════════════════════════════════════════════════════════╗</div>
        <div className="hidden sm:block">║                   Type /help to explore all available commands                ║</div>
        <div className="hidden sm:block">╚═══════════════════════════════════════════════════════════════════════════════╝</div>
        <div className="sm:hidden">Type /help for commands</div>
      </motion.div>
    </motion.div>
  );
}
