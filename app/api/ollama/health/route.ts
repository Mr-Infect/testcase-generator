// API route to check Ollama health and configuration
import { checkOllamaHealth, getOllamaModels, getOllamaConfig } from "@/lib/ollama-client"

export async function GET() {
  try {
    const isHealthy = await checkOllamaHealth()
    const models = isHealthy ? await getOllamaModels() : []
    const config = getOllamaConfig()

    return Response.json({
      status: isHealthy ? "connected" : "disconnected",
      baseUrl: config.baseUrl,
      model: config.model,
      availableModels: models,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Health check error:", error)
    return Response.json(
      {
        status: "error",
        error: "Failed to check Ollama status",
      },
      { status: 500 },
    )
  }
}
