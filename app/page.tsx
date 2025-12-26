"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"

export default function RootPage() {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-slate-400">Loading...</div>
    </div>
  )
}
