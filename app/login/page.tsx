"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CharacterAvatar } from "@/components/character-avatar"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, Rocket, Users, Brain, Info, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { login, user, profile } = useAuth()
  const { toast } = useToast()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showHint, setShowHint] = useState(false)

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user && profile) {
      if (profile.role === "admin") {
        router.push("/admin/dashboard")
      } else if (profile.role === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/student/dashboard")
      }
    }
  }, [user, profile, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!identifier) {
      setError("Please enter your email or roll number")
      return
    }

    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)

    try {
      // Convert roll number to email if needed
      const email = identifier.includes("@") ? identifier : `${identifier}@ds.study.iitm.ac.in`

      const success = await login(email, password)

      if (success) {
        toast({
          title: "Welcome to AVASYA! 🚀",
          description: `Successfully logged in. Redirecting to your dashboard...`,
        })
      } else {
        setError("Invalid credentials. Please check your email/roll number and password.")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (email: string, password: string) => {
    setIdentifier(email)
    setPassword(password)
    setShowHint(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <SpaceBackground />
      <SpaceParticles />
      <div className="absolute inset-0 z-0 space-dots" />
      <div className="absolute inset-0 z-0 cosmic-bg"></div>

      <div className="container max-w-md px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-card/80 backdrop-blur-md border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <CharacterAvatar role="student" size="xl" animation="float" className="cosmic-glow" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-bold">AVASYA Research Lab</CardTitle>
              <CardDescription>Sign in to access your research dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="identifier">Email or Roll Number</Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or roll number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                  <p className="text-xs text-muted-foreground">Example: 24f1002676 or your email address</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-background/50 backdrop-blur-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Password is the last 4 digits of your roll number</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Demo Accounts
                    </Button>
                  </div>
                </div>

                {showHint && (
                  <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
                    <p className="font-medium">Quick Login Options:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-auto py-1 text-xs justify-start"
                        onClick={() => fillDemoCredentials("admin@infinity.tech", "admin123")}
                      >
                        <Users className="h-3 w-3 mr-1" /> Admin
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-auto py-1 text-xs justify-start"
                        onClick={() => fillDemoCredentials("24f1001450@ds.study.iitm.ac.in", "1450")}
                      >
                        <Brain className="h-3 w-3 mr-1" /> Student
                      </Button>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full cosmic-gradient-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" /> Launch Dashboard
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
              <div className="grid grid-cols-3 gap-4 w-full text-xs">
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                  <Users className="h-4 w-4 mb-1 text-blue-500" />
                  <span>32+ Members</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                  <Rocket className="h-4 w-4 mb-1 text-purple-500" />
                  <span>12+ Projects</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-muted/30 rounded-lg">
                  <Brain className="h-4 w-4 mb-1 text-green-500" />
                  <span>Research Lab</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Need help? Contact{" "}
                <Link href="mailto:24f1002676@ds.study.iitm.ac.in" className="text-primary hover:underline">
                  Sayan Ray (Project Manager)
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
