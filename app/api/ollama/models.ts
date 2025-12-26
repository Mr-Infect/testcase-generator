export async function GET() {
  try {
    const response = await fetch("http://localhost:11434/api/tags", {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return Response.json({ error: "Ollama service not available", models: [] }, { status: 503 })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Ollama models error:", error)
    return Response.json({
      error: "Could not fetch models",
      models: [],
    })
  }
}
