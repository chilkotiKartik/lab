"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Layers,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Music,
  Palette,
  Brain,
  Activity,
  Code,
  Globe,
  Star,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { HomeNotification } from "@/components/home-notification"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"
import { FloatingAstronaut } from "@/components/floating-astronaut"

export default function Home() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [email, setEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})
  const [visibleProjects, setVisibleProjects] = useState(4)

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

  // Featured projects with diverse categories
  const featuredProjects = [
    {
      id: "music-ai-composer",
      title: "AI Music Composer",
      description: "Revolutionary AI that creates personalized music compositions based on emotions and preferences",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
      category: "Music AI",
      progress: 85,
      team: [
        {
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Maya Patel",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 3247, views: 45632, downloads: 1203 },
      breakthrough: "AI-generated symphonies",
      icon: <Music className="h-5 w-5" />,
    },
    {
      id: "fashion-trend-predictor",
      title: "Fashion Trend Predictor",
      description: "AI system that predicts fashion trends and creates virtual clothing designs using machine learning",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      category: "Fashion AI",
      progress: 72,
      team: [
        {
          name: "Sophie Williams",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "James Rodriguez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 2156, views: 32847, downloads: 987 },
      breakthrough: "Trend prediction accuracy: 94%",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      id: "mental-health-companion",
      title: "Mental Health AI Companion",
      description: "Intelligent chatbot providing 24/7 mental health support with personalized therapy recommendations",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=800&auto=format&fit=crop",
      category: "Mental Health",
      progress: 90,
      team: [
        {
          name: "Dr. Sarah Kim",
          avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Michael Zhang",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 4987, views: 78234, downloads: 2156 },
      breakthrough: "95% user satisfaction rate",
      icon: <Brain className="h-5 w-5" />,
    },
  ]

  // Latest projects showcase
  const latestProjects = [
    {
      id: "cultural-drift-nlp",
      title: "Cultural Drift NLP",
      description:
        "Advanced natural language processing system analyzing cultural evolution patterns in digital communications",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      author: "Aishwarya Maan Srivastava",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
      category: "NLP & Cultural Studies",
      impact: "92% pattern recognition",
      contributors: 3,
      publishedDate: "2024-01-15",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "language-loss-rebuilder",
      title: "Language Loss Rebuilder",
      description: "AI system for preserving and reconstructing endangered languages using machine learning",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
      author: "Rudra Narayan Meher",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      category: "Language Preservation",
      impact: "5 languages preserved",
      contributors: 5,
      publishedDate: "2024-01-28",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "contract-summarizer",
      title: "Contract Summarizer",
      description: "AI-powered system that analyzes and summarizes complex legal contracts with high accuracy",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
      author: "Krishna Vallabha Goswami",
      authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      category: "Legal Tech",
      impact: "98% accuracy rate",
      contributors: 2,
      publishedDate: "2024-02-05",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "prompt-feedback-tuner",
      title: "Prompt Feedback Tuner",
      description: "System for optimizing AI prompts through automated feedback loops and performance analysis",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=600&auto=format&fit=crop",
      author: "Satyam Singh",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      category: "AI Optimization",
      impact: "40% efficiency increase",
      contributors: 3,
      publishedDate: "2024-02-10",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: "turbulence-generator-gan",
      title: "Turbulence Generator GAN",
      description: "Generative Adversarial Network for creating realistic turbulence patterns in fluid dynamics",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
      author: "Swastik Joshi",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      category: "Fluid Dynamics",
      impact: "Revolutionary simulation",
      contributors: 5,
      publishedDate: "2024-01-20",
      icon: <Atom className="h-5 w-5" />,
    },
    {
      id: "digital-body-twin",
      title: "Digital Body Twin",
      description: "Create digital replicas of human bodies for medical simulation and personalized healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=600&auto=format&fit=crop",
      author: "Ghantasala Dhruvann",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      category: "Healthcare AI",
      impact: "Personalized medicine revolution",
      contributors: 5,
      publishedDate: "2024-02-15",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      id: "particle-pattern-finder",
      title: "Particle Pattern Finder",
      description: "Advanced algorithm for detecting patterns in particle physics data using machine learning",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop",
      author: "Niraj Kumar",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      category: "Particle Physics",
      impact: "New particle discovery",
      contributors: 2,
      publishedDate: "2024-01-25",
      icon: <Atom className="h-5 w-5" />,
    },
    {
      id: "medical-symptom-chatbot",
      title: "Medical Symptom Chatbot",
      description: "AI-powered chatbot for preliminary medical symptom analysis and healthcare recommendations",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
      author: "Meet Parmar",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      category: "Healthcare",
      impact: "85% diagnostic accuracy",
      contributors: 3,
      publishedDate: "2024-02-01",
      icon: <MessageSquare className="h-5 w-5" />,
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
        title: "Welcome to Infinity! 🚀",
        description: "You're now part of our revolutionary tech community!",
      })
      setEmail("")
      setIsNewsletterSubmitting(false)
    }, 1500)
  }

  const handleLike = (id: string) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }))
    toast({
      title: likedItems[id] ? "Like removed" : "Project Liked! ⭐",
      description: likedItems[id] ? "Removed from favorites" : "Added to your favorites",
    })
  }

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => Math.min(prev + 4, latestProjects.length))
  }

  return (
    <div className="relative overflow-hidden">
      {!user && <HomeNotification />}

      {/* Enhanced Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <SpaceBackground />
        <SpaceParticles />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={heroRef}
            className="text-center max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hero Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-8 py-3 mb-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium">Welcome to the Future of Innovation</span>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-space mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Infinity
              </span>
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tech Society
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Where <span className="text-primary font-semibold">innovation</span> meets{" "}
              <span className="text-purple-400 font-semibold">collaboration</span>. Join a vibrant community of tech
              enthusiasts building the future, one project at a time.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {!user ? (
                <Link href="/login">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl shadow-primary/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Launch Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl shadow-primary/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Continue Journey
                  </Button>
                </Link>
              )}
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 py-6 text-lg border-2 border-primary/50 hover:bg-primary/10 backdrop-blur-sm"
                >
                  <Users className="mr-3 h-6 w-6" />
                  Explore Projects
                </Button>
              </Link>
              <Link href="/gallery">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Layers className="mr-3 h-6 w-6" />
                  3D Gallery
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {[
                { icon: <Code className="h-6 w-6" />, value: "150", label: "Active Projects", suffix: "+" },
                { icon: <Users className="h-6 w-6" />, value: "500", label: "Community Members", suffix: "+" },
                { icon: <Globe className="h-6 w-6" />, value: "25", label: "Countries", suffix: "+" },
                { icon: <Award className="h-6 w-6" />, value: "50", label: "Awards Won", suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
                  <motion.div
                    className="text-3xl sm:text-4xl font-bold text-white mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {stat.value}
                    {stat.suffix}
                  </motion.div>
                  <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Astronaut */}
        <div className="absolute right-[5%] top-[20%] hidden lg:block">
          <FloatingAstronaut />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </div>

      {/* Featured Projects Showcase */}
      <div className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              <Target className="h-5 w-5 mr-2" />
              Featured Projects
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space mb-8">
              Projects That{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Change Lives
              </span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
              Discover groundbreaking projects created by our community. From AI-powered solutions to innovative
              applications, these projects are shaping the future of technology.
            </p>
          </motion.div>

          {/* Interactive Project Display */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Main Project Display */}
            <motion.div
              className="relative"
              key={activeFeature}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden group shadow-2xl">
                <Image
                  src={featuredProjects[activeFeature].image || "/placeholder.svg"}
                  alt={featuredProjects[activeFeature].title}
                  width={700}
                  height={500}
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/20 rounded-xl backdrop-blur-sm">
                      {featuredProjects[activeFeature].icon}
                    </div>
                    <Badge className="bg-primary/90 text-white text-sm px-4 py-2">
                      {featuredProjects[activeFeature].category}
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{featuredProjects[activeFeature].title}</h3>
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                    {featuredProjects[activeFeature].description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="font-medium">Development Progress</span>
                      <span className="font-bold">{featuredProjects[activeFeature].progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${featuredProjects[activeFeature].progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Breakthrough Badge */}
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg font-medium text-yellow-400">
                      {featuredProjects[activeFeature].breakthrough}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Navigation & Details */}
            <div className="space-y-8">
              {/* Project Tabs */}
              <div className="space-y-4">
                {featuredProjects.map((project, index) => (
                  <motion.button
                    key={project.id}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      index === activeFeature
                        ? "bg-primary/10 border-primary/50 shadow-xl shadow-primary/20"
                        : "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30"
                    }`}
                    onClick={() => setActiveFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/20 rounded-lg">{project.icon}</div>
                          <h4 className="font-bold text-lg truncate">{project.title}</h4>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Heart className="h-4 w-4" /> {project.stats.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> {project.stats.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <Download className="h-4 w-4" /> {project.stats.downloads.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Team Members */}
              <Card className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Project Team
                  </h4>
                  <div className="flex items-center gap-4">
                    {featuredProjects[activeFeature].team.map((member, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{member.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link href={`/projects/${featuredProjects[activeFeature].id}`} className="flex-1">
                  <Button className="w-full h-14 text-lg rounded-xl">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Explore Project
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-6 rounded-xl"
                  onClick={() => handleLike(featuredProjects[activeFeature].id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedItems[featuredProjects[activeFeature].id] ? "fill-current text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-6 rounded-xl">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Projects Grid */}
      <div className="py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-secondary/10 text-secondary-foreground border-secondary/20 text-lg px-6 py-2">
              <Zap className="h-5 w-5 mr-2" />
              Latest Innovations
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space mb-8">
              Cutting-Edge{" "}
              <span className="bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
              Our community is constantly pushing the boundaries of what's possible. Explore the latest projects that
              are making a real impact in the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {latestProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={project.authorAvatar || "/placeholder.svg"}
                        alt={project.author}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{project.author}</h4>
                      <p className="text-muted-foreground text-sm">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {project.impact}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {project.contributors} Contributors
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleProjects < latestProjects.length && (
            <div className="text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-4" onClick={loadMoreProjects}>
                Load More Projects
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-purple-600/10 text-purple-600 border-purple-600/20 text-lg px-6 py-2">
              <Star className="h-5 w-5 mr-2" />
              Join Our Newsletter
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-space mb-8">Stay Updated with the Latest Tech Trends</h2>
            <p className="text-muted-foreground text-xl mb-12">
              Subscribe to our newsletter and get the latest tech news, project updates, and community insights
              delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full px-6 py-4 text-lg"
              />
              <Button
                type="submit"
                className="rounded-full px-10 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isNewsletterSubmitting}
              >
                {isNewsletterSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">&copy; {new Date().getFullYear()} Infinity Tech Society. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
