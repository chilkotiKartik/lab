"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAllUsers, USERS_DATA } from "@/lib/auth-service"
import { createAnnouncement, getAnnouncements } from "@/lib/announcement-service"
import { getProjectSubmissions, reviewSubmission, createAssignment } from "@/lib/project-service"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  FolderOpen,
  BarChart3,
  Bell,
  Search,
  Plus,
  Eye,
  Edit,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  MessageSquare,
  Calendar,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, profile, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [users, setUsers] = useState(USERS_DATA)
  const [announcements, setAnnouncements] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)

  // Announcement form
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    type: "info",
    targetAudience: "all",
    priority: "medium",
  })

  // Assignment form
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: ["all"],
    priority: "medium",
  })

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user || !profile) {
        router.push("/login")
      } else if (profile.role !== "admin") {
        router.push("/student/dashboard")
      } else {
        loadDashboardData()
      }
    }
  }, [loading, isAuthenticated, user, profile, router])

  const loadDashboardData = async () => {
    try {
      const allUsers = await getAllUsers()
      const allAnnouncements = getAnnouncements()
      const allSubmissions = getProjectSubmissions()

      setUsers(allUsers)
      setAnnouncements(allAnnouncements)
      setSubmissions(allSubmissions)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
      setUsers(USERS_DATA)
      setAnnouncements(getAnnouncements())
      setSubmissions(getProjectSubmissions())
    } finally {
      setDashboardLoading(false)
    }
  }

  const handleCreateAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newAnnouncement = createAnnouncement({
      ...announcementForm,
      author: profile.name,
    })

    setAnnouncements([newAnnouncement, ...announcements])
    setAnnouncementForm({
      title: "",
      content: "",
      type: "info",
      targetAudience: "all",
      priority: "medium",
    })

    toast({
      title: "Success",
      description: "Announcement sent to all users!",
    })
  }

  const handleCreateAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.description || !assignmentForm.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newAssignment = createAssignment({
      ...assignmentForm,
      createdBy: profile.name,
    })

    toast({
      title: "Success",
      description: "Assignment created and assigned to students!",
    })

    setAssignmentForm({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: ["all"],
      priority: "medium",
    })
  }

  const handleReviewSubmission = (submissionId, feedback, grade, status) => {
    reviewSubmission(submissionId, feedback, grade, status)
    loadDashboardData()
    toast({
      title: "Success",
      description: "Submission reviewed successfully!",
    })
  }

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <p className="text-destructive">Access denied. Admin privileges required.</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = [
    {
      title: "Total Students",
      value: users.filter((u) => u.role === "student").length,
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+3 this week",
    },
    {
      title: "Active Projects",
      value: users.filter((u) => u.projectTitle).length,
      icon: <FolderOpen className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+2 this month",
    },
    {
      title: "Pending Reviews",
      value: submissions.filter((s) => s.status === "pending").length,
      icon: <Clock className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "5 urgent",
    },
    {
      title: "Announcements",
      value: announcements.length,
      icon: <Bell className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "3 this week",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Admin Control Center 🛠️</h1>
            <p className="text-muted-foreground">Manage projects, users, and system operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Link>
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Project Management</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers
                  .filter((u) => u.projectTitle)
                  .map((user, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}>
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{user.projectTitle}</CardTitle>
                              <CardDescription>Lead: {user.name}</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">
                              Active
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>75%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {user.teamMembers?.length || 1} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: Mar 15
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{user.projectTitle}</DialogTitle>
                                  <DialogDescription>Project details and team information</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-medium mb-2">Project Lead</h4>
                                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                      <Avatar>
                                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <p className="text-xs text-muted-foreground">{user.rollNumber}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Team Members</h4>
                                    <div className="space-y-2">
                                      {user.teamMembers?.map((member, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                                          <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">{member.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm">{member}</span>
                                        </div>
                                      )) || <p className="text-muted-foreground">No additional team members</p>}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Project Progress</h4>
                                    <div className="space-y-3">
                                      {[
                                        { phase: "Research & Planning", completed: true },
                                        { phase: "Development", completed: true },
                                        { phase: "Testing", completed: false },
                                        { phase: "Documentation", completed: false },
                                      ].map((phase, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                          <div
                                            className={`w-4 h-4 rounded-full ${
                                              phase.completed ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                          />
                                          <span
                                            className={phase.completed ? "text-foreground" : "text-muted-foreground"}
                                          >
                                            {phase.phase}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Student Submissions</h2>
                <Badge variant="outline">
                  {submissions.filter((s) => s.status === "pending").length} Pending Reviews
                </Badge>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <motion.div
                          key={submission.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-all"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium">{submission.projectTitle}</h3>
                                <Badge variant="outline">{submission.submissionType}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">By: {submission.studentName}</p>
                              <p className="text-sm">{submission.content}</p>
                              {submission.files && submission.files.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {submission.files.map((file, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      📎 {file}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Badge
                              variant={
                                submission.status === "approved"
                                  ? "default"
                                  : submission.status === "rejected"
                                    ? "destructive"
                                    : submission.status === "reviewed"
                                      ? "secondary"
                                      : "outline"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                            <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                            {submission.grade && <span>Grade: {submission.grade}/100</span>}
                          </div>

                          {submission.feedback && (
                            <div className="mb-3 p-3 bg-muted/30 rounded-lg">
                              <p className="text-sm font-medium">Feedback:</p>
                              <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                            </div>
                          )}

                          {submission.status === "pending" && (
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Review Submission</DialogTitle>
                                    <DialogDescription>
                                      Provide feedback and grade for {submission.studentName}'s submission
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Feedback</Label>
                                      <Textarea
                                        placeholder="Provide detailed feedback..."
                                        id={`feedback-${submission.id}`}
                                      />
                                    </div>
                                    <div>
                                      <Label>Grade (out of 100)</Label>
                                      <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="85"
                                        id={`grade-${submission.id}`}
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => {
                                          const feedback = document.getElementById(`feedback-${submission.id}`).value
                                          const grade = document.getElementById(`grade-${submission.id}`).value
                                          handleReviewSubmission(
                                            submission.id,
                                            feedback,
                                            Number.parseInt(grade),
                                            "approved",
                                          )
                                        }}
                                        className="flex-1"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Approve
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() => {
                                          const feedback = document.getElementById(`feedback-${submission.id}`).value
                                          handleReviewSubmission(submission.id, feedback, 0, "rejected")
                                        }}
                                        className="flex-1"
                                      >
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No submissions yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        User Management
                      </CardTitle>
                      <CardDescription>Manage all registered users and their projects</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">{user.projectTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>{user.role}</Badge>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Create Announcement
                    </CardTitle>
                    <CardDescription>Broadcast messages to users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        placeholder="Announcement title..."
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        placeholder="Announcement content..."
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <Select
                          value={announcementForm.type}
                          onValueChange={(value) => setAnnouncementForm({ ...announcementForm, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Target Audience</Label>
                        <Select
                          value={announcementForm.targetAudience}
                          onValueChange={(value) => setAnnouncementForm({ ...announcementForm, targetAudience: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="students">Students Only</SelectItem>
                            <SelectItem value="teachers">Teachers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleCreateAnnouncement} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Announcement
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {announcements.map((announcement) => (
                        <div key={announcement.id} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{announcement.title}</h4>
                            <Badge
                              variant={
                                announcement.type === "urgent"
                                  ? "destructive"
                                  : announcement.type === "warning"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {announcement.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{announcement.content}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                            <span>To: {announcement.targetAudience}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Create Assignment
                    </CardTitle>
                    <CardDescription>Assign tasks to students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Assignment Title</Label>
                      <Input
                        placeholder="Assignment title..."
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Assignment description and requirements..."
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Due Date</Label>
                        <Input
                          type="date"
                          value={assignmentForm.dueDate}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select
                          value={assignmentForm.priority}
                          onValueChange={(value) => setAssignmentForm({ ...assignmentForm, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleCreateAssignment} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Active Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {/* Assignment list would go here */}
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2" />
                        <p>No assignments created yet</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Project Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Projects Completed</span>
                        <span className="text-sm font-medium">3 projects</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">In Progress</span>
                        <span className="text-sm font-medium">8 projects</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Planning Phase</span>
                        <span className="text-sm font-medium">1 project</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      User Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Daily Active Users</span>
                        <span className="text-sm font-medium">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Active Users</span>
                        <span className="text-sm font-medium">32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Submissions</span>
                        <span className="text-sm font-medium">{submissions.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending Reviews</span>
                        <span className="text-sm font-medium">
                          {submissions.filter((s) => s.status === "pending").length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
