export async function POST(request: Request) {
  try {
    const { appUrl, appDescription, testType } = await request.json()

    const prompt = `You are an expert QA engineer. Generate comprehensive ${testType} test cases for the following application:

Application URL: ${appUrl}
Description: ${appDescription}

Generate at least 5 detailed test cases with:
1. Test name and ID
2. Preconditions
3. Step-by-step test steps
4. Expected results
5. Edge cases to consider

Format the output as structured test cases that can be automated.`

    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt,
        stream: false,
        temperature: 0.7,
      }),
    })

    if (!ollamaResponse.ok) {
      return Response.json(
        { error: "Ollama service unavailable. Ensure Ollama is running: ollama serve" },
        { status: 503 },
      )
    }

    const data = await ollamaResponse.json()
    return Response.json({ testCases: data.response })
  } catch (error) {
    console.error("[v0] Ollama test generation error:", error)
    return Response.json(
      { error: "Failed to generate tests. Check Ollama connection on localhost:11434" },
      { status: 500 },
    )
  }
}
