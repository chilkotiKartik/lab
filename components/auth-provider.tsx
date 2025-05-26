"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase-service"

export type UserRole = "admin" | "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  roll_number?: string
  department?: string
  specialization?: string
  area_of_work?: string
  level?: number
  points?: number
  progress?: number
  avatar_url?: string
  is_active?: boolean
}

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

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("avasya_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("avasya_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Check for admin login
      if (identifier === "admin@kar" && password === "99976") {
        const adminUser: User = {
          id: "admin-001",
          name: "AVASYA Administrator",
          email: "admin@kar",
          role: "admin",
          level: 10,
          points: 9999,
          progress: 100,
          is_active: true,
        }

        setUser(adminUser)
        localStorage.setItem("avasya_user", JSON.stringify(adminUser))
        setIsLoading(false)
        return true
      }

      // Regular user login
      const supabase = getSupabaseClient()

      // Try to find user by email or roll number
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .or(`email.eq.${identifier},roll_number.eq.${identifier}`)
        .eq("is_active", true)
        .limit(1)

      if (error) {
        console.error("Login error:", error)
        setIsLoading(false)
        return false
      }

      if (!users || users.length === 0) {
        setIsLoading(false)
        return false
      }

      const userData = users[0]

      // Check password (last 4 digits of roll number)
      const expectedPassword = userData.roll_number?.slice(-4) || "0000"
      if (password !== expectedPassword) {
        setIsLoading(false)
        return false
      }

      // Create user object
      const loggedInUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role || "student",
        roll_number: userData.roll_number,
        department: userData.department,
        specialization: userData.specialization,
        area_of_work: userData.area_of_work,
        level: userData.level || 1,
        points: userData.points || 0,
        progress: userData.progress || 0,
        avatar_url: userData.avatar_url,
        is_active: userData.is_active,
      }

      setUser(loggedInUser)
      localStorage.setItem("avasya_user", JSON.stringify(loggedInUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("avasya_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
