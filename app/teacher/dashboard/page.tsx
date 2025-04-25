"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TeacherLayout } from "@/components/teacher/teacher-layout"
import { FileText, Users, Clock, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { CharacterAvatar } from "@/components/character-avatar"

// Mock data
const pendingReviews = [
  {
    id: 1,
    title: "Quantum Navigation Research Paper",
    student: "Alex Johnson",
    submittedDate: "2023-07-10",
    dueDate: "2023-07-15",
    course: "Advanced Physics",
    priority: "high",
  },
  {
    id: 2,
    title: "Biomimetic Drone Design Project",
    student: "Maya Patel",
    submittedDate: "2023-07-08",
    dueDate: "2023-07-22",
    course: "Aerospace Engineering",
    priority: "medium",
  },
  {
    id: 3,
    title: "Self-Healing Materials Analysis",
    student: "Carlos Rodriguez",
    submittedDate: "2023-07-12",
    dueDate: "2023-08-05",
    course: "Materials Science",
    priority: "low",
  },
]

const activeCourses = [
  {
    id: 1,
    title: "Introduction to Quantum Physics",
    students: 24,
    progress: 65,
    nextSession: "Tomorrow, 10:00 AM",
  },
  {
    id: 2,
    title: "Advanced Aerospace Design",
    students: 18,
    progress: 45,
    nextSession: "Today, 2:00 PM",
  },
  {
    id: 3,
    title: "Materials Science Fundamentals",
    students: 32,
    progress: 80,
    nextSession: "July 15, 11:00 AM",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Virtual Lab Session",
    date: "July 12, 2023",
    time: "10:00 AM - 12:00 PM",
    type: "class",
  },
  {
    id: 2,
    title: "Department Meeting",
    date: "July 14, 2023",
    time: "2:00 PM - 3:30 PM",
    type: "meeting",
  },
  {
    id: 3,
    title: "Research Presentation",
    date: "July 18, 2023",
    time: "11:00 AM - 12:30 PM",
    type: "presentation",
  },
]

export default function TeacherDashboardPage() {
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
      <TeacherLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </TeacherLayout>
    )
  }

  return (
    <TeacherLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Here's an overview of your teaching activities and pending tasks.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/teacher/courses/create">
                <Plus className="mr-2 h-4 w-4" /> Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">74 total students enrolled</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 high priority, 9 regular</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">74</div>
              <p className="text-xs text-muted-foreground">Across 5 different courses</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">In the next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Reviews */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Reviews</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/reviews">View All</Link>
                </Button>
              </div>
              <CardDescription>Assignments waiting for your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{review.title}</div>
                        <div className="flex items-center gap-2">
                          <CharacterAvatar role="student" size="sm" animation={false} />
                          <span className="text-sm text-muted-foreground">{review.student}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          review.priority === "high"
                            ? "destructive"
                            : review.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {review.priority === "high" ? "High Priority" : review.priority === "medium" ? "Medium" : "Low"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Submitted: {review.submittedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due: {review.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/teacher/reviews/${review.id}`}>Review</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Courses */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Courses</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/courses">View All</Link>
                </Button>
              </div>
              <CardDescription>Your current teaching courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCourses.map((course) => (
                  <div key={course.id} className="flex flex-col space-y-2 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.students} students enrolled</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{course.progress}% complete</div>
                    </div>
                    <Progress value={course.progress} className="h-1" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Next: {course.nextSession}</span>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/teacher/courses/${course.id}`}>Manage</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Events */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Schedule</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/teacher/schedule">Full Calendar</Link>
              </Button>
            </div>
            <CardDescription>Your upcoming classes and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-background/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge
                        variant={
                          event.type === "class" ? "secondary" : event.type === "meeting" ? "outline" : "default"
                        }
                      >
                        {event.type === "class" ? "Class" : event.type === "meeting" ? "Meeting" : "Presentation"}
                      </Badge>
                    </div>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
