"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Award,
  MessageSquare,
  Settings,
  Eye,
  Edit,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface PendingSubmission {
  id: string
  title: string
  description: string
  category: string
  author: string
  author_avatar: string
  submitted_date: string
  status: "pending" | "approved" | "rejected"
  type: "research" | "project"
  content?: string
  files?: string[]
}

interface TeamMember {
  id: string
  name: string
  email: string
  department: string
  specialization: string
  level: number
  points: number
  avatar_url: string
  is_active: boolean
}

export default function InstructorDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
    loadDashboardData()
  }, [user, router])

  const loadDashboardData = async () => {
    try {
      const supabase = getSupabaseClient()

      // Load team members
      const { data: members, error: membersError } = await supabase
        .from("users")
        .select("*")
        .eq("is_active", true)
        .order("points", { ascending: false })

      if (membersError) throw membersError
      setTeamMembers(members || [])

      // Mock pending submissions (in real app, this would come from database)
      setPendingSubmissions([
        {
          id: "1",
          title: "Quantum Entanglement Communication System",
          description: "Revolutionary communication system using quantum entanglement for instantaneous data transfer",
          category: "Space",
          author: "Lakshay Verma",
          author_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          submitted_date: "2024-01-15",
          status: "pending",
          type: "research",
        },
        {
          id: "2",
          title: "Bio-Inspired Drone Navigation",
          description: "Drone navigation system inspired by bird migration patterns and insect flight dynamics",
          category: "Drone",
          author: "Harshal Kokate",
          author_avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
          submitted_date: "2024-01-14",
          status: "pending",
          type: "project",
        },
        {
          id: "3",
          title: "Atmospheric Pressure Analysis on Mars",
          description: "Comprehensive study of Martian atmospheric conditions for future colonization planning",
          category: "Space",
          author: "Swarnabha Banerjee",
          author_avatar: "https://images.unsplash.com/photo-1522075469751-3847ae2c3d1c?w=150&h=150&fit=crop&crop=face",
          submitted_date: "2024-01-13",
          status: "pending",
          type: "research",
        },
      ])

      setIsLoading(false)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleApproveSubmission = async (submissionId: string) => {
    try {
      // Update submission status
      setPendingSubmissions((prev) =>
        prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "approved" as const } : sub)),
      )

      toast({
        title: "Submission Approved! ✅",
        description: "The submission has been approved and will be published.",
      })
    } catch (error) {
      console.error("Error approving submission:", error)
      toast({
        title: "Error",
        description: "Failed to approve submission",
        variant: "destructive",
      })
    }
  }

  const handleRejectSubmission = async (submissionId: string) => {
    try {
      // Update submission status
      setPendingSubmissions((prev) =>
        prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "rejected" as const } : sub)),
      )

      toast({
        title: "Submission Rejected",
        description: "The submission has been rejected and feedback sent to author.",
      })
    } catch (error) {
      console.error("Error rejecting submission:", error)
      toast({
        title: "Error",
        description: "Failed to reject submission",
        variant: "destructive",
      })
    }
  }

  const stats = {
    totalMembers: teamMembers.length,
    pendingReviews: pendingSubmissions.filter((sub) => sub.status === "pending").length,
    approvedToday: pendingSubmissions.filter((sub) => sub.status === "approved").length,
    activeProjects: 6,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading instructor dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold font-space mb-2">
            Instructor Dashboard
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent ml-2">
              Control Center
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {user?.name}! Manage submissions, review projects, and guide your research team.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            {
              title: "Team Members",
              value: stats.totalMembers,
              icon: <Users className="h-6 w-6" />,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10",
            },
            {
              title: "Pending Reviews",
              value: stats.pendingReviews,
              icon: <Clock className="h-6 w-6" />,
              color: "text-orange-500",
              bgColor: "bg-orange-500/10",
            },
            {
              title: "Approved Today",
              value: stats.approvedToday,
              icon: <CheckCircle className="h-6 w-6" />,
              color: "text-green-500",
              bgColor: "bg-green-500/10",
            },
            {
              title: "Active Projects",
              value: stats.activeProjects,
              icon: <TrendingUp className="h-6 w-6" />,
              color: "text-purple-500",
              bgColor: "bg-purple-500/10",
            },
          ].map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="team">Team Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest submissions and team activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingSubmissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={submission.author_avatar || "/placeholder.svg"}
                          alt={submission.author}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{submission.title}</p>
                        <p className="text-xs text-muted-foreground">by {submission.author}</p>
                      </div>
                      <Badge variant={submission.status === "pending" ? "secondary" : "default"}>
                        {submission.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Team members with highest contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamMembers.slice(0, 5).map((member, index) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar_url || "/placeholder.svg"}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.specialization}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{member.points} pts</p>
                        <p className="text-xs text-muted-foreground">Level {member.level}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Pending Submissions</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </div>

            <div className="grid gap-6">
              {pendingSubmissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={submission.author_avatar || "/placeholder.svg"}
                              alt={submission.author}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{submission.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {submission.author} • {submission.submitted_date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{submission.category}</Badge>
                          <Badge variant={submission.type === "research" ? "default" : "secondary"}>
                            {submission.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{submission.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>

                        {submission.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectSubmission(submission.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button size="sm" onClick={() => handleApproveSubmission(submission.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </div>
                        )}

                        {submission.status !== "pending" && (
                          <Badge
                            variant={submission.status === "approved" ? "default" : "destructive"}
                            className="capitalize"
                          >
                            {submission.status}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Team Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>

            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={member.avatar_url || "/placeholder.svg"}
                            alt={member.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-sm text-muted-foreground">{member.specialization}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-center">
                            <p className="text-sm font-bold">{member.level}</p>
                            <p className="text-xs text-muted-foreground">Level</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold">{member.points}</p>
                            <p className="text-xs text-muted-foreground">Points</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Insights</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                  <CardDescription>Monthly submission statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <p>Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Individual and team metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <p>Performance metrics would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
