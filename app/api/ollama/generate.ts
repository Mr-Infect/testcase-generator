export async function POST(request: Request) {
  try {
    const { prompt, model = "llama2" } = await request.json()

    // Check if Ollama is running on localhost
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    })

    if (!ollamaResponse.ok) {
      return Response.json(
        { error: "Ollama service unavailable. Please ensure Ollama is running on localhost:11434" },
        { status: 503 },
      )
    }

    const data = await ollamaResponse.json()
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Ollama error:", error)
    return Response.json(
      { error: "Failed to connect to Ollama. Please ensure it is running: ollama serve" },
      { status: 500 },
    )
  }
}
