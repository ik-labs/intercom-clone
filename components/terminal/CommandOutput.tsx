'use client';

import { motion } from 'framer-motion';
import { CommandResult } from '@/lib/terminal';

interface CommandOutputProps {
  results: CommandResult[];
}

export function CommandOutput({ results }: CommandOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 font-mono text-xs sm:text-sm"
    >
      {results.length === 0 ? (
        <div className="space-y-3">
          <div className="terminal-glow-info text-xs leading-tight">
            <div className="hidden sm:block">╔═══════════════════════════════════════════════════════════════╗</div>
            <div className="sm:hidden">┌─────────────────────────────────────┐</div>
          </div>
          <div className="terminal-glow-info text-xs">
            <div className="hidden sm:block">║ INTERCOM TERMINAL - AI SUPPORT OS                             ║</div>
            <div className="sm:hidden">│ INTERCOM TERMINAL                   │</div>
          </div>
          <div className="terminal-glow-info text-xs">
            <div className="hidden sm:block">║ v2.1 | Production Ready | Powered by Fin AI                   ║</div>
            <div className="sm:hidden">│ v2.1 | Production Ready             │</div>
          </div>
          <div className="terminal-glow-info text-xs leading-tight">
            <div className="hidden sm:block">╚═══════════════════════════════════════════════════════════════╝</div>
            <div className="sm:hidden">└─────────────────────────────────────┘</div>
          </div>
          <div className="text-muted-foreground mt-4 space-y-2">
            <div className="text-xs">Support OS ready.</div>
            <div className="text-xs">Type <span className="terminal-glow-success">/help</span> for commands.</div>
          </div>
        </div>
      ) : (
        results.map((result, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="space-y-1"
          >
            <div className="terminal-glow-info">
              {'→'} {result.command}
            </div>
            <div className={result.status === 'error' ? 'text-red-400' : 'text-foreground'}>
              {result.output.map((line, lineIdx) => (
                <div key={lineIdx} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
