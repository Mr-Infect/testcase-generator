"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, AlertTriangle, Plus, FileSearch } from "lucide-react"

interface Defect {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  rootCause: string
  category: string
  testId?: string
}

interface TestWithDefects {
  id: string
  url: string
  defectsFound: number
  defects: Defect[]
}

export default function DefectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [testsWithDefects, setTestsWithDefects] = useState<TestWithDefects[]>([])
  const [severityCounts, setSeverityCounts] = useState({ critical: 0, high: 0, medium: 0, low: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestsWithDefects()
  }, [])

  useEffect(() => {
    if (testsWithDefects.length > 0 && !selectedTestId) {
      setSelectedTestId(testsWithDefects[0].id)
    }
  }, [testsWithDefects])

  useEffect(() => {
    if (selectedTestId && testsWithDefects.length > 0) {
      const selectedTest = testsWithDefects.find((t) => t.id === selectedTestId)
      if (selectedTest?.defects) {
        const counts = {
          critical: selectedTest.defects.filter((d) => d.severity === "critical").length,
          high: selectedTest.defects.filter((d) => d.severity === "high").length,
          medium: selectedTest.defects.filter((d) => d.severity === "medium").length,
          low: selectedTest.defects.filter((d) => d.severity === "low").length,
        }
        setSeverityCounts(counts)
        console.log("[v0] Severity counts updated:", counts)
      }
    }
  }, [selectedTestId, testsWithDefects])

  const fetchTestsWithDefects = async () => {
    try {
      const response = await fetch("/api/tests", { credentials: "include" })
      if (response.ok) {
        const testsData = await response.json()
        const withDefects = testsData.filter((t: any) => t.defectsFound > 0)
        setTestsWithDefects(withDefects)
        console.log("[v0] Tests loaded:", withDefects.length)
      }
    } catch (error) {
      console.error("Failed to fetch tests with defects:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedTest = testsWithDefects.find((t) => t.id === selectedTestId)
  const defects = selectedTest?.defects || []
  const hasDefects = testsWithDefects.length > 0

  const filteredDefects = defects.filter((defect) => {
    const matchesSearch =
      defect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === "all" || defect.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", icon: "text-red-400" }
      case "high":
        return {
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
          text: "text-orange-400",
          icon: "text-orange-400",
        }
      case "medium":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          text: "text-yellow-400",
          icon: "text-yellow-400",
        }
      case "low":
        return { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", icon: "text-blue-400" }
      default:
        return { bg: "bg-slate-500/10", border: "border-slate-500/20", text: "text-slate-400", icon: "text-slate-400" }
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Defects</h1>
        <p className="text-slate-400 mt-1">All detected issues across your test runs</p>
      </div>

      {!hasDefects ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Card className="bg-slate-900/50 border-slate-800 p-12 max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center">
                <FileSearch className="w-10 h-10 text-slate-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Defects Found Yet</h2>
            <p className="text-slate-400 mb-6">
              Run your first test to start detecting issues and improving your application quality.
            </p>
            <Link href="/dashboard/new-test">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Run Your First Test
              </Button>
            </Link>
          </Card>
        </div>
      ) : (
        <>
          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="flex-1">
                <p className="text-slate-400 text-sm mb-2">Select a tested site to view defects:</p>
                <Select
                  value={selectedTestId || ""}
                  onValueChange={(value) => {
                    console.log("[v0] Test selected:", value)
                    setSelectedTestId(value)
                  }}
                >
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Choose a test..." />
                  </SelectTrigger>
                  <SelectContent>
                    {testsWithDefects.map((test) => (
                      <SelectItem key={test.id} value={test.id}>
                        {test.url} ({test.defectsFound} defects)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Critical", value: severityCounts.critical, severity: "critical" },
              { label: "High", value: severityCounts.high, severity: "high" },
              { label: "Medium", value: severityCounts.medium, severity: "medium" },
              { label: "Low", value: severityCounts.low, severity: "low" },
            ].map((item) => {
              const colors = getSeverityColor(item.severity)
              return (
                <Card key={item.label} className={`${colors.bg} border ${colors.border} p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                      <p className={`text-5xl font-bold ${colors.text}`}>{item.value}</p>
                    </div>
                    <AlertTriangle className={`w-10 h-10 ${colors.icon}`} />
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search defects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <Select
                value={severityFilter}
                onValueChange={(value) => {
                  console.log("[v0] Severity filter changed:", value)
                  setSeverityFilter(value)
                }}
              >
                <SelectTrigger className="w-full md:w-[200px] bg-slate-900 border-slate-700 text-white">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Defects for {selectedTest?.url} ({filteredDefects.length})
            </h2>
            <p className="text-slate-400 text-sm mb-6">Detected issues from this test run</p>

            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-400">Loading defects...</p>
              ) : filteredDefects.length === 0 ? (
                <p className="text-slate-400">No defects match your filters for this test.</p>
              ) : (
                filteredDefects.map((defect) => {
                  const colors = getSeverityColor(defect.severity)
                  return (
                    <Card
                      key={defect.id}
                      className="bg-slate-800/50 border-slate-700 p-6 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <AlertTriangle className={`w-6 h-6 ${colors.icon} flex-shrink-0 mt-1`} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white">{defect.title}</h3>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 ${colors.bg} ${colors.text} text-xs rounded border ${colors.border}`}
                              >
                                {defect.severity}
                              </span>
                            </div>
                          </div>
                          <p className="text-slate-300 mb-4">{defect.description}</p>
                          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">Root Cause:</p>
                            <p className="text-slate-400 text-sm">{defect.rootCause}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
