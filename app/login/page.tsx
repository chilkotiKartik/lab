"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, GraduationCap, BookOpen, ShieldCheck, Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const { toast } = useToast()
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarVariant, setAvatarVariant] = useState(1)

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        router.push("/student/dashboard")
      } else if (user.role === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    }
  }, [user, router])

  // Change avatar variant when role changes
  useEffect(() => {
    setAvatarVariant(Math.floor(Math.random() * 5) + 1)
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email or ID",
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
      const success = await login(email, password, role)

      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome back to Avasya Research Lab!`,
        })

        // Redirect based on role
        if (role === "student") {
          router.push("/student/dashboard")
        } else if (role === "teacher") {
          router.push("/teacher/dashboard")
        } else {
          router.push("/admin/dashboard")
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
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
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Choose your role and enter your credentials to sign in</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="student" value={role} onValueChange={(value) => setRole(value as any)}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="student" className="flex flex-col items-center gap-2 py-3">
                      <GraduationCap className="h-5 w-5" />
                      <span>Student</span>
                    </TabsTrigger>
                    <TabsTrigger value="teacher" className="flex flex-col items-center gap-2 py-3">
                      <BookOpen className="h-5 w-5" />
                      <span>Teacher</span>
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex flex-col items-center gap-2 py-3">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Admin</span>
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-center mb-6">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <CharacterAvatar
                            role={role}
                            size="lg"
                            animation="float"
                            variant={avatarVariant}
                            className="cosmic-glow"
                          />
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {role === "student"
                            ? "Student ID / Email"
                            : role === "teacher"
                              ? "Teacher ID / Email"
                              : "Admin ID / Email"}
                        </Label>
                        <Input
                          id="email"
                          type="text"
                          placeholder={
                            role === "student"
                              ? "Enter your student ID or email"
                              : role === "teacher"
                                ? "Enter your teacher ID or email"
                                : "Enter your admin ID or email"
                          }
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          className="bg-background/50 backdrop-blur-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Example:{" "}
                          {role === "student"
                            ? "s001 or alex@avasya-lab.com"
                            : role === "teacher"
                              ? "t001 or rajesh@akit.edu.in"
                              : "a001 or admin@avasya-lab.com"}
                        </p>
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
                        <p className="text-xs text-muted-foreground">For demo purposes, any password will work</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>

                <Button type="submit" className="w-full cosmic-gradient-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                <Link href="/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
