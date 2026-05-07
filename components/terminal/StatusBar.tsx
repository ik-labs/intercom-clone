'use client';

import { motion } from 'framer-motion';

interface StatusBarProps {
  theme: 'dark' | 'neon';
}

export function StatusBar({ theme }: StatusBarProps) {
  const metrics = [
    { label: 'CPU', value: '34%', status: 'info' as const },
    { label: 'MEMORY', value: '2.1GB', status: 'success' as const },
    { label: 'UPTIME', value: '847d', status: 'success' as const },
    { label: 'AGENTS', value: '12/15', status: 'success' as const },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      success: 'terminal-glow-success',
      info: 'terminal-glow-info',
      warning: 'terminal-glow-warning',
      error: 'terminal-glow-error',
    };
    return colors[status as keyof typeof colors] || colors.info;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="border-t border-primary px-4 py-2 flex items-center justify-between bg-primary font-mono text-xs"
    >
      <div className="text-muted-foreground">
        INTERCOM TERMINAL v2.1
      </div>
      <div className="flex items-center gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-muted-foreground">{metric.label}:</span>
            <span className={getStatusColor(metric.status)}>
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
