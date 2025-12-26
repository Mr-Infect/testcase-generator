"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Rocket, Sparkles } from "lucide-react"

export default function NewTestPage() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [testType, setTestType] = useState("web")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleStartTest = async () => {
    if (!url) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
        body: JSON.stringify({
          url,
          testType,
          description,
        }),
      })

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("[v0] API error response:", errorData)
        throw new Error(errorData.error || "Failed to create test")
      }

      const test = await response.json()
      console.log("[v0] Test created successfully:", test)

      // Redirect to dashboard after successful test creation
      router.push("/dashboard")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start test. Please try again."
      setError(errorMessage)
      console.error("[v0] Error creating test:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Test</h1>
            <p className="text-slate-400">Deploy AI agents to autonomously test your application</p>
          </div>

          <div className="space-y-6">
            {/* Test Configuration Section */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Test Configuration</h2>
              <p className="text-slate-400 text-sm mb-6">Configure your autonomous testing session</p>

              {/* Target URL */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="url" className="text-white">
                  Target URL or API Endpoint
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com or https://api.example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 h-12"
                    required
                  />
                </div>
                <p className="text-slate-500 text-xs">Enter the URL of the application you want to test</p>
              </div>

              {/* Test Type */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="test-type" className="text-white">
                  Test Type
                </Label>
                <Select value={testType} onValueChange={setTestType}>
                  <SelectTrigger id="test-type" className="bg-slate-900/50 border-slate-700 text-white h-12">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Application Testing</SelectItem>
                    <SelectItem value="api">API Testing</SelectItem>
                    <SelectItem value="mobile">Mobile Application Testing</SelectItem>
                    <SelectItem value="e2e">End-to-End Testing</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-slate-500 text-xs">Choose the type of testing to perform</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add any specific instructions or context for the AI agents..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* What will happen next */}
            <Card className="bg-blue-500/10 border-blue-500/20 p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-3">What will happen next?</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>AI agents will autonomously explore your application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Generate test cases dynamically based on discovered functionality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Detect potential defects, security issues, and UX problems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Provide root cause analysis and actionable insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-12 gap-2"
                onClick={handleStartTest}
                disabled={!url || loading}
              >
                <Rocket className="w-4 h-4" />
                {loading ? "Starting Test..." : "Start Test"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
