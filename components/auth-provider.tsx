"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase-service"

// Define user roles
export type UserRole = "student" | "teacher" | "admin"

// Define user interface
export interface User {
  id: string
  name: string
  email: string
  roll_number?: string
  role: UserRole
  department?: string
  specialization?: string
  area_of_work?: string
  avatar_url?: string
  level?: number
  points?: number
  progress?: number
  join_date?: string
  is_active?: boolean
}

// Create auth context
interface AuthContextType {
  user: User | null
  login: (identifier: string, password: string) => Promise<boolean>
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
        localStorage.removeItem("avasya_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function with real database integration
  const login = async (identifier: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Try to find user by email or roll number
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .or(`email.eq.${identifier},roll_number.eq.${identifier}`)
        .eq("password", password)
        .eq("is_active", true)
        .single()

      if (error || !userData) {
        setIsLoading(false)
        return false
      }

      // Set user role based on their position/specialization
      let userRole: UserRole = "student"
      if (
        userData.area_of_work?.toLowerCase().includes("project manager") ||
        userData.area_of_work?.toLowerCase().includes("co-head")
      ) {
        userRole = "admin"
      } else if (userData.level >= 4 || userData.points >= 400) {
        userRole = "teacher"
      }

      const authenticatedUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        roll_number: userData.roll_number,
        role: userRole,
        department: userData.department,
        specialization: userData.specialization,
        area_of_work: userData.area_of_work,
        avatar_url: userData.avatar_url,
        level: userData.level,
        points: userData.points,
        progress: userData.progress,
        join_date: userData.join_date,
        is_active: userData.is_active,
      }

      setUser(authenticatedUser)
      localStorage.setItem("avasya_user", JSON.stringify(authenticatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
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
