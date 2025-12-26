"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, CheckCircle2, XCircle, Clock, FileText, Plus, Calendar, ChevronRight } from "lucide-react"

interface TestRun {
  id: string
  url: string
  testType: string
  status: string
  startTime: string
  endTime: string
  defectsFound: number
  testCount: number
  defects?: any[]
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestRuns()
  }, [])

  const fetchTestRuns = async () => {
    try {
      const response = await fetch("/api/tests", { credentials: "include" })
      if (response.ok) {
        const data = await response.json()
        setTestRuns(data)
      }
    } catch (error) {
      console.error("Failed to fetch test runs:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", icon: CheckCircle2 }
      case "failed":
        return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", icon: XCircle }
      case "running":
        return { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", icon: Clock }
      default:
        return { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", icon: FileText }
    }
  }

  const filteredRuns = testRuns.filter((run) => {
    const matchesSearch = run.url.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || run.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalDefects = testRuns.reduce((sum, run) => sum + run.defectsFound, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">History</h1>
          <p className="text-slate-400 mt-1">All past test runs and their results</p>
        </div>
        <Link href="/dashboard/new-test">
          <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
            <Plus className="w-4 h-4" />
            New Test
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-white">{testRuns.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-400">
                {testRuns.filter((r) => r.status === "completed").length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Defects</p>
              <p className="text-3xl font-bold text-red-400">{totalDefects}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-slate-900/50 border-slate-800 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-slate-900 border-slate-700 text-white">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="running">Running</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Test Runs List */}
      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Test Runs ({filteredRuns.length})</h2>

        {loading ? (
          <p className="text-slate-400">Loading test history...</p>
        ) : filteredRuns.length === 0 ? (
          <p className="text-slate-400">No test runs found. Run a test to see it in history.</p>
        ) : (
          <div className="space-y-3">
            {filteredRuns.map((run) => {
              const statusConfig = getStatusBadge(run.status)
              const StatusIcon = statusConfig.icon
              const duration = run.endTime
                ? `${Math.floor((new Date(run.endTime).getTime() - new Date(run.startTime).getTime()) / 1000)}s`
                : "In progress"

              return (
                <Link key={run.id} href={`/dashboard/defects?test=${run.id}`}>
                  <Card className="bg-slate-800/50 border-slate-700 p-5 hover:border-blue-400 hover:bg-slate-800 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Status Indicator */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-2 h-2 rounded-full ${statusConfig.bg}`} />

                        {/* URL and Date */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{run.url}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(run.startTime).toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {duration}
                            </span>
                          </div>
                        </div>

                        {/* Type Badge */}
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">{run.testType}</span>
                      </div>

                      {/* Right: Metrics and Status */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-white font-semibold">{run.defectsFound} defects</p>
                          <p className="text-slate-400 text-xs">{run.testCount} tests</p>
                        </div>
                        <span
                          className={`px-3 py-1 ${statusConfig.bg} ${statusConfig.text} text-sm rounded border ${statusConfig.border} flex items-center gap-2 min-w-[110px] justify-center`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {run.status}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
