import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDefects } from "@/lib/test-service"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userDefects = getDefects(user.id)

    // Aggregate defect counts by severity
    const severityCounts = {
      critical: userDefects.filter((d) => d.severity === "critical").length,
      high: userDefects.filter((d) => d.severity === "high").length,
      medium: userDefects.filter((d) => d.severity === "medium").length,
      low: userDefects.filter((d) => d.severity === "low").length,
    }

    return NextResponse.json({
      defects: userDefects,
      counts: severityCounts,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to fetch defects" }, { status: 500 })
  }
}
