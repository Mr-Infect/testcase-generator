"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Lock, Bell, LogOut, Brain, CheckCircle2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const [ollamaStatus, setOllamaStatus] = useState("checking")
  const [ollamaConfig, setOllamaConfig] = useState({
    baseUrl: "http://localhost:11434",
    model: "mistral",
  })
  const [availableModels, setAvailableModels] = useState<string[]>([])

  useEffect(() => {
    checkOllamaHealth()
  }, [])

  const checkOllamaHealth = async () => {
    try {
      const res = await fetch("/api/ollama/health")
      const data = await res.json()
      setOllamaStatus(data.status)
      setAvailableModels(data.availableModels || [])
      if (data.baseUrl) setOllamaConfig((prev) => ({ ...prev, baseUrl: data.baseUrl }))
      if (data.model) setOllamaConfig((prev) => ({ ...prev, model: data.model }))
    } catch {
      setOllamaStatus("error")
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage platform and account settings</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ollama">Ollama AI</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card className="p-6 border-border/50 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </h2>
            </div>

            <div>
              <label className="text-sm font-medium">Organization Name</label>
              <Input value="TechCorp QA Division" className="mt-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" value="qa-admin@techcorp.com" className="mt-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Time Zone</label>
              <Input value="UTC-5 (Eastern Time)" className="mt-2" />
            </div>

            <div className="pt-4 border-t border-border/50 flex gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Ollama Configuration Tab */}
        <TabsContent value="ollama">
          <Card className="p-6 border-border/50 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Ollama AI Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure your local Ollama instance for AI-powered testing
              </p>
            </div>

            {/* Status */}
            <div className="p-4 rounded-lg border border-border/50 flex items-center gap-3">
              {ollamaStatus === "connected" ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-600">Ollama Connected</p>
                    <p className="text-sm text-muted-foreground">Successfully connected to local Ollama instance</p>
                  </div>
                </>
              ) : ollamaStatus === "checking" ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="font-semibold">Checking connection...</p>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-600">Connection Failed</p>
                    <p className="text-sm text-muted-foreground">Make sure Ollama is running on your machine</p>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Getting Started:</strong> Download Ollama from ollama.ai and run it locally. Then configure your
                preferred model below.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Ollama Base URL</label>
              <Input
                value={ollamaConfig.baseUrl}
                onChange={(e) => setOllamaConfig({ ...ollamaConfig, baseUrl: e.target.value })}
                className="mt-2"
                placeholder="http://localhost:11434"
              />
              <p className="text-xs text-muted-foreground mt-2">Default: http://localhost:11434</p>
            </div>

            <div>
              <label className="text-sm font-medium">LLM Model</label>
              <select
                value={ollamaConfig.model}
                onChange={(e) => setOllamaConfig({ ...ollamaConfig, model: e.target.value })}
                className="w-full mt-2 px-3 py-2 border border-border/50 rounded-lg bg-background"
              >
                <option value="mistral">Mistral (Recommended)</option>
                <option value="llama2">Llama 2</option>
                <option value="neural-chat">Neural Chat</option>
                <option value="codellama">Code Llama</option>
              </select>
              {availableModels.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Available models on your system: {availableModels.join(", ")}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-border/50 flex gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button onClick={checkOllamaHealth}>Test Connection</Button>
              <Button>Save Configuration</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="p-6 border-border/50 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" placeholder="••••••••" className="mt-2" />
              </div>

              <div className="pt-4 border-t border-border/50">
                <h3 className="font-semibold mb-3">API Keys</h3>
                <Button variant="outline" size="sm">
                  Generate New API Key
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50 flex gap-2 justify-end">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6 border-border/50 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "Test execution completed",
                "Critical defects detected",
                "Agent errors or failures",
                "Daily test summary",
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <span className="text-sm">{notif}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50 flex gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/30 bg-destructive/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mt-1">Logout from this device</p>
          </div>
          <Button variant="destructive" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}
