"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StudentLayout } from "@/components/student/student-layout"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, BarChart } from "lucide-react"
import Link from "next/link"

// Mock data
const upcomingAssignments = [
  {
    id: 1,
    title: "Quantum Navigation Research Paper",
    dueDate: "2023-07-15",
    subject: "Advanced Physics",
    status: "pending",
    progress: 25,
  },
  {
    id: 2,
    title: "Biomimetic Drone Design Project",
    dueDate: "2023-07-22",
    subject: "Aerospace Engineering",
    status: "in-progress",
    progress: 60,
  },
  {
    id: 3,
    title: "Self-Healing Materials Analysis",
    dueDate: "2023-08-05",
    subject: "Materials Science",
    status: "pending",
    progress: 0,
  },
]

const recentCourses = [
  {
    id: 1,
    title: "Introduction to Quantum Physics",
    instructor: "Dr. Rajesh Kumar",
    progress: 75,
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    title: "Advanced Aerospace Design",
    instructor: "Prof. Sarah Chen",
    progress: 45,
    lastAccessed: "Yesterday",
  },
  {
    id: 3,
    title: "Materials Science Fundamentals",
    instructor: "Dr. James Wilson",
    progress: 90,
    lastAccessed: "Today",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Lab Session",
    date: "July 12, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Online",
  },
  {
    id: 2,
    title: "Research Presentation",
    date: "July 18, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Main Auditorium",
  },
  {
    id: 3,
    title: "Group Project Meeting",
    date: "July 20, 2023",
    time: "11:00 AM - 12:30 PM",
    location: "Room 302",
  },
]

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Here's an overview of your academic progress and upcoming tasks.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/student/courses">
                <BookOpen className="mr-2 h-4 w-4" /> Browse Courses
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Academic Level</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level {user?.level || 2}</div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-primary">{user?.progress || 45}% to next level</span>
              </div>
              <Progress value={user?.progress || 45} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 in progress, 2 completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 pending, 4 completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Points</CardTitle>
              <BarChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.points || 175}</div>
              <p className="text-xs text-muted-foreground">Rank: Top 15%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Assignments */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Assignments</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/assignments">View All</Link>
                </Button>
              </div>
              <CardDescription>Your pending and in-progress assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                      </div>
                      <Badge variant={assignment.status === "in-progress" ? "secondary" : "outline"}>
                        {assignment.status === "in-progress" ? "In Progress" : "Pending"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div>{assignment.progress}% complete</div>
                    </div>
                    <Progress value={assignment.progress} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Courses */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Courses</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/courses">View All</Link>
                </Button>
              </div>
              <CardDescription>Courses you've recently accessed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">Instructor: {course.instructor}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{course.lastAccessed}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Progress: {course.progress}%</div>
                    </div>
                    <Progress value={course.progress} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Events */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the coming days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-background/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
