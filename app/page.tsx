'use client';

import { TerminalHero } from '@/components/terminal/TerminalHero';
import { VoiceBriefingConsole } from '@/components/terminal/VoiceBriefingConsole';
import { FinActivityLog } from '@/components/terminal/FinActivityLog';
import { TicketRoutingTable } from '@/components/terminal/TicketRoutingTable';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

type BriefingStatus = 'idle' | 'generating' | 'playing' | 'complete' | 'error';

export default function Home() {
  const [briefingStatus, setBriefingStatus] = useState<BriefingStatus>('idle');
  const [briefingProgress, setBriefingProgress] = useState(0);
  const [briefingError, setBriefingError] = useState<string | null>(null);
  const briefAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceBriefingSectionRef = useRef<HTMLElement | null>(null);
  const briefingAudioPath = '/audio/support-briefing.mp3';

  const playBriefingAudio = useCallback(() => {
    const audio = briefAudioRef.current ?? new Audio();
    briefAudioRef.current = audio;

    audio.onended = null;
    audio.onerror = null;
    audio.onplaying = null;
    audio.ontimeupdate = null;
    audio.onloadstart = null;

    setBriefingStatus('generating');
    setBriefingProgress(0);
    setBriefingError(null);

    audio.pause();
    audio.currentTime = 0;
    audio.src = briefingAudioPath;
    audio.load();

    audio.onplaying = () => {
      setBriefingStatus('playing');
    };

    audio.onended = () => {
      setBriefingProgress(100);
      setBriefingStatus('complete');
    };

    audio.ontimeupdate = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setBriefingProgress(Math.min(100, Math.round((audio.currentTime / audio.duration) * 100)));
      }
    };

    audio.onerror = () => {
      setBriefingError(`[ERROR] Could not load ${briefingAudioPath}`);
      setBriefingStatus('error');
      setBriefingProgress(0);
    };

    audio
      .play()
      .then(() => {
        setBriefingStatus('playing');
      })
      .catch(() => {
        setBriefingError(`[ERROR] Could not load ${briefingAudioPath}`);
        setBriefingStatus('error');
        setBriefingProgress(0);
      });
  }, [briefingAudioPath]);

  const handleBriefingCommand = useCallback(() => {
    if (voiceBriefingSectionRef.current) {
      voiceBriefingSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    playBriefingAudio();
  }, [playBriefingAudio]);

  useEffect(() => {
    return () => {
      const audio = briefAudioRef.current;
      if (!audio) return;
      audio.pause();
      audio.onended = null;
      audio.onerror = null;
      audio.onplaying = null;
      audio.ontimeupdate = null;
      audio.onloadstart = null;
    };
  }, []);

  const qaRows = [
    { id: 'convo_4821', score: 92, statusLabel: 'status: good', state: 'good' },
    { id: 'convo_4818', score: 61, statusLabel: 'risk: high', state: 'high' },
    { id: 'convo_4812', score: 88, statusLabel: 'status: resolved', state: 'resolved' },
    { id: 'convo_4809', score: 54, statusLabel: 'status: escalation', state: 'escalation' },
  ];

  const sentimentAlerts = [
    { level: 'WARN', text: 'billing frustration +18%', color: 'terminal-glow-warning' },
    { level: 'ALERT', text: 'SLA risk rising in APAC', color: 'terminal-glow-error' },
    { level: 'INFO', text: 'refund queue stable', color: 'terminal-glow-info' },
    { level: 'OK', text: 'Fin quality normal', color: 'terminal-glow-success' },
  ];

  const trendSignals = [
    {
      label: 'QA trend',
      color: 'terminal-glow-success',
      points: [42, 58, 61, 57, 63, 72, 68, 78, 83, 88, 92, 95],
      delta: '+1.4% last 2m',
    },
    {
      label: 'CSAT trend',
      color: 'terminal-glow-info',
      points: [58, 60, 64, 69, 70, 72, 73, 74, 76, 78, 80, 81],
      delta: '+6.2% vs prior window',
    },
    {
      label: 'topic spike detector',
      color: 'terminal-glow-warning',
      points: [30, 36, 42, 52, 60, 64, 79, 71, 65, 69, 70, 74],
      delta: 'refund/chargeback anomaly +8%',
    },
  ];

  return (
      <main className="w-full bg-background text-foreground overflow-x-hidden">
      {/* Hero Terminal Section */}
      <TerminalHero onBriefingCommand={handleBriefingCommand} />

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
      <motion.section
        ref={voiceBriefingSectionRef}
        className="py-16 px-4 border-b border-primary bg-background"
      >
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
            <VoiceBriefingConsole
              briefingStatus={briefingStatus}
              briefingProgress={briefingProgress}
              briefingError={briefingError}
              onPlayBriefing={playBriefingAudio}
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 px-4 border-b border-primary bg-background"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:auto-cols-reverse">
          {/* Left copy + metrics */}
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
                className="terminal-glow-warning text-sm font-mono mb-3"
              >
                ▶ INSIGHTS & QA
              </motion.div>
              <h2 className="text-4xl font-bold font-mono text-foreground mb-4">
                Insights & QA Suite
              </h2>
              <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                Track QA scores, sentiment shifts, SLA risks, and emerging support issues in real time.
              </p>
            </div>

            <div className="space-y-2 font-mono text-sm">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Real-time QA scoring for every conversation
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="terminal-glow-info">
                ✓ Sentiment shift detection across topics
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="terminal-glow-warning">
                ✓ Emerging issue alerts and anomaly monitoring
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="terminal-glow-success">
                ✓ Agent performance benchmarking
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="terminal-glow-warning">
                ✓ Predictive escalation and churn signals
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">QA Pass Rate</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">94%</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">CSAT Trend</div>
                <div className="terminal-glow-success text-xl font-mono mt-2">+6.2%</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Sentiment Alerts</div>
                <div className="terminal-glow-warning text-xl font-mono mt-2">12</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="border border-primary p-3 bg-primary">
                <div className="text-xs text-muted-foreground font-mono">Emerging Issues</div>
                <div className="terminal-glow-error text-xl font-mono mt-2">3</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Live support intelligence console */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-primary bg-primary p-4 space-y-4 font-mono text-xs text-foreground"
          >
            <div className="border-b border-primary pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-muted-foreground">┌─ SUPPORT INTELLIGENCE CONSOLE</div>
                <motion.div
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="terminal-glow-success text-xs"
                >
                  LIVE
                </motion.div>
              </div>
            </div>

            <div className="border border-primary p-3 bg-background space-y-2">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <div>QA MONITOR</div>
                <div>status: active</div>
              </div>
              <div className="space-y-2">
                {qaRows.map((row, idx) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-12 gap-2 items-center border border-primary/50 px-2 py-1"
                  >
                    <div className="col-span-5 truncate">{row.id}</div>
                    <div className="col-span-3">qa_score: {row.score}</div>
                    <div
                      className={`col-span-4 text-right font-medium ${
                        row.state === 'good'
                          ? 'terminal-glow-success'
                          : row.state === 'resolved'
                            ? 'terminal-glow-info'
                            : row.state === 'high'
                              ? 'terminal-glow-warning'
                              : 'terminal-glow-error'
                      }`}
                    >
                      {row.statusLabel}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border border-primary p-3 bg-background space-y-2">
              <div className="text-muted-foreground mb-1">SENTIMENT / ANOMALY ALERTS</div>
              {sentimentAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.level + idx}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <span className={`${alert.color} font-semibold`}>[{alert.level}]</span>
                  <span className="text-muted-foreground">{alert.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {trendSignals.map((signal, idx) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.07 }}
                  viewport={{ once: true }}
                  className="border border-primary p-3 bg-background space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="text-muted-foreground uppercase tracking-wide">
                      {signal.label}
                    </div>
                    <div className={signal.color}>{signal.delta}</div>
                  </div>
                  <div className="grid grid-cols-12 gap-1 items-end h-12">
                    {signal.points.map((point, pointIdx) => (
                      <motion.div
                        key={`${signal.label}-${pointIdx}`}
                        className="rounded-sm border border-current"
                        style={{ height: `${Math.max(14, (point / 100) * 42)}px` }}
                        animate={{
                          opacity: [0.55, 1, 0.55],
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          delay: idx * 0.08 + pointIdx * 0.05,
                        }}
                      >
                        <div className="h-full w-full bg-background" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-primary pt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <div>└─ SLA-risk: 3 open / 89 assigned / 143 total</div>
              <div className="terminal-glow-success">[analytics stream stable]</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

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
            <button
              onClick={playBriefingAudio}
              className="px-8 py-3 border-2 border-foreground text-foreground font-mono text-sm hover:terminal-glow-info hover:border-current transition-all"
            >
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
