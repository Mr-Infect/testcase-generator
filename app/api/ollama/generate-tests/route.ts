// API route for AI-powered test case generation
import { generateWithOllama } from "@/lib/ollama-client"

export async function POST(request: Request) {
  try {
    const { appUrl, appDescription, testType } = await request.json()

    if (!appUrl || !appDescription) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `You are an expert QA engineer. Generate comprehensive test cases for the following application.

Application URL: ${appUrl}
Description: ${appDescription}
Test Type: ${testType || "functional"}

Generate 5 specific, actionable test cases with:
1. Test name
2. Steps to reproduce
3. Expected result
4. Priority level (High/Medium/Low)

Format as JSON array with objects containing: name, steps, expectedResult, priority`

    const response = await generateWithOllama({
      prompt,
      temperature: 0.5,
    })

    return Response.json({
      testCases: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Generate tests error:", error)
    return Response.json({ error: "Failed to generate test cases" }, { status: 500 })
  }
}
