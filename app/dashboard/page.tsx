"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowUpRight, FileText, Users, Award, TrendingUp, Calendar, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

// Mock data for charts
const activityData = [
  { name: "Jan", publications: 2, citations: 5 },
  { name: "Feb", publications: 1, citations: 3 },
  { name: "Mar", publications: 3, citations: 7 },
  { name: "Apr", publications: 0, citations: 4 },
  { name: "May", publications: 2, citations: 6 },
  { name: "Jun", publications: 4, citations: 9 },
]

const researchCategoryData = [
  { name: "Drones", value: 35 },
  { name: "Spacecraft", value: 25 },
  { name: "Satellites", value: 20 },
  { name: "Materials", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#6b7280"]

// Mock recent research data
const recentResearch = [
  {
    id: 1,
    title: "Quantum Navigation Systems for Interplanetary Travel",
    date: "June 15, 2023",
    views: 245,
    likes: 42,
    comments: 18,
  },
  {
    id: 2,
    title: "Biomimetic Drone Designs for Atmospheric Sampling",
    date: "May 22, 2023",
    views: 189,
    likes: 36,
    comments: 12,
  },
  {
    id: 3,
    title: "Self-Healing Materials for Orbital Debris Protection",
    date: "April 8, 2023",
    views: 312,
    likes: 57,
    comments: 24,
  },
]

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "International Aerospace Conference",
    date: "July 15-18, 2023",
    location: "Virtual Event",
  },
  {
    id: 2,
    title: "Drone Technology Workshop",
    date: "August 5, 2023",
    location: "Avasya Research Lab",
  },
  {
    id: 3,
    title: "Space Innovation Summit",
    date: "September 12-14, 2023",
    location: "Boston, MA",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [researchPoints, setResearchPoints] = useState(0)
  const [publications, setPublications] = useState(0)
  const [citations, setCitations] = useState(0)
  const [collaborators, setCollaborators] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setResearchPoints(42)
      setPublications(8)
      setCitations(24)
      setCollaborators(12)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Here's what's happening with your research activities today.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/research/create">
                <FileText className="mr-2 h-4 w-4" /> Publish Research
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Points</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{researchPoints}</div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Level Progress</span>
                <span className="text-xs text-primary">{researchPoints}/50 to next level</span>
              </div>
              <Progress value={(researchPoints / 50) * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publications</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publications}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +2
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citations</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{citations}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +7
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collaborators}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +3
                </span>{" "}
                new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity */}
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
            <TabsTrigger value="activity">Research Activity</TabsTrigger>
            <TabsTrigger value="categories">Research Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Research Activity</CardTitle>
                <CardDescription>Your publication and citation activity over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activityData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Bar dataKey="publications" fill="hsl(var(--primary))" name="Publications" />
                      <Bar dataKey="citations" fill="hsl(var(--secondary))" name="Citations" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Research Categories</CardTitle>
                <CardDescription>Distribution of your research across different categories.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={researchCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {researchCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Research and Events */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Research */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Research</CardTitle>
                <CardDescription>Your recently published research papers.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/research">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResearch.map((research) => (
                  <div
                    key={research.id}
                    className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium hover:text-primary cursor-pointer">{research.title}</div>
                      <div className="text-sm text-muted-foreground">Published on {research.date}</div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground">{research.views} views</span>
                        <span className="text-xs text-muted-foreground">{research.likes} likes</span>
                        <span className="text-xs text-muted-foreground">{research.comments} comments</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events and conferences you might be interested in.</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View Calendar <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium hover:text-primary cursor-pointer">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.date}</div>
                      <div className="text-xs text-muted-foreground mt-1">{event.location}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      RSVP
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
