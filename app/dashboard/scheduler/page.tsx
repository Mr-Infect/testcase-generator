"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Clock, Play, Pause, Trash2, Plus, CheckCircle2, Calendar, Zap, GitBranch, TrendingUp } from "lucide-react"

export default function SchedulerPage() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: "Daily Regression Testing",
      projects: ["E-Commerce", "Payment Gateway"],
      frequency: "Daily",
      time: "02:00 AM",
      nextRun: "Tomorrow at 2:00 AM",
      lastRun: "Today at 2:03 AM",
      status: "active",
      successRate: 98,
    },
    {
      id: 2,
      name: "Weekly Full Suite",
      projects: ["E-Commerce", "User Auth", "Payment Gateway", "Search"],
      frequency: "Weekly",
      time: "Sunday 10:00 PM",
      nextRun: "This Sunday at 10:00 PM",
      lastRun: "Last Sunday at 10:05 PM",
      status: "active",
      successRate: 96,
    },
    {
      id: 3,
      name: "Post-Deployment Smoke Tests",
      projects: ["E-Commerce", "Payment Gateway"],
      frequency: "On-Demand",
      time: "Manual",
      nextRun: "When triggered",
      lastRun: "2 hours ago",
      status: "paused",
      successRate: 100,
    },
  ])

  const [batchQueue, setBatchQueue] = useState([
    {
      id: 1,
      name: "Batch Run #1",
      projects: ["E-Commerce", "Payment Gateway"],
      status: "running",
      progress: 65,
      startTime: "10:45 AM",
      estimatedEnd: "11:30 AM",
      testsRun: 245,
      defectsFound: 3,
    },
    {
      id: 2,
      name: "Batch Run #2",
      projects: ["User Auth", "Search"],
      status: "queued",
      progress: 0,
      startTime: "Pending",
      estimatedEnd: "12:15 PM",
      testsRun: 0,
      defectsFound: 0,
    },
    {
      id: 3,
      name: "Batch Run #3",
      projects: ["API Layer", "Database Tests"],
      status: "completed",
      progress: 100,
      startTime: "09:20 AM",
      estimatedEnd: "10:40 AM",
      testsRun: 456,
      defectsFound: 12,
    },
  ])

  const availableProjects = [
    "E-Commerce",
    "Payment Gateway",
    "User Auth",
    "Search",
    "API Layer",
    "Database Tests",
    "Mobile App",
    "Analytics",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "running":
        return "text-blue-500"
      case "completed":
        return "text-green-500"
      case "paused":
        return "text-yellow-500"
      case "queued":
        return "text-purple-500"
      default:
        return "text-gray-500"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500"
    if (progress < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Batch Testing & Scheduler</h1>
          <p className="text-muted-foreground mt-1">Schedule automated test runs and manage batch executions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">CI/CD Integration</Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Active Schedules", value: "3", icon: Clock },
          { label: "Batch Queued", value: "2", icon: Zap },
          { label: "Tests Today", value: "1.2K", icon: CheckCircle2 },
          { label: "Automation Gain", value: "89%", icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-primary/40" />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Batch Execution Queue */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Active Batch Executions
        </h2>
        <div className="space-y-4">
          {batchQueue.map((batch) => (
            <div key={batch.id} className="border border-border/50 rounded-lg p-4 hover:bg-card/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium">{batch.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{batch.projects.join(", ")}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold capitalize ${getStatusColor(batch.status)}`}>
                    {batch.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{batch.progress}% Complete</span>
                  <span className="text-xs text-muted-foreground">
                    {batch.startTime} - {batch.estimatedEnd}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(batch.progress)} transition-all`}
                    style={{ width: `${batch.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm">
                  <span className="text-muted-foreground">
                    Tests Run: <span className="text-foreground font-medium">{batch.testsRun}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Defects: <span className="text-accent font-medium">{batch.defectsFound}</span>
                  </span>
                </div>
                {batch.status === "running" && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Pause className="w-4 h-4" />
                    Pause
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Test Runs */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Scheduled Test Runs
        </h2>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="border border-border/50 rounded-lg p-4 hover:bg-card/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{schedule.name}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        schedule.status === "active"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-yellow-500/10 text-yellow-600"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{schedule.projects.join(", ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm">
                    <p className="font-medium">{schedule.frequency}</p>
                    <p className="text-muted-foreground">{schedule.time}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="grid md:grid-cols-3 gap-4 pt-3 border-t border-border/30 text-sm">
                <div>
                  <span className="text-muted-foreground">Next Run:</span>
                  <p className="font-medium">{schedule.nextRun}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Run:</span>
                  <p className="font-medium">{schedule.lastRun}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Success Rate:</span>
                  <p className="font-medium text-green-500">{schedule.successRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* CI/CD Integration Info */}
      <Card className="p-6 border-border/50 bg-primary/5">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          CI/CD Integration
        </h2>
        <p className="text-sm text-foreground mb-4">
          Connect your GitHub, GitLab, or Jenkins pipelines to automatically trigger test runs on commits or pull
          requests.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {["GitHub", "GitLab", "Jenkins"].map((platform) => (
            <Button key={platform} variant="outline" className="justify-center bg-transparent">
              Connect {platform}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
