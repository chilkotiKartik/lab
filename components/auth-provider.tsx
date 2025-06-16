"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange, signIn, signOutUser, getUserProfile, type UserProfile } from "@/lib/auth-service"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for stored auth in localStorage (for mock auth)
    const storedAuth = localStorage.getItem("mockAuth")
    if (storedAuth) {
      try {
        const { mockUser, mockProfile } = JSON.parse(storedAuth)
        setUser(mockUser as User)
        setProfile(mockProfile as UserProfile)
      } catch (error) {
        console.error("Failed to parse stored auth:", error)
        localStorage.removeItem("mockAuth")
      }
    }

    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setLoading(true)

      if (authUser) {
        try {
          const userProfile = await getUserProfile(authUser.uid, authUser.email || "")
          setUser(authUser)
          setProfile(userProfile)
        } catch (error) {
          console.error("Error fetching user profile:", error)
          toast({
            title: "Error",
            description: "Failed to load user profile",
            variant: "destructive",
          })
        }
      } else {
        setUser(null)
        setProfile(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [toast])

  const login = async (email: string, password: string) => {
    try {
      const { user: authUser, profile: userProfile } = await signIn(email, password)

      setUser(authUser)
      setProfile(userProfile)

      // Store mock auth in localStorage if needed
      if (authUser.uid.startsWith("mock-")) {
        localStorage.setItem(
          "mockAuth",
          JSON.stringify({
            mockUser: { uid: authUser.uid, email: authUser.email },
            mockProfile: userProfile,
          }),
        )
      }

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await signOutUser()
      setUser(null)
      setProfile(null)
      localStorage.removeItem("mockAuth")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }

  return <AuthContext.Provider value={{ user, profile, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
