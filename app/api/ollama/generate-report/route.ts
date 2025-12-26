// API route for AI-powered test report generation
import { generateWithOllama } from "@/lib/ollama-client"

export async function POST(request: Request) {
  try {
    const { testResults, defectsFound, executionTime, coverage } = await request.json()

    if (!testResults) {
      return Response.json({ error: "Missing test results" }, { status: 400 })
    }

    const prompt = `Generate a professional QA test execution summary report.

Test Results: ${testResults}
Defects Found: ${defectsFound || "None"}
Execution Time: ${executionTime || "N/A"}
Coverage: ${coverage || "N/A"}

Include:
1. Executive summary (2-3 sentences)
2. Key metrics and findings
3. Risk assessment
4. Recommendations for next steps

Format as a professional report.`

    const response = await generateWithOllama({
      prompt,
      temperature: 0.5,
    })

    return Response.json({
      report: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Report generation error:", error)
    return Response.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
