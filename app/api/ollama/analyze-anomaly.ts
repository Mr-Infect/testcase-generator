export async function POST(request: Request) {
  try {
    const { anomalyDescription, testLogs, appBehavior } = await request.json()

    const prompt = `As a software testing expert, analyze the following anomaly detected during automated testing:

Anomaly: ${anomalyDescription}
Test Logs: ${testLogs}
Expected Behavior: ${appBehavior}

Provide:
1. Root cause analysis
2. Impact assessment
3. Recommended fixes
4. Prevention strategies`

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
    return Response.json({ analysis: data.response })
  } catch (error) {
    console.error("[v0] Ollama anomaly analysis error:", error)
    return Response.json(
      { error: "Failed to analyze anomaly. Check Ollama connection on localhost:11434" },
      { status: 500 },
    )
  }
}
