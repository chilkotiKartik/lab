"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  MessageSquare,
  BarChart,
  Calendar,
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

interface InstructorLayoutProps {
  children: React.ReactNode
}

export function InstructorLayout({ children }: InstructorLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string }[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  // Add sample notifications
  useEffect(() => {
    if (user) {
      setNotifications([
        {
          id: "1",
          title: "New Submission",
          message: "Lakshay Verma submitted Quantum Communication Research",
        },
        {
          id: "2",
          title: "Review Required",
          message: "5 submissions are pending your review",
        },
        {
          id: "3",
          title: "Team Update",
          message: "Harshal Kokate completed Drone Navigation Project",
        },
      ])
    }
  }, [user])

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  if (!user) {
    return null
  }

  const navItems = [
    {
      name: "Dashboard",
      path: "/instructor/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Submissions",
      path: "/instructor/submissions",
      icon: <FileText className="h-5 w-5" />,
      badge: "5",
    },
    {
      name: "Team Management",
      path: "/instructor/team",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      path: "/instructor/reviews",
      icon: <CheckCircle className="h-5 w-5" />,
      badge: "3",
    },
    {
      name: "Analytics",
      path: "/instructor/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Messages",
      path: "/instructor/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "New",
    },
    {
      name: "Calendar",
      path: "/instructor/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/instructor/settings",
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
              <CharacterAvatar role="admin" size="sm" />
              <div>
                <h3 className="font-medium text-sm">{user.name}</h3>
                <div className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    Instructor
                  </Badge>
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
                  <Link href="/instructor/dashboard">Instructor Panel</Link>
                </Button>
                {pathname !== "/instructor/dashboard" && (
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
