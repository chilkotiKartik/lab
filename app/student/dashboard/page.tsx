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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WelcomeAnimation } from "@/components/welcome-animation"
import { getAnnouncements } from "@/lib/announcement-service"
import { getStudentSubmissions, getStudentAssignments } from "@/lib/project-service"
import {
  BookOpen,
  Users,
  Trophy,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Target,
  Zap,
  Bell,
  Upload,
  Download,
  Award,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StudentDashboard() {
  const { user, profile, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(true)
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [announcements, setAnnouncements] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user || !profile) {
        router.push("/login")
      } else if (profile.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        loadDashboardData()
      }
    }
  }, [loading, isAuthenticated, user, profile, router])

  const loadDashboardData = async () => {
    try {
      const userAnnouncements = getAnnouncements("student")
      const userSubmissions = getStudentSubmissions(profile?.rollNumber || "")
      const userAssignments = getStudentAssignments(profile?.rollNumber || "")

      setAnnouncements(userAnnouncements)
      setSubmissions(userSubmissions)
      setAssignments(userAssignments)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setDashboardLoading(false)
    }
  }

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
      change: "+5%",
    },
    {
      title: "Assignments",
      value: `${assignments.filter((a) => a.status === "completed").length}/${assignments.length}`,
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+2",
    },
    {
      title: "Team Score",
      value: "92/100",
      icon: <Users className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+8",
    },
    {
      title: "Achievements",
      value: "12",
      icon: <Trophy className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "+3",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Progress report submitted",
      description: "Mid-term progress report uploaded successfully",
      time: "2 hours ago",
      type: "success",
      icon: <Upload className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "New assignment received",
      description: "Literature review assignment due next week",
      time: "4 hours ago",
      type: "info",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Team meeting completed",
      description: "Weekly sync meeting with project team",
      time: "1 day ago",
      type: "success",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 4,
      title: "Achievement unlocked",
      description: "Earned 'Research Pioneer' badge",
      time: "2 days ago",
      type: "achievement",
      icon: <Award className="h-4 w-4" />,
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Complete data analysis",
      dueDate: "Tomorrow",
      priority: "high",
      status: "in-progress",
      progress: 60,
    },
    {
      id: 2,
      title: "Prepare presentation slides",
      dueDate: "This week",
      priority: "medium",
      status: "pending",
      progress: 0,
    },
    {
      id: 3,
      title: "Submit literature review",
      dueDate: "Next week",
      priority: "high",
      status: "pending",
      progress: 30,
    },
  ]

  return (
    <>
      {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back, {profile.name?.split(" ")[0]}! 👋</h1>
              <p className="text-muted-foreground">
                Project: <span className="font-medium text-primary">{profile.projectTitle}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/student/chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </Link>
              </Button>
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.photoURL || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          {/* Announcements */}
          {announcements.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Bell className="h-5 w-5" />
                    Latest Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {announcements.slice(0, 2).map((announcement) => (
                      <Alert key={announcement.id} className="border-primary/20">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{announcement.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {announcement.type}
                            </Badge>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                  {announcements.length > 2 && (
                    <Button variant="ghost" size="sm" className="mt-3" asChild>
                      <Link href="/student/announcements">View All Announcements</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change} this week
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <div className={stat.color}>{stat.icon}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="submissions">My Work</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Recent Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivities.map((activity) => (
                        <motion.div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              activity.type === "success"
                                ? "bg-green-100 text-green-600"
                                : activity.type === "achievement"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </motion.div>
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
                        <div key={task.id} className="p-3 rounded-lg bg-muted/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{task.title}</p>
                              <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Project Overview */}
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Project Overview: {profile.projectTitle}
                    </CardTitle>
                    <CardDescription>Track your research progress and milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        { name: "Research", completed: true, icon: <FileText className="h-5 w-5" /> },
                        { name: "Development", completed: true, icon: <Zap className="h-5 w-5" /> },
                        { name: "Testing", completed: false, icon: <CheckCircle className="h-5 w-5" /> },
                        { name: "Documentation", completed: false, icon: <BookOpen className="h-5 w-5" /> },
                      ].map((phase, index) => (
                        <div
                          key={index}
                          className={`text-center p-4 rounded-lg border-2 transition-all ${
                            phase.completed
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-muted/30 border-muted text-muted-foreground"
                          }`}
                        >
                          <div className="flex justify-center mb-2">{phase.icon}</div>
                          <p className="font-medium text-sm">{phase.name}</p>
                          <p className="text-xs">{phase.completed ? "Completed" : "Pending"}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      My Assignments
                    </CardTitle>
                    <CardDescription>View and manage your assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <motion.div
                          key={assignment.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-all"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                            </div>
                            <Badge variant={assignment.priority === "high" ? "destructive" : "secondary"}>
                              {assignment.priority}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                            <Button size="sm" asChild>
                              <Link href={`/student/assignments/${assignment.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Submissions</h2>
                  <Button asChild>
                    <Link href="/student/submit">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit New Work
                    </Link>
                  </Button>
                </div>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {submissions.length > 0 ? (
                        submissions.map((submission) => (
                          <div key={submission.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-medium">
                                  {submission.submissionType} - {submission.projectTitle}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">{submission.content}</p>
                              </div>
                              <Badge
                                variant={
                                  submission.status === "approved"
                                    ? "default"
                                    : submission.status === "rejected"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {submission.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-muted-foreground">
                                Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                              </p>
                              {submission.grade && <Badge variant="outline">Grade: {submission.grade}/100</Badge>}
                            </div>
                            {submission.feedback && (
                              <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                                <p className="text-sm font-medium">Feedback:</p>
                                <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No submissions yet</p>
                          <Button className="mt-4" asChild>
                            <Link href="/student/submit">Submit Your First Work</Link>
                          </Button>
                        </div>
                      )}
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
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Avatar>
                            <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{member}</p>
                            <p className="text-sm text-muted-foreground">Team Member</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )) || <p className="text-muted-foreground col-span-2">No team members assigned yet.</p>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Achievements & Badges
                    </CardTitle>
                    <CardDescription>Your accomplishments and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "First Submission",
                          description: "Submitted your first project work",
                          icon: "🎯",
                          earned: true,
                        },
                        {
                          name: "Team Player",
                          description: "Active collaboration with team members",
                          icon: "🤝",
                          earned: true,
                        },
                        {
                          name: "Research Pioneer",
                          description: "Completed comprehensive literature review",
                          icon: "🔬",
                          earned: true,
                        },
                        {
                          name: "Innovation Master",
                          description: "Developed novel research methodology",
                          icon: "💡",
                          earned: false,
                        },
                        {
                          name: "Presentation Pro",
                          description: "Delivered outstanding project presentation",
                          icon: "🎤",
                          earned: false,
                        },
                        {
                          name: "Publication Ready",
                          description: "Work ready for academic publication",
                          icon: "📚",
                          earned: false,
                        },
                      ].map((achievement, index) => (
                        <motion.div
                          key={index}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            achievement.earned
                              ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                              : "bg-muted/30 border-muted opacity-60"
                          }`}
                          whileHover={achievement.earned ? { scale: 1.05 } : {}}
                        >
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h3 className="font-medium text-sm">{achievement.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                          {achievement.earned && <Badge className="mt-2 bg-yellow-500 text-white">Earned</Badge>}
                        </motion.div>
                      ))}
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
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <Button asChild className="h-auto p-4 justify-start" size="lg">
              <Link href="/student/submit">
                <Upload className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Submit Work</p>
                  <p className="text-sm opacity-80">Upload your latest progress</p>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 justify-start" size="lg">
              <Link href="/student/assignments">
                <BookOpen className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Assignments</p>
                  <p className="text-sm opacity-80">View pending tasks</p>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 justify-start" size="lg">
              <Link href="/student/chat">
                <MessageSquare className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Team Chat</p>
                  <p className="text-sm opacity-80">Collaborate with team</p>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 justify-start" size="lg">
              <Link href="/student/resources">
                <Download className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Resources</p>
                  <p className="text-sm opacity-80">Download materials</p>
                </div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  )
}
