"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Play, Pause, RotateCcw, Zap, Brain, Loader } from "lucide-react"

export default function AgentControlPage() {
  const [agentStatus, setAgentStatus] = useState("idle")
  const [progress, setProgress] = useState(0)
  const [anomalyAnalysis, setAnomalyAnalysis] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const agents = [
    {
      id: 1,
      name: "Exploration Agent",
      status: "active",
      testsGenerated: 45,
      coverage: 78,
      uptime: "23h 45m",
      lastActivity: "2 minutes ago",
    },
    {
      id: 2,
      name: "Anomaly Detection",
      status: "active",
      defectsFound: 12,
      accuracy: 94,
      uptime: "23h 45m",
      lastActivity: "1 minute ago",
    },
    {
      id: 3,
      name: "Root Cause Analyzer",
      status: "idle",
      analysisRuns: 8,
      avgTime: "2.5s",
      uptime: "23h 45m",
      lastActivity: "15 minutes ago",
    },
  ]

  const recentActivity = [
    { time: "14:32", action: "Exploration", result: "Generated 3 new test cases", status: "success" },
    { time: "14:28", action: "Anomaly Detection", result: "Detected UI regression", status: "alert" },
    { time: "14:22", action: "Root Cause Analysis", result: "Analyzed 2 defects", status: "success" },
    { time: "14:15", action: "Exploration", result: "Mapped new user flow", status: "success" },
    { time: "14:08", action: "Anomaly Detection", result: "All systems normal", status: "success" },
  ]

  const workflowSteps = [
    { name: "Initiation", status: "complete" },
    { name: "Exploration", status: "active" },
    { name: "Anomaly Detection", status: "pending" },
    { name: "Reporting", status: "pending" },
  ]

  const handleAnalyzeAnomaly = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/ollama/analyze-anomaly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anomalyDescription: "Payment button not responsive on Safari after resizing to 768px width",
          testLogs: "CSS media query not applied. Expected button width: 100px, Actual: auto",
          appBehavior: "Payment button should be responsive across all browsers and device sizes",
        }),
      })
      const data = await response.json()
      setAnomalyAnalysis(data.analysis)
    } catch (error) {
      console.error("[v0] Anomaly analysis error:", error)
      setAnomalyAnalysis("Failed to analyze anomaly. Check Ollama connection.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Control Panel</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage autonomous testing agents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Pause className="w-4 h-4 mr-2" />
            Pause All
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Start Agents
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">Active Agents</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="reasoning">Decision Log</TabsTrigger>
          <TabsTrigger value="ollama-analysis">Ollama Analysis</TabsTrigger>
        </TabsList>

        {/* Active Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="p-6 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Status:{" "}
                      <span className={agent.status === "active" ? "text-green-600" : "text-gray-500"}>
                        {agent.status === "active" ? "● Active" : "● Idle"}
                      </span>
                    </p>
                  </div>
                  {agent.status === "active" && <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />}
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-border/50">
                  {agent.id === 1 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tests Generated</span>
                        <span className="font-semibold">{agent.testsGenerated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Coverage</span>
                        <span className="font-semibold">{agent.coverage}%</span>
                      </div>
                    </>
                  )}
                  {agent.id === 2 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Defects Found</span>
                        <span className="font-semibold text-red-600">{agent.defectsFound}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Accuracy</span>
                        <span className="font-semibold">{agent.accuracy}%</span>
                      </div>
                    </>
                  )}
                  {agent.id === 3 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Analysis Runs</span>
                        <span className="font-semibold">{agent.analysisRuns}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Avg Analysis Time</span>
                        <span className="font-semibold">{agent.avgTime}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="text-xs text-muted-foreground space-y-1 mb-4">
                  <p>Uptime: {agent.uptime}</p>
                  <p>Last: {agent.lastActivity}</p>
                </div>

                <Button variant={agent.status === "active" ? "outline" : "default"} className="w-full" size="sm">
                  {agent.status === "active" ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Agent
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Agent
                    </>
                  )}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-6">Agentic Testing Workflow</h2>
            <div className="space-y-4">
              {workflowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                      step.status === "complete"
                        ? "bg-green-500 text-white"
                        : step.status === "active"
                          ? "bg-primary text-primary-foreground animate-pulse"
                          : "bg-border text-foreground/50"
                    }`}
                  >
                    {step.status === "complete" ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.status === "complete" ? "Completed" : step.status === "active" ? "In Progress" : "Pending"}
                    </p>
                  </div>
                  {step.status === "active" && (
                    <div className="flex gap-1">
                      {[0, 1, 2].map((j) => (
                        <div
                          key={j}
                          className="w-2 h-2 bg-primary rounded-full animate-pulse"
                          style={{ animationDelay: `${j * 100}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Cognitive Engine Insights
              </h4>
              <p className="text-sm text-muted-foreground">
                Currently analyzing user authentication flow. Detected 2 potential edge cases that require additional
                test scenarios. Recommendations being generated...
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-6">Recent Agent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 border border-border/50 rounded-lg hover:bg-card/50 transition"
                >
                  <div className="pt-1">
                    {activity.status === "success" ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.action}</h4>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{activity.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Decision Log Tab */}
        <TabsContent value="reasoning">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Agent Decision & Reasoning Log</h2>
            <div className="space-y-4">
              {[
                {
                  decision: "Generated Login Test Scenario",
                  reasoning: "Detected authentication module with multiple input fields and validation logic",
                  confidence: "94%",
                },
                {
                  decision: "Created Payment Flow Test",
                  reasoning: "Observed multi-step checkout process with cart, billing, and confirmation screens",
                  confidence: "87%",
                },
                {
                  decision: "Anomaly Detected in Response Time",
                  reasoning: "API response time increased by 3 seconds compared to baseline metrics",
                  confidence: "91%",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Brain className="w-4 h-4 text-primary" />
                        {item.decision}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2">{item.reasoning}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{item.confidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Ollama Analysis Tab */}
        <TabsContent value="ollama-analysis">
          <Card className="p-6 border-border/50 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI-Powered Root Cause Analysis
            </h2>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Use Ollama to analyze detected anomalies and get intelligent root cause assessment powered by local
                LLMs.
              </p>
            </div>

            <Button onClick={handleAnalyzeAnomaly} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing with Ollama...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze Last Anomaly
                </>
              )}
            </Button>

            {anomalyAnalysis && (
              <div className="p-4 bg-card border border-border/50 rounded-lg space-y-4">
                <h3 className="font-semibold">Analysis Results</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words bg-background p-3 rounded border border-border/50">
                    {anomalyAnalysis}
                  </pre>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
