'use client';

import { motion } from 'framer-motion';

export function FinActivityLog() {
  const activities = [
    { time: '09:42', action: 'Resolved', ticket: 'TKT-8934', summary: 'Password reset assistance', resolved: true },
    { time: '09:39', action: 'Escalated', ticket: 'TKT-8931', summary: 'Complex billing discrepancy', resolved: false },
    { time: '09:35', action: 'Resolved', ticket: 'TKT-8928', summary: 'Feature walkthrough request', resolved: true },
    { time: '09:31', action: 'Resolved', ticket: 'TKT-8925', summary: 'API documentation question', resolved: true },
    { time: '09:28', action: 'Learning', ticket: 'TKT-8922', summary: 'Agent improved Fin knowledge base', resolved: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-primary border border-primary p-4 space-y-3 font-mono text-xs"
    >
      <div className="border-b border-primary pb-3">
        <div className="text-muted-foreground">
          ┌─ FIN AGENT ACTIVITY LOG (Live)
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {activities.map((activity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 pb-2 border-b border-primary/50"
          >
            <div className="text-muted-foreground w-12 flex-shrink-0">{activity.time}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    activity.action === 'Resolved'
                      ? 'terminal-glow-success'
                      : activity.action === 'Escalated'
                        ? 'terminal-glow-warning'
                        : 'terminal-glow-info'
                  }`}
                >
                  [{activity.action}]
                </span>
                <span className="text-muted-foreground">{activity.ticket}</span>
              </div>
              <div className="text-muted-foreground text-xs mt-1 truncate">
                {activity.summary}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-primary pt-3">
        <div className="text-muted-foreground">
          └─ Fin activity stream (updates in real-time)
        </div>
      </div>
    </motion.div>
  );
}
