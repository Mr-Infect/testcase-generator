# Agentic Software Testing Platform

An AI-driven autonomous testing platform that leverages local LLMs (Ollama) for intelligent test case generation, anomaly detection, and root cause analysis.

## Features

- **Autonomous Agent Testing**: AI agents automatically explore applications and generate test cases
- **AI-Powered Test Generation**: Generate comprehensive test scenarios using Ollama LLMs
- **Anomaly Detection**: Identify deviations from expected behavior automatically
- **Root Cause Analysis**: Understand why defects occur with AI-powered analysis
- **Self-Healing Tests**: Tests automatically adapt to UI changes
- **Real-time Dashboard**: Monitor testing metrics and progress
- **Knowledge Base**: Store and learn from discovered behaviors

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui, Recharts
- **Backend**: Next.js API Routes
- **AI/ML**: Ollama (Local LLMs)
- **No Docker**: Everything runs natively

## Prerequisites

- Node.js 18+
- npm or yarn
- Ollama installed and running (see [OLLAMA_SETUP.md](./OLLAMA_SETUP.md))

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Start Ollama Service

\`\`\`bash
ollama serve
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

### 4. Open in Browser

Visit `http://localhost:3000`

## Project Structure

\`\`\`
app/
├── page.tsx # Landing page
├── dashboard/
│ ├── page.tsx # Main dashboard
│ ├── agent/ # Agent control panel
│ ├── configure/ # Test configuration
│ ├── projects/ # Project management
│ ├── results/ # Test results & reports
│ ├── knowledge/ # Knowledge base
│ └── settings/ # Settings (Ollama config)
├── api/
│ └── ollama/ # Ollama integration routes
├── docs/
│ └── page.tsx # Getting started guide
└── globals.css # Theme & styles

lib/
├── ollama-client.ts # Ollama API client

components/
├── ollama-status-badge.tsx # Connection status indicator
└── ui/ # shadcn components
\`\`\`

## Ollama Integration

The platform integrates with locally running Ollama for:

- **Test Case Generation**: Generates functional and edge case tests
- **Anomaly Analysis**: Analyzes detected defects and suggests fixes
- **Report Generation**: Creates professional QA reports

All AI features work offline with no external API dependencies.but required to install the neccessary model locally

### Using Ollama Features

1. **Configure**: Settings → Ollama AI tab
2. **Generate Tests**: Configure page → "Generate Test Cases"
3. **Analyze Anomalies**: Agent Control → Ollama Analysis
4. **Generate Reports**: Results → AI Report

## Key Pages

| Page           | Path                   | Description               |
| -------------- | ---------------------- | ------------------------- |
| Landing        | `/`                    | Platform overview         |
| Dashboard      | `/dashboard`           | Real-time metrics         |
| Projects       | `/dashboard/projects`  | Manage test projects      |
| Agent Control  | `/dashboard/agent`     | Monitor AI agents         |
| Configure      | `/dashboard/configure` | Setup testing environment |
| Results        | `/dashboard/results`   | Test results & defects    |
| Knowledge Base | `/dashboard/knowledge` | Learned behaviors         |
| Settings       | `/dashboard/settings`  | Ollama configuration      |
| Docs           | `/docs`                | Setup guide               |

## API Routes

| Route                         | Method | Purpose                 |
| ----------------------------- | ------ | ----------------------- |
| `/api/ollama/health`          | GET    | Check Ollama connection |
| `/api/ollama/models`          | GET    | List available models   |
| `/api/ollama/generate-tests`  | POST   | Generate test cases     |
| `/api/ollama/analyze-anomaly` | POST   | Analyze defects         |
| `/api/ollama/generate-report` | POST   | Generate QA report      |

## Configuration

### Environment Variables (Optional)

Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=mistral
\`\`\`

### Ollama Setup

See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for detailed instructions.

## Development

### Build

\`\`\`bash
npm run build
\`\`\`

### Production

\`\`\`bash
npm start
\`\`\`

### Type Check

\`\`\`bash
npm run type-check
\`\`\`

## Performance Tips

- Use Mistral model for best speed/quality balance
- Ensure 8GB+ RAM available for Ollama
- Keep Ollama service running in background
- GPU support available (check Ollama docs)

## Troubleshooting

### Ollama Connection Failed

- Verify `ollama serve` is running
- Check localhost:11434 is accessible
- Restart both services

### AI Features Not Working

- Ensure model is downloaded (`ollama pull mistral`)
- Check Settings → Ollama AI for status
- Review browser console for errors

### Slow Performance

- Increase available system RAM
- Close other applications
- GPU acceleration recommended

## Contributing

This is a v0-generated project. To modify:

1. Edit files in the codebase
2. Run `npm run dev` to test
3. Build and deploy when ready

## Deployment

For production deployment:

\`\`\`bash
npm run build
npm start
\`\`\`

Environment variables must be set on your hosting platform.

## License

MIT

## Support

For issues or questions:

1. Check [OLLAMA_SETUP.md](./OLLAMA_SETUP.md)
2. Visit `/docs` for setup guide
3. Check Settings → Ollama AI for connection status

## Additional Resources

- [Ollama Official](https://ollama.ai)
- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
