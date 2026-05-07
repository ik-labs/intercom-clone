'use client';

import { motion } from 'framer-motion';

export function OperationsDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const metrics = [
    { label: 'Conversations Handled', value: '1,247', color: 'terminal-glow-success' },
    { label: 'Avg Response Time', value: '2.3s', color: 'terminal-glow-info' },
    { label: 'CSAT Score', value: '94.2%', color: 'terminal-glow-success' },
    { label: 'SLA-Risk Tickets', value: '3', color: 'terminal-glow-error' },
    { label: 'Fin Resolution Rate', value: '72%', color: 'terminal-glow-success' },
    { label: 'Human Agents Online', value: '12/15', color: 'terminal-glow-info' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 p-2 sm:p-4 bg-primary border border-primary rounded-none"
    >
      <motion.div variants={itemVariants} className="border-b border-primary pb-3 mb-3">
        <div className="text-xs font-mono text-muted-foreground">
          ┌─ OPERATIONS DASHBOARD
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="border border-primary p-2 sm:p-3 bg-background"
          >
            <div className="text-xs text-muted-foreground font-mono line-clamp-2">
              {metric.label}
            </div>
            <motion.div
              className={`text-lg font-mono mt-2 ${metric.color}`}
              animate={{ opacity: [0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {metric.value}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="border-t border-primary pt-3 mt-3">
        <div className="text-xs font-mono text-muted-foreground space-y-1">
          <div>└─ All systems nominal</div>
          <div className="terminal-glow-success">✓ Production ready</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
