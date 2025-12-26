"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, Save, Zap, Loader } from "lucide-react"

export default function TestConfigurationPage() {
  const [config, setConfig] = useState({
    applicationUrl: "https://app.example.com",
    appName: "E-Commerce Platform",
    apiEndpoint: "https://api.example.com",
    appDescription:
      "An e-commerce platform with user authentication, product catalog, shopping cart, and payment processing.",
    testType: "functional",
    browsers: [
      { name: "Chrome", enabled: true },
      { name: "Safari", enabled: true },
      { name: "Firefox", enabled: true },
      { name: "Edge", enabled: false },
    ],
    devices: [
      { name: "Desktop", enabled: true },
      { name: "Tablet", enabled: true },
      { name: "Mobile", enabled: true },
    ],
    operatingSystems: [
      { name: "Windows", enabled: true },
      { name: "macOS", enabled: true },
      { name: "Linux", enabled: false },
    ],
    credentials: [
      { username: "admin@example.com", password: "****" },
      { username: "user@example.com", password: "****" },
    ],
  })

  const [generatedTests, setGeneratedTests] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [newEnv, setNewEnv] = useState("")

  const handleGenerateTests = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/ollama/generate-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appUrl: config.applicationUrl,
          appDescription: config.appDescription,
          testType: config.testType,
        }),
      })
      const data = await response.json()
      setGeneratedTests(data.testCases)
    } catch (error) {
      console.error("[v0] Test generation error:", error)
      setGeneratedTests("Failed to generate tests. Make sure Ollama is running.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Test Configuration</h1>
        <p className="text-muted-foreground mt-1">Setup and configure your testing environments</p>
      </div>

      {/* Application Setup */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Application Setup</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Application Name</label>
            <Input
              value={config.appName}
              onChange={(e) => setConfig({ ...config, appName: e.target.value })}
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Application URL</label>
            <Input
              value={config.applicationUrl}
              onChange={(e) => setConfig({ ...config, applicationUrl: e.target.value })}
              className="mt-2"
              placeholder="https://app.example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">API Endpoint (Optional)</label>
            <Input
              value={config.apiEndpoint}
              onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
              className="mt-2"
              placeholder="https://api.example.com"
            />
          </div>
        </div>
      </Card>

      {/* Browser Selection */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Browser Compatibility</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {config.browsers.map((browser, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
              <Checkbox
                checked={browser.enabled}
                onChange={(checked) => {
                  const updated = [...config.browsers]
                  updated[i].enabled = checked
                  setConfig({ ...config, browsers: updated })
                }}
              />
              <span className="font-medium">{browser.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Device Selection */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Device Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {config.devices.map((device, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
              <Checkbox
                checked={device.enabled}
                onChange={(checked) => {
                  const updated = [...config.devices]
                  updated[i].enabled = checked
                  setConfig({ ...config, devices: updated })
                }}
              />
              <span className="font-medium">{device.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Operating Systems */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Operating Systems</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {config.operatingSystems.map((os, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
              <Checkbox
                checked={os.enabled}
                onChange={(checked) => {
                  const updated = [...config.operatingSystems]
                  updated[i].enabled = checked
                  setConfig({ ...config, operatingSystems: updated })
                }}
              />
              <span className="font-medium">{os.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Credentials */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Test Credentials</h2>
        <div className="space-y-4">
          {config.credentials.map((cred, i) => (
            <div key={i} className="p-4 border border-border/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium">{cred.username}</p>
                <p className="text-xs text-muted-foreground">Password: {cred.password}</p>
              </div>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input placeholder="Add username" className="flex-1" />
            <Input placeholder="Add password" type="password" className="flex-1" />
            <Button variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Test Generation */}
      <Card className="p-6 border-primary/30 bg-primary/5">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          AI-Powered Test Generation
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use Ollama to intelligently generate test cases based on your application description.
        </p>

        <div className="mb-4">
          <label className="text-sm font-medium">Application Description</label>
          <textarea
            value={config.appDescription}
            onChange={(e) => setConfig({ ...config, appDescription: e.target.value })}
            className="w-full mt-2 p-3 border border-border/50 rounded-lg bg-background resize-none"
            rows={4}
            placeholder="Describe your application features and workflows..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium">Test Type</label>
            <select
              value={config.testType}
              onChange={(e) => setConfig({ ...config, testType: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border/50 rounded-lg bg-background"
            >
              <option value="functional">Functional Testing</option>
              <option value="performance">Performance Testing</option>
              <option value="security">Security Testing</option>
              <option value="integration">Integration Testing</option>
            </select>
          </div>
        </div>

        <Button onClick={handleGenerateTests} disabled={isGenerating} className="mb-4">
          {isGenerating ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating with Ollama...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate Test Cases
            </>
          )}
        </Button>

        {generatedTests && (
          <div className="mt-4 p-4 bg-card border border-border/50 rounded-lg max-h-96 overflow-y-auto">
            <h3 className="font-semibold mb-2">Generated Test Cases</h3>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">{generatedTests}</pre>
          </div>
        )}
      </Card>

      {/* Testing Parameters */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-6">Testing Parameters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Max Test Duration (minutes)</label>
            <Input value="60" type="number" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Parallel Test Threads</label>
            <Input value="4" type="number" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Retry Failed Tests</label>
            <Input value="2" type="number" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Screenshot on Failure</label>
            <div className="mt-2 flex items-center space-x-3">
              <Checkbox defaultChecked={true} />
              <span className="text-sm">Enable</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  )
}
