"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sparkles, RefreshCw, Download, Brain, AlertTriangle, TrendingUp, Zap, BarChart3 } from "lucide-react"

export default function OllamaAnalysisPage() {
  const [selectedReports, setSelectedReports] = useState<number[]>([1, 2])
  const [analysisInProgress, setAnalysisInProgress] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const availableReports = [
    { id: 1, name: "Report #487", date: "Dec 18, 2024", tests: 1247, defects: 19, duration: "45m" },
    { id: 2, name: "Report #486", date: "Dec 17, 2024", tests: 1203, defects: 24, duration: "42m" },
    { id: 3, name: "Report #485", date: "Dec 16, 2024", tests: 1180, defects: 28, duration: "48m" },
    { id: 4, name: "Report #484", date: "Dec 15, 2024", tests: 1156, defects: 35, duration: "51m" },
    { id: 5, name: "Report #483", date: "Dec 14, 2024", tests: 1125, defects: 42, duration: "55m" },
  ]

  const aiInsights = [
    {
      category: "Pattern Detection",
      findings: [
        "Consistent failure in Payment module's card validation API on every 3rd test run",
        "UI state management issues causing intermittent test failures (98% confidence)",
        "Database connection timeouts occurring after 50+ concurrent test executions",
      ],
    },
    {
      category: "Root Cause Correlation",
      findings: [
        "Payment failures linked to unhandled race condition in async state updates",
        "UI intermittency correlated with insufficient CSS transition timing buffers",
        "DB timeouts caused by connection pool exhaustion under load testing",
      ],
    },
    {
      category: "Recommendations",
      findings: [
        "Implement retry logic with exponential backoff for payment API calls",
        "Add 100ms buffer to CSS transitions and increase test wait time to 2s",
        "Increase database connection pool from 20 to 50 and implement connection reuse",
        "Prioritize fixing payment module - affects 15% of overall test suite",
      ],
    },
    {
      category: "Optimization Opportunities",
      findings: [
        "Test execution time reduced by 8.3% if tests executed in sequential vs parallel mode for this module",
        "Resource utilization improves by 12% when running tests during off-peak hours",
        "Consider splitting large test suites - current batch takes 51 minutes, could be 35m with optimized grouping",
      ],
    },
  ]

  const comparativeAnalysis = [
    {
      metric: "Total Tests",
      current: 1247,
      previous: 1203,
      change: 44,
      trend: "up",
      insight: "More comprehensive test coverage",
    },
    {
      metric: "Defect Detection Rate",
      current: 1.5,
      previous: 2.0,
      change: -0.5,
      trend: "down",
      insight: "Improving code quality or previous issues resolved",
    },
    {
      metric: "Average Execution Time",
      current: 45,
      previous: 42,
      change: 3,
      trend: "up",
      insight: "Slight slowdown - investigate performance regression",
    },
    {
      metric: "Test Pass Rate",
      current: 98.5,
      previous: 98.0,
      change: 0.5,
      trend: "up",
      insight: "Consistent test stability",
    },
  ]

  const handleAnalyze = async () => {
    setAnalysisInProgress(true)
    // Simulate API call to Ollama
    setTimeout(() => {
      setAnalysis({
        summary:
          "Analyzed 2 reports with 2,450 total tests. Identified 3 critical patterns and 4 optimization opportunities.",
        confidence: 94,
        processingTime: 2.3,
      })
      setAnalysisInProgress(false)
    }, 3000)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            Advanced Ollama Analysis
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered cross-report pattern detection and recommendations</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Analysis
        </Button>
      </div>

      {/* Report Selection */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Select Reports to Analyze</h2>
        <div className="space-y-3 mb-6">
          {availableReports.map((report) => (
            <div
              key={report.id}
              onClick={() =>
                setSelectedReports((prev) =>
                  prev.includes(report.id) ? prev.filter((id) => id !== report.id) : [...prev, report.id],
                )
              }
              className={`p-4 border rounded-lg cursor-pointer transition ${
                selectedReports.includes(report.id)
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{report.date}</p>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{report.tests} tests</span>
                  <span>{report.defects} defects</span>
                  <span>{report.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={selectedReports.length === 0 || analysisInProgress}
          className="w-full gap-2"
          size="lg"
        >
          {analysisInProgress ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing with Ollama...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Run AI Analysis
            </>
          )}
        </Button>
      </Card>

      {analysis && (
        <>
          {/* Analysis Summary */}
          <Card className="p-6 border-border/50 bg-primary/5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">Analysis Summary</h2>
                <p className="text-foreground">{analysis.summary}</p>
                <div className="flex gap-6 mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Confidence: <span className="text-primary font-semibold">{analysis.confidence}%</span>
                  </span>
                  <span className="text-muted-foreground">
                    Processing Time: <span className="font-semibold">{analysis.processingTime}s</span>
                  </span>
                </div>
              </div>
              <Brain className="w-12 h-12 text-primary/30" />
            </div>
          </Card>

          {/* Comparative Analysis */}
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Comparative Analysis
            </h2>
            <div className="space-y-3">
              {comparativeAnalysis.map((item, i) => (
                <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.metric}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.insight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{item.current}</p>
                      <p className={`text-sm font-semibold ${item.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                        {item.trend === "up" ? "+" : "-"}
                        {Math.abs(item.change)} ({item.trend})
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${item.trend === "up" ? "bg-red-500" : "bg-green-500"}`}
                      style={{ width: `${Math.min(item.current, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights by Category */}
          <div className="grid lg:grid-cols-2 gap-6">
            {aiInsights.map((section, i) => {
              const icons = [AlertTriangle, Brain, TrendingUp, Zap]
              const Icon = icons[i % icons.length]

              return (
                <Card key={i} className="p-6 border-border/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.findings.map((finding, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-foreground">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>

          {/* Action Items */}
          <Card className="p-6 border-border/50 bg-accent/5">
            <h2 className="text-lg font-semibold mb-4">Recommended Actions</h2>
            <div className="space-y-2">
              {[
                "Priority 1: Fix payment module race condition (Estimated: 2-3 hours)",
                "Priority 2: Increase database connection pool to 50 (Estimated: 30 minutes)",
                "Priority 3: Add CSS transition buffers and increase test timeouts (Estimated: 1 hour)",
                "Optimization: Consider test suite reorganization for 31% faster execution",
              ].map((action, i) => (
                <div key={i} className="flex gap-3 p-3 bg-background rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground">{action}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
