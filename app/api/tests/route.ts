import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createAndRunTest, getTests } from "@/lib/test-service"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { url, testType, description } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const testResult = await createAndRunTest(user.id, url, testType || "web", description || "")

    return NextResponse.json(testResult, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to create test", details: String(error) }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userTests = getTests(user.id)

    return NextResponse.json(userTests)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 })
  }
}
