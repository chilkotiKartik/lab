"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { AstronautAvatar } from "@/components/astronaut-avatar"
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  Bell,
  Search,
  LogOut,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: pathname === "/admin" || pathname === "/admin/dashboard",
    },
    {
      label: "Research Reviews",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/reviews/research",
      active: pathname === "/admin/reviews/research" || pathname?.startsWith("/admin/reviews/research/"),
    },
    {
      label: "Project Reviews",
      icon: <ClipboardCheck className="h-5 w-5" />,
      href: "/admin/reviews/projects",
      active: pathname === "/admin/reviews/projects" || pathname?.startsWith("/admin/reviews/projects/"),
    },
    {
      label: "User Management",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex flex-col w-64 border-r bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="font-bold text-xl">Avasya Admin</div>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", route.active ? "bg-secondary" : "")}
                asChild
              >
                <Link href={route.href}>
                  {route.icon}
                  <span className="ml-3">{route.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <AstronautAvatar size="sm" animation={false} />
            <div>
              <div className="font-medium text-sm">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@avasya-lab.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="font-bold text-xl">Avasya Admin</div>
            </div>
          </div>
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 py-2">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", route.active ? "bg-secondary" : "")}
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={route.href}>
                    {route.icon}
                    <span className="ml-3">{route.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <AstronautAvatar size="sm" animation={false} />
              <div>
                <div className="font-medium text-sm">Admin User</div>
                <div className="text-xs text-muted-foreground">admin@avasya-lab.com</div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to Website</span>
              </Link>
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Exit Admin</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
