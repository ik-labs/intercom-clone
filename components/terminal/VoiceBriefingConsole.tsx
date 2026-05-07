'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

export function VoiceBriefingConsole() {
  const [playing, setPlaying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const transcriptLines = [
    '"Support volume is stable with 1,247 messages today.',
    'Billing questions up 43%. Twelve conversations at SLA risk.',
    'Fin resolved 72% of incoming chats this morning.',
    'Recommend: Deploy extra capacity to billing team."',
  ];

  const handlePlayClick = () => {
    if (playing) {
      setPlaying(false);
      return;
    }

    setGenerating(true);
    setProgress(0);
    setShowTranscript(false);

    // Simulate generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setPlaying(true);
          setShowTranscript(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

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

        {generating && (
          <motion.div className="text-xs terminal-glow-info" animate={{ opacity: [0.7, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            Generating briefing with ElevenLabs AI...
          </motion.div>
        )}

        {/* Animated waveform progress */}
        {generating && (
          <motion.div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">Processing audio synthesis</div>
              <div className="text-xs terminal-glow-success">{progress}%</div>
            </div>
            <div className="flex gap-1 items-center h-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary border border-primary"
                  animate={{
                    height: generating ? ['1rem', '1.5rem', '0.75rem', '1.2rem', '1rem'] : '1rem',
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

        {!generating && progress === 0 && (
          <div className="text-xs text-muted-foreground">
            Click "Play briefing" to generate voice synthesis
          </div>
        )}

        {/* Transcript section - reveal line by line */}
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

        {/* Control buttons */}
        <div className="flex gap-2 pt-2 flex-wrap">
          <button
            onClick={handlePlayClick}
            className={`flex items-center gap-2 px-3 py-2 text-xs border border-current transition-all ${
              playing || generating
                ? 'terminal-glow-success bg-background'
                : 'text-muted-foreground hover:text-foreground hover:terminal-glow-success'
            }`}
          >
            <Play className="w-3 h-3" />
            {generating ? 'Generating...' : playing ? 'Playing...' : 'Play briefing'}
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
          <div>└─ Powered by ElevenLabs | Voice: ops_manager</div>
          {playing && (
            <div className="terminal-glow-success text-xs">
              ✓ Voice briefing ready
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
