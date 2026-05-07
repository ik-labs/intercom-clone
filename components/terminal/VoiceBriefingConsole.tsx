'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

type BriefingStatus = 'idle' | 'generating' | 'playing' | 'complete' | 'error';

interface VoiceBriefingConsoleProps {
  onPlayBriefing: () => void;
  briefingStatus: BriefingStatus;
  briefingProgress: number;
  briefingError: string | null;
}

export function VoiceBriefingConsole({
  onPlayBriefing,
  briefingStatus,
  briefingProgress,
  briefingError,
}: VoiceBriefingConsoleProps) {
  const showTranscript = briefingStatus === 'playing' || briefingStatus === 'complete';

  const transcriptLines = [
    '"Support volume is stable with 1,247 messages today.',
    'Billing questions up 43%. Twelve conversations at SLA risk.',
    'Fin resolved 72% of incoming chats this morning.',
    'Recommend: Deploy extra capacity to billing team."',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-primary border border-primary p-4 space-y-4 font-mono text-sm"
    >
      <div className="border-b border-primary pb-3">
        <div className="text-xs text-muted-foreground">
          ┌─ ELEVENLABS VOICE BRIEFING ENGINE
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs text-muted-foreground">
          $ elevenlabs briefing --workspace=today --voice=ops_manager
        </div>

        {briefingStatus === 'generating' && (
          <motion.div
            className="text-xs terminal-glow-info"
            animate={{ opacity: [0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Generating briefing with ElevenLabs AI...
          </motion.div>
        )}

        {(briefingStatus === 'generating' || briefingStatus === 'playing') && (
          <motion.div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {briefingStatus === 'generating'
                  ? 'Processing audio synthesis'
                  : 'Streaming voice briefing'}
              </div>
              <div className="text-xs terminal-glow-success">{briefingProgress}%</div>
            </div>
            <div className="flex gap-1 items-center h-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary border border-primary"
                  animate={{
                    height: briefingStatus === 'playing'
                      ? ['0.9rem', '1.5rem', '1rem', '1.3rem', '0.9rem']
                      : ['1rem', '1.5rem', '0.75rem', '1.2rem', '1rem'],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {briefingStatus === 'idle' && briefingProgress === 0 && (
          <div className="text-xs text-muted-foreground">
            Click "Play briefing" to generate voice synthesis
          </div>
        )}

        {showTranscript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-background border border-primary p-3 space-y-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground"
            >
              Transcript:
            </motion.div>
            <div className="text-xs text-foreground leading-relaxed space-y-1">
              {transcriptLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={showTranscript ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 pt-2 flex-wrap">
          <button
            onClick={onPlayBriefing}
            className={`flex items-center gap-2 px-3 py-2 text-xs border border-current transition-all ${
              briefingStatus === 'generating' || briefingStatus === 'playing'
                ? 'terminal-glow-success bg-background'
                : 'text-muted-foreground hover:text-foreground hover:terminal-glow-success'
            }`}
          >
            <Play className="w-3 h-3" />
            {briefingStatus === 'generating'
              ? 'Generating...'
              : briefingStatus === 'playing'
                ? 'Playing...'
                : 'Play briefing'}
          </button>
          <button className="px-3 py-2 text-xs border border-current text-muted-foreground hover:text-foreground hover:terminal-glow-info transition-colors">
            Regenerate
          </button>
          <button className="px-3 py-2 text-xs border border-current text-muted-foreground hover:text-foreground transition-colors">
            Settings
          </button>
        </div>
      </div>

      <div className="border-t border-primary pt-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground space-y-1"
        >
          <div>└─ Powered by ElevenLabs Text to Speech</div>
          <div className="terminal-glow-info text-xs">Voice: ops_manager</div>
          {briefingStatus === 'playing' && (
            <div className="terminal-glow-success text-xs">[PLAYING] ElevenLabs voice briefing</div>
          )}
          {briefingStatus === 'complete' && (
            <div className="terminal-glow-success text-xs">[READY] Voice briefing complete</div>
          )}
          {briefingStatus === 'error' && briefingError && (
            <div className="text-red-400 text-xs">{briefingError}</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
