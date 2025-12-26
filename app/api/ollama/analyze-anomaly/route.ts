// API route for AI-powered anomaly analysis and root cause detection
import { generateWithOllama } from "@/lib/ollama-client"

export async function POST(request: Request) {
  try {
    const { anomalyDescription, testLogs, appBehavior } = await request.json()

    if (!anomalyDescription) {
      return Response.json({ error: "Missing anomaly description" }, { status: 400 })
    }

    const prompt = `You are an expert software testing analyst. Analyze the following anomaly and provide root cause analysis.

Anomaly Description: ${anomalyDescription}
Test Logs: ${testLogs || "No logs available"}
Expected App Behavior: ${appBehavior || "No baseline provided"}

Provide:
1. Root cause analysis (2-3 sentences)
2. Potential issue categories (list)
3. Recommended remediation steps (numbered list)
4. Severity assessment (Critical/High/Medium/Low)

Be concise and technical.`

    const response = await generateWithOllama({
      prompt,
      temperature: 0.3,
    })

    return Response.json({
      analysis: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Anomaly analysis error:", error)
    return Response.json({ error: "Failed to analyze anomaly" }, { status: 500 })
  }
}
