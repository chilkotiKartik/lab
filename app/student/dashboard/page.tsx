"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { StudentLayout } from "@/components/student/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { SpaceScene } from "@/components/space-scene"
import { NumberedAstronaut } from "@/components/numbered-astronaut"
import { getSupabaseClient } from "@/lib/supabase-service"
import { Users, Rocket, Plus, Star, Trophy, Check, Target, TrendingUp, Brain, Cpu, Satellite } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TeamProject {
  id: string
  title: string
  description: string
  category: string
  status: string
  progress: number
  image_url: string
  start_date: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  department: string
  specialization: string
  area_of_work: string
  avatar_url: string
  level: number
  points: number
}

export default function StudentDashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [showWelcome, setShowWelcome] = useState(true)
  const [teamProjects, setTeamProjects] = useState<TeamProject[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [userStats, setUserStats] = useState({
    totalProjects: 0,
    completedTasks: 0,
    teamRank: 0,
    weeklyProgress: 0,
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/student/dashboard")
    }

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [user, isLoading, router])

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user) return

      try {
        const supabase = getSupabaseClient()

        // Fetch team projects
        const { data: projects } = await supabase
          .from("team_projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6)

        if (projects) {
          setTeamProjects(projects)
        }

        // Fetch team members
        const { data: members } = await supabase
          .from("users")
          .select("id, name, email, department, specialization, area_of_work, avatar_url, level, points")
          .eq("is_active", true)
          .order("points", { ascending: false })
          .limit(10)

        if (members) {
          setTeamMembers(members)

          // Calculate user rank
          const userRank = members.findIndex((member) => member.id === user.id) + 1
          setUserStats((prev) => ({
            ...prev,
            teamRank: userRank || members.length + 1,
            totalProjects: projects?.length || 0,
            completedTasks: Math.floor((user.progress || 0) / 10),
            weeklyProgress: Math.min((user.points || 0) / 10, 100),
          }))
        }
      } catch (error) {
        console.error("Error fetching team data:", error)
      }
    }

    fetchTeamData()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "space":
        return <Rocket className="h-4 w-4" />
      case "drone":
        return <Cpu className="h-4 w-4" />
      case "aero":
        return <Satellite className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getSpecializationColor = (specialization: string) => {
    if (specialization?.toLowerCase().includes("space")) return "bg-blue-500/10 text-blue-500"
    if (specialization?.toLowerCase().includes("drone")) return "bg-purple-500/10 text-purple-500"
    if (specialization?.toLowerCase().includes("aero")) return "bg-green-500/10 text-green-500"
    if (specialization?.toLowerCase().includes("electronics")) return "bg-amber-500/10 text-amber-500"
    return "bg-gray-500/10 text-gray-500"
  }

  return (
    <StudentLayout>
      <div className="relative">
        {/* Welcome overlay */}
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
                <NumberedAstronaut number={user?.level?.toString() || "01"} size="xl" color="blue" />
              </div>
              <h1 className="text-4xl font-bold mt-4">Welcome back, {user?.name?.split(" ")[0]}!</h1>
              <p className="text-muted-foreground">Ready to continue your space research journey?</p>
              <div className="flex justify-center gap-2 mt-4">
                <Badge className="bg-primary/20 text-primary">Level {user?.level}</Badge>
                <Badge className="bg-amber-500/20 text-amber-500">{user?.points} Points</Badge>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="absolute inset-0 -z-10 opacity-10">
          <SpaceScene density="low" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">AVASYA Research Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/student/projects/submit">
                <Plus className="mr-2 h-4 w-4" /> Submit Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/team">
                <Users className="mr-2 h-4 w-4" /> View Team
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={user?.avatar_url || "/placeholder.svg"}
                      alt={user?.name || "User"}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">Level {user?.level}</Badge>
                  </div>
                </motion.div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">Roll: {user?.roll_number}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                      {user?.department}
                    </Badge>
                    <Badge variant="outline" className={getSpecializationColor(user?.specialization || "")}>
                      {user?.specialization}
                    </Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                      {user?.points} Points
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Rank #{userStats.teamRank}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Research Progress</span>
                      <span>{user?.progress}%</span>
                    </div>
                    <Progress value={user?.progress || 0} className="h-2" />
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Area of Work:</p>
                    <p className="text-sm text-muted-foreground">{user?.area_of_work}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" /> Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Projects</span>
                <Badge variant="outline">{userStats.totalProjects}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed Tasks</span>
                <Badge variant="outline">{userStats.completedTasks}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Ranking</span>
                <Badge className="bg-amber-500/20 text-amber-500">#{userStats.teamRank}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Progress</span>
                  <span>{userStats.weeklyProgress}%</span>
                </div>
                <Progress value={userStats.weeklyProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="projects">Team Projects</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Team Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Active AVASYA Projects</CardTitle>
                <CardDescription>Current research projects by the AVASYA team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-background/50 rounded-xl border border-border overflow-hidden card-hover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${getCategoryIcon(project.category)} bg-black/70 text-white`}>
                            {getCategoryIcon(project.category)}
                            <span className="ml-1">{project.category}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Started: {new Date(project.start_date).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>AVASYA Research Team</CardTitle>
                <CardDescription>Meet your fellow researchers and their specializations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      className="bg-background/50 rounded-lg border border-border p-4 card-hover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image
                            src={member.avatar_url || "/placeholder.svg"}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{member.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{member.department}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            L{member.level}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{member.points} pts</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Badge variant="outline" className={getSpecializationColor(member.specialization)}>
                          {member.specialization}
                        </Badge>
                        <p className="text-xs text-muted-foreground line-clamp-2">{member.area_of_work}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" /> Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Team Member",
                      desc: "Joined AVASYA Research Lab",
                      icon: <Users className="h-4 w-4" />,
                      earned: true,
                    },
                    {
                      title: "First Contribution",
                      desc: "Made your first project contribution",
                      icon: <Star className="h-4 w-4" />,
                      earned: user?.points && user.points > 100,
                    },
                    {
                      title: "Research Pioneer",
                      desc: "Reached Level 3",
                      icon: <Rocket className="h-4 w-4" />,
                      earned: user?.level && user.level >= 3,
                    },
                    {
                      title: "Top Performer",
                      desc: "Reached 400+ points",
                      icon: <TrendingUp className="h-4 w-4" />,
                      earned: user?.points && user.points >= 400,
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg ${achievement.earned ? "bg-green-500/10 border border-green-500/20" : "bg-muted/30"}`}
                    >
                      <div
                        className={`p-2 rounded-full mr-3 ${achievement.earned ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                      </div>
                      {achievement.earned && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" /> Skill Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "Space Systems", level: Math.min(((user?.points || 0) / 100) * 20, 100) },
                    { skill: "Research Methods", level: Math.min((user?.level || 1) * 20, 100) },
                    { skill: "Team Collaboration", level: Math.min(user?.progress || 0, 100) },
                    { skill: "Technical Writing", level: Math.min(((user?.points || 0) / 80) * 15, 100) },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.skill}</span>
                        <span>{Math.round(skill.level)}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{user?.points}</div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">#{userStats.teamRank}</div>
                    <p className="text-sm text-muted-foreground">Team Ranking</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-500">{user?.level}</div>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border md:col-span-2">
                <CardHeader>
                  <CardTitle>Research Focus Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {user?.area_of_work?.split(",").map((area, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-lg text-center">
                        <div className="text-lg font-semibold">{area.trim()}</div>
                        <div className="text-sm text-muted-foreground">Focus Area</div>
                      </div>
                    )) || []}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
