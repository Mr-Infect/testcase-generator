"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, Filter, AlertCircle, CheckCircle2, Clock, ChevronDown, Zap, Loader } from "lucide-react"

export default function ResultsPage() {
  const [expandedDefect, setExpandedDefect] = useState(null)
  const [generatedReport, setGeneratedReport] = useState<string>("")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const defects = [
    {
      id: 1,
      title: "Payment Button Not Responsive",
      severity: "critical",
      environment: "Safari on macOS",
      detectedBy: "Exploration Agent",
      timestamp: "2024-01-15 14:32",
      rootCause: "CSS media query not applied for Safari browser",
      reproductionSteps: [
        "Navigate to checkout page",
        "Resize browser to 768px width",
        "Attempt to click payment button",
      ],
      screenshot: "screenshot-1.png",
    },
    {
      id: 2,
      title: "UI Regression in Form Validation",
      severity: "high",
      environment: "Chrome on Windows",
      detectedBy: "Self-Healing Test Suite",
      timestamp: "2024-01-15 13:45",
      rootCause: "Recent CSS update removed border styling on error state",
      reproductionSteps: ["Fill form with invalid email", "Click submit button", "Observe missing error styling"],
      screenshot: "screenshot-2.png",
    },
    {
      id: 3,
      title: "Memory Leak in User Session",
      severity: "medium",
      environment: "Mobile iOS",
      detectedBy: "Anomaly Detection Agent",
      timestamp: "2024-01-15 12:20",
      rootCause: "Event listeners not properly cleaned up on page navigation",
      reproductionSteps: ["Login as user", "Navigate through 5+ pages", "Check memory consumption"],
      screenshot: "screenshot-3.png",
    },
  ]

  const testExecutionData = [
    { date: "Mon", passed: 120, failed: 8, skipped: 2 },
    { date: "Tue", passed: 135, failed: 5, skipped: 2 },
    { date: "Wed", passed: 142, failed: 6, skipped: 1 },
    { date: "Thu", passed: 156, failed: 4, skipped: 0 },
    { date: "Fri", passed: 168, failed: 3, skipped: 1 },
    { date: "Sat", passed: 174, failed: 2, skipped: 0 },
  ]

  const defectTrendData = [
    { date: "Week 1", critical: 3, high: 8, medium: 15, low: 12 },
    { date: "Week 2", critical: 1, high: 6, medium: 12, low: 10 },
    { date: "Week 3", critical: 2, high: 4, medium: 8, low: 7 },
    { date: "Week 4", critical: 0, high: 2, medium: 5, low: 4 },
  ]

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    try {
      const response = await fetch("/api/ollama/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testResults: "759 tests executed with 97.4% pass rate",
          defectsFound: "18 defects detected: 3 critical, 5 high, 7 medium, 3 low",
          executionTime: "4h 32m 15s",
          coverage: "87.5% line coverage, 92.3% branch coverage",
        }),
      })
      const data = await response.json()
      setGeneratedReport(data.report)
    } catch (error) {
      console.error("[v0] Report generation error:", error)
      setGeneratedReport("Failed to generate report. Check Ollama connection.")
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const getSeverityColor = (severity) => {
    const colors = {
      critical: "text-red-600 bg-red-500/10",
      high: "text-orange-600 bg-orange-500/10",
      medium: "text-yellow-600 bg-yellow-500/10",
      low: "text-green-600 bg-green-500/10",
    }
    return colors[severity] || colors.low
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Results & Reports</h1>
          <p className="text-muted-foreground mt-1">Comprehensive testing analytics and defect insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tests">Test Execution</TabsTrigger>
          <TabsTrigger value="ai-report">AI Report</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Tests",
                value: "759",
                trend: "+12%",
                icon: CheckCircle2,
              },
              {
                label: "Pass Rate",
                value: "97.4%",
                trend: "+2%",
                icon: CheckCircle2,
              },
              {
                label: "Total Defects",
                value: "18",
                trend: "-35%",
                icon: AlertCircle,
              },
              {
                label: "Avg Test Time",
                value: "2.3s",
                trend: "-8%",
                icon: Clock,
              },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="p-4 border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                      <p className="text-xs text-accent mt-1">{stat.trend}</p>
                    </div>
                    <Icon className="w-8 h-8 text-primary/40" />
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Executive Summary</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Latest test run completed with <strong className="text-foreground">759 tests</strong> executed across 4
                environments with a <strong className="text-foreground">97.4% pass rate</strong>. The platform detected{" "}
                <strong className="text-accent">18 defects</strong> through autonomous testing agents, with 3 marked as
                critical priority.
              </p>
              <p>
                <strong className="text-foreground">Root Cause Analysis</strong> has identified the underlying issues
                for 15 defects. Self-healing mechanisms have automatically updated test cases to adapt to 2 recent UI
                changes, reducing manual maintenance overhead by an estimated 40 hours.
              </p>
              <p>
                <strong className="text-foreground">Recommended Actions:</strong> Address critical defects in payment
                flow (detected in Safari), implement edge case handling for form validation, and investigate memory
                optimization opportunities in session management.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Defects Tab */}
        <TabsContent value="defects" className="space-y-4">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Detected Defects</h2>
            <div className="space-y-3">
              {defects.map((defect) => (
                <div key={defect.id}>
                  <div
                    className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition cursor-pointer"
                    onClick={() => setExpandedDefect(expandedDefect === defect.id ? null : defect.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{defect.title}</h3>
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium capitalize ${getSeverityColor(
                              defect.severity,
                            )}`}
                          >
                            {defect.severity}
                          </span>
                        </div>
                        <div className="flex gap-6 mt-2 text-xs text-muted-foreground">
                          <span>{defect.environment}</span>
                          <span>{defect.detectedBy}</span>
                          <span>{defect.timestamp}</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition ${expandedDefect === defect.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedDefect === defect.id && (
                    <div className="mt-2 p-4 bg-card/50 border border-border/50 rounded-lg space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Root Cause</h4>
                        <p className="text-sm text-muted-foreground">{defect.rootCause}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Reproduction Steps</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {defect.reproductionSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <Button variant="outline" size="sm">
                        View Full Report
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <h2 className="text-lg font-semibold mb-4">Defect Trend Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={defectTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: `1px solid var(--border)`,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="critical" fill="#ef4444" />
                  <Bar dataKey="high" fill="#f97316" />
                  <Bar dataKey="medium" fill="#eab308" />
                  <Bar dataKey="low" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Test Execution Tab */}
        <TabsContent value="tests">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Test Execution Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={testExecutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: `1px solid var(--border)`,
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="passed" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* AI-Generated Report Tab */}
        <TabsContent value="ai-report">
          <Card className="p-6 border-border/50 space-y-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              AI-Generated Executive Report
            </h2>

            <p className="text-sm text-muted-foreground">
              Generate a professional QA report powered by Ollama LLM analysis of your test results.
            </p>

            <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
              {isGeneratingReport ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate AI Report
                </>
              )}
            </Button>

            {generatedReport && (
              <div className="p-4 bg-card border border-border/50 rounded-lg space-y-4 max-h-96 overflow-y-auto">
                <h3 className="font-semibold">Generated Report</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{generatedReport}</pre>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
