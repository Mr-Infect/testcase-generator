"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2, Loader } from "lucide-react"

export function OllamaStatusBadge() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/ollama/health")
        setStatus(response.ok ? "online" : "offline")
      } catch {
        setStatus("offline")
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/50 text-xs font-medium">
      {status === "checking" && (
        <>
          <Loader className="w-3 h-3 animate-spin" />
          <span className="text-muted-foreground">Checking Ollama...</span>
        </>
      )}
      {status === "online" && (
        <>
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span className="text-green-600">Ollama Connected</span>
        </>
      )}
      {status === "offline" && (
        <>
          <AlertCircle className="w-3 h-3 text-orange-600" />
          <span className="text-orange-600">Ollama Offline</span>
        </>
      )}
    </div>
  )
}
