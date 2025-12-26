"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function DocsPage() {
  const [copiedCommand, setCopiedCommand] = useState("")

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedCommand(cmd)
    setTimeout(() => setCopiedCommand(""), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Getting Started</h1>
          <p className="text-lg text-muted-foreground">
            Setup and configure the Agentic Software Testing Platform with local Ollama integration
          </p>
        </div>

        {/* Prerequisites */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">1. Prerequisites</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">System Requirements:</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Node.js 18+ and npm</li>
                <li>At least 4GB RAM (8GB+ recommended)</li>
                <li>macOS, Linux, or Windows with WSL2</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Software:</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Git</li>
                <li>A modern web browser</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Install Ollama */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">2. Install Ollama</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ollama allows you to run large language models locally. Download it from the official website:
            </p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-semibold mb-2">Download Ollama</p>
              <a
                href="https://ollama.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ollama.ai
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Installation Steps:</h3>
              <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                <li>Download the installer for your operating system</li>
                <li>Run the installer and follow the setup wizard</li>
                <li>Restart your computer (required on some systems)</li>
                <li>
                  Verify installation by opening terminal and running:{" "}
                  <code className="bg-muted px-2 py-1 rounded text-xs">ollama --version</code>
                </li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Pull a Model */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">3. Pull an LLM Model</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Download a language model that Ollama will use. We recommend Mistral for the best balance of speed and
              quality.
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "Mistral (Recommended)",
                  cmd: "ollama pull mistral",
                  desc: "Fast and efficient, great for general use",
                },
                { name: "Llama 2", cmd: "ollama pull llama2", desc: "Powerful model from Meta" },
                { name: "Neural Chat", cmd: "ollama pull neural-chat", desc: "Optimized for conversations" },
              ].map((model) => (
                <div key={model.cmd} className="p-4 border border-border/50 rounded-lg space-y-2">
                  <h4 className="font-semibold">{model.name}</h4>
                  <p className="text-sm text-muted-foreground">{model.desc}</p>
                  <div className="flex gap-2 items-center bg-muted p-2 rounded font-mono text-xs">
                    <code className="flex-1 overflow-x-auto">{model.cmd}</code>
                    <Button size="sm" variant="ghost" onClick={() => copyCommand(model.cmd)} className="flex-shrink-0">
                      {copiedCommand === model.cmd ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Start Ollama */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">4. Start Ollama Service</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ollama must be running for the platform to access LLM capabilities. Start it with:
            </p>
            <div className="flex gap-2 items-center bg-muted p-3 rounded font-mono text-sm">
              <code className="flex-1">ollama serve</code>
              <Button size="sm" variant="ghost" onClick={() => copyCommand("ollama serve")}>
                {copiedCommand === "ollama serve" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">The service will start on http://localhost:11434 by default</p>
          </div>
        </Card>

        {/* Run the Platform */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">5. Run the Platform</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Install dependencies and start the development server:</p>
            <div className="space-y-3">
              <div className="flex gap-2 items-center bg-muted p-3 rounded font-mono text-sm">
                <code className="flex-1">npm install</code>
                <Button size="sm" variant="ghost" onClick={() => copyCommand("npm install")}>
                  {copiedCommand === "npm install" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2 items-center bg-muted p-3 rounded font-mono text-sm">
                <code className="flex-1">npm run dev</code>
                <Button size="sm" variant="ghost" onClick={() => copyCommand("npm run dev")}>
                  {copiedCommand === "npm run dev" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Open http://localhost:3000 in your browser</p>
          </div>
        </Card>

        {/* Configuration */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">6. Configuration (Optional)</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Configure Ollama settings in the platform:</p>
            <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
              <li>Navigate to Settings in the dashboard</li>
              <li>Go to the "Ollama AI" tab</li>
              <li>Verify Ollama connection status</li>
              <li>Select your preferred LLM model</li>
              <li>Save configuration</li>
            </ol>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">Key Features Enabled</h2>
          <div className="space-y-3">
            {[
              { feature: "AI-Powered Test Generation", desc: "Generate test cases automatically using LLMs" },
              { feature: "Root Cause Analysis", desc: "Analyze defects and suggest fixes intelligently" },
              { feature: "Anomaly Analysis", desc: "Get detailed insights on detected anomalies" },
              { feature: "Report Generation", desc: "Generate professional QA reports automatically" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border border-border/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">{item.feature}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Troubleshooting */}
        <Card className="p-8 border-border/50 space-y-6">
          <h2 className="text-2xl font-bold">Troubleshooting</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ollama Connection Failed</h3>
              <p className="text-sm text-muted-foreground mb-2">If you see "Ollama Offline" badge:</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>
                  Ensure Ollama is running: <code className="bg-muted px-1">ollama serve</code>
                </li>
                <li>Check that it's running on http://localhost:11434</li>
                <li>Restart Ollama if needed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Model Not Found</h3>
              <p className="text-sm text-muted-foreground mb-2">If a model isn't available:</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>
                  Run <code className="bg-muted px-1">ollama pull mistral</code> to download it
                </li>
                <li>Wait for the download to complete</li>
                <li>Refresh the platform settings page</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Ready to get started?</p>
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
