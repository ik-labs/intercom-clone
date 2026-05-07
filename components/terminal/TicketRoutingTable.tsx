'use client';

import { motion } from 'framer-motion';

export function TicketRoutingTable() {
  const routes = [
    { category: 'Billing', team: 'Billing Team', accuracy: '97%', avgTime: '1.2m', tickets: 28 },
    { category: 'Technical', team: 'Engineering', accuracy: '94%', avgTime: '2.4m', tickets: 47 },
    { category: 'General', team: 'Fin Agent', accuracy: '72%', avgTime: '3.2m', tickets: 89 },
    { category: 'Escalation', team: 'Leadership', accuracy: '100%', avgTime: '0.5m', tickets: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-primary border border-primary p-4 space-y-3 font-mono text-xs overflow-x-auto"
    >
      <div className="border-b border-primary pb-3">
        <div className="text-muted-foreground">
          ┌─ INTELLIGENT TICKET ROUTING ENGINE
        </div>
      </div>

      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-5 gap-2 border-b border-primary pb-2">
          <div className="text-muted-foreground">CATEGORY</div>
          <div className="text-muted-foreground">ROUTE TO</div>
          <div className="text-muted-foreground">ACCURACY</div>
          <div className="text-muted-foreground">AVG TIME</div>
          <div className="text-muted-foreground">TICKETS</div>
        </div>

        {/* Routes */}
        {routes.map((route, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-5 gap-2 py-2 border-b border-primary/50 items-center"
          >
            <div className="text-foreground">{route.category}</div>
            <div className="text-muted-foreground text-xs">{route.team}</div>
            <div className={`${route.accuracy === '100%' ? 'terminal-glow-success' : 'terminal-glow-info'}`}>
              {route.accuracy}
            </div>
            <div className="text-muted-foreground">{route.avgTime}</div>
            <div className="terminal-glow-warning font-bold">{route.tickets}</div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-primary pt-3 space-y-1">
        <div className="text-muted-foreground">
          └─ Routing performance: 94% satisfaction
        </div>
        <div className="terminal-glow-success">
          ✓ All routes operating within SLA
        </div>
      </div>
    </motion.div>
  );
}
