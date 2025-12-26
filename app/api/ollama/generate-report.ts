export async function POST(request: Request) {
  try {
    const { testResults, defectsFound, executionTime, coverage } = await request.json()

    const prompt = `Generate a professional QA executive report based on the following test execution data:

Test Results Summary: ${testResults}
Defects Found: ${defectsFound}
Total Execution Time: ${executionTime}
Code Coverage: ${coverage}

Create a comprehensive report including:
1. Executive Summary
2. Test Coverage Analysis
3. Defect Analysis by Severity
4. Risk Assessment
5. Recommendations for Improvement
6. Next Steps

Format as a professional QA report.`

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt,
        stream: false,
      }),
    })

    if (!ollamaResponse.ok) {
      return Response.json(
        { error: "Ollama service unavailable. Ensure Ollama is running: ollama serve" },
        { status: 503 },
      )
    }

    const data = await ollamaResponse.json()
    return Response.json({ report: data.response })
  } catch (error) {
    console.error("[v0] Ollama report generation error:", error)
    return Response.json(
      { error: "Failed to generate report. Check Ollama connection on localhost:11434" },
      { status: 500 },
    )
  }
}
