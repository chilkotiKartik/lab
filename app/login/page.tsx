"use client"

import type React from "react"

import { useState } from "react"
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
import { Eye, EyeOff, GraduationCap, BookOpen, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock login
      login({
        id: "1",
        name: role === "student" ? "Alex Johnson" : role === "teacher" ? "Dr. Rajesh Kumar" : "Admin User",
        email,
        role,
        level: 2,
        progress: 45,
        points: 175,
      })

      toast({
        title: "Success",
        description: "You have successfully logged in",
      })

      // Redirect based on role
      if (role === "student") {
        router.push("/student/dashboard")
      } else if (role === "teacher") {
        router.push("/teacher/dashboard")
      } else {
        router.push("/admin/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
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
                      <CharacterAvatar role={role} size="lg" animation="float" />
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
                      />
                      <p className="text-xs text-muted-foreground">
                        Example:{" "}
                        {role === "student"
                          ? "S001 or alex@avasya.edu"
                          : role === "teacher"
                            ? "T001 or rajesh@avasya.edu"
                            : "A001 or admin@avasya.edu"}
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
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Default password: 12345</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
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
      </div>
    </div>
  )
}
