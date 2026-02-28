// Ollama API client for local LLM interactions
// Communicates with locally running Ollama instance (default: http://localhost:11434)
// the local models works mistral in the clients system 
interface OllamaConfig {
  baseUrl: string
  model: string
}

let ollamaConfig: OllamaConfig = {
  baseUrl: process.env.NEXT_PUBLIC_OLLAMA_URL || "http://localhost:11434",
  model: process.env.NEXT_PUBLIC_OLLAMA_MODEL || "llama3.2:latest",
}

export const setOllamaConfig = (config: Partial<OllamaConfig>) => {
  ollamaConfig = { ...ollamaConfig, ...config }
}

export const getOllamaConfig = () => ollamaConfig

export interface OllamaGenerateRequest {
  prompt: string
  stream?: boolean
  temperature?: number
}

export interface OllamaGenerateResponse {
  response: string
  done: boolean
}

export const generateWithOllama = async (request: OllamaGenerateRequest): Promise<string> => {
  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaConfig.model,
        prompt: request.prompt,
        stream: false,
        temperature: request.temperature || 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
    }

    const data: OllamaGenerateResponse = await response.json()
    return data.response
  } catch (error) {
    console.error("[v0] Ollama generation error:", error)
    throw error
  }
}

// Check if Ollama is available
export const checkOllamaHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/tags`, {
      method: "GET",
    })
    return response.ok
  } catch {
    return false
  }
}

// Get available models from Ollama
export const getOllamaModels = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${ollamaConfig.baseUrl}/api/tags`)
    if (!response.ok) return []

    const data: {
      models: Array<{ name: string }>
    } = await response.json()
    return data.models.map((m) => m.name)
  } catch {
    return []
  }
}
