'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureSectionProps {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  metrics?: Array<{ label: string; value: string }>;
  details?: string[];
  color?: 'success' | 'info' | 'warning' | 'error';
  reversed?: boolean;
}

const colorMap = {
  success: 'terminal-glow-success',
  info: 'terminal-glow-info',
  warning: 'terminal-glow-warning',
  error: 'terminal-glow-error',
};

export function FeatureSection({
  id,
  title,
  description,
  icon,
  metrics,
  details,
  color = 'info',
  reversed = false,
}: FeatureSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-4 border-b border-primary bg-background"
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 ${reversed ? 'lg:auto-cols-reverse' : ''}`}>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-sm font-mono mb-3 ${colorMap[color]}`}
            >
              ▶ {id.toUpperCase()}
            </motion.div>
            <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
              {description}
            </p>
          </div>

          {details && (
            <div className="space-y-2 font-mono text-sm">
              {details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className={colorMap[color]}
                >
                  ✓ {detail}
                </motion.div>
              ))}
            </div>
          )}

          {metrics && (
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-primary p-3 bg-primary"
                >
                  <div className="text-xs text-muted-foreground font-mono">
                    {metric.label}
                  </div>
                  <div className={`text-xl font-mono mt-2 ${colorMap[color]}`}>
                    {metric.value}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Icon/Visual Area */}
        {icon && (
          <motion.div
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="border-2 border-primary p-8 bg-primary rounded-none">
              {icon}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
