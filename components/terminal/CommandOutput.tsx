'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AUTOCOMPLETE_COMMANDS, CommandResult } from '@/lib/terminal';

interface CommandOutputProps {
  results: CommandResult[];
  onQuickCommand?: (command: string) => void;
}

const IDLE_QUICK_COMMANDS = ['/help', '/scan', '/fin', '/briefing', '/qa'];

function shouldDisplayCommand(command: string) {
  return IDLE_QUICK_COMMANDS.includes(command);
}

export function CommandOutput({ results, onQuickCommand }: CommandOutputProps) {
  const quickStartCommands = AUTOCOMPLETE_COMMANDS.filter((command) =>
    shouldDisplayCommand(command.command)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 font-mono text-xs sm:text-sm"
    >
      <AnimatePresence initial={false}>
        {results.length === 0 ? (
          <motion.div
            key="idle-state"
            initial={{ opacity: 0, y: 8, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, y: -6, height: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="h-full min-h-0 flex flex-col gap-4"
          >
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="text-muted-foreground">
                [BOOT] Intercom Support OS initialized
              </div>
              <div className="terminal-glow-success">[OK] Fin AI Agent online</div>
              <div className="terminal-glow-success">[OK] Copilot Assist online</div>
              <div className="terminal-glow-success">[OK] Voice Briefing Engine ready</div>
              <div className="terminal-glow-success">[OK] Command palette available</div>
            </div>

            <div className="border border-primary/70 bg-primary/20 px-3 py-2 text-[0.72rem] sm:text-xs leading-tight">
              <pre className="whitespace-pre-wrap text-muted-foreground text-xs">
{`FIN_DAEMON ONLINE
┌───────────────────────────┐
│ support.bot::intercom     │
│ status: monitoring        │
│ mode: standby             │
└───────────────────────────┘`}
              </pre>
            </div>

            <div className="space-y-2">
              <div className="terminal-glow-success">Starter commands</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickStartCommands.map((item) => (
                  <button
                    type="button"
                    key={item.command}
                    onClick={() => onQuickCommand?.(item.command)}
                    className="w-full text-left px-2 py-1.5 border border-primary/80 terminal-glow-info hover:border-cyan-300 hover:bg-primary/30 transition-colors"
                  >
                    <span className="block terminal-glow-success text-xs sm:text-xs">{item.command}</span>
                    <span className="block text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="text-muted-foreground text-xs">Type /help to begin.</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {results.map((result, idx) => (
              <motion.div
                key={`${result.command}-${result.timestamp.getTime()}-${idx}`}
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
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
