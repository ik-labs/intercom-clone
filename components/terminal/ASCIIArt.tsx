'use client';

import { motion } from 'framer-motion';

export function TerminalASCII() {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="text-xs font-mono text-muted-foreground text-center max-w-4xl mx-auto p-4"
    >
      {`
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                    ████████╗███████╗██████╗ ███╗   ███╗                      ║
║                    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║                      ║
║                       ██║   █████╗  ██████╔╝██╔████╔██║                      ║
║                       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║                      ║
║                       ██║   ███████╗██║  ██║██║ ╚═╝ ██║                      ║
║                       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝                      ║
║                                                                               ║
║              The Future of Customer Support is Terminal-Native                ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
      `}
    </motion.pre>
  );
}
