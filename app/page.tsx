"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  Rocket,
  Zap,
  Users,
  ChevronDown,
  Heart,
  Share2,
  Download,
  Eye,
  Sparkles,
  Atom,
  Cpu,
  Telescope,
  Layers,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { HomeNotification } from "@/components/home-notification"

export default function Home() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [email, setEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Revolutionary projects data with real images
  const featuredProjects = [
    {
      id: "quantum-propulsion",
      title: "Quantum Propulsion Engine",
      description: "Revolutionary quantum drive system enabling faster-than-light theoretical travel",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=800&auto=format&fit=crop",
      category: "Propulsion",
      progress: 85,
      team: [
        {
          name: "Dr. Elena Vasquez",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Prof. Chen Wei",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Dr. Amara Singh",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 2847, views: 45632, downloads: 1203 },
      breakthrough: "99.7% efficiency achieved",
    },
    {
      id: "neural-navigation",
      title: "Neural Navigation AI",
      description: "AI system that learns from cosmic patterns to navigate through unknown space territories",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      category: "AI Navigation",
      progress: 92,
      team: [
        {
          name: "Dr. Marcus Johnson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Dr. Yuki Tanaka",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 3156, views: 52847, downloads: 987 },
      breakthrough: "Self-learning algorithms",
    },
    {
      id: "bio-habitat",
      title: "Self-Sustaining Bio-Habitat",
      description: "Closed-loop ecosystem for long-term space missions with 100% resource recycling",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop",
      category: "Life Support",
      progress: 78,
      team: [
        {
          name: "Dr. Sarah Kim",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Prof. Ahmed Hassan",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Dr. Luna Rodriguez",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 1987, views: 34521, downloads: 756 },
      breakthrough: "100% recycling efficiency",
    },
  ]

  // Research breakthroughs
  const researchBreakthroughs = [
    {
      id: "quantum-computing",
      title: "Quantum Computing Breakthrough in Space Navigation",
      description:
        "Revolutionary quantum algorithms that process cosmic data 10,000x faster than traditional computers",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
      author: "Dr. Elena Vasquez",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
      category: "Quantum Computing",
      impact: "10,000x faster processing",
      citations: 847,
      publishedDate: "2024-01-15",
    },
    {
      id: "antimatter-storage",
      title: "Stable Antimatter Storage Solution",
      description: "First successful long-term antimatter containment system using magnetic field manipulation",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=600&auto=format&fit=crop",
      author: "Prof. Chen Wei",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      category: "Energy Storage",
      impact: "1000x energy density",
      citations: 1203,
      publishedDate: "2024-02-08",
    },
    {
      id: "bio-regeneration",
      title: "Cellular Regeneration in Zero Gravity",
      description: "Breakthrough in understanding how to maintain human health during extended space travel",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=600&auto=format&fit=crop",
      author: "Dr. Sarah Kim",
      authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      category: "Biotechnology",
      impact: "95% health retention",
      citations: 654,
      publishedDate: "2024-01-28",
    },
  ]

  // Auto-rotate featured projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [featuredProjects.length])

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
    setTimeout(() => {
      toast({
        title: "Welcome to the Future! 🚀",
        description: "You're now part of our revolutionary research community!",
      })
      setEmail("")
      setIsNewsletterSubmitting(false)
    }, 1500)
  }

  const handleLike = (id: string) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }))
    toast({
      title: likedItems[id] ? "Like removed" : "Breakthrough Liked! ⭐",
      description: likedItems[id] ? "Removed from favorites" : "Added to your favorites",
    })
  }

  return (
    <div className="relative overflow-hidden">
      {!user && <HomeNotification />}

      {/* Revolutionary Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div className="container mx-auto px-4 relative z-10" style={{ y, opacity, scale }}>
          <motion.div
            ref={heroRef}
            className="text-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Revolutionary Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Making History in Aerospace Technology</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>

            {/* Main Title with Gradient Animation */}
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-space mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Avasya
              </span>
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Research Lab
              </span>
            </motion.h1>

            {/* Subtitle with Typewriter Effect */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Pioneering the impossible. From quantum propulsion to neural AI navigation, we're not just reaching for
              the stars—
              <span className="text-primary font-semibold"> we're redefining what's possible.</span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Link href="/research">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25"
                >
                  <Telescope className="mr-2 h-5 w-5" />
                  Explore Breakthroughs
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  View Projects
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="secondary" size="lg" className="rounded-full px-8 py-6 text-lg">
                  <Layers className="mr-2 h-5 w-5" />
                  3D Gallery
                </Button>
              </Link>
            </motion.div>

            {/* Live Stats Counter - Fixed Icon Sizes */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {[
                { icon: <Atom className="h-5 w-5" />, value: "47", label: "Breakthroughs", suffix: "+" },
                { icon: <Cpu className="h-5 w-5" />, value: "156", label: "Research Papers", suffix: "+" },
                { icon: <Users className="h-5 w-5" />, value: "89", label: "Scientists", suffix: "" },
                { icon: <Award className="h-5 w-5" />, value: "23", label: "Awards", suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <motion.div
                    className="text-2xl sm:text-3xl font-bold text-white mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {stat.value}
                    {stat.suffix}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </div>

      {/* Revolutionary Featured Project Showcase */}
      <div className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Target className="h-4 w-4 mr-2" />
              Revolutionary Projects
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-6">
              Projects That Will{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Change Everything
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Witness the future being built today. These aren't just projects—they're the foundation of humanity's next
              chapter.
            </p>
          </motion.div>

          {/* Interactive Project Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Display */}
            <motion.div
              className="relative"
              key={activeFeature}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden group">
                <Image
                  src={featuredProjects[activeFeature].image || "/placeholder.svg"}
                  alt={featuredProjects[activeFeature].title}
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className="mb-3 bg-primary/90 text-white">{featuredProjects[activeFeature].category}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{featuredProjects[activeFeature].title}</h3>
                  <p className="text-gray-200 mb-4">{featuredProjects[activeFeature].description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{featuredProjects[activeFeature].progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${featuredProjects[activeFeature].progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Breakthrough Badge */}
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">
                      {featuredProjects[activeFeature].breakthrough}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Navigation & Details */}
            <div className="space-y-6">
              {/* Project Tabs */}
              <div className="space-y-3">
                {featuredProjects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      index === activeFeature
                        ? "bg-primary/10 border-primary/50 shadow-lg"
                        : "bg-card/50 border-border hover:bg-card/80"
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{project.title}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" /> {project.stats.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {project.stats.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Team Members */}
              <div className="bg-card/50 rounded-xl p-6 border border-border">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Research Team
                </h4>
                <div className="flex items-center gap-3">
                  {featuredProjects[activeFeature].team.map((member, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium hidden sm:block">{member.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link href={`/projects/${featuredProjects[activeFeature].id}`} className="flex-1">
                  <Button className="w-full">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Explore Project
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleLike(featuredProjects[activeFeature].id)}
                  className={likedItems[featuredProjects[activeFeature].id] ? "text-red-500 border-red-500" : ""}
                >
                  <Heart
                    className={`h-4 w-4 ${likedItems[featuredProjects[activeFeature].id] ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Breakthroughs Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary-foreground border-secondary/20">
              <Zap className="h-4 w-4 mr-2" />
              Latest Breakthroughs
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-6">
              Discoveries That{" "}
              <span className="bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent">
                Defy Logic
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Our research doesn't just push boundaries—it obliterates them. These breakthroughs are reshaping our
              understanding of physics itself.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchBreakthroughs.map((research, index) => (
              <motion.div
                key={research.id}
                className="group bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={research.image || "/placeholder.svg"}
                    alt={research.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-primary/90 text-white">{research.category}</Badge>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">{research.impact}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={research.authorAvatar || "/placeholder.svg"}
                        alt={research.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{research.author}</span>
                  </div>

                  <h3 className="text-xl font-bold font-space mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {research.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{research.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(research.id)}
                        className={likedItems[research.id] ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${likedItems[research.id] ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <Link href={`/research/${research.id}`}>
                      <Button variant="outline" size="sm">
                        Read Paper
                      </Button>
                    </Link>
                  </div>

                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span>{research.citations} citations</span>
                    <span>{research.publishedDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/research">
              <Button size="lg" variant="outline" className="rounded-full">
                Explore All Breakthroughs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-4 w-4 mr-2" />
              Join the Revolution
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space mb-6">
              Be Part of{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">History</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get exclusive access to breakthrough discoveries, behind-the-scenes research updates, and early previews
              of technologies that will reshape our world.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email to join the future"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-center sm:text-left"
              />
              <Button
                type="submit"
                disabled={isNewsletterSubmitting}
                className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600"
              >
                {isNewsletterSubmitting ? "Joining..." : "Join Revolution"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Join 50,000+ researchers, scientists, and visionaries already part of our community
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
