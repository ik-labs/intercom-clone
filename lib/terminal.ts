export interface Command {
  name: string;
  description: string;
  output: string | string[];
}

export interface AutocompleteCommand {
  command: string;
  description: string;
}

export interface CommandResult {
  command: string;
  output: string[];
  timestamp: Date;
  status: 'success' | 'error';
}

export const AUTOCOMPLETE_COMMANDS: AutocompleteCommand[] = [
  { command: '/help', description: 'list available commands' },
  { command: '/scan', description: 'run support workspace scan' },
  { command: '/fin', description: 'show Fin AI Agent activity' },
  { command: '/tickets', description: 'view SLA-risk ticket queue' },
  { command: '/briefing', description: 'play ElevenLabs manager briefing' },
  { command: '/qa', description: 'show QA and sentiment report' },
  { command: '/clear', description: 'clear terminal output' },
];

export const COMMANDS: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    output: [
      '╔═══════════════════════════════════════════════════════════════╗',
      '║               INTERCOM TERMINAL - COMMAND REFERENCE           ║',
      '╠═══════════════════════════════════════════════════════════════╣',
      '║ /help              Display this help menu                     ║',
      '║ /scan              Scan support workspace metrics              ║',
      '║ /fin               Show Fin Agent resolution stats             ║',
      '║ /tickets           View SLA-risk ticket queue                  ║',
      '║ /route billing     Route tickets to billing team               ║',
      '║ /briefing          Launch voice briefing engine                ║',
      '║ /qa                Show quality and sentiment metrics           ║',
      '║ /copilot           Display AI copilot draft suggestions        ║',
      '║ /clear             Clear terminal buffer                       ║',
      '╚═══════════════════════════════════════════════════════════════╝',
    ],
  },
  scan: {
    name: 'scan',
    description: 'Scan workspace metrics',
    output: [
      '► Scanning workspace support metrics...',
      '',
      '[✓] Email channel: 347 queued',
      '[✓] Chat (Messenger): 521 queued',
      '[✓] In-app messages: 89 queued',
      '[✓] Active agents: 12/15 online',
      '[✓] Avg response time: 2.3s',
      '[✓] Tickets pending: 143',
      '[✓] Fin resolution rate: 72%',
      '[✓] Escalations today: 18 (↓4%)',
      '',
      'WORKSPACE HEALTHY - All channels operational',
    ],
  },
  fin: {
    name: 'fin',
    description: 'Show Fin Agent stats',
    output: [
      '► Loading Fin Agent daemon (v2.1)...',
      '',
      '[✓] Initializing resolution intent recognition',
      '[✓] Loading knowledge base (847 articles)',
      '[✓] Binding to omnichannel router',
      '[✓] Fin daemon started (PID 4421)',
      '',
      'FIN AGENT ACTIVE - Real-time stats:',
      '├─ Conversations resolved: 447',
      '├─ Resolution rate: 72%',
      '├─ Escalations triggered: 118',
      '├─ Learning from agents: 94 samples/min',
      '├─ KB article recommendations: 321',
      '└─ Avg resolution time: 3.2min',
      '',
      'Last escalation: Technical issue → Engineering team (2min ago)',
    ],
  },
  tickets: {
    name: 'tickets',
    description: 'View SLA-risk tickets',
    output: [
      '► Fetching SLA-risk ticket queue...',
      '',
      '🔴 [URGENT] TKT-8847 │ Payment processing failure',
      '   └─ Waiting: 47min │ SLA: 60min │ Assigned to: Queue',
      '',
      '🟠 [HIGH]   TKT-8839 │ Account access locked',
      '   └─ Waiting: 23min │ SLA: 120min │ Assigned to: Sarah M.',
      '',
      '🟡 [MEDIUM] TKT-8821 │ API rate limit exceeded',
      '   └─ Waiting: 12min │ SLA: 240min │ Assigned to: Engineering',
      '',
      'Total tickets: 143 | At risk: 3 | Assigned: 89 | Pending: 54',
    ],
  },
  route: {
    name: 'route',
    description: 'Route tickets',
    output: [
      '► Intelligent ticket routing engine active',
      '',
      'ROUTING RULES:',
      '├─ Billing questions → Billing team (avg 1.2min response)',
      '├─ Technical support → Engineering team (avg 2.4min response)',
      '├─ Escalations → Leadership team (immediate)',
      '├─ Simple questions → Fin Agent (72% self-resolution)',
      '├─ New users → Onboarding team (dedicated workflow)',
      '└─ VIP/Enterprise → Account managers (priority queue)',
      '',
      'Current performance: 94% satisfaction | 47 routes today',
    ],
  },
  briefing: {
    name: 'briefing',
    description: 'Voice briefing engine',
    output: [
      '► Starting ElevenLabs voice briefing module...',
      '',
      '$ elevenlabs briefing --workspace=today --voice=ops_manager',
      '',
      'Generating support briefing...',
      '████████████░░░░░ 00:31',
      '',
      'Transcript:',
      '"Support volume is stable with 1,247 messages today.',
      'Billing questions up 43%. Twelve conversations at SLA risk.',
      'Fin resolved 72% of incoming chats this morning.',
      'Recommendation: Deploy extra capacity to billing team."',
      '',
      '[Next briefing: 09:00 AM] | [✓ Voice alert enabled]',
    ],
  },
  qa: {
    name: 'qa',
    description: 'Quality metrics',
    output: [
      '► Running quality & sentiment analysis...',
      '',
      '[✓] Overall CSAT: 92.1%',
      '[✓] Avg sentiment (positive): 87.3%',
      '[✓] First-response resolution: 71%',
      '[✓] Response SLA compliance: 99.7%',
      '[✓] Copilot suggestion accuracy: 94.2%',
      '[✓] Agent average rating: 4.7/5.0',
      '[✓] Escalation rate: 6.8% (target: <8%)',
      '[✓] Repeat contact rate: 3.2%',
      '',
      'Quality trend: ↑ 2.4% from last week',
    ],
  },
  copilot: {
    name: 'copilot',
    description: 'Copilot suggestions',
    output: [
      '► Activating AI Copilot draft engine...',
      '',
      'SUGGESTED RESPONSE (Confidence: 96%)',
      '─────────────────────────────────────',
      '"Hi Sarah,',
      '',
      'Thanks for reaching out! I understand you\'re experiencing',
      'a payment processing issue. I\'ve checked your account and',
      'see the payment gateway returned a temporary error.',
      '',
      'I\'m reprocessing the transaction now. You should see the',
      'charge reflected in 2-5 minutes. If any issues persist,',
      'I\'ll escalate to our billing team immediately.',
      '',
      'Best regards,',
      'Intercom Support"',
      '',
      '[Accept] [Edit] [Regenerate] [Learn more]',
    ],
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal',
    output: [],
  },
};

export function executeCommand(input: unknown): CommandResult {
  const safeInput = typeof input === 'string' ? input : '';
  const trimmedInput = safeInput.toLowerCase().trim();
  const command = COMMANDS[trimmedInput.replace('/', '')];

  if (!command) {
    return {
      command: safeInput,
      output: [
        `Command not found: ${safeInput || '[empty command]'}`,
        'Type /help for available commands',
      ],
      timestamp: new Date(),
      status: 'error',
    };
  }

  return {
    command: safeInput,
    output: Array.isArray(command.output)
      ? command.output
      : [command.output],
    timestamp: new Date(),
    status: 'success',
  };
}
