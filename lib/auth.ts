import { cookies } from "next/headers"

export interface User {
  id: string
  name: string
  email: string
}

// Simulate user database (in production, use a real database)
const users = [
  { id: "1", name: "john", email: "john@gmail.com", password: "password123" },
  { id: "2", name: "alice", email: "alice@example.com", password: "password123" },
  { id: "3", name: "bob", email: "bob@example.com", password: "password123" },
]

export async function login(email: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) return null

  // Create session
  const cookieStore = await cookies()
  cookieStore.set("user-session", JSON.stringify({ id: user.id, name: user.name, email: user.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { id: user.id, name: user.name, email: user.email }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("user-session")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("user-session")

  if (!session?.value) return null

  try {
    return JSON.parse(session.value) as User
  } catch {
    return null
  }
}

export async function register(name: string, email: string, password: string): Promise<User | null> {
  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return null
  }

  // Create new user
  const newUser: any = {
    id: String(users.length + 1),
    name,
    email,
    password, // In production, hash this with bcrypt
  }

  users.push(newUser)

  // Create session
  const cookieStore = await cookies()
  cookieStore.set("user-session", JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { id: newUser.id, name: newUser.name, email: newUser.email }
}
