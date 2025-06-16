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
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
  isAuthenticated: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Check for stored auth in localStorage (for mock auth)
        const storedAuth = localStorage.getItem("mockAuth")
        if (storedAuth && mounted) {
          try {
            const { mockUser, mockProfile } = JSON.parse(storedAuth)
            setUser(mockUser as User)
            setProfile(mockProfile as UserProfile)
            setIsAuthenticated(true)
          } catch (error) {
            console.error("Failed to parse stored auth:", error)
            localStorage.removeItem("mockAuth")
          }
        }

        // Set up Firebase auth state listener
        const unsubscribe = onAuthStateChange(async (authUser) => {
          if (!mounted) return

          if (authUser) {
            try {
              const userProfile = await getUserProfile(authUser.uid, authUser.email || "")
              setUser(authUser)
              setProfile(userProfile)
              setIsAuthenticated(true)
            } catch (error) {
              console.error("Error fetching user profile:", error)
              setUser(null)
              setProfile(null)
              setIsAuthenticated(false)
              toast({
                title: "Error",
                description: "Failed to load user profile",
                variant: "destructive",
              })
            }
          } else {
            setUser(null)
            setProfile(null)
            setIsAuthenticated(false)
          }

          setLoading(false)
        })

        // If no stored auth and no Firebase user, finish loading
        if (!storedAuth) {
          setLoading(false)
        }

        return unsubscribe
      } catch (error) {
        console.error("Auth initialization error:", error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    const unsubscribe = initializeAuth()

    return () => {
      mounted = false
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [toast])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user: authUser, profile: userProfile } = await signIn(email, password)

      setUser(authUser)
      setProfile(userProfile)
      setIsAuthenticated(true)

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
      setIsAuthenticated(false)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOutUser()
      setUser(null)
      setProfile(null)
      setIsAuthenticated(false)
      localStorage.removeItem("mockAuth")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
