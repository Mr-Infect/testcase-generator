"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Line,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { Brain, TrendingUp, Zap, Target, Lightbulb, Award } from "lucide-react"

export default function AgentPerformancePage() {
  // Agent learning progression
  const agentLearningData = [
    { day: "Day 1", accuracy: 62, efficiency: 45, coverage: 35, adaptation: 20 },
    { day: "Day 3", accuracy: 71, efficiency: 58, coverage: 48, adaptation: 35 },
    { day: "Day 5", accuracy: 78, efficiency: 68, coverage: 62, adaptation: 52 },
    { day: "Day 7", accuracy: 82, efficiency: 76, coverage: 72, adaptation: 64 },
    { day: "Day 10", accuracy: 87, efficiency: 82, coverage: 81, adaptation: 75 },
    { day: "Day 14", accuracy: 91, efficiency: 88, coverage: 87, adaptation: 82 },
    { day: "Day 21", accuracy: 94, efficiency: 92, coverage: 92, adaptation: 89 },
  ]

  // False positive/negative rates over time
  const accuracyMetrics = [
    { week: "Week 1", falsePositives: 12, falseNegatives: 8, truePositives: 87, accuracy: 87 },
    { week: "Week 2", falsePositives: 9, falseNegatives: 6, truePositives: 91, accuracy: 91 },
    { week: "Week 3", falsePositives: 6, falseNegatives: 4, truePositives: 94, accuracy: 94 },
    { week: "Week 4", falsePositives: 4, falseNegatives: 3, truePositives: 96, accuracy: 96 },
  ]

  // Agent comparison
  const agentComparison = [
    {
      name: "Agent Alpha",
      detectionRate: 91,
      falsePositives: 4,
      avgExecutionTime: 42,
      coverage: 87,
      efficiency: 88,
    },
    {
      name: "Agent Beta",
      detectionRate: 87,
      falsePositives: 8,
      avgExecutionTime: 48,
      coverage: 82,
      efficiency: 80,
    },
    {
      name: "Agent Gamma",
      detectionRate: 78,
      falsePositives: 14,
      avgExecutionTime: 55,
      coverage: 74,
      efficiency: 71,
    },
  ]

  // Decision pattern improvements
  const decisionPatterns = [
    {
      strategy: "Parallel Path Exploration",
      initialAccuracy: 65,
      currentAccuracy: 92,
      improvement: 27,
      successfulRuns: 1847,
    },
    {
      strategy: "State Machine Learning",
      initialAccuracy: 58,
      currentAccuracy: 89,
      improvement: 31,
      successfulRuns: 2103,
    },
    {
      strategy: "Dynamic Boundary Detection",
      initialAccuracy: 72,
      currentAccuracy: 94,
      improvement: 22,
      successfulRuns: 1654,
    },
    {
      strategy: "Adaptive Wait Time Calculation",
      initialAccuracy: 60,
      currentAccuracy: 88,
      improvement: 28,
      successfulRuns: 1923,
    },
  ]

  // Performance KPIs
  const performanceKPIs = [
    {
      icon: Target,
      label: "Defect Detection Accuracy",
      value: "94%",
      change: "+32%",
      color: "text-green-500",
    },
    {
      icon: Zap,
      label: "Test Execution Efficiency",
      value: "92%",
      change: "+47%",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Coverage Improvement",
      value: "57%",
      change: "+57% from baseline",
      color: "text-purple-500",
    },
    {
      icon: Award,
      label: "False Positive Reduction",
      value: "67%",
      change: "-67% error rate",
      color: "text-pink-500",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            Agent Performance & Learning
          </h1>
          <p className="text-muted-foreground mt-1">Track autonomous agent improvement and strategy effectiveness</p>
        </div>
        <Button className="gap-2">
          <Lightbulb className="w-4 h-4" />
          Compare Strategies
        </Button>
      </div>

      {/* Performance KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        {performanceKPIs.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <Card key={i} className="p-6 border-border/50 hover:border-primary/30 transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  <p className={`text-xs font-semibold mt-2 ${kpi.color}`}>{kpi.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${kpi.color}/40`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Agent Learning Curve */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Agent Learning Progression</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={agentLearningData}>
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
            <Area type="monotone" dataKey="accuracy" fill="var(--primary)" stroke="var(--primary)" opacity={0.2} />
            <Line type="monotone" dataKey="efficiency" stroke="var(--chart-2)" strokeWidth={2} />
            <Line type="monotone" dataKey="coverage" stroke="var(--chart-3)" strokeWidth={2} />
            <Line type="monotone" dataKey="adaptation" stroke="var(--chart-1)" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Accuracy Improvements */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Detection Accuracy & Error Rates</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={accuracyMetrics}>
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
            <Bar dataKey="falsePositives" fill="var(--accent)" />
            <Bar dataKey="falseNegatives" fill="var(--chart-4)" />
            <Bar dataKey="accuracy" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Agent Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Agent Performance Radar */}
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4">Agent Strategy Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={agentComparison}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="name" stroke="var(--muted-foreground)" />
              <PolarRadiusAxis stroke="var(--muted-foreground)" />
              <Radar
                name="Detection Rate"
                dataKey="detectionRate"
                stroke="var(--primary)"
                fill="var(--primary)"
                opacity={0.3}
              />
              <Radar name="Coverage" dataKey="coverage" stroke="var(--chart-2)" fill="var(--chart-2)" opacity={0.3} />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Agent Rankings */}
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4">Agent Rankings</h2>
          <div className="space-y-3">
            {agentComparison.map((agent, i) => (
              <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-orange-600"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">Detection Rate: {agent.detectionRate}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{agent.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">FP Rate:</span>
                    <p className="font-semibold">{agent.falsePositives}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Exec Time:</span>
                    <p className="font-semibold">{agent.avgExecutionTime}s</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Coverage:</span>
                    <p className="font-semibold">{agent.coverage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Decision Pattern Improvements */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Decision Pattern Evolution
        </h2>
        <div className="space-y-3">
          {decisionPatterns.map((pattern, i) => (
            <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium">{pattern.strategy}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Successful Runs: {pattern.successfulRuns.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Initial</p>
                  <p className="text-lg font-bold">{pattern.initialAccuracy}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current</p>
                  <p className="text-lg font-bold text-primary">{pattern.currentAccuracy}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Improvement</p>
                  <p className="text-lg font-bold text-green-500">+{pattern.improvement}%</p>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${pattern.currentAccuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Insights */}
      <Card className="p-6 border-border/50 bg-primary/5">
        <h2 className="text-lg font-semibold mb-4">Learning Insights</h2>
        <ul className="space-y-3">
          {[
            "Agent Alpha has achieved 94% accuracy after 21 days of learning - exceeding initial expectations by 12%",
            "State Machine Learning strategy showing highest improvement rate (+31%) with 2,103 successful runs",
            "False positive rate reduced by 67% through pattern recognition and boundary detection refinement",
            "Dynamic adaptation enabled agents to maintain 92% efficiency even with UI changes and new features",
            "Parallel path exploration reduces average test execution time by 18% through optimized decision trees",
          ].map((insight, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
