"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Zap, TrendingUp, Eye, CheckCircle2 } from "lucide-react"

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const discoveredBehaviors = [
    {
      id: 1,
      name: "User Login Flow",
      description: "Standard email/password authentication workflow",
      frequency: 245,
      successRate: 98,
      lastUpdated: "2 hours ago",
      tags: ["auth", "user", "critical"],
    },
    {
      id: 2,
      name: "Product Search",
      description: "Product filtering and search functionality",
      frequency: 189,
      successRate: 96,
      lastUpdated: "4 hours ago",
      tags: ["search", "products", "high-use"],
    },
    {
      id: 3,
      name: "Shopping Cart Checkout",
      description: "Multi-step checkout process with payment integration",
      frequency: 156,
      successRate: 94,
      lastUpdated: "1 hour ago",
      tags: ["payment", "checkout", "critical"],
    },
    {
      id: 4,
      name: "User Profile Update",
      description: "User account settings and profile management",
      frequency: 92,
      successRate: 97,
      lastUpdated: "6 hours ago",
      tags: ["profile", "user", "settings"],
    },
  ]

  const learnedPatterns = [
    {
      pattern: "Form Validation",
      description: "Identified 12 validation patterns across forms",
      impact: "High",
      coverage: 89,
    },
    {
      pattern: "Error Handling",
      description: "Learned 8 error scenarios and recovery flows",
      impact: "High",
      coverage: 92,
    },
    {
      pattern: "Navigation Flow",
      description: "Mapped 15 distinct user navigation paths",
      impact: "Medium",
      coverage: 78,
    },
    {
      pattern: "API Response Handling",
      description: "Analyzed 6 API endpoints and response patterns",
      impact: "High",
      coverage: 85,
    },
  ]

  const testRecommendations = [
    {
      scenario: "Edge Case: Simultaneous Checkout",
      priority: "high",
      reason: "Not yet covered in current test suite",
      impact: "Identifies race conditions in payment processing",
    },
    {
      scenario: "Fallback: Network Timeout",
      priority: "medium",
      reason: "Only 2 timeout scenarios tested",
      impact: "Ensures graceful degradation",
    },
    {
      scenario: "Integration: Third-party Payment",
      priority: "high",
      reason: "Limited coverage for external integrations",
      impact: "Validates payment provider compatibility",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-muted-foreground mt-1">Discovered behaviors, learned patterns, and AI-generated insights</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search behaviors and patterns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="behaviors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="behaviors">Discovered Behaviors</TabsTrigger>
          <TabsTrigger value="patterns">Learned Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Test Recommendations</TabsTrigger>
        </TabsList>

        {/* Discovered Behaviors Tab */}
        <TabsContent value="behaviors" className="space-y-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <p className="text-sm">
              The platform has discovered <strong>4 core behaviors</strong> based on autonomous exploration. These
              represent high-confidence user flows and system behaviors.
            </p>
          </Card>

          <div className="space-y-3">
            {discoveredBehaviors.map((behavior) => (
              <Card key={behavior.id} className="p-6 border-border/50 hover:border-primary/30 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{behavior.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{behavior.description}</p>
                  </div>
                  <Eye className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Frequency</p>
                    <p className="text-lg font-semibold mt-1">{behavior.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-semibold text-green-600 mt-1">{behavior.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="text-sm mt-1">{behavior.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {behavior.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Learned Patterns Tab */}
        <TabsContent value="patterns" className="space-y-4">
          <Card className="p-4 bg-secondary/5 border-secondary/20">
            <p className="text-sm">
              <strong>4 core patterns</strong> have been identified across your application. These patterns represent
              common functionalities and design approaches.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {learnedPatterns.map((pattern, i) => (
              <Card key={i} className="p-6 border-border/50 hover:border-secondary/30 transition">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  {pattern.pattern}
                </h3>
                <p className="text-sm text-muted-foreground mt-3">{pattern.description}</p>

                <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Impact</span>
                    <span
                      className={`text-sm font-semibold ${
                        pattern.impact === "High" ? "text-red-600" : "text-yellow-600"
                      }`}
                    >
                      {pattern.impact}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Coverage</span>
                    <span className="text-sm font-semibold">{pattern.coverage}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${pattern.coverage}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Test Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card className="p-4 bg-accent/5 border-accent/20">
            <p className="text-sm">
              Based on discovered behaviors and identified gaps, the platform recommends{" "}
              <strong>3 additional test scenarios</strong>.
            </p>
          </Card>

          <div className="space-y-3">
            {testRecommendations.map((rec, i) => (
              <Card key={i} className="p-6 border-border/50 hover:border-accent/30 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{rec.scenario}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{rec.reason}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                      rec.priority === "high" ? "bg-red-500/10 text-red-600" : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {rec.priority === "high" ? "High Priority" : "Medium Priority"}
                  </span>
                </div>

                <div className="p-3 bg-card/50 rounded border border-border/50 mb-4">
                  <p className="text-sm">
                    <strong>Expected Impact:</strong> {rec.impact}
                  </p>
                </div>

                <Button className="w-full" size="sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Create Test Case
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Documentation Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Getting Started",
            desc: "Learn the basics of the platform",
            icon: BookOpen,
          },
          {
            title: "Agent Configuration",
            desc: "Setup and optimize testing agents",
            icon: Zap,
          },
          {
            title: "Best Practices",
            desc: "Tips for maximum testing efficiency",
            icon: TrendingUp,
          },
        ].map((doc, i) => {
          const Icon = doc.icon
          return (
            <Card key={i} className="p-4 border-border/50 hover:border-primary/30 transition cursor-pointer">
              <Icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{doc.desc}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
