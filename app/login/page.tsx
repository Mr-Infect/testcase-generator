"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Zap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password)

    if (!success) {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8 shadow-2xl">
          {/* Brain Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Sign in to access your testing platform</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white text-sm font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white text-sm font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium h-11 gap-2"
            >
              <Zap className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Don't have an account? </span>
            <Link href="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 text-center text-xs text-slate-500">
          <p>Demo: john@gmail.com / password123</p>
        </div>
      </div>
    </div>
  )
}
