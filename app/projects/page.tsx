"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Heart,
  Share2,
  Download,
  Eye,
  Users,
  TrendingUp,
  Play,
  Code,
  Music,
  Palette,
  Brain,
  Shield,
  Activity,
  Atom,
  Zap,
  ArrowRight,
  Plus,
  GitBranch,
} from "lucide-react"

export default function ProjectsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({})

  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  // Demo projects with detailed information
  const projects = [
    {
      id: "music-ai-composer",
      title: "AI Music Composer",
      description:
        "Revolutionary AI that creates personalized music compositions based on emotions and user preferences. Uses deep learning to understand musical patterns and generate unique symphonies.",
      longDescription:
        "This groundbreaking project combines artificial intelligence with musical creativity to produce compositions that rival human composers. The system analyzes thousands of musical pieces to understand patterns, emotions, and structures, then generates original compositions tailored to user preferences.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
      category: "Music AI",
      status: "Active",
      progress: 85,
      team: [
        {
          name: "Alex Chen",
          role: "AI Engineer",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Maya Patel",
          role: "Music Producer",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "David Kim",
          role: "ML Specialist",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 3247, views: 45632, downloads: 1203, contributors: 12 },
      technologies: ["Python", "TensorFlow", "MIDI", "Neural Networks"],
      startDate: "2024-01-15",
      demoUrl: "https://demo.music-ai.com",
      githubUrl: "https://github.com/infinity/music-ai",
      icon: <Music className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "fashion-trend-predictor",
      title: "Fashion Trend Predictor",
      description:
        "AI system that predicts fashion trends and creates virtual clothing designs using machine learning algorithms and social media analysis.",
      longDescription:
        "This innovative project analyzes social media trends, runway shows, and consumer behavior to predict upcoming fashion trends. It also generates virtual clothing designs that align with predicted trends.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
      category: "Fashion AI",
      status: "Active",
      progress: 72,
      team: [
        {
          name: "Sophie Williams",
          role: "Fashion Designer",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "James Rodriguez",
          role: "Data Scientist",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 2156, views: 32847, downloads: 987, contributors: 8 },
      technologies: ["React", "Python", "Computer Vision", "API"],
      startDate: "2024-02-01",
      demoUrl: "https://demo.fashion-ai.com",
      githubUrl: "https://github.com/infinity/fashion-ai",
      icon: <Palette className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "mental-health-companion",
      title: "Mental Health AI Companion",
      description:
        "Intelligent chatbot providing 24/7 mental health support with personalized therapy recommendations and mood tracking.",
      longDescription:
        "A compassionate AI companion designed to provide mental health support through natural language processing and emotional intelligence. Features include mood tracking, personalized recommendations, and crisis intervention.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=800&auto=format&fit=crop",
      category: "Mental Health",
      status: "Active",
      progress: 90,
      team: [
        {
          name: "Dr. Sarah Kim",
          role: "Clinical Psychologist",
          avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Michael Zhang",
          role: "NLP Engineer",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Lisa Chen",
          role: "UX Designer",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 4987, views: 78234, downloads: 2156, contributors: 15 },
      technologies: ["Node.js", "NLP", "React Native", "MongoDB"],
      startDate: "2023-11-20",
      demoUrl: "https://demo.mental-health-ai.com",
      githubUrl: "https://github.com/infinity/mental-health-ai",
      icon: <Brain className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "fraud-detection-system",
      title: "Advanced Fraud Detection",
      description:
        "Real-time fraud detection system using machine learning to protect financial transactions with 99.7% accuracy.",
      longDescription:
        "A sophisticated fraud detection system that uses advanced machine learning algorithms to identify and prevent fraudulent transactions in real-time, protecting millions of users worldwide.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
      category: "Fraud Detection",
      status: "Completed",
      progress: 100,
      team: [
        {
          name: "Robert Johnson",
          role: "Security Expert",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Emily Davis",
          role: "ML Engineer",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 3456, views: 56789, downloads: 1876, contributors: 10 },
      technologies: ["Python", "Scikit-learn", "Apache Kafka", "Docker"],
      startDate: "2023-09-15",
      demoUrl: "https://demo.fraud-detection.com",
      githubUrl: "https://github.com/infinity/fraud-detection",
      icon: <Shield className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "quantum-state-analyzer",
      title: "Quantum State Qualifier",
      description:
        "Advanced quantum computing system for analyzing and qualifying quantum states in real-time with unprecedented accuracy.",
      longDescription:
        "A cutting-edge quantum computing project that pushes the boundaries of quantum state analysis, enabling new possibilities in quantum research and applications.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      category: "Quantum Computing",
      status: "Active",
      progress: 65,
      team: [
        {
          name: "Dr. Alan Turing",
          role: "Quantum Physicist",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Marie Curie",
          role: "Research Scientist",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 2876, views: 34567, downloads: 987, contributors: 6 },
      technologies: ["Qiskit", "Python", "Quantum Circuits", "IBM Quantum"],
      startDate: "2024-01-10",
      demoUrl: "https://demo.quantum-analyzer.com",
      githubUrl: "https://github.com/infinity/quantum-analyzer",
      icon: <Atom className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "digital-body-twins",
      title: "Digital Body Twins",
      description:
        "Create digital replicas of human bodies for medical simulation and personalized healthcare using advanced 3D modeling.",
      longDescription:
        "Revolutionary healthcare technology that creates precise digital twins of human bodies for medical simulation, treatment planning, and personalized healthcare solutions.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop",
      category: "Healthcare AI",
      status: "Active",
      progress: 78,
      team: [
        {
          name: "Dr. Lisa Wang",
          role: "Medical AI Specialist",
          avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Tom Anderson",
          role: "3D Modeling Expert",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        },
        {
          name: "Nina Patel",
          role: "Healthcare Consultant",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        },
      ],
      stats: { likes: 5432, views: 67890, downloads: 2345, contributors: 18 },
      technologies: ["Three.js", "WebGL", "Medical Imaging", "AI/ML"],
      startDate: "2023-12-01",
      demoUrl: "https://demo.digital-twins.com",
      githubUrl: "https://github.com/infinity/digital-twins",
      icon: <Activity className="h-5 w-5" />,
      featured: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Projects", count: projects.length },
    { id: "Music AI", name: "Music AI", count: projects.filter((p) => p.category === "Music AI").length },
    { id: "Fashion AI", name: "Fashion AI", count: projects.filter((p) => p.category === "Fashion AI").length },
    {
      id: "Mental Health",
      name: "Mental Health",
      count: projects.filter((p) => p.category === "Mental Health").length,
    },
    {
      id: "Fraud Detection",
      name: "Fraud Detection",
      count: projects.filter((p) => p.category === "Fraud Detection").length,
    },
    {
      id: "Quantum Computing",
      name: "Quantum",
      count: projects.filter((p) => p.category === "Quantum Computing").length,
    },
    { id: "Healthcare AI", name: "Healthcare", count: projects.filter((p) => p.category === "Healthcare AI").length },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || project.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featuredProjects = projects.filter((p) => p.featured)

  const handleLike = (projectId: string) => {
    setLikedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }))
    toast({
      title: likedProjects[projectId] ? "Like removed" : "Project Liked! ⭐",
      description: likedProjects[projectId] ? "Removed from favorites" : "Added to your favorites",
    })
  }

  const handleShare = (project: any) => {
    navigator.clipboard.writeText(`${window.location.origin}/projects/${project.id}`)
    toast({
      title: "Link Copied! 📋",
      description: `Link to "${project.title}" copied to clipboard`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={headerRef}
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              <Code className="h-5 w-5 mr-2" />
              Infinity Projects
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space mb-6 text-white">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore innovative projects created by our community. From AI-powered solutions to cutting-edge
              applications, discover the future of technology.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 border-white/20 text-white hover:bg-white/10">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Total Projects", value: projects.length },
                { label: "Active Projects", value: projects.filter((p) => p.status === "Active").length },
                { label: "Contributors", value: projects.reduce((sum, p) => sum + p.stats.contributors, 0) },
                {
                  label: "Total Views",
                  value: `${Math.round(projects.reduce((sum, p) => sum + p.stats.views, 0) / 1000)}K`,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="featured" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="featured" className="text-lg py-3">
              Featured Projects
            </TabsTrigger>
            <TabsTrigger value="all" className="text-lg py-3">
              All Projects
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-lg py-3">
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Featured Projects */}
          <TabsContent value="featured" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Handpicked projects that showcase the best of our community's innovation and creativity.
              </p>
            </div>

            <div className="grid lg:grid-cols-1 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-border">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Project Image */}
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-sm">{project.icon}</div>
                          <Badge className="bg-primary/90 text-white">{project.category}</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 text-sm">
                                <Heart className="h-4 w-4" /> {project.stats.likes.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1 text-sm">
                                <Eye className="h-4 w-4" /> {project.stats.views.toLocaleString()}
                              </span>
                            </div>
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
                              <Link href={project.demoUrl} target="_blank">
                                <Play className="h-4 w-4 mr-1" />
                                Demo
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold">{project.title}</h3>
                          <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">{project.longDescription}</p>

                        {/* Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Development Progress</span>
                            <span className="text-sm font-bold">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Team */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Team Members
                          </h4>
                          <div className="flex items-center gap-3">
                            {project.team.map((member, memberIndex) => (
                              <div key={memberIndex} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  <Image
                                    src={member.avatar || "/placeholder.svg"}
                                    alt={member.name}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="text-xs font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">{member.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Link href={`/projects/${project.id}`} className="flex-1">
                            <Button className="w-full">
                              <ArrowRight className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() => handleLike(project.id)}
                            className={likedProjects[project.id] ? "text-red-500 border-red-500" : ""}
                          >
                            <Heart className={`h-4 w-4 ${likedProjects[project.id] ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="outline" onClick={() => handleShare(project)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={project.githubUrl} target="_blank">
                              <GitBranch className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* All Projects */}
          <TabsContent value="all" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-border h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <div className="p-1.5 bg-primary/20 rounded-lg backdrop-blur-sm">{project.icon}</div>
                        <Badge className="bg-primary/90 text-white text-xs">{project.category}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-400" />
                            {project.progress}%
                          </span>
                          <Badge variant={project.status === "Active" ? "default" : "secondary"} className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <div className="flex items-center gap-2 mb-3">
                        {project.team.slice(0, 3).map((member, memberIndex) => (
                          <div key={memberIndex} className="w-6 h-6 rounded-full overflow-hidden border border-border">
                            <Image
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            +{project.team.length - 3}
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground ml-2">
                          {project.stats.contributors} contributors
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {project.stats.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {project.stats.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" /> {project.stats.downloads.toLocaleString()}
                        </span>
                      </div>

                      <Progress value={project.progress} className="h-1.5" />
                    </CardContent>

                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Link href={`/projects/${project.id}`} className="flex-1">
                          <Button size="sm" className="w-full text-xs">
                            View Project
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLike(project.id)}
                          className={`${likedProjects[project.id] ? "text-red-500 border-red-500" : ""}`}
                        >
                          <Heart className={`h-3 w-3 ${likedProjects[project.id] ? "fill-current" : ""}`} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleShare(project)}>
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter((cat) => cat.id !== "all")
                .map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-border"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          {projects.find((p) => p.category === category.id)?.icon || (
                            <Zap className="h-8 w-8 text-primary" />
                          )}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{category.name}</CardTitle>
                        <CardDescription>
                          {category.count} project{category.count !== 1 ? "s" : ""}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          className="text-center py-16 mt-16 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Own Project?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join our community of innovators and bring your ideas to life. Get support, find collaborators, and make an
            impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects/submit">
              <Button size="lg" className="px-8">
                <Plus className="h-5 w-5 mr-2" />
                Submit Project
              </Button>
            </Link>
            <Link href="/team">
              <Button size="lg" variant="outline" className="px-8">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
