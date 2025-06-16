"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  createAnnouncement,
  getAnnouncements,
  subscribeToAnnouncements,
  deleteAnnouncement,
  type Announcement,
} from "@/lib/announcement-service"
import { useToast } from "@/hooks/use-toast"
import {
  Bell,
  Send,
  ArrowLeft,
  Trash2,
  Edit,
  Eye,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function AdminAnnouncementsPage() {
  const { profile } = useAuth()
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info" as const,
    targetAudience: "all" as const,
    priority: "medium" as const,
  })

  useEffect(() => {
    setAnnouncements(getAnnouncements())

    const unsubscribe = subscribeToAnnouncements((updatedAnnouncements) => {
      setAnnouncements(updatedAnnouncements)
    })

    return unsubscribe
  }, [])

  const handleCreateAnnouncement = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    createAnnouncement({
      ...formData,
      author: profile?.name || "Admin",
    })

    setFormData({
      title: "",
      content: "",
      type: "info",
      targetAudience: "all",
      priority: "medium",
    })

    toast({
      title: "Success! 📢",
      description: "Announcement has been sent to all users",
    })
  }

  const handleDeleteAnnouncement = (id: string) => {
    deleteAnnouncement(id)
    toast({
      title: "Deleted",
      description: "Announcement has been removed",
    })
  }

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const stats = {
    total: announcements.length,
    urgent: announcements.filter((a) => a.type === "urgent").length,
    thisWeek: announcements.filter((a) => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(a.createdAt) > weekAgo
    }).length,
    students: announcements.filter((a) => a.targetAudience === "students" || a.targetAudience === "all").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Announcement Center
            </h1>
            <p className="text-muted-foreground">Create and manage announcements for all users</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Announcements</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
              <div className="text-sm text-muted-foreground">Urgent</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.thisWeek}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.students}</div>
              <div className="text-sm text-muted-foreground">For Students</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Announcement</TabsTrigger>
            <TabsTrigger value="manage">Manage Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Create New Announcement
                </CardTitle>
                <CardDescription>Broadcast important information to your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter announcement title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter announcement content..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">📢 Information</SelectItem>
                          <SelectItem value="success">✅ Success</SelectItem>
                          <SelectItem value="warning">⚠️ Warning</SelectItem>
                          <SelectItem value="urgent">🚨 Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select
                        value={formData.targetAudience}
                        onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">👥 All Users</SelectItem>
                          <SelectItem value="students">🎓 Students Only</SelectItem>
                          <SelectItem value="teachers">👨‍🏫 Teachers Only</SelectItem>
                          <SelectItem value="admins">🛡️ Admins Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">🟢 Low</SelectItem>
                          <SelectItem value="medium">🟡 Medium</SelectItem>
                          <SelectItem value="high">🔴 High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Preview */}
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h4 className="font-medium mb-2">Preview</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getAnnouncementIcon(formData.type)}
                          <span className="font-medium">{formData.title || "Announcement Title"}</span>
                          <Badge variant="outline">{formData.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formData.content || "Announcement content will appear here..."}
                        </p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>To: {formData.targetAudience}</span>
                          <span>•</span>
                          <span>Priority: {formData.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateAnnouncement}
                  disabled={!formData.title.trim() || !formData.content.trim()}
                  className="w-full"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>All Announcements</CardTitle>
                <CardDescription>Manage and monitor all sent announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {announcements.map((announcement, index) => (
                      <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">{getAnnouncementIcon(announcement.type)}</div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-medium">{announcement.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                      <Users className="h-3 w-3" />
                                      <span>{announcement.author}</span>
                                      <Calendar className="h-3 w-3 ml-2" />
                                      <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Badge variant={announcement.type === "urgent" ? "destructive" : "outline"}>
                                      {announcement.type}
                                    </Badge>
                                    <Badge variant="secondary">{announcement.priority}</Badge>
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>

                                <div className="flex items-center justify-between">
                                  <div className="text-xs text-muted-foreground">
                                    Target: {announcement.targetAudience}
                                  </div>

                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {announcements.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No announcements yet</h3>
                      <p className="text-muted-foreground">Create your first announcement to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
