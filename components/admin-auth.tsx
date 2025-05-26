"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserAvatar } from "@/components/user-avatar"
import { SpaceBackground } from "@/components/space-background"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, Shield, Users, Brain, Settings } from "lucide-react"

interface AdminAuthProps {
  onSuccess: () => void
}

export function AdminAuth({ onSuccess }: AdminAuthProps) {
  const { login } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    // Check for admin credentials
    if (email !== "admin@kar" || password !== "99976") {
      toast({
        title: "Invalid Admin Credentials",
        description: "Please check your admin email and password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate admin login
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Admin Access Granted! 🔐",
          description: "Welcome to the AVASYA Admin Panel",
        })
        onSuccess()
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during authentication",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <SpaceBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-navy-900/20" />

      <div className="container max-w-md px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-card/90 backdrop-blur-md border-purple-500/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UserAvatar
                    name="Admin"
                    role="admin"
                    size="xl"
                    animation={true}
                    className="shadow-lg shadow-purple-500/25"
                  />
                  <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AVASYA Admin Panel
              </CardTitle>
              <CardDescription className="text-purple-200/70">
                Secure access to research management system
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-100">
                    Admin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@kar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-background/50 backdrop-blur-sm border-purple-500/30 focus:border-purple-400"
                  />
                  <p className="text-xs text-purple-300/70">Use: admin@kar</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-purple-100">
                    Admin Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="bg-background/50 backdrop-blur-sm border-purple-500/30 focus:border-purple-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full text-purple-300 hover:text-purple-100"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-purple-300/70">Use: 99976</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Access Admin Panel
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Users className="h-4 w-4 mb-1 text-purple-400" />
                  <span className="text-purple-200">32+ Members</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Brain className="h-4 w-4 mb-1 text-purple-400" />
                  <span className="text-purple-200">6+ Projects</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Settings className="h-4 w-4 mb-1 text-purple-400" />
                  <span className="text-purple-200">Full Control</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
