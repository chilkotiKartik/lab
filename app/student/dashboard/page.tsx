"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  Trophy,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StudentDashboard() {
  const { user, profile, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user || !profile) {
        router.push("/login")
      } else if (profile.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        setDashboardLoading(false)
      }
    }
  }, [loading, isAuthenticated, user, profile, router])

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <p className="text-destructive">Failed to load profile. Please try logging in again.</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Project Progress",
      value: "75%",
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Team Members",
      value: profile.teamMembers?.length || 0,
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tasks Completed",
      value: "12/16",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Research Points",
      value: "2,450",
      icon: <Star className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Project milestone completed",
      description: "Data collection phase finished",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Team meeting scheduled",
      description: "Weekly sync meeting tomorrow at 3 PM",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      title: "New research paper uploaded",
      description: "Literature review document added",
      time: "1 day ago",
      type: "success",
    },
    {
      id: 4,
      title: "Feedback received",
      description: "Supervisor provided comments on methodology",
      time: "2 days ago",
      type: "warning",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Complete data analysis",
      dueDate: "Tomorrow",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Prepare presentation slides",
      dueDate: "This week",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      title: "Submit progress report",
      dueDate: "Next week",
      priority: "high",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome back, {profile.name}! 👋</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your project: <span className="font-medium">{profile.projectTitle}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.photoURL || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.rollNumber}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div
                          className={`p-1 rounded-full ${
                            activity.type === "success"
                              ? "bg-green-100 text-green-600"
                              : activity.type === "warning"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {activity.type === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : activity.type === "warning" ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                            {task.priority}
                          </Badge>
                          <Badge variant={task.status === "in-progress" ? "default" : "outline"}>{task.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="project" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>{profile.projectTitle}</CardTitle>
                  <CardDescription>Project details and progress tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="font-medium">Research Phase</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <p className="font-medium">Development</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium">Testing</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Members
                  </CardTitle>
                  <CardDescription>Collaborate with your project team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.teamMembers?.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <Avatar>
                          <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member}</p>
                          <p className="text-sm text-muted-foreground">Team Member</p>
                        </div>
                      </div>
                    )) || <p className="text-muted-foreground col-span-2">No team members assigned yet.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Progress Analytics
                  </CardTitle>
                  <CardDescription>Track your project milestones and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Milestones</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Project Proposal", completed: true },
                          { name: "Literature Review", completed: true },
                          { name: "Data Collection", completed: true },
                          { name: "Analysis & Development", completed: false },
                          { name: "Final Report", completed: false },
                        ].map((milestone, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${milestone.completed ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <span className={milestone.completed ? "text-foreground" : "text-muted-foreground"}>
                              {milestone.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Achievements</h4>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="mr-2">
                          First Milestone ✨
                        </Badge>
                        <Badge variant="secondary" className="mr-2">
                          Team Player 🤝
                        </Badge>
                        <Badge variant="secondary" className="mr-2">
                          Research Expert 📚
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Button asChild className="h-auto p-4 justify-start">
            <Link href="/student/projects/submit">
              <FileText className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Submit Work</p>
                <p className="text-sm opacity-80">Upload your latest progress</p>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 justify-start">
            <Link href="/student/assignments">
              <BookOpen className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">View Assignments</p>
                <p className="text-sm opacity-80">Check pending tasks</p>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4 justify-start">
            <Link href="/gallery">
              <MessageSquare className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Team Chat</p>
                <p className="text-sm opacity-80">Collaborate with team</p>
              </div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
