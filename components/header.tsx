"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import {
  Menu,
  X,
  Home,
  Users,
  FolderOpen,
  Beaker,
  Phone,
  User,
  LogIn,
  UserPlus,
  Settings,
  Bell,
  Search,
  Sparkles,
  Rocket,
  Code,
  Palette,
  Brain,
  Atom,
  Globe,
  Lightbulb,
  TrendingUp,
  Award,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "See you next time! 👋",
    })
  }

  const navigationItems = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
      description: "Welcome to Infinity Tech Society",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <FolderOpen className="h-4 w-4" />,
      description: "Explore innovative projects",
      submenu: [
        {
          title: "All Projects",
          href: "/projects",
          icon: <Code className="h-4 w-4" />,
          description: "Browse all projects",
        },
        {
          title: "Submit Project",
          href: "/projects/submit",
          icon: <Rocket className="h-4 w-4" />,
          description: "Share your innovation",
        },
        {
          title: "3D Models",
          href: "/projects/models",
          icon: <Atom className="h-4 w-4" />,
          description: "Interactive 3D projects",
        },
      ],
    },
    {
      title: "Research",
      href: "/research",
      icon: <Beaker className="h-4 w-4" />,
      description: "Scientific research and papers",
      submenu: [
        {
          title: "Browse Research",
          href: "/research",
          icon: <Brain className="h-4 w-4" />,
          description: "Explore research papers",
        },
        {
          title: "Create Research",
          href: "/research/create",
          icon: <Lightbulb className="h-4 w-4" />,
          description: "Publish your research",
        },
        {
          title: "Visualizations",
          href: "/research/visualize",
          icon: <TrendingUp className="h-4 w-4" />,
          description: "Data visualizations",
        },
      ],
    },
    {
      title: "Team",
      href: "/team",
      icon: <Users className="h-4 w-4" />,
      description: "Meet our amazing team",
    },
    {
      title: "Gallery",
      href: "/gallery",
      icon: <Palette className="h-4 w-4" />,
      description: "3D interactive gallery",
    },
    {
      title: "About",
      href: "/about",
      icon: <Globe className="h-4 w-4" />,
      description: "Learn about Infinity Tech Society",
    },
    {
      title: "Contact",
      href: "/contact",
      icon: <Phone className="h-4 w-4" />,
      description: "Get in touch with us",
    },
  ]

  const userMenuItems = user
    ? [
        { title: "Dashboard", href: "/dashboard", icon: <User className="h-4 w-4" /> },
        { title: "Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
        { title: "Achievements", href: "/dashboard/achievements", icon: <Award className="h-4 w-4" /> },
      ]
    : []

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div className="relative" whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.6 }}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1
                className="text-xl md:text-2xl font-bold font-space bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Infinity
              </motion.h1>
              <p className="text-xs text-muted-foreground -mt-1">Tech Society</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="h-10 px-4 py-2 bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50">
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.title}
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4">
                            <div className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href={item.href}
                                >
                                  <div className="mb-2 mt-4 text-lg font-medium">{item.title}</div>
                                  <p className="text-sm leading-tight text-muted-foreground">{item.description}</p>
                                </Link>
                              </NavigationMenuLink>
                            </div>
                            <div className="grid gap-2">
                              {item.submenu.map((subItem) => (
                                <NavigationMenuLink key={subItem.href} asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                      {subItem.icon}
                                      {subItem.title}
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathname === item.href ? "bg-accent text-accent-foreground" : "bg-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.title}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="h-10 px-3 bg-transparent hover:bg-accent/50">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                            <Image
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{user.name}</span>
                        </div>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[300px] p-4">
                          <div className="flex items-center gap-3 p-3 border-b border-border mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <Badge className="mt-1 text-xs">{user.role}</Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {userMenuItems.map((item) => (
                              <NavigationMenuLink key={item.href} asChild>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                                >
                                  {item.icon}
                                  {item.title}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                            <div className="border-t border-border pt-2 mt-2">
                              <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors w-full"
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    <UserPlus className="h-5 w-5 mr-2" />
                    <span>Register</span>
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-3/4 md:w-1/2">
                <div className="grid gap-6">
                  <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-lg font-bold font-space bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          Infinity
                        </h1>
                        <p className="text-xs text-muted-foreground -mt-1">Tech Society</p>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {navigationItems.map((item) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-secondary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border" />

                  {user ? (
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-secondary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      ))}
                      <Button variant="destructive" onClick={handleLogout} className="w-full">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Button asChild variant="ghost" className="justify-start">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <LogIn className="h-5 w-5 mr-2" />
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button asChild className="justify-start">
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <UserPlus className="h-5 w-5 mr-2" />
                          <span>Register</span>
                        </Link>
                      </Button>
                    </div>
                  )}

                  <div className="border-t border-border" />

                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
