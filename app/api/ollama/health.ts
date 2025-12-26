export async function GET() {
  try {
    const response = await fetch("http://localhost:11434/api/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return Response.json({ status: "offline", message: "Ollama service is not running" }, { status: 503 })
    }

    const data = await response.json()
    return Response.json({
      status: "online",
      models: data.models?.map((m: any) => m.name) || [],
    })
  } catch (error) {
    console.error("[v0] Ollama health check error:", error)
    return Response.json(
      { status: "offline", message: "Failed to connect to Ollama on localhost:11434" },
      { status: 503 },
    )
  }
}
