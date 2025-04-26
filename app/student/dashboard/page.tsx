"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { StudentLayout } from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterAvatar } from "@/components/character-avatar"
import { useAuth } from "@/components/auth-provider"
import { SpaceScene } from "@/components/space-scene"
import { NumberedAstronaut } from "@/components/numbered-astronaut"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Award,
  Users,
  Rocket,
  ArrowRight,
  Plus,
  Star,
  Trophy,
  Zap,
  Globe,
  Check,
} from "lucide-react"
import Link from "next/link"

// Mock data
const upcomingAssignments = [
  {
    id: "1",
    title: "Quantum Navigation System Design",
    course: "Advanced Spacecraft Systems",
    dueDate: "2023-07-15",
    status: "pending",
  },
  {
    id: "2",
    title: "Biomimetic Drone Prototype",
    course: "Drone Engineering",
    dueDate: "2023-07-20",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Satellite Communication Protocol",
    course: "Space Communications",
    dueDate: "2023-07-25",
    status: "pending",
  },
]

const enrolledCourses = [
  {
    id: "1",
    title: "Advanced Spacecraft Systems",
    instructor: "Dr. Elara Vega",
    progress: 65,
    nextClass: "Tomorrow, 10:00 AM",
  },
  {
    id: "2",
    title: "Drone Engineering",
    instructor: "Prof. Kai Zhang",
    progress: 42,
    nextClass: "Wednesday, 2:00 PM",
  },
  {
    id: "3",
    title: "Space Communications",
    instructor: "Dr. Aiden Mercer",
    progress: 78,
    nextClass: "Friday, 11:00 AM",
  },
]

const recentAchievements = [
  {
    id: "1",
    title: "First Research Paper",
    description: "Published your first research paper",
    date: "2023-06-30",
    points: 100,
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Collaboration Star",
    description: "Collaborated with 5 different researchers",
    date: "2023-06-25",
    points: 75,
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Project Pioneer",
    description: "Started your first research project",
    date: "2023-06-15",
    points: 50,
    icon: <Rocket className="h-4 w-4" />,
  },
]

const learningPath = [
  {
    id: "1",
    title: "Beginner",
    description: "Complete basic courses",
    completed: true,
    current: false,
  },
  {
    id: "2",
    title: "Intermediate",
    description: "Submit your first project",
    completed: true,
    current: false,
  },
  {
    id: "3",
    title: "Advanced",
    description: "Publish a research paper",
    completed: false,
    current: true,
  },
  {
    id: "4",
    title: "Expert",
    description: "Lead a research team",
    completed: false,
    current: false,
  },
]

