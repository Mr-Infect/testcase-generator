"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { TrendingUp, TrendingDown, AlertCircle, Target, Zap } from "lucide-react"

export default function TrendsPage() {
  // Historical trend data - 12 months
  const monthlyTrendData = [
    { month: "Jan", tests: 400, defects: 24, coverage: 65, avgTime: 245 },
    { month: "Feb", tests: 520, defects: 34, coverage: 68, avgTime: 238 },
    { month: "Mar", tests: 680, defects: 28, coverage: 71, avgTime: 232 },
    { month: "Apr", tests: 890, defects: 35, coverage: 74, avgTime: 225 },
    { month: "May", tests: 1100, defects: 42, coverage: 78, avgTime: 219 },
    { month: "Jun", tests: 1247, defects: 35, coverage: 82, avgTime: 210 },
    { month: "Jul", tests: 1380, defects: 31, coverage: 85, avgTime: 205 },
    { month: "Aug", tests: 1520, defects: 29, coverage: 87, avgTime: 198 },
    { month: "Sep", tests: 1650, defects: 26, coverage: 89, avgTime: 192 },
    { month: "Oct", tests: 1780, defects: 24, coverage: 91, avgTime: 185 },
    { month: "Nov", tests: 1920, defects: 22, coverage: 93, avgTime: 178 },
    { month: "Dec", tests: 2050, defects: 19, coverage: 95, avgTime: 170 },
  ]

  // Defect trend by severity
  const defectTrendBySeverity = [
    { month: "Jan", critical: 3, high: 8, medium: 10, low: 3 },
    { month: "Feb", critical: 4, high: 10, medium: 15, low: 5 },
    { month: "Mar", critical: 2, high: 8, medium: 14, low: 4 },
    { month: "Apr", critical: 5, high: 12, medium: 14, low: 4 },
    { month: "May", critical: 6, high: 14, medium: 18, low: 4 },
    { month: "Jun", critical: 4, high: 12, medium: 15, low: 4 },
    { month: "Jul", critical: 3, high: 10, medium: 14, low: 4 },
    { month: "Aug", critical: 2, high: 8, medium: 15, low: 4 },
    { month: "Sep", critical: 1, high: 7, medium: 14, low: 4 },
    { month: "Oct", critical: 1, high: 6, medium: 13, low: 4 },
    { month: "Nov", critical: 1, high: 5, medium: 12, low: 4 },
    { month: "Dec", critical: 0, high: 4, medium: 12, low: 3 },
  ]

  // Regression detection (areas where defects increased)
  const regressions = [
    { area: "Payment Module", detection: "Oct 15", defectsFound: 5, trend: "up", impactScore: 92 },
    { area: "User Authentication", detection: "Oct 8", defectsFound: 3, trend: "up", impactScore: 78 },
    { area: "Search Functionality", detection: "Sep 22", defectsFound: 2, trend: "down", impactScore: 45 },
  ]

  // Coverage improvement areas
  const coverageMetrics = [
    { module: "API Endpoints", current: 92, previous: 85, improvement: 7 },
    { module: "UI Components", current: 89, previous: 76, improvement: 13 },
    { module: "Authentication", current: 95, previous: 88, improvement: 7 },
    { module: "Database Layer", current: 88, previous: 72, improvement: 16 },
  ]

  // Key performance indicators
  const kpis = [
    {
      icon: TrendingDown,
      label: "Defect Reduction",
      value: "55%",
      change: "-8% from last quarter",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      label: "Coverage Growth",
      value: "95%",
      change: "+30% from Q1",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "Performance Gain",
      value: "31%",
      change: "Avg execution time reduced",
      color: "text-purple-500",
    },
    {
      icon: Target,
      label: "Test Efficiency",
      value: "412%",
      change: "5x more tests per month",
      color: "text-pink-500",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trend Analysis</h1>
          <p className="text-muted-foreground mt-1">Historical insights and performance metrics over time</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Report</Button>
          <Button>Generate Insights</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <Card key={i} className="p-6 border-border/50 hover:border-primary/30 transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{kpi.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${kpi.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Main Trend Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Overall Testing Trends */}
        <Card className="p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Overall Testing Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                {/* added gradient fills for better visual appeal */}
                <linearGradient id="testsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: `2px solid hsl(var(--primary))`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="tests"
                fill="url(#testsGradient)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="defects"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--destructive))", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Coverage & Performance */}
        <Card className="p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Coverage & Execution Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: `2px solid hsl(var(--secondary))`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="coverage"
                fill="url(#coverageGradient)"
                stroke="hsl(var(--success))"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgTime"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Defect Trend by Severity */}
      <Card className="p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Defect Trend by Severity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={defectTrendBySeverity} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              {/* added gradient effects to bars */}
              <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={1} />
                <stop offset="100%" stopColor="#991b1b" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" stopOpacity={1} />
                <stop offset="100%" stopColor="#b91c0c" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="mediumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={1} />
                <stop offset="100%" stopColor="#047857" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: `2px solid hsl(var(--primary))`,
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="critical" fill="url(#criticalGrad)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="high" fill="url(#highGrad)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="medium" fill="url(#mediumGrad)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="low" fill="url(#lowGrad)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Regression Detection & Coverage Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regression Detection */}
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent" />
            Regression Detection
          </h2>
          <div className="space-y-3">
            {regressions.map((regression, i) => (
              <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{regression.area}</p>
                    <p className="text-xs text-muted-foreground mt-1">Detected: {regression.detection}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-accent">{regression.defectsFound} defects found</span>
                      <span className="text-muted-foreground">Impact: {regression.impactScore}%</span>
                    </div>
                  </div>
                  {regression.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Coverage Improvements */}
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Coverage Improvements
          </h2>
          <div className="space-y-3">
            {coverageMetrics.map((metric, i) => (
              <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{metric.module}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-muted-foreground">Previous: {metric.previous}%</span>
                      <span className="text-primary font-semibold">Current: {metric.current}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-500">+{metric.improvement}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights Section */}
      <Card className="p-6 border-border/50 bg-primary/5">
        <h2 className="text-lg font-semibold mb-4">AI-Generated Insights</h2>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Defect reduction of 55% indicates improved code quality and more effective testing strategies. Current
              trajectory suggests reaching target of 60% by Q1.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Payment Module shows regression with 5 new defects detected in Oct. Recommend prioritizing this area for
              root cause analysis and additional test coverage.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              Database Layer coverage improved by 16% - the highest improvement. Consider applying similar testing
              strategies to other modules.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
