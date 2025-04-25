"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Define user roles
export type UserRole = "student" | "teacher" | "admin"

// Define user interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  level?: number
  points?: number
  progress?: number
  department?: string
  specialization?: string
  joinDate?: string
}

// Mock users for demo
const MOCK_USERS = {
  students: [
    {
      id: "s001",
      name: "Alex Johnson",
      email: "alex@avasya-lab.com",
      role: "student" as UserRole,
      level: 2,
      points: 175,
      progress: 45,
      department: "Aerospace Engineering",
      joinDate: "2023-01-15",
    },
    {
      id: "s002",
      name: "Maya Patel",
      email: "maya@avasya-lab.com",
      role: "student" as UserRole,
      level: 3,
      points: 230,
      progress: 65,
      department: "Quantum Physics",
      joinDate: "2022-09-10",
    },
  ],
  teachers: [
    {
      id: "t001",
      name: "Dr. Rajesh Kumar",
      email: "rajesh@akit.edu.in",
      role: "teacher" as UserRole,
      specialization: "Quantum Navigation",
      department: "Advanced Physics",
      joinDate: "2021-06-20",
    },
    {
      id: "t002",
      name: "Prof. Sarah Chen",
      email: "sarah@akit.edu.in",
      role: "teacher" as UserRole,
      specialization: "Biomimetic Engineering",
      department: "Aerospace Design",
      joinDate: "2020-08-15",
    },
  ],
  admins: [
    {
      id: "a001",
      name: "Admin User",
      email: "admin@avasya-lab.com",
      role: "admin" as UserRole,
    },
  ],
}

// Create auth context
interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("avasya_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let foundUser: User | undefined

    // Find user based on role and email
    if (role === "student") {
      foundUser = MOCK_USERS.students.find((u) => u.email === email)
    } else if (role === "teacher") {
      foundUser = MOCK_USERS.teachers.find((u) => u.email === email || u.id === email)
    } else if (role === "admin") {
      foundUser = MOCK_USERS.admins.find((u) => u.email === email)
    }

    // Check if user exists and password is correct (in a real app, you'd hash passwords)
    if (foundUser && password === "12345") {
      setUser(foundUser)
      localStorage.setItem("avasya_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("avasya_user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