export default function StudentDashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [showWelcome, setShowWelcome] = useState(true)

  // Redirect if not logged in or not a student
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/login?redirect=/student/dashboard")
    }

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <StudentLayout>
      <div className="relative">
        {/* Welcome overlay - appears briefly then fades out */}
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 4 }}
          >
            <motion.div
              className="text-center space-y-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center">
                <NumberedAstronaut number="01" size="xl" color="blue" />
              </div>
              <h1 className="text-4xl font-bold mt-4">Welcome, {user?.name || "Student"}!</h1>
              <p className="text-muted-foreground">Your space adventure continues...</p>
            </motion.div>
          </motion.div>
        )}

        <div className="absolute inset-0 -z-10 opacity-10">
          <SpaceScene density="low" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Student"}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/student/projects/submit">
                <Plus className="mr-2 h-4 w-4" /> Submit Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/student/courses">
                <BookOpen className="mr-2 h-4 w-4" /> Browse Courses
              </Link>
            </Button>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                  <CharacterAvatar role="student" size="xl" animation="pulse" className="cosmic-glow" />
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">Level {user?.level || 2}</Badge>
                  </div>
                </motion.div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name || "Student Name"}</h2>
                    <p className="text-muted-foreground">{user?.email || "student@avasya-lab.com"}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                      {user?.department || "Aerospace Engineering"}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                      {user?.specialization || "Spacecraft Design"}
                    </Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                      {user?.points || 175} Research Points
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Level Progress</span>
                      <span>{user?.progress || 45}%</span>
                    </div>
                    <Progress value={user?.progress || 45} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {100 - (user?.progress || 45)} points needed for next level
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" /> Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Research Presentation", date: "Tomorrow, 2:00 PM", type: "presentation" },
                { title: "Project Deadline", date: "July 15, 11:59 PM", type: "deadline" },
                { title: "Team Meeting", date: "Wednesday, 10:00 AM", type: "meeting" },
              ].map((event, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className={`p-2 rounded-full mr-3 ${
                      event.type === "presentation"
                        ? "bg-blue-500/10 text-blue-500"
                        : event.type === "deadline"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {event.type === "presentation" ? (
                      <FileText className="h-4 w-4" />
                    ) : event.type === "deadline" ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="path">Learning Path</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Assignments",
                  value: "3",
                  description: "pending assignments",
                  icon: <FileText className="h-5 w-5 text-blue-500" />,
                  link: "/student/assignments",
                },
                {
                  title: "Courses",
                  value: "3",
                  description: "enrolled courses",
                  icon: <BookOpen className="h-5 w-5 text-purple-500" />,
                  link: "/student/courses",
                },
                {
                  title: "Projects",
                  value: "2",
                  description: "active projects",
                  icon: <Rocket className="h-5 w-5 text-amber-500" />,
                  link: "/student/projects",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-muted-foreground">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className="p-3 rounded-full bg-muted">{stat.icon}</div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="p-0" asChild>
                      <Link href={stat.link}>
                        View All <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>Your most recent assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAssignments.slice(0, 2).map((assignment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          className={
                            assignment.status === "pending"
                              ? "bg-amber-500/20 text-amber-500"
                              : "bg-blue-500/20 text-blue-500"
                          }
                        >
                          {assignment.status === "pending" ? "Due Soon" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your course completion status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCourses.slice(0, 2).map((course, index) => (
                    <div key={index} className="space-y-2 border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <p className="font-medium">{course.title}</p>
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">Next class: {course.nextClass}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Assignments due in the next two weeks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAssignments.map((assignment, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          assignment.status === "pending"
                            ? "bg-amber-500/20 text-amber-500"
                            : "bg-blue-500/20 text-blue-500"
                        }
                      >
                        {assignment.status === "pending" ? "Due Soon" : "In Progress"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/student/assignments">
                    View All Assignments <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-500">In Progress</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Next class: {course.nextClass}</span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Continue Learning
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/student/courses">
                  Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" /> Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start border-b pb-4 last:border-0 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-full mr-3">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{achievement.title}</p>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            +{achievement.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" /> Badges & Honors
                  </CardTitle>
                  <CardDescription>Special recognitions you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "Research Star", icon: <Star className="h-6 w-6" />, color: "amber" },
                      { name: "Team Player", icon: <Users className="h-6 w-6" />, color: "blue" },
                      { name: "Fast Learner", icon: <Zap className="h-6 w-6" />, color: "purple" },
                      { name: "Innovator", icon: <Rocket className="h-6 w-6" />, color: "green" },
                      { name: "Top Performer", icon: <Trophy className="h-6 w-6" />, color: "pink" },
                      { name: "Explorer", icon: <Globe className="h-6 w-6" />, color: "cyan" },
                    ].map((badge, index) => (
                      <motion.div
                        key={index}
                        className={`bg-${badge.color}-500/10 p-4 rounded-lg text-center flex flex-col items-center`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={`text-${badge.color}-500 mb-2`}>{badge.icon}</div>
                        <p className="text-xs font-medium">{badge.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="path" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Your Learning Journey</CardTitle>
                <CardDescription>Track your progress through the Avasya Research Program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Path line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted"></div>

                  {/* Path steps */}
                  <div className="space-y-8">
                    {learningPath.map((step, index) => (
                      <div key={index} className="relative flex items-start">
                        <div
                          className={`absolute left-6 top-6 h-full w-0.5 ${index === learningPath.length - 1 ? "bg-transparent" : "bg-muted"}`}
                        ></div>
                        <div
                          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full mr-4 ${
                            step.completed
                              ? "bg-green-500 text-white"
                              : step.current
                                ? "bg-blue-500 text-white"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium">{step.title}</h3>
                            {step.current && <Badge className="ml-2 bg-blue-500">Current</Badge>}
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>

                          {step.current && (
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
                <CardDescription>Suggested actions to advance your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Complete Research Methodology Course",
                      description: "Finish the remaining modules to strengthen your research skills",
                      icon: <BookOpen className="h-5 w-5" />,
                      action: "Continue Course",
                      link: "/student/courses/research-methodology",
                    },
                    {
                      title: "Submit Research Proposal",
                      description: "Prepare and submit your first research proposal",
                      icon: <FileText className="h-5 w-5" />,
                      action: "Start Proposal",
                      link: "/student/research/new",
                    },
                    {
                      title: "Join a Research Team",
                      description: "Collaborate with others on an existing research project",
                      icon: <Users className="h-5 w-5" />,
                      action: "Browse Teams",
                      link: "/student/teams",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-2 bg-primary/10 text-primary rounded-full mr-3">{step.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={step.link}>{step.action}</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
