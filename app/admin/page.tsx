"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Users,
  FolderOpen,
  TrendingUp,
  Award,
  Search,
  Plus,
  Send,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  CheckCircle,
} from "lucide-react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: string
  title: string
  leader: string
  email: string
  teamMembers: string[]
  status: "active" | "completed" | "pending"
  progress: number
  lastUpdate: string
}

interface Announcement {
  id: string
  title: string
  message: string
  timestamp: string
  priority: "low" | "medium" | "high"
}

export default function AdminDashboard() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "", priority: "medium" as const })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not admin
  useEffect(() => {
    if (user && profile && profile.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, profile, router])

  // Load projects data
  useEffect(() => {
    const loadProjects = () => {
      const projectsData: Project[] = [
        {
          id: "1",
          title: "Cultural Drift NLP",
          leader: "Aishwarya Maan Srivastava",
          email: "24f1001450@ds.study.iitm.ac.in",
          teamMembers: ["Namish Kumar Sahu", "Sayan Ray"],
          status: "active",
          progress: 85,
          lastUpdate: "2024-01-15",
        },
        {
          id: "2",
          title: "Language Loss Rebuilder",
          leader: "Rudra Narayan Meher",
          email: "24f3001430@ds.study.iitm.ac.in",
          teamMembers: ["5 team members"],
          status: "active",
          progress: 72,
          lastUpdate: "2024-01-14",
        },
        {
          id: "3",
          title: "Contract Summarizer",
          leader: "Krishna Vallabha Goswami",
          email: "23f3002697@ds.study.iitm.ac.in",
          teamMembers: ["Krishna vallabha Goswami", "Sayan Ray"],
          status: "active",
          progress: 90,
          lastUpdate: "2024-01-16",
        },
        {
          id: "4",
          title: "Prompt Feedback Tuner",
          leader: "Satyam Singh",
          email: "24f3003062@ds.study.iitm.ac.in",
          teamMembers: ["Satyam Singh", "Sai Jasmitha Naidu", "Gourav Mandal"],
          status: "active",
          progress: 65,
          lastUpdate: "2024-01-13",
        },
        {
          id: "5",
          title: "Turbulence Generator GAN",
          leader: "Swastik Joshi",
          email: "24f3000782@ds.study.iitm.ac.in",
          teamMembers: ["Swastik Joshi", "Rishi Mehrotra", "Siddharth Malkania", "Meet Parmar", "Sayan Ray"],
          status: "active",
          progress: 95,
          lastUpdate: "2024-01-16",
        },
        {
          id: "6",
          title: "Digital Body Twin",
          leader: "Ghantasala Dhruvann",
          email: "24f2001880@ds.study.iitm.ac.in",
          teamMembers: [
            "Siddharth Malkania",
            "Rishi Mehrotra",
            "Sumit Srimani",
            "Aadarsh Pathre",
            "Divyanshi Darshana",
          ],
          status: "active",
          progress: 78,
          lastUpdate: "2024-01-15",
        },
      ]
      setProjects(projectsData)
    }

    loadProjects()
  }, [])

  const handleSendAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const announcement = {
        ...newAnnouncement,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      }

      // Add to Firestore
      await addDoc(collection(db, "announcements"), announcement)

      setAnnouncements((prev) => [announcement, ...prev])
      setNewAnnouncement({ title: "", message: "", priority: "medium" })

      toast({
        title: "Success",
        description: "Announcement sent successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send announcement",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = [
    {
      icon: <FolderOpen className="h-6 w-6" />,
      label: "Total Projects",
      value: projects.length,
      color: "text-blue-500",
    },
    { icon: <Users className="h-6 w-6" />, label: "Active Students", value: "45", color: "text-green-500" },
    { icon: <CheckCircle className="h-6 w-6" />, label: "Completed", value: "8", color: "text-purple-500" },
    { icon: <TrendingUp className="h-6 w-6" />, label: "Avg Progress", value: "82%", color: "text-orange-500" },
  ]

  if (!user || !profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {profile.name}. Manage projects, teams, and announcements.
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Administrator
            </Badge>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-4 text-center">
                <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Management</CardTitle>
                    <CardDescription>Monitor and manage all active projects</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt={project.leader} />
                            <AvatarFallback>
                              {project.leader
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">{project.leader}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                        <span>Team: {project.teamMembers.length} members</span>
                        <span>Updated: {project.lastUpdate}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Send Announcement */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Announcement</CardTitle>
                  <CardDescription>Broadcast messages to all team members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                      value={newAnnouncement.message}
                      onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <div className="flex gap-2">
                      {(["low", "medium", "high"] as const).map((priority) => (
                        <Button
                          key={priority}
                          variant={newAnnouncement.priority === priority ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewAnnouncement((prev) => ({ ...prev, priority }))}
                        >
                          {priority}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSendAnnouncement} disabled={isLoading} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {isLoading ? "Sending..." : "Send Announcement"}
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                  <CardDescription>Latest messages sent to the team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No announcements yet</p>
                      </div>
                    ) : (
                      announcements.map((announcement) => (
                        <div key={announcement.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{announcement.title}</h4>
                            <Badge
                              variant={
                                announcement.priority === "high"
                                  ? "destructive"
                                  : announcement.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {announcement.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{announcement.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(announcement.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Project Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">{project.title}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Project updated by Swastik Joshi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">New team member added</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm">Milestone completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects
                      .sort((a, b) => b.progress - a.progress)
                      .slice(0, 3)
                      .map((project, index) => (
                        <div key={project.id} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? "bg-yellow-500 text-white"
                                : index === 1
                                  ? "bg-gray-400 text-white"
                                  : "bg-orange-500 text-white"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{project.leader}</p>
                            <p className="text-xs text-muted-foreground">{project.progress}% progress</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>Configure system preferences and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Notification Settings</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Project updates</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Weekly reports</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">System Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Auto-save changes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Real-time updates</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Debug mode</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
