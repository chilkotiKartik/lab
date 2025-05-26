"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bell, X, CheckCircle, FileText, MessageSquare, Award, Clock, Eye } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "review" | "submission" | "message" | "achievement" | "task"
  priority: "low" | "medium" | "high"
  read: boolean
  created_at: string
  action_url?: string
  sender?: {
    name: string
    role: string
  }
}

export function NotificationSystem() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load notifications when component mounts
  useEffect(() => {
    if (user) {
      loadNotifications()
      // Set up real-time notifications
      const interval = setInterval(loadNotifications, 30000) // Check every 30 seconds
      return () => clearInterval(interval)
    }
  }, [user])

  const loadNotifications = async () => {
    if (!user) return

    try {
      setIsLoading(true)

      // Generate notifications based on user role
      const mockNotifications: Notification[] = []

      if (user.role === "admin") {
        mockNotifications.push(
          {
            id: "admin-1",
            title: "New Research Submission",
            message: "Lakshay Verma submitted 'Quantum Navigation System' for review",
            type: "review",
            priority: "high",
            read: false,
            created_at: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
            action_url: "/instructor/submissions",
            sender: { name: "Lakshay Verma", role: "student" },
          },
          {
            id: "admin-2",
            title: "Project Update Required",
            message: "Harshal Kokate's drone project needs approval",
            type: "review",
            priority: "medium",
            read: false,
            created_at: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
            action_url: "/instructor/reviews",
            sender: { name: "Harshal Kokate", role: "student" },
          },
          {
            id: "admin-3",
            title: "Team Achievement",
            message: "Space team completed 5 successful projects this month!",
            type: "achievement",
            priority: "low",
            read: true,
            created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          },
        )
      } else {
        mockNotifications.push(
          {
            id: "student-1",
            title: "Assignment Approved",
            message: "Your quantum research paper has been approved by instructor",
            type: "review",
            priority: "high",
            read: false,
            created_at: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
            sender: { name: "Admin", role: "admin" },
          },
          {
            id: "student-2",
            title: "New Task Assigned",
            message: "Complete the atmospheric pressure analysis by Friday",
            type: "task",
            priority: "medium",
            read: false,
            created_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            sender: { name: "Admin", role: "admin" },
          },
        )
      }

      setNotifications(mockNotifications)
      setIsLoading(false)
    } catch (error) {
      console.error("Error loading notifications:", error)
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = async (notificationId: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed",
    })
  }

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    toast({
      title: "All Notifications Read",
      description: "Marked all notifications as read",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "review":
        return <FileText className="h-4 w-4" />
      case "submission":
        return <CheckCircle className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "achievement":
        return <Award className="h-4 w-4" />
      case "task":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/10"
      case "medium":
        return "text-orange-500 bg-orange-500/10"
      case "low":
        return "text-green-500 bg-green-500/10"
      default:
        return "text-blue-500 bg-blue-500/10"
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-96 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground ml-2">
                              {formatTime(notification.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          {notification.sender && (
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.sender.name}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {notification.priority}
                              </Badge>
                            </div>
                          )}
                          {notification.action_url && (
                            <Button variant="ghost" size="sm" className="mt-2 h-6 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
