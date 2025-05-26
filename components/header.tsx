"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { NotificationSystem } from "@/components/notification-system"
import { UserAvatar } from "@/components/user-avatar"
import ThemeToggle from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Rocket, Users, FileText, Settings, LogOut, User, BarChart3, Award, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
    setMobileMenuOpen(false)
  }

  const navigationItems = [
    {
      title: "Research",
      href: "/research",
      description: "Explore our groundbreaking research projects",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Projects",
      href: "/projects",
      description: "View active aerospace projects",
      icon: <Rocket className="h-4 w-4" />,
    },
    {
      title: "3D Gallery",
      href: "/gallery",
      description: "Interactive 3D model showcase",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      title: "Team",
      href: "/team",
      description: "Meet our research team",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "About",
      href: "/about",
      description: "Learn about AVASYA Research Lab",
      icon: <Award className="h-4 w-4" />,
    },
  ]

  const getDashboardLink = () => {
    if (!user) return "/login"

    switch (user.role) {
      case "admin":
        return "/instructor/dashboard"
      case "teacher":
        return "/teacher/dashboard"
      default:
        return "/student/dashboard"
    }
  }

  const getDashboardLabel = () => {
    if (!user) return "Login"

    switch (user.role) {
      case "admin":
        return "Admin Panel"
      case "teacher":
        return "Teacher Dashboard"
      default:
        return "Student Dashboard"
    }
  }

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-lg"
          : "bg-background/60 backdrop-blur-sm border-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AVASYA
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                          pathname === item.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            {user && <NotificationSystem />}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu or Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <UserAvatar name={user.name} role={user.role} size="sm" showOnlineStatus={true} isOnline={true} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                        {user.level && (
                          <Badge variant="secondary" className="text-xs">
                            Level {user.level}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>{getDashboardLabel()}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Join Team</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    AVASYA Research Lab
                  </SheetTitle>
                  <SheetDescription>Pioneering aerospace technology and space innovation</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href && "bg-accent text-accent-foreground",
                      )}
                    >
                      {item.icon}
                      <div>
                        <div>{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </Link>
                  ))}

                  {user && (
                    <>
                      <div className="border-t pt-4">
                        <Link
                          href={getDashboardLink()}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>{getDashboardLabel()}</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </>
                  )}

                  {!user && (
                    <div className="border-t pt-4 space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                          Join Team
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
