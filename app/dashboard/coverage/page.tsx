"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Target, AlertCircle, CheckCircle2, TrendingUp, Filter } from "lucide-react"

export default function CoveragePage() {
  // Coverage data by module
  const moduleCoverage = [
    { module: "Authentication", coverage: 95, status: "excellent", tests: 342, defects: 2 },
    { module: "Payment Gateway", coverage: 87, status: "good", tests: 298, defects: 8 },
    { module: "User Profile", coverage: 92, status: "excellent", tests: 267, defects: 1 },
    { module: "Checkout Flow", coverage: 78, status: "needs-improvement", tests: 201, defects: 12 },
    { module: "Search Engine", coverage: 65, status: "needs-improvement", tests: 145, defects: 18 },
    { module: "Notifications", coverage: 54, status: "critical", tests: 89, defects: 15 },
    { module: "Analytics", coverage: 71, status: "needs-improvement", tests: 156, defects: 7 },
    { module: "API Layer", coverage: 88, status: "good", tests: 412, defects: 5 },
  ]

  // Feature coverage heatmap data
  const featureCoverageMatrix = [
    {
      feature: "Sign Up / Login",
      unit: 95,
      integration: 90,
      e2e: 85,
      performance: 92,
      security: 98,
    },
    {
      feature: "Payment Processing",
      unit: 88,
      integration: 80,
      e2e: 75,
      performance: 70,
      security: 95,
    },
    {
      feature: "User Dashboard",
      unit: 92,
      integration: 85,
      e2e: 88,
      performance: 80,
      security: 75,
    },
    {
      feature: "Search & Filter",
      unit: 70,
      integration: 60,
      e2e: 50,
      performance: 45,
      security: 65,
    },
    {
      feature: "Notifications",
      unit: 55,
      integration: 50,
      e2e: 45,
      performance: 40,
      security: 50,
    },
    {
      feature: "Admin Panel",
      unit: 85,
      integration: 75,
      e2e: 70,
      performance: 75,
      security: 90,
    },
  ]

  // Coverage trends
  const coverageTrends = [
    { month: "Aug", coverage: 72 },
    { month: "Sep", coverage: 74 },
    { month: "Oct", coverage: 76 },
    { month: "Nov", coverage: 81 },
    { month: "Dec", coverage: 87 },
  ]

  // Coverage gap analysis
  const coverageGaps = [
    {
      area: "Search Functionality",
      currentCoverage: 65,
      targetCoverage: 90,
      gap: 25,
      estimatedTests: 45,
      priority: "high",
    },
    {
      area: "Notifications System",
      currentCoverage: 54,
      targetCoverage: 85,
      gap: 31,
      estimatedTests: 62,
      priority: "high",
    },
    {
      area: "Performance Testing",
      currentCoverage: 58,
      targetCoverage: 80,
      gap: 22,
      estimatedTests: 38,
      priority: "medium",
    },
    {
      area: "Security Testing",
      currentCoverage: 81,
      targetCoverage: 95,
      gap: 14,
      estimatedTests: 24,
      priority: "medium",
    },
  ]

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return "bg-green-500"
    if (coverage >= 75) return "bg-blue-500"
    if (coverage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getCoverageTextColor = (coverage: number) => {
    if (coverage >= 90) return "text-green-500"
    if (coverage >= 75) return "text-blue-500"
    if (coverage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getHeatmapColor = (value: number) => {
    if (value >= 90) return "bg-green-100 text-green-900"
    if (value >= 75) return "bg-blue-100 text-blue-900"
    if (value >= 60) return "bg-yellow-100 text-yellow-900"
    return "bg-red-100 text-red-900"
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-primary" />
            Test Coverage Analysis
          </h1>
          <p className="text-muted-foreground mt-1">Visualize coverage gaps and identify areas needing more tests</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button>Generate Coverage Report</Button>
        </div>
      </div>

      {/* Coverage Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: "Average Coverage",
            value: "79%",
            icon: Target,
            color: "text-primary",
          },
          {
            label: "Excellent (90%+)",
            value: "3",
            icon: CheckCircle2,
            color: "text-green-500",
          },
          {
            label: "Critical Gaps",
            value: "2",
            icon: AlertCircle,
            color: "text-red-500",
          },
          {
            label: "Trend",
            value: "+15%",
            icon: TrendingUp,
            color: "text-blue-500",
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Module Coverage Grid */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Module Coverage Breakdown</h2>
        <div className="space-y-3">
          {moduleCoverage.map((module, i) => (
            <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="font-medium">{module.module}</p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{module.tests} tests</span>
                    <span>{module.defects} defects</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getCoverageTextColor(module.coverage)}`}>{module.coverage}%</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getCoverageColor(module.coverage)}`}
                  style={{ width: `${module.coverage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Coverage Heatmap */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Feature Coverage Heatmap</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-semibold">Feature</th>
                <th className="text-center py-2 px-4 font-semibold">Unit Tests</th>
                <th className="text-center py-2 px-4 font-semibold">Integration</th>
                <th className="text-center py-2 px-4 font-semibold">E2E</th>
                <th className="text-center py-2 px-4 font-semibold">Performance</th>
                <th className="text-center py-2 px-4 font-semibold">Security</th>
              </tr>
            </thead>
            <tbody>
              {featureCoverageMatrix.map((row, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-card/50 transition">
                  <td className="py-3 px-4 font-medium">{row.feature}</td>
                  {Object.entries(row).map(([key, value]) => {
                    if (key === "feature") return null
                    return (
                      <td key={key} className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getHeatmapColor(
                            value as number,
                          )}`}
                        >
                          {value}%
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Coverage Gaps Analysis */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-accent" />
          Coverage Gaps to Address
        </h2>
        <div className="space-y-3">
          {coverageGaps.map((gap, i) => (
            <div key={i} className="p-4 border border-border/50 rounded-lg hover:bg-card/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium">{gap.area}</p>
                  <span
                    className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      gap.priority === "high" ? "bg-red-500/10 text-red-600" : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {gap.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current</p>
                  <p className="text-lg font-bold">{gap.currentCoverage}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target</p>
                  <p className="text-lg font-bold">{gap.targetCoverage}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Gap</p>
                  <p className="text-lg font-bold text-accent">{gap.gap}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Est. New Tests</p>
                  <p className="text-lg font-bold text-primary">{gap.estimatedTests}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  View Gap Details
                </Button>
                <Button size="sm" className="text-xs">
                  Create Test Plan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Coverage Trend */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4">Overall Coverage Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={coverageTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
              }}
            />
            <Bar dataKey="coverage" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
