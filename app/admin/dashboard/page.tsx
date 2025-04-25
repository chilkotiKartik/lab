"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import {
  Users,
  FileText,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Plus,
  UserPlus,
  Trash2,
  Edit,
} from "lucide-react"
import Link from "next/link"

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
    students: 24,
    progress: 65,
    status: "active",
  },
  {
    id: "2",
    title: "Advanced Aerospace Design",
    instructor: "Prof. Sarah Chen",
    students: 18,
    progress: 45,
    status: "active",
  },
  {
    id: "3",
    title: "Materials Science Fundamentals",
    instructor: "Dr. James Wilson",
    students: 32,
    progress: 80,
    status: "active",
  },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the Avasya Research Lab admin panel</p>
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

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.courses}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">{stats.courseGrowth}%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <AlertCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingApprovals > 0 ? "Needs review" : "All caught up!"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest submissions and user activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center">
                          <div className="p-2 rounded-full mr-3">
                            {activity.type === "research" ? (
                              <FileText className="h-5 w-5 text-blue-500" />
                            ) : activity.type === "project" ? (
                              <ClipboardCheck className="h-5 w-5 text-purple-500" />
                            ) : (
                              <Users className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {activity.author} • {activity.time}
                            </div>
                          </div>
                        </div>
                        <div>
                          {activity.status === "pending" ? (
                            <Badge className="bg-amber-500/20 text-amber-500">Pending</Badge>
                          ) : activity.status === "approved" ? (
                            <Badge className="bg-green-500/20 text-green-500">Approved</Badge>
                          ) : (
                            <Badge className="bg-blue-500/20 text-blue-500">New</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/admin/approvals">
                      <AlertCircle className="mr-2 h-4 w-4" /> Review Pending Approvals
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link href="/admin/courses">
                      <BookOpen className="mr-2 h-4 w-4" /> Manage Courses
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/users">
                      <Users className="mr-2 h-4 w-4" /> Manage Users
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/content">
                      <FileText className="mr-2 h-4 w-4" /> Manage Content
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/settings">
                      <CheckCircle className="mr-2 h-4 w-4" /> Update Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((approval) => (
                <Card key={approval.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <CharacterAvatar role={approval.role as any} size="md" />
                        <div>
                          <h3 className="font-medium text-lg">{approval.name}</h3>
                          <div className="text-sm text-muted-foreground">{approval.email}</div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <Badge variant="outline" className="capitalize">
                              {approval.role}
                            </Badge>
                            <div className="text-sm text-muted-foreground">{approval.department}</div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">Requested: {approval.requestDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        >
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No pending approvals found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-end">
              <Button asChild>
                <Link href="/admin/courses/create">
                  <Plus className="mr-2 h-4 w-4" /> Create New Course
                </Link>
              </Button>
            </div>
            {recentCourses.map((course) => (
              <Card key={course.id} className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-lg">{course.title}</h3>
                      <div className="text-sm text-muted-foreground">Instructor: {course.instructor}</div>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-muted-foreground">{course.students} students enrolled</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant={course.status === "active" ? "default" : "outline"}
                        className={course.status === "active" ? "bg-green-500/20 text-green-500" : ""}
                      >
                        {course.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/courses/${course.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
