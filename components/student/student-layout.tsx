"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { LayoutDashboard, BookOpen, FileText, Users, Award, MessageSquare, Calendar } from "lucide-react"

interface StudentLayoutProps {
  children: React.ReactNode
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string }[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!user || user.role !== "student") {
      router.push("/login")
    }
  }, [user, router])

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(user?.progress || 45)
    }, 500)
    return () => clearTimeout(timer)
  }, [user?.progress])

  // Add sample notifications
  useEffect(() => {
    if (user) {
      setNotifications([
        {
          id: "1",
          title: "New Assignment",
          message: "Quantum Navigation Research Paper has been assigned to you",
        },
        {
          id: "2",
          title: "Assignment Graded",
          message: "Your Biomimetic Drone Design Project has been graded",
        },
        {
          id: "3",
          title: "Course Update",
          message: "New materials available in Advanced Aerospace Design",
        },
      ])
    }
  }, [user])

  // Handle notification click
  const handleNotificationClick = (id: string) => {
    // In a real app, this would mark the notification as read
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  if (!user) {
    return null
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Courses",
      path: "/student/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Assignments",
      path: "/student/assignments",
      icon: <FileText className="h-5 w-5" />,
      badge: "3",
    },
    {
      name: "Schedule",
      path: "/student/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Research",
      path: "/student/research",
      icon: <Award className="h-5 w-5" />,
    },
    {
      name: "Messages",
      path: "/student/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "New",
    },
    {
      name: "Classmates",
      path: "/student/classmates",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/student/settings",\
    }
