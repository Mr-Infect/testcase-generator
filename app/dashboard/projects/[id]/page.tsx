"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Pause, Settings } from "lucide-react"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">E-Commerce Platform</h1>
            <p className="text-muted-foreground mt-1">Project ID: {params.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Run Tests
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-4 gap-4">
            {[
              { label: "Tests Run", value: "324" },
              { label: "Defects Found", value: "12" },
              { label: "Coverage", value: "92%" },
              { label: "Status", value: "Active" },
            ].map((stat, i) => (
              <Card key={i} className="p-4 border-border/50">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Project Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Application URL</label>
                <div className="mt-2 p-3 bg-card/50 rounded border border-border/50">https://app.example.com</div>
              </div>
              <div>
                <label className="text-sm font-medium">Testing Environments</label>
                <div className="mt-2 space-y-2">
                  {["Chrome on Windows", "Safari on macOS", "Firefox on Linux"].map((env) => (
                    <div key={env} className="p-3 bg-card/50 rounded border border-border/50">
                      {env}
                    </div>
                  ))}
                </div>
              </div>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Edit Configuration
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="test-cases">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Generated Test Cases</h2>
            <div className="text-center py-8 text-muted-foreground">
              Test cases will appear here as the agent explores your application
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Project Settings</h2>
            <div className="text-center py-8 text-muted-foreground">Configure advanced settings for this project</div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
