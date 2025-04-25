"use client"

import { motion } from "framer-motion"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Trophy, Zap, BookOpen, Users, FileText, Target, Rocket } from "lucide-react"

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: "Prolific Publisher",
    description: "Publish 10 research papers",
    icon: <FileText className="h-6 w-6" />,
    progress: 80,
    current: 8,
    target: 10,
    unlocked: false,
  },
  {
    id: 2,
    title: "Citation Champion",
    description: "Receive 50 citations on your research",
    icon: <BookOpen className="h-6 w-6" />,
    progress: 48,
    current: 24,
    target: 50,
    unlocked: false,
  },
  {
    id: 3,
    title: "Collaboration Expert",
    description: "Collaborate with 15 different researchers",
    icon: <Users className="h-6 w-6" />,
    progress: 80,
    current: 12,
    target: 15,
    unlocked: false,
  },
  {
    id: 4,
    title: "Research Pioneer",
    description: "Be the first to publish in a new research area",
    icon: <Rocket className="h-6 w-6" />,
    progress: 100,
    current: 1,
    target: 1,
    unlocked: true,
    unlockedDate: "May 22, 2023",
  },
  {
    id: 5,
    title: "Trending Topic",
    description: "Have a research paper with over 1000 views",
    icon: <Zap className="h-6 w-6" />,
    progress: 31,
    current: 312,
    target: 1000,
    unlocked: false,
  },
  {
    id: 6,
    title: "Feedback Enthusiast",
    description: "Receive 100 comments on your research",
    icon: <Target className="h-6 w-6" />,
    progress: 54,
    current: 54,
    target: 100,
    unlocked: false,
  },
]

// Mock badges data
const badges = [
  {
    id: 1,
    title: "Drone Specialist",
    description: "Published 3+ papers on drone technology",
    icon: <Star className="h-6 w-6" />,
    unlocked: true,
    unlockedDate: "June 15, 2023",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Rising Star",
    description: "One of the top 10 contributors this month",
    icon: <Trophy className="h-6 w-6" />,
    unlocked: true,
    unlockedDate: "July 3, 2023",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Quantum Pioneer",
    description: "Published groundbreaking research in quantum navigation",
    icon: <Award className="h-6 w-6" />,
    unlocked: true,
    unlockedDate: "April 18, 2023",
    color: "bg-green-500",
  },
]

export default function AchievementsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">
            Track your progress and earn recognition for your research contributions.
          </p>
        </div>

        {/* Research Points */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" /> Research Points
            </CardTitle>
            <CardDescription>
              Earn points by publishing research, receiving citations, and collaborating with others.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">42</div>
                <div className="text-sm text-muted-foreground">Current Points</div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">Level 2</div>
                  <div className="text-sm text-primary">42/50 to Level 3</div>
                </div>
                <Progress value={84} className="h-2" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <div>0</div>
                  <div>50</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <motion.div key={badge.id} className="relative" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className={`${badge.color} p-4 rounded-full mb-4 text-white`}>{badge.icon}</div>
                    <h3 className="font-bold mb-1">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <Badge variant="outline" className="mt-auto">
                      Earned on {badge.unlockedDate}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`bg-card/50 backdrop-blur-sm border-border h-full ${
                    achievement.unlocked ? "bg-primary/5" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-full mr-3 ${
                            achievement.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                      </div>
                      {achievement.unlocked && <Badge className="bg-primary text-primary-foreground">Completed</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!achievement.unlocked ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Progress: {achievement.current}/{achievement.target}
                          </span>
                          <span className="text-primary">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Unlocked on {achievement.unlockedDate}</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
