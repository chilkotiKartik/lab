"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Rocket, Satellite, DrillIcon as Drone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Logo from "@/components/logo"

export default function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsNewsletterSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      })
      setEmail("")
      setIsNewsletterSubmitting(false)
    }, 1500)
  }

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Recent news items
  const recentNews = [
    {
      title: "Avasya Unveils Breakthrough in Quantum Navigation",
      date: "June 15, 2023",
      link: "#",
    },
    {
      title: "New Partnership with Global Space Agency Announced",
      date: "May 22, 2023",
      link: "#",
    },
    {
      title: "Biomimetic Drone Research Featured in Science Journal",
      date: "April 8, 2023",
      link: "#",
    },
  ]

  return (
    <footer className="bg-muted/30 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 space-dots opacity-30 pointer-events-none"></div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold font-space mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground">Stay updated with our latest research and discoveries.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isNewsletterSubmitting}>
                {isNewsletterSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={footerVariants}
        >
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo size={32} />
              <span className="font-space font-bold text-xl glow-text">
                Avasya<span className="cosmic-gradient">Lab</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Pioneering the future of aerospace technology and space innovation through cutting-edge research and
              development.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="font-space font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Mission Minds
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Research Hub
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="font-space font-medium text-lg mb-4">Research Areas</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Drone size={14} className="text-primary" />
                <Link
                  href="/research?category=drones"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Drone Technology
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Rocket size={14} className="text-primary" />
                <Link
                  href="/research?category=spacecraft"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Spacecraft Design
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Satellite size={14} className="text-primary" />
                <Link
                  href="/research?category=satellite"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Satellite Systems
                </Link>
              </li>
            </ul>

            <h3 className="font-space font-medium text-lg mt-6 mb-4">Recent News</h3>
            <ul className="space-y-3">
              {recentNews.map((news, index) => (
                <li key={index}>
                  <Link href={news.link} className="group">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{news.title}</p>
                    <p className="text-xs text-muted-foreground">{news.date}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="font-space font-medium text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground text-sm space-y-2">
              <p>Avasya Research Lab</p>
              <p>123 Cosmic Avenue</p>
              <p>Stellar City, SC 12345</p>
              <p className="mt-2">
                <a href="mailto:info@avasya-lab.com" className="hover:text-primary transition-colors">
                  info@avasya-lab.com
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
            </address>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm"
        >
          <p>&copy; {currentYear} Avasya Research Lab. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
