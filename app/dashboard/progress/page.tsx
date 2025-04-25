"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { triggerAchievement } from "@/components/achievements-notification"
import { Award, BookOpen, FileText, Users, Star, TrendingUp, Clock } from "lucide-react"

export default function ProgressPage() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(0)
  const [researchProgress, setResearchProgress] = useState(0)
  const [collaborationProgress, setCollaborationProgress] = useState(0)
  const [citationProgress, setCitationProgress] = useState(0)

  // Animate progress bars on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(user?.progress || 65), 500)
    const timer2 = setTimeout(() => setResearchProgress(78), 700)
    const timer3 = setTimeout(() => setCollaborationProgress(42), 900)
    const timer4 = setTimeout(() => setCitationProgress(90), 1100)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [user?.progress])

  // Sample data
  const stats = [
    { name: "Research Papers", value: "12", icon: FileText, color: "text-blue-500" },
    { name: "Collaborators", value: "8", icon: Users, color: "text-green-500" },
    { name: "Citations", value: "143", icon: BookOpen, color: "text-amber-500" },
    { name: "Achievements", value: "7", icon: Award, color: "text-purple-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Research Paper Published",
      description: "Your paper on 'Quantum Navigation Systems for Spacecraft' has been published",
      date: "2 days ago",
      icon: FileText,
    },
    {
      id: 2,
      title: "New Collaboration",
      description: "You started collaborating with Dr. Elara Vega on drone propulsion systems",
      date: "1 week ago",
      icon: Users,
    },
    {
      id: 3,
      title: "Achievement Unlocked",
      description: "You've earned the 'Rising Star' achievement",
      date: "2 weeks ago",
      icon: Star,
    },
  ]

  const milestones = [
    {
      id: 1,
      title: "Level 5 Researcher",
      description: "Publish 15 research papers",
      current: 12,
      target: 15,
      progress: (12 / 15) * 100,
    },
    {
      id: 2,
      title: "Collaboration Expert",
      description: "Collaborate with 10 different researchers",
      current: 8,
      target: 10,
      progress: (8 / 10) * 100,
    },
    {
      id: 3,
      title: "Citation Master",
      description: "Reach 200 citations across all papers",
      current: 143,
      target: 200,
      progress: (143 / 200) * 100,
    },
  ]

  // Function to demonstrate achievement trigger
  const unlockAchievement = () => {
    triggerAchievement("Milestone Hunter", "Complete 3 research milestones", 30)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <p className="text-muted-foreground">Track your research journey and achievements at Avasya Research Lab</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`rounded-full p-2 bg-background ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>
            You are currently Level {user?.level || 3}. Keep contributing to advance to the next level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  Level {user?.level || 3} → Level {(user?.level || 3) + 1}
                </span>
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              You need {100 - progress} more points to reach Level {(user?.level || 3) + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different progress metrics */}
      <Tabs defaultValue="milestones">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="research">Research Metrics</TabsTrigger>
        </TabsList>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4 mt-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <span className="text-sm font-medium">
                        {milestone.current}/{milestone.target}
                      </span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium"
              onClick={unlockAchievement}
            >
              Simulate Achievement
            </motion.button>
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4 mt-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full p-2 bg-primary/10">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.date}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* Research Metrics Tab */}
        <TabsContent value="research" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Performance</CardTitle>
              <CardDescription>Track your research metrics and impact in the scientific community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Research Output</span>
                  </div>
                  <span className="text-sm font-medium">{researchProgress}%</span>
                </div>
                <Progress value={researchProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  You've published 12 papers this year, 3 more than last year
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Collaboration Network</span>
                  </div>
                  <span className="text-sm font-medium">{collaborationProgress}%</span>
                </div>
                <Progress value={collaborationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  You've collaborated with 8 researchers across 5 institutions
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Citation Impact</span>
                  </div>
                  <span className="text-sm font-medium">{citationProgress}%</span>
                </div>
                <Progress value={citationProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">Your h-index is 7, with 143 total citations</p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Last updated: April 23, 2025</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
