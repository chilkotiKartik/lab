"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import { useAuth } from "@/components/auth-provider"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import {
  Users,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Plus,
  UserPlus,
  CheckCircle2,
  XCircle,
  FileText,
  Rocket,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const stats = {
  students: 128,
  teachers: 24,
  courses: 15,
  pendingApprovals: 7,
  activeUsers: 87,
  totalResearch: 42,
  totalProjects: 18,
  studentGrowth: 12,
  teacherGrowth: 5,
  courseGrowth: 8,
}

const recentActivity = [
  {
    id: "1",
    type: "research",
    title: "Quantum Navigation Systems for Interplanetary Travel",
    author: "Dr. Elara Vega",
    status: "pending",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "project",
    title: "BioDrone Initiative",
    author: "Dr. Aiden Mercer",
    status: "pending",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "user",
    title: "New User Registration",
    author: "Sophia Chen",
    status: "new",
    time: "1 day ago",
  },
  {
    id: "4",
    type: "research",
    title: "Self-Healing Materials for Orbital Debris Protection",
    author: "Prof. Kai Zhang",
    status: "approved",
    time: "2 days ago",
  },
]

const pendingApprovals = [
  {
    id: "1",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    role: "student",
    department: "Aerospace Engineering",
    requestDate: "2023-07-10",
  },
  {
    id: "2",
    name: "Dr. Marcus Williams",
    email: "m.williams@example.com",
    role: "teacher",
    department: "Quantum Physics",
    requestDate: "2023-07-09",
  },
  {
    id: "3",
    name: "Aiden Park",
    email: "aiden.park@example.com",
    role: "student",
    department: "Materials Science",
    requestDate: "2023-07-08",
  },
]

const recentCourses = [
  {
    id: "1",
    title: "Introduction to Quantum Physics",
    instructor: "Dr. Rajesh Kumar",
    students: [
      { role: "student", variant: 1 },
      { role: "student", variant: 2 },
      { role: "student", variant: 3 },
    ],
    progress: 65,
    status: "active",
  },
  {
    id: "2",
    title: "Advanced Aerospace Design",
    instructor: "Prof. Sarah Chen",
    students: [
      { role: "student", variant: 4 },
      { role: "student", variant: 5 },
      { role: "student", variant: 1 },
    ],
    progress: 45,
    status: "active",
  },
  {
    id: "3",
    title: "Materials Science Fundamentals",
    instructor: "Dr. James Wilson",
    students: [
      { role: "student", variant: 2 },
      { role: "student", variant: 3 },
      { role: "student", variant: 4 },
      { role: "student", variant: 5 },
    ],
    progress: 80,
    status: "active",
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="relative space-y-6">
        <div className="absolute inset-0 -z-10 opacity-10">
          <SpaceBackground starCount={100} />
          <SpaceParticles particleCount={20} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Admin"}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/users/create">
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/courses/create">
                <Plus className="mr-2 h-4 w-4" /> New Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Admin Profile Card */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <CharacterAvatar role="admin" size="lg" animation="pulse" className="cosmic-glow" />
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || "Admin User"}</h2>
                    <p className="text-muted-foreground">{user?.email || "admin@avasya-lab.com"}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                      Administrator
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Full Access
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Pending Approvals</p>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold mt-1">{stats.pendingApprovals}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Active Users</p>
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold mt-1">{stats.activeUsers}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Total Courses</p>
                      <BookOpen className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold mt-1">{stats.courses}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">
              Pending Approvals <Badge className="ml-2 bg-primary">{pendingApprovals.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Students</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.students}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500">{stats.studentGrowth}%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Teachers</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.teachers}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500">{stats.teacherGrowth}%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Research</CardTitle>
                    <FileText className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalResearch}</div>
                    <p className="text-xs text-muted-foreground">{stats.pendingApprovals} pending approval</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <Rocket className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProjects}</div>
                    <p className="text-xs text-muted-foreground">{Math.floor(stats.totalProjects * 0.3)} in progress</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "research"
                              ? "bg-blue-500/10"
                              : activity.type === "project"
                                ? "bg-purple-500/10"
                                : "bg-green-500/10"
                          }`}
                        >
                          {activity.type === "research" && <FileText className="h-4 w-4 text-blue-500" />}
                          {activity.type === "project" && <Rocket className="h-4 w-4 text-purple-500" />}
                          {activity.type === "user" && <Users className="h-4 w-4 text-green-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            activity.status === "pending"
                              ? "outline"
                              : activity.status === "approved"
                                ? "default"
                                : "secondary"
                          }
                          className={
                            activity.status === "pending"
                              ? "bg-amber-500/10 text-amber-500"
                              : activity.status === "approved"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-blue-500/10 text-blue-500"
                          }
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Summary */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Analytics Summary</CardTitle>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" /> Full Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Student Engagement</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Research Completion</span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Project Success Rate</span>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Pending User Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <motion.div
                      key={approval.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-lg gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{approval.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{approval.name}</p>
                          <p className="text-sm text-muted-foreground">{approval.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                approval.role === "student"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-purple-500/10 text-purple-500"
                              }
                            >
                              {approval.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{approval.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-xs text-muted-foreground mr-2">Requested: {approval.requestDate}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500 text-green-500 hover:bg-green-500/10"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Pending Content Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity
                    .filter((a) => a.status === "pending")
                    .map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 rounded-lg gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              activity.type === "research" ? "bg-blue-500/10" : "bg-purple-500/10"
                            }`}
                          >
                            {activity.type === "research" && <FileText className="h-4 w-4 text-blue-500" />}
                            {activity.type === "project" && <Rocket className="h-4 w-4 text-purple-500" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">By {activity.author}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                                {activity.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Button size="sm" asChild>
                            <Link href={`/admin/reviews/${activity.type}s/${activity.id}`}>Review</Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Courses</CardTitle>
                <Button asChild>
                  <Link href="/admin/courses/create">
                    <Plus className="h-4 w-4 mr-2" /> New Course
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        </div>
                        <Badge
                          variant={course.status === "active" ? "default" : "outline"}
                          className={course.status === "active" ? "bg-green-500/10 text-green-500" : ""}
                        >
                          {course.status}
                        </Badge>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Course Progress</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex -space-x-2">
                          {course.students.map((student, index) => (
                            <div key={index} className="relative">
                              <CharacterAvatar role={student.role} variant={student.variant} size="sm" />
                            </div>
                          ))}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs font-medium">
                            +{course.students.length}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/courses/${course.id}`}>Manage</Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
