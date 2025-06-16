"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  getAnnouncements,
  subscribeToAnnouncements,
  markAnnouncementAsRead,
  type Announcement,
} from "@/lib/announcement-service"
import { Bell, Search, ArrowLeft, AlertCircle, CheckCircle, AlertTriangle, Info, Calendar, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function StudentAnnouncementsPage() {
  const { profile } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  useEffect(() => {
    // Load initial announcements
    const userAnnouncements = getAnnouncements(profile?.role || "student")
    setAnnouncements(userAnnouncements)

    // Subscribe to real-time updates
    const unsubscribe = subscribeToAnnouncements((allAnnouncements) => {
      const userAnnouncements = allAnnouncements.filter(
        (announcement) =>
          announcement.targetAudience === "all" ||
          announcement.targetAudience === profile?.role ||
          (profile?.role === "student" && announcement.targetAudience === "students"),
      )
      setAnnouncements(userAnnouncements)
    })

    return unsubscribe
  }, [profile?.role])

  const handleMarkAsRead = (id: string) => {
    markAnnouncementAsRead(id)
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

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || announcement.type === filterType
    const matchesPriority = filterPriority === "all" || announcement.priority === filterPriority

    return matchesSearch && matchesType && matchesPriority
  })

  const unreadCount = announcements.filter((a) => !a.isRead).length
  const urgentCount = announcements.filter((a) => a.type === "urgent").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Announcements
            </h1>
            <p className="text-muted-foreground">Stay updated with the latest news and updates</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && <Badge variant="destructive">{unreadCount} unread</Badge>}
            {urgentCount > 0 && (
              <Badge variant="outline" className="border-red-500 text-red-500">
                {urgentCount} urgent
              </Badge>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={filterType} onValueChange={setFilterType} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="urgent">Urgent</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="success">Success</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={filterPriority} onValueChange={setFilterPriority} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Priority</TabsTrigger>
                  <TabsTrigger value="high">High</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="low">Low</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 ${
                      !announcement.isRead ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{getAnnouncementIcon(announcement.type)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">
                                {announcement.title}
                                {!announcement.isRead && (
                                  <Badge variant="destructive" className="ml-2 text-xs">
                                    New
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <User className="h-4 w-4" />
                                <span>{announcement.author}</span>
                                <Calendar className="h-4 w-4 ml-2" />
                                <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge
                                variant={announcement.type === "urgent" ? "destructive" : "outline"}
                                className={
                                  announcement.type === "urgent" ? "" : getAnnouncementColor(announcement.type)
                                }
                              >
                                {announcement.type}
                              </Badge>
                              <Badge variant="secondary">{announcement.priority}</Badge>
                            </div>
                          </div>

                          <Alert className={`${getAnnouncementColor(announcement.type)} border`}>
                            <AlertDescription className="text-sm leading-relaxed">
                              {announcement.content}
                            </AlertDescription>
                          </Alert>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Target: {announcement.targetAudience}</span>
                              <span>•</span>
                              <span>Priority: {announcement.priority}</span>
                            </div>

                            {!announcement.isRead && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(announcement.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No announcements found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== "all" || filterPriority !== "all"
                    ? "Try adjusting your filters or search terms"
                    : "Check back later for new announcements"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        <Card className="mt-8 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Announcement Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{announcements.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <div className="text-sm text-muted-foreground">Unread</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{urgentCount}</div>
                <div className="text-sm text-muted-foreground">Urgent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {announcements.filter((a) => a.type === "success").length}
                </div>
                <div className="text-sm text-muted-foreground">Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
