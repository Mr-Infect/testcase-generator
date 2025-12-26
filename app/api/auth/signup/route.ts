import { type NextRequest, NextResponse } from "next/server"
import { register } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json()

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const user = await register(name, email, password)

    if (!user) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
