"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Home, Plus, Bug, History, Activity, Brain, LogOut } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "New Test", href: "/dashboard/new-test", icon: Plus },
    { label: "Defects", href: "/dashboard/defects", icon: Bug },
    { label: "History", href: "/dashboard/history", icon: History },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white font-bold">Agentic</h1>
              <p className="text-slate-400 text-xs">Testing Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-11 ${
                    active
                      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <span className="text-blue-400 font-medium">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-slate-400 text-xs truncate">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-slate-800 px-6 py-3 bg-slate-900/50">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium">AI Agents Active</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
