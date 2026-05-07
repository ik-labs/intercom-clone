'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const COMMANDS = [
  { id: '/scan', label: 'Run support scan', description: 'Scan workspace operations' },
  { id: '/fin', label: 'Show Fin activity', description: 'View AI agent resolution stats' },
  { id: '/tickets', label: 'View SLA-risk tickets', description: 'Show high-priority queue' },
  { id: '/briefing', label: 'Play voice briefing', description: 'Generate ElevenLabs briefing' },
  { id: '/qa', label: 'Open QA report', description: 'View quality & sentiment metrics' },
  { id: '/clear', label: 'Clear terminal', description: 'Clear command history' },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (command: string) => void;
}

export function CommandPalette({ isOpen, onClose, onSelectCommand }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filtered[selectedIndex]) {
            onSelectCommand(filtered[selectedIndex].id);
            onClose();
            setSearch('');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose, onSelectCommand]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-primary border-2 border-primary">
              {/* Search input */}
              <div className="border-b border-primary p-4 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none font-mono text-sm"
                />
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands list */}
              <div className="max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground font-mono text-sm">
                    No commands found
                  </div>
                ) : (
                  filtered.map((cmd, idx) => (
                    <motion.button
                      key={cmd.id}
                      onClick={() => {
                        onSelectCommand(cmd.id);
                        onClose();
                        setSearch('');
                      }}
                      className={`w-full px-4 py-3 border-b border-primary text-left transition-colors ${
                        idx === selectedIndex ? 'bg-secondary terminal-glow-success' : 'hover:bg-secondary'
                      }`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="font-mono text-sm text-foreground flex justify-between items-center">
                        <span>{cmd.label}</span>
                        <span className="text-xs text-muted-foreground">{cmd.id}</span>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground mt-1">
                        {cmd.description}
                      </div>
                    </motion.button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-primary p-3 flex gap-4 text-xs font-mono text-muted-foreground">
                <div>
                  <span className="bg-primary px-2 py-1">↑↓</span> Navigate
                </div>
                <div>
                  <span className="bg-primary px-2 py-1">↵</span> Select
                </div>
                <div>
                  <span className="bg-primary px-2 py-1">Esc</span> Close
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
