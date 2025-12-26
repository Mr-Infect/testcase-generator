"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Clock, Bug, TrendingUp, Plus } from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useState, useEffect } from "react"

interface TestRun {
  id: string
  url: string
  testType: string
  status: string
  startTime: string
  defectsFound: number
  testCount: number
  defects?: { severity: string }[]
}

export default function Dashboard() {
  const [tests, setTests] = useState<TestRun[]>([])
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [stats, setStats] = useState({ totalTests: 0, completedTests: 0, totalDefects: 0, successRate: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      const response = await fetch("/api/tests", { credentials: "include" })
      if (response.ok) {
        const testsData = await response.json()
        setTests(testsData)
        if (testsData.length > 0 && !selectedTest) {
          setSelectedTest(testsData[0].id)
        }

        // Calculate stats
        const totalDefects = testsData.reduce((sum: number, test: TestRun) => sum + test.defectsFound, 0)
        const successRate =
          testsData.length > 0 ? Math.round(((testsData.length - totalDefects) / testsData.length) * 100) : 0

        setStats({
          totalTests: testsData.length,
          completedTests: testsData.filter((t: TestRun) => t.status === "completed").length,
          totalDefects,
          successRate,
        })
      }
    } catch (error) {
      console.error("Failed to fetch tests:", error)
    } finally {
      setLoading(false)
    }
  }

  const testTrendData = tests.map((test) => ({
    name: new URL(test.url).hostname,
    tests: test.testCount,
    defects: test.defectsFound,
  }))

  const selectedTestData = tests.find((t) => t.id === selectedTest)
  const defectDistribution = selectedTestData
    ? [
        {
          name: "Critical",
          value: selectedTestData.defects?.filter((d) => d.severity === "critical").length || 0,
          color: "#dc2626",
        },
        {
          name: "High",
          value: selectedTestData.defects?.filter((d) => d.severity === "high").length || 0,
          color: "#ea580c",
        },
        {
          name: "Medium",
          value: selectedTestData.defects?.filter((d) => d.severity === "medium").length || 0,
          color: "#f59e0b",
        },
        {
          name: "Low",
          value: selectedTestData.defects?.filter((d) => d.severity === "low").length || 0,
          color: "#16a34a",
        },
      ]
    : [
        { name: "Critical", value: 0, color: "#dc2626" },
        { name: "High", value: 0, color: "#ea580c" },
        { name: "Medium", value: 0, color: "#f59e0b" },
        { name: "Low", value: 0, color: "#16a34a" },
      ]

  const metrics = [
    {
      label: "Total Tests",
      value: stats.totalTests.toString(),
      subtitle: `${stats.completedTests} completed`,
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Active Tests",
      value: (stats.totalTests - stats.completedTests).toString(),
      subtitle: "Currently running",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      label: "Defects Found",
      value: stats.totalDefects.toString(),
      subtitle: "Total across all runs",
      icon: Bug,
      color: "text-red-400",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: "text-green-400",
      hasProgress: true,
      progress: stats.successRate,
    },
  ]

  const environmentStatus = [
    { name: "Chrome (Windows)", status: "active", tests: 234 },
    { name: "Safari (macOS)", status: "active", tests: 189 },
    { name: "Firefox (Linux)", status: "active", tests: 198 },
    { name: "Mobile (iOS)", status: "idle", tests: 145 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Monitor your AI-powered testing operations</p>
        </div>
        <Link href="/dashboard/new-test">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <Card key={i} className="bg-slate-900/50 border-slate-800 p-6 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                  <p className="text-4xl font-bold text-white">{metric.value}</p>
                  {metric.subtitle && <p className="text-slate-500 text-xs mt-2">{metric.subtitle}</p>}
                </div>
                <Icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              {metric.hasProgress && (
                <div className="mt-4">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${metric.progress}%` }} />
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Recent Test Runs</h2>
        <p className="text-slate-400 text-sm mb-6">Latest autonomous testing sessions</p>

        <div className="space-y-3">
          {loading ? (
            <p className="text-slate-400">Loading tests...</p>
          ) : tests.length === 0 ? (
            <p className="text-slate-400">No tests run yet. Create your first test to get started!</p>
          ) : (
            tests.slice(0, 5).map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors cursor-pointer"
                onClick={() => setSelectedTest(test.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-2 h-2 rounded-full ${test.status === "completed" ? "bg-green-400" : "bg-yellow-400"}`}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{test.url}</p>
                    <p className="text-slate-400 text-sm mt-1">{new Date(test.startTime).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">{test.testType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 ml-6">
                  <div className="text-right">
                    <p className="text-white font-semibold">{test.defectsFound} defects</p>
                    <p className="text-slate-400 text-xs">{test.testCount} tests</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded border text-sm ${test.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {test.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Testing Results by Site</h2>
            {tests.length > 0 && (
              <p className="text-sm text-slate-400">Showing {selectedTestData?.url || "all"} results</p>
            )}
          </div>
          {tests.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              No test data available. Run a test to see results.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={testTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="testGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="defectGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
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
                <Line
                  type="monotone"
                  dataKey="tests"
                  stroke="url(#testGradient)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="defects"
                  stroke="url(#defectGradient)"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className="p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Defect Distribution</h2>
          {tests.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400">No defects detected yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={defectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {defectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} defects`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {defectDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Active Tests & Environment Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Environment Status */}
        <Card className="p-6 border-border/50 hover:shadow-lg transition-all backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Environment Status</h2>
          <div className="space-y-3">
            {environmentStatus.map((env, i) => (
              <div
                key={i}
                className="p-4 border border-border/50 rounded-lg hover:bg-primary/5 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{env.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{env.tests} tests available</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${env.status === "active" ? "bg-success shadow-lg shadow-success/50" : "bg-muted"}`}
                    />
                    <span className="text-sm text-muted-foreground capitalize">{env.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
