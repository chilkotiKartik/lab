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
import { Eye, EyeOff, Loader2, Rocket, Users, Brain } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const { toast } = useToast()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/student/dashboard")
      }
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!identifier) {
      toast({
        title: "Email/Roll Number Required",
        description: "Please enter your email or roll number",
        variant: "destructive",
      })
      return
    }

    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter your password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await login(identifier, password)

      if (success) {
        toast({
          title: "Welcome to AVASYA! 🚀",
          description: `Successfully logged in. Redirecting to your dashboard...`,
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please check your email/roll number and password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
                  <p className="text-xs text-muted-foreground">
                    Password is the last 4 digits of your roll number (e.g., 2676 for 24f1002676)
                  </p>
                </div>

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
                  <span>6+ Projects</span>
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
