"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Plus, Sparkles, Rocket, Atom } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import ThemeToggle from "@/components/theme-toggle"
import Logo from "@/components/logo"

const navItems = [
  {
    name: "Discover",
    path: "/",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Explore the future",
  },
  {
    name: "Research Hub",
    path: "/research",
    icon: <Atom className="h-4 w-4" />,
    description: "Breakthrough discoveries",
  },
  {
    name: "Project Lab",
    path: "/projects",
    icon: <Rocket className="h-4 w-4" />,
    description: "Revolutionary projects",
  },
  {
    name: "3D Universe",
    path: "/gallery",
    icon: <div className="w-4 h-4 bg-gradient-to-br from-primary to-purple-500 rounded" />,
    description: "Interactive gallery",
  },
  {
    name: "About",
    path: "/about",
    icon: <div className="w-4 h-4 bg-gradient-to-br from-secondary to-orange-500 rounded-full" />,
    description: "Our story",
  },
  {
    name: "Connect",
    path: "/contact",
    icon: <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-sm rotate-45" />,
    description: "Get in touch",
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo with Animation */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
            <Logo />
          </motion.div>
          <div className="hidden sm:block">
            <motion.span
              className="font-space font-bold text-xl md:text-2xl bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Avasya
            </motion.span>
            <motion.div
              className="text-xs text-muted-foreground font-medium tracking-wider"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              RESEARCH LAB
            </motion.div>
          </div>
        </Link>

        {/* Desktop Navigation - Creative Design */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              <Link
                href={item.path}
                className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.2 }}>
                  {item.icon}
                </motion.div>
                <span>{item.name}</span>

                {/* Active Indicator */}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap"
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <ThemeToggle />

          {/* Submit Dropdown with Creative Design */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                    <Plus className="h-4 w-4 mr-2" />
                  </motion.div>
                  Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/research/create" className="flex items-center gap-2">
                    <Atom className="h-4 w-4" />
                    Submit Research
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/projects/submit" className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Submit Project
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Actions */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary/10">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="rounded-full">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary/10">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Join Revolution
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu with Creative Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      pathname === item.path
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-border/50 space-y-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-primary to-purple-600 text-white text-center"
                    >
                      Join Revolution
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
