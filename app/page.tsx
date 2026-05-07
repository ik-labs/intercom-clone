'use client';

import { TerminalHero } from '@/components/terminal/TerminalHero';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { VoiceBriefingConsole } from '@/components/terminal/VoiceBriefingConsole';
import { FinActivityLog } from '@/components/terminal/FinActivityLog';
import { TicketRoutingTable } from '@/components/terminal/TicketRoutingTable';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      {/* Hero Terminal Section */}
      <TerminalHero />

      {/* Main Headline Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="py-12 px-4 border-b border-primary bg-background"
      >
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold font-mono text-foreground"
          >
            Customer support has logs.
            <br />
            <span className="terminal-glow-success">Intercom turns them into action.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto"
          >
            A terminal-native redesign of Intercom where Fin, Copilot, tickets, workflows, and insights run like an AI support OS.
          </motion.p>
        </div>
      </motion.section>

      {/* Feature Sections */}
      <motion.section className="py-16 px-4 border-b border-primary bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fin Agent Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
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
                className="terminal-glow-success text-sm font-mono mb-3"
              >
                ▶ FIN AGENT DAEMON
              </motion.div>
              <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
                AI-Powered Resolution
              </h2>
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Fin resolves customer support conversations autonomously. It learns from your knowledge base, escalates complex issues to humans, and continuously improves resolution rates.
              </p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Resolves customer conversations in real-time
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Escalates complex issues to specialized teams
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Learns from human agents and KB articles
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Improves resolution rates over time
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Provides escalation transparency & reasoning
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Resolution Rate</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">72%</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Learning Rate</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">94/min</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Fin Activity Log */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FinActivityLog />
          </motion.div>
        </div>
      </motion.section>

      {/* Omnichannel/Inbox Section */}
      <motion.section className="py-16 px-4 border-b border-primary bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-cols-reverse">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
                className="terminal-glow-info text-sm font-mono mb-3"
              >
                ▶ OMNICHANNEL INBOX
              </motion.div>
              <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
                Unified Support Messenger
              </h2>
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Manage email, chat, messenger, and in-app messages in one terminal-based inbox. Full customer context, unified workflows, real-time collaboration.
              </p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ All channels in unified inbox
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Full customer context available
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Real-time team collaboration
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Smart triage and assignment
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Channels</div>
                <div className="terminal-glow-info text-xl font-mono mt-2">5+</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Avg Response</div>
                <div className="terminal-glow-info text-xl font-mono mt-2">2.3s</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Ticket Routing Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <TicketRoutingTable />
          </motion.div>
        </div>
      </motion.section>

      {/* Copilot Section */}
      <motion.section className="py-16 px-4 border-b border-primary bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Copilot Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
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
                className="terminal-glow-success text-sm font-mono mb-3"
              >
                ▶ COPILOT ASSISTANT
              </motion.div>
              <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
                AI-Powered Response Drafts
              </h2>
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Real-time AI suggestions for every customer message. Drafts professional responses, optimizes tone, integrates knowledge base, and learns team voice.
              </p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Smart response suggestions
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Multi-language support
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Brand voice alignment
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Time saved per agent
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">CSAT Lift</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">+12%</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Accuracy</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">96.8%</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Copilot Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-primary border border-primary p-4 space-y-3 font-mono text-xs"
          >
            <div className="border-b border-primary pb-3">
              <div className="text-muted-foreground">
                ┌─ COPILOT DRAFT SUGGESTION
              </div>
            </div>
            <div className="space-y-2">
              <div className="terminal-glow-success text-xs">
                SUGGESTED (Confidence: 96%)
              </div>
              <div className="bg-background border border-primary p-3 space-y-2 text-xs leading-relaxed">
                <div className="text-muted-foreground">"Hi Sarah,</div>
                <div className="text-foreground">
                  Thanks for reaching out! I&apos;ve checked your account and see the issue. I&apos;m reprocessing now—should reflect in 2-5 minutes.
                </div>
                <div className="text-foreground">
                  If any issues persist, I&apos;ll escalate immediately.
                </div>
                <div className="text-muted-foreground">Best regards"</div>
              </div>
            </div>
            <div className="border-t border-primary pt-3 flex gap-2">
              <button className="px-2 py-1 border border-primary text-xs hover:terminal-glow-success transition-colors">
                Accept
              </button>
              <button className="px-2 py-1 border border-primary text-xs hover:text-foreground transition-colors">
                Edit
              </button>
              <button className="px-2 py-1 border border-primary text-xs hover:text-foreground transition-colors">
                Regenerate
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Voice Briefing Section (ElevenLabs) */}
      <motion.section className="py-16 px-4 border-b border-primary bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-cols-reverse">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
                className="terminal-glow-info text-sm font-mono mb-3"
              >
                ▶ VOICE BRIEFING ENGINE
              </motion.div>
              <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
                AI-Powered Voice Briefs
              </h2>
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Powered by ElevenLabs. Get context-aware voice briefings before customer interactions. Sentiment analysis, escalation alerts, and personalized talking points delivered as natural speech.
              </p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Natural voice synthesis
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Real-time context briefings
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Sentiment & urgency alerts
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ 22+ language support
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Prep Time</div>
                <div className="terminal-glow-info text-xl font-mono mt-2">0s</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Duration</div>
                <div className="terminal-glow-info text-xl font-mono mt-2">23s</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Voice Briefing Console */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <VoiceBriefingConsole />
          </motion.div>
        </div>
      </motion.section>

      <FeatureSection
        id="insights"
        title="Insights & QA Suite"
        description="Deep visibility into support operations. Real-time dashboards, automated QA, performance analytics, and actionable insights for continuous improvement."
        color="warning"
        metrics={[
          { label: 'Dashboards', value: '15+' },
          { label: 'Metrics Tracked', value: '200+' },
          { label: 'Data Points/Day', value: '12M' },
          { label: 'Reports/Week', value: '47' },
        ]}
        details={[
          'Real-time performance dashboards',
          'Automated QA evaluation',
          'Sentiment trend analysis',
          'Agent performance insights',
          'Predictive issue detection',
        ]}
        reversed
        icon={
          <div className="text-6xl terminal-glow-warning font-mono">
            ◈
          </div>
        }
      />

      {/* Integration Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 px-4 border-b border-primary bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="terminal-glow-info text-sm font-mono">
              ▶ INTEGRATIONS
            </div>
            <h2 className="text-4xl font-bold font-mono">
              Works With Your Stack
            </h2>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              Native integrations with 100+ platforms. Plug into your existing tools in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {['Salesforce', 'HubSpot', 'Zendesk', 'Jira', 'Slack', 'Teams'].map(
              (platform, idx) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className="border border-primary p-4 bg-primary text-center"
                >
                  <div className="text-sm font-mono text-muted-foreground">
                    {platform}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-24 px-4 bg-primary border-t border-primary"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="terminal-glow-success text-sm font-mono"
          >
            ▶ COMMAND CENTER READY
          </motion.div>

          <h2 className="text-5xl font-bold font-mono text-foreground">
            Run support from one
            <br />
            <span className="terminal-glow-success">command center.</span>
          </h2>

          <p className="text-xl text-muted-foreground font-mono">
            Built for teams that think in terminals. Fin AI. Voice briefings. Real-time metrics. One OS.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button className="px-8 py-3 border-2 border-foreground bg-background text-foreground font-mono text-sm hover:terminal-glow-success hover:border-current transition-all">
              Run Demo Scan
            </button>
            <button className="px-8 py-3 border-2 border-foreground text-foreground font-mono text-sm hover:terminal-glow-info hover:border-current transition-all">
              Play Voice Briefing
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-primary text-xs text-muted-foreground font-mono space-y-2"
          >
            <div className="terminal-glow-info">Powered by ElevenLabs voice synthesis | Fin AI engine | Framer Motion</div>
            <div>
              <span className="terminal-glow-success">↳</span> Built for hackers. Designed for teams.
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
