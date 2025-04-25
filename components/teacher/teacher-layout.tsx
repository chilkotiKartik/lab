"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
  Calendar,
  MessageSquare,
  ClipboardCheck,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CharacterAvatar } from "@/components/character-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string }[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "teacher") {
      router.push("/login")
    }
  }, [user, router])

  // Add sample notifications
  useEffect(() => {
    if (user) {
      setNotifications([
        {
          id: "1",
          title: "New Assignment Submission",
          message: "Alex Johnson submitted Quantum Navigation Research Paper",
        },
        {
          id: "2",
          title: "Review Reminder",
          message: "3 assignments are due for review this week",
        },
        {
          id: "3",
          title: "Department Meeting",
          message: "Reminder: Department meeting tomorrow at 2:00 PM",
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
      path: "/teacher/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Courses",
      path: "/teacher/courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      path: "/teacher/reviews",
      icon: <ClipboardCheck className="h-5 w-5" />,
      badge: "12",
    },
    {
      name: "Schedule",
      path: "/teacher/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Students",
      path: "/teacher/students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/teacher/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Messages",
      path: "/teacher/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "New",
    },
    {
      name: "Settings",
      path: "/teacher/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: mobileMenuOpen ? 0 : window.innerWidth < 768 ? -320 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-card/80 backdrop-blur-md border-r border-border md:translate-x-0"
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <CharacterAvatar role="teacher" size="sm" />
              <div>
                <h3 className="font-medium text-sm">{user.name}</h3>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">{user.department || "Advanced Physics"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === item.path ? "bg-secondary text-secondary-foreground" : ""
                    }`}
                    onClick={() => {
                      router.push(item.path)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    {item.badge && <Badge className="ml-auto bg-primary text-primary-foreground">{item.badge}</Badge>}
                  </Button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="transition-all duration-300 ease-in-out md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6">
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <div className="hidden md:flex">
              <nav className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/dashboard">Teacher Dashboard</Link>
                </Button>
                {pathname !== "/teacher/dashboard" && (
                  <>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" disabled>
                      {navItems.find((item) => item.path === pathname)?.name || "Page"}
                    </Button>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="cursor-pointer flex flex-col items-start"
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-sm text-muted-foreground">{notification.message}</span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">No new notifications</div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="container mx-auto py-8 px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
