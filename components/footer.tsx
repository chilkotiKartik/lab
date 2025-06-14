"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  Sparkles,
  Rocket,
  Users,
  Code,
  Palette,
  Brain,
  Globe,
  ArrowUp,
} from "lucide-react"

export default function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Infinity! 🚀",
        description: "You've successfully subscribed to our newsletter!",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1500)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Projects", href: "/projects", icon: <Code className="h-4 w-4" /> },
        { name: "Research", href: "/research", icon: <Brain className="h-4 w-4" /> },
        { name: "3D Gallery", href: "/gallery", icon: <Palette className="h-4 w-4" /> },
        { name: "Team", href: "/team", icon: <Users className="h-4 w-4" /> },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Join Us", href: "/signup", icon: <Rocket className="h-4 w-4" /> },
        { name: "About", href: "/about", icon: <Globe className="h-4 w-4" /> },
        { name: "Contact", href: "/contact", icon: <Mail className="h-4 w-4" /> },
        { name: "Support", href: "/support", icon: <Heart className="h-4 w-4" /> },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs", icon: <Code className="h-4 w-4" /> },
        { name: "API", href: "/api", icon: <Code className="h-4 w-4" /> },
        { name: "Blog", href: "/blog", icon: <Globe className="h-4 w-4" /> },
        { name: "Help Center", href: "/help", icon: <Heart className="h-4 w-4" /> },
      ],
    },
  ]

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/infinitytech", icon: <Github className="h-5 w-5" /> },
    { name: "Twitter", href: "https://twitter.com/infinitytech", icon: <Twitter className="h-5 w-5" /> },
    { name: "LinkedIn", href: "https://linkedin.com/company/infinitytech", icon: <Linkedin className="h-5 w-5" /> },
    { name: "Email", href: "mailto:hello@infinitytech.com", icon: <Mail className="h-5 w-5" /> },
  ]

  const recentProjects = [
    {
      title: "AI Music Composer",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=100&auto=format&fit=crop",
      href: "/projects/music-ai",
    },
    {
      title: "Fashion Trend Predictor",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=100&auto=format&fit=crop",
      href: "/projects/fashion-ai",
    },
    {
      title: "Mental Health AI",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=100&auto=format&fit=crop",
      href: "/projects/mental-health",
    },
  ]

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="relative py-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Stay Updated</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Join Our{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Community
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get the latest updates on innovative projects, exclusive content, and be the first to know about new
              features.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-12 px-8">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Subscribe
                  </div>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Join 50,000+ innovators already part of our community. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-space bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Infinity
                </h3>
                <p className="text-sm text-muted-foreground -mt-1">Tech Society</p>
              </div>
            </Link>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering innovators and creators to build the future through collaborative technology projects. Join our
              community of passionate developers, designers, and researchers.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {social.icon}
                  </motion.div>
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA & Remote</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <Link href="mailto:hello@infinitytech.com" className="hover:text-primary transition-colors">
                  hello@infinitytech.com
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <Link href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Recent Projects */}
        <div className="mb-12">
          <h4 className="font-semibold text-lg mb-6 text-center">Featured Projects</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={project.href}
                  className="group block bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h5 className="font-medium group-hover:text-primary transition-colors">{project.title}</h5>
                      <p className="text-xs text-muted-foreground">View Project</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Infinity Tech Society. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> by Infinity Team
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
