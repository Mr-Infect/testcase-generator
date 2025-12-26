# Ollama Setup Guide for Agentic Testing Platform

This guide walks you through setting up Ollama for local LLM integration with the Agentic Software Testing Platform.

## What is Ollama?

Ollama allows you to run large language models (LLMs) locally on your machine without cloud dependencies. This provides:
- **Privacy**: All data stays on your machine
- **Cost-Effective**: No API charges
- **Offline**: Works without internet connection
- **Fast**: Local processing with no latency

## System Requirements

- **RAM**: 8GB minimum (16GB+ recommended)
- **Disk Space**: 5GB+ for models
- **OS**: macOS, Linux, or Windows with WSL2
- **CPU**: Any modern processor (GPU optional but beneficial)

## Installation Steps

### 1. Download Ollama

Visit https://ollama.ai and download the installer for your operating system.

### 2. Install

- **macOS**: Run the .dmg installer
- **Linux**: Run the install script or use your package manager
- **Windows**: Run the .exe installer

### 3. Verify Installation

Open a terminal/command prompt and run:
\`\`\`bash
ollama --version
\`\`\`

You should see the version number printed.

## Downloading Models

Models are stored locally. Download one using:

\`\`\`bash
# Recommended: Mistral (best balance)
ollama pull mistral

# Alternative: Llama 2
ollama pull llama2

# Alternative: Neural Chat
ollama pull neural-chat
\`\`\`

First download takes time (model size: 4GB+). Subsequent downloads are instant.

## Starting Ollama

Run in a terminal:
\`\`\`bash
ollama serve
\`\`\`

The service will start on `http://localhost:11434`

Keep this terminal window open while using the platform.

## Configuring the Platform

1. Start the dev server: `npm run dev`
2. Navigate to Settings → Ollama AI
3. Verify connection status
4. Select your model (Mistral recommended)
5. Save configuration

## Using AI Features

With Ollama running and configured:

- **Test Generation**: Go to Configure page → "Generate Test Cases"
- **Anomaly Analysis**: Go to Agent Control → Ollama Analysis tab
- **Report Generation**: Go to Results → AI Report tab

## Environment Variables (Optional)

Add to `.env.local` for custom Ollama setup:

\`\`\`env
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=mistral
\`\`\`

## Troubleshooting

### "Ollama Offline" Error
- Ensure `ollama serve` is running
- Check no firewall is blocking localhost:11434
- Try restarting Ollama

### Model Download Stuck
- Check internet connection
- Restart Ollama
- Try: `ollama pull mistral --verbose`

### Performance Issues
- Ollama runs on CPU by default
- For faster performance, ensure adequate system RAM
- GPU support available for faster inference

## Available Models

| Model | Size | Speed | Quality |
|-------|------|-------|---------|
| Mistral | 4GB | Fast | Excellent |
| Llama 2 | 7GB | Medium | Very Good |
| Neural Chat | 4GB | Fast | Good |
| Code Llama | 7GB | Medium | Excellent (code) |

## Next Steps

Once Ollama is set up:
1. Create test projects
2. Configure your application for testing
3. Use AI features for test generation and analysis
4. Monitor and improve test coverage

For more details, see the Getting Started guide at `/docs`
