"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Award,
  Heart,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Star,
  Code,
  Palette,
  Brain,
  Shield,
  Music,
  Atom,
  Rocket,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

export default function TeamPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeRole, setActiveRole] = useState("all")
  const [followedMembers, setFollowedMembers] = useState<Record<string, boolean>>({})

  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  // Team members data
  const teamMembers = [
    {
      id: "alex-chen",
      name: "Alex Chen",
      role: "AI Engineer & Co-Founder",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      bio: "Passionate AI engineer with 8+ years of experience in machine learning and neural networks. Leading the development of our AI music composer project.",
      location: "San Francisco, CA",
      joinDate: "2023-01-15",
      skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
      projects: ["AI Music Composer", "Neural Style Transfer", "Voice Synthesis"],
      achievements: ["Best AI Project 2024", "Tech Innovation Award", "Open Source Contributor"],
      social: {
        github: "https://github.com/alexchen",
        linkedin: "https://linkedin.com/in/alexchen",
        twitter: "https://twitter.com/alexchen",
        email: "alex@infinitytech.com",
      },
      stats: { projects: 12, contributions: 847, followers: 2341 },
      status: "online",
      icon: <Brain className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "maya-patel",
      name: "Maya Patel",
      role: "Music Producer & Sound Designer",
      department: "Creative",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
      bio: "Award-winning music producer and sound designer with expertise in AI-generated music. Bridging the gap between technology and creativity.",
      location: "Los Angeles, CA",
      joinDate: "2023-02-20",
      skills: ["Music Production", "Sound Design", "Audio Engineering", "MIDI", "Digital Audio"],
      projects: ["AI Music Composer", "Ambient Soundscapes", "Interactive Audio"],
      achievements: ["Grammy Nomination", "Music Tech Pioneer", "Creative Excellence Award"],
      social: {
        github: "https://github.com/mayapatel",
        linkedin: "https://linkedin.com/in/mayapatel",
        twitter: "https://twitter.com/mayapatel",
        email: "maya@infinitytech.com",
      },
      stats: { projects: 8, contributions: 523, followers: 1876 },
      status: "online",
      icon: <Music className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "sophie-williams",
      name: "Sophie Williams",
      role: "Fashion Designer & AI Researcher",
      department: "Design",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      bio: "Fashion designer turned AI researcher, specializing in trend prediction and virtual fashion design. Combining creativity with cutting-edge technology.",
      location: "New York, NY",
      joinDate: "2023-03-10",
      skills: ["Fashion Design", "Trend Analysis", "Computer Vision", "3D Modeling", "UI/UX"],
      projects: ["Fashion Trend Predictor", "Virtual Wardrobe", "Style Transfer AI"],
      achievements: ["Fashion Tech Award", "Innovation in Design", "Startup Accelerator Graduate"],
      social: {
        github: "https://github.com/sophiewilliams",
        linkedin: "https://linkedin.com/in/sophiewilliams",
        twitter: "https://twitter.com/sophiewilliams",
        email: "sophie@infinitytech.com",
      },
      stats: { projects: 6, contributions: 412, followers: 1543 },
      status: "away",
      icon: <Palette className="h-5 w-5" />,
      featured: true,
    },
    {
      id: "dr-sarah-kim",
      name: "Dr. Sarah Kim",
      role: "Clinical Psychologist & AI Ethics Specialist",
      department: "Research",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      bio: "Clinical psychologist with expertise in AI ethics and mental health applications. Ensuring our AI solutions are safe, ethical, and beneficial for users.",
      location: "Boston, MA",
      joinDate: "2023-01-30",
      skills: ["Clinical Psychology", "AI Ethics", "Research", "Data Analysis", "Mental Health"],
      projects: ["Mental Health AI Companion", "Ethical AI Framework", "Bias Detection System"],
      achievements: ["PhD in Psychology", "AI Ethics Certification", "Published Researcher"],
      social: {
        github: "https://github.com/drsarahkim",
        linkedin: "https://linkedin.com/in/drsarahkim",
        twitter: "https://twitter.com/drsarahkim",
        email: "sarah@infinitytech.com",
      },
      stats: { projects: 4, contributions: 298, followers: 987 },
      status: "online",
      icon: <Shield className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "michael-zhang",
      name: "Michael Zhang",
      role: "NLP Engineer & Full-Stack Developer",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      bio: "Full-stack developer with specialization in natural language processing. Building conversational AI systems that understand and help users.",
      location: "Seattle, WA",
      joinDate: "2023-04-15",
      skills: ["NLP", "React", "Node.js", "Python", "MongoDB", "Conversational AI"],
      projects: ["Mental Health AI Companion", "Chatbot Framework", "Language Translation Tool"],
      achievements: ["Full-Stack Certification", "NLP Specialist", "Open Source Maintainer"],
      social: {
        github: "https://github.com/michaelzhang",
        linkedin: "https://linkedin.com/in/michaelzhang",
        twitter: "https://twitter.com/michaelzhang",
        email: "michael@infinitytech.com",
      },
      stats: { projects: 15, contributions: 1234, followers: 2876 },
      status: "online",
      icon: <Code className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "lisa-chen",
      name: "Lisa Chen",
      role: "UX Designer & Product Manager",
      department: "Design",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
      bio: "UX designer and product manager focused on creating intuitive and accessible user experiences for AI-powered applications.",
      location: "Austin, TX",
      joinDate: "2023-05-01",
      skills: ["UX Design", "Product Management", "Figma", "User Research", "Accessibility"],
      projects: ["Mental Health AI Companion", "Design System", "User Experience Research"],
      achievements: ["UX Design Award", "Accessibility Champion", "Product Leadership Certificate"],
      social: {
        github: "https://github.com/lisachen",
        linkedin: "https://linkedin.com/in/lisachen",
        twitter: "https://twitter.com/lisachen",
        email: "lisa@infinitytech.com",
      },
      stats: { projects: 9, contributions: 567, followers: 1654 },
      status: "away",
      icon: <Palette className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "dr-alan-turing",
      name: "Dr. Alan Turing",
      role: "Quantum Physicist & Research Director",
      department: "Research",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
      bio: "Quantum physicist leading our quantum computing research initiatives. Pushing the boundaries of what's possible with quantum state analysis.",
      location: "Cambridge, MA",
      joinDate: "2023-06-10",
      skills: ["Quantum Physics", "Quantum Computing", "Research", "Mathematics", "Algorithm Design"],
      projects: ["Quantum State Qualifier", "Quantum Algorithm Optimization", "Quantum Cryptography"],
      achievements: ["PhD in Quantum Physics", "Quantum Research Grant", "Scientific Publications"],
      social: {
        github: "https://github.com/alanturing",
        linkedin: "https://linkedin.com/in/alanturing",
        twitter: "https://twitter.com/alanturing",
        email: "alan@infinitytech.com",
      },
      stats: { projects: 3, contributions: 189, followers: 543 },
      status: "offline",
      icon: <Atom className="h-5 w-5" />,
      featured: false,
    },
    {
      id: "marie-curie",
      name: "Marie Curie",
      role: "Research Scientist & Data Analyst",
      department: "Research",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      bio: "Research scientist with expertise in data analysis and scientific computing. Contributing to breakthrough research in quantum computing and AI.",
      location: "Paris, France",
      joinDate: "2023-07-20",
      skills: ["Data Science", "Scientific Computing", "Statistics", "Research", "Python"],
      projects: ["Quantum State Qualifier", "Data Analysis Framework", "Scientific Visualization"],
      achievements: ["Research Excellence Award", "Data Science Certification", "International Speaker"],
      social: {
        github: "https://github.com/mariecurie",
        linkedin: "https://linkedin.com/in/mariecurie",
        twitter: "https://twitter.com/mariecurie",
        email: "marie@infinitytech.com",
      },
      stats: { projects: 7, contributions: 445, followers: 1234 },
      status: "online",
      icon: <TrendingUp className="h-5 w-5" />,
      featured: false,
    },
  ]

  const departments = [
    { id: "all", name: "All Team", count: teamMembers.length },
    { id: "Engineering", name: "Engineering", count: teamMembers.filter((m) => m.department === "Engineering").length },
    { id: "Design", name: "Design", count: teamMembers.filter((m) => m.department === "Design").length },
    { id: "Research", name: "Research", count: teamMembers.filter((m) => m.department === "Research").length },
    { id: "Creative", name: "Creative", count: teamMembers.filter((m) => m.department === "Creative").length },
  ]

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = activeRole === "all" || member.department === activeRole
    return matchesSearch && matchesDepartment
  })

  const featuredMembers = teamMembers.filter((m) => m.featured)

  const handleFollow = (memberId: string) => {
    setFollowedMembers((prev) => ({ ...prev, [memberId]: !prev[memberId] }))
    toast({
      title: followedMembers[memberId] ? "Unfollowed" : "Following! 👥",
      description: followedMembers[memberId]
        ? "You are no longer following this member"
        : "You are now following this team member",
    })
  }

  const handleMessage = (member: any) => {
    toast({
      title: "Message Sent! 💬",
      description: `Your message to ${member.name} has been sent`,
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
              <Users className="h-5 w-5 mr-2" />
              Meet Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space mb-6 text-white">
              The Minds Behind{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Infinity
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Meet the brilliant individuals who are shaping the future of technology. Our diverse team of engineers,
              designers, researchers, and creators work together to build innovative solutions.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Team Members", value: teamMembers.length },
                { label: "Countries", value: "8" },
                { label: "Total Projects", value: teamMembers.reduce((sum, m) => sum + m.stats.projects, 0) },
                {
                  label: "Contributions",
                  value: `${Math.round(teamMembers.reduce((sum, m) => sum + m.stats.contributions, 0) / 1000)}K`,
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
              Featured Members
            </TabsTrigger>
            <TabsTrigger value="all" className="text-lg py-3">
              All Members
            </TabsTrigger>
            <TabsTrigger value="departments" className="text-lg py-3">
              Departments
            </TabsTrigger>
          </TabsList>

          {/* Featured Members */}
          <TabsContent value="featured" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Team Members</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Meet the key contributors who are leading our most innovative projects and driving our mission forward.
              </p>
            </div>

            <div className="grid lg:grid-cols-1 gap-8">
              {featuredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-border">
                    <div className="grid lg:grid-cols-3 gap-0">
                      {/* Member Photo */}
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-sm">{member.icon}</div>
                          <Badge className="bg-primary/90 text-white">{member.department}</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  member.status === "online"
                                    ? "bg-green-400"
                                    : member.status === "away"
                                      ? "bg-yellow-400"
                                      : "bg-gray-400"
                                }`}
                              />
                              <span className="text-sm capitalize">{member.status}</span>
                            </div>
                            <div className="flex gap-2">
                              {member.social.github && (
                                <Link href={member.social.github} target="_blank">
                                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                                    <Github className="h-4 w-4" />
                                  </Button>
                                </Link>
                              )}
                              {member.social.linkedin && (
                                <Link href={member.social.linkedin} target="_blank">
                                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                                    <Linkedin className="h-4 w-4" />
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Member Details */}
                      <div className="lg:col-span-2 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                            <p className="text-primary font-medium mb-2">{member.role}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {member.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Joined {new Date(member.joinDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => handleFollow(member.id)}
                              className={followedMembers[member.id] ? "bg-primary/10 border-primary text-primary" : ""}
                            >
                              <Heart className={`h-4 w-4 mr-2 ${followedMembers[member.id] ? "fill-current" : ""}`} />
                              {followedMembers[member.id] ? "Following" : "Follow"}
                            </Button>
                            <Button variant="outline" onClick={() => handleMessage(member)}>
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

                        {/* Skills */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3">Skills & Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3">Current Projects</h4>
                          <div className="space-y-2">
                            {member.projects.slice(0, 3).map((project, projectIndex) => (
                              <div key={projectIndex} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                <span>{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Achievements
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.achievements.map((achievement, achievementIndex) => (
                              <Badge
                                key={achievementIndex}
                                className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs"
                              >
                                <Star className="h-3 w-3 mr-1" />
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{member.stats.projects}</div>
                            <div className="text-xs text-muted-foreground">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{member.stats.contributions}</div>
                            <div className="text-xs text-muted-foreground">Contributions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{member.stats.followers}</div>
                            <div className="text-xs text-muted-foreground">Followers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* All Members */}
          <TabsContent value="all" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-border h-full">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <div className="p-1.5 bg-primary/20 rounded-lg backdrop-blur-sm">{member.icon}</div>
                        <Badge className="bg-primary/90 text-white text-xs">{member.department}</Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            member.status === "online"
                              ? "bg-green-400"
                              : member.status === "away"
                                ? "bg-yellow-400"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex gap-2">
                          {member.social.github && (
                            <Link href={member.social.github} target="_blank">
                              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                                <Github className="h-3 w-3" />
                              </Button>
                            </Link>
                          )}
                          {member.social.linkedin && (
                            <Link href={member.social.linkedin} target="_blank">
                              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                                <Linkedin className="h-3 w-3" />
                              </Button>
                            </Link>
                          )}
                          {member.social.twitter && (
                            <Link href={member.social.twitter} target="_blank">
                              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
                                <Twitter className="h-3 w-3" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">{member.role}</CardDescription>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {member.location.split(",")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="h-3 w-3" />
                          {member.stats.projects} projects
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFollow(member.id)}
                            className={`text-xs ${followedMembers[member.id] ? "bg-primary/10 border-primary text-primary" : ""}`}
                          >
                            <Heart className={`h-3 w-3 ${followedMembers[member.id] ? "fill-current" : ""}`} />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleMessage(member)} className="text-xs">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">{member.stats.followers} followers</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">No team members found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {departments
                .filter((dept) => dept.id !== "all")
                .map((department, index) => (
                  <motion.div
                    key={department.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-border p-8"
                      onClick={() => setActiveRole(department.id)}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          {department.id === "Engineering" && <Code className="h-10 w-10 text-primary" />}
                          {department.id === "Design" && <Palette className="h-10 w-10 text-primary" />}
                          {department.id === "Research" && <Lightbulb className="h-10 w-10 text-primary" />}
                          {department.id === "Creative" && <Music className="h-10 w-10 text-primary" />}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {department.name}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {department.count} team member{department.count !== 1 ? "s" : ""}
                        </p>

                        {/* Department Members Preview */}
                        <div className="flex justify-center gap-2 mb-6">
                          {teamMembers
                            .filter((m) => m.department === department.id)
                            .slice(0, 4)
                            .map((member, memberIndex) => (
                              <div
                                key={memberIndex}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-border"
                              >
                                <Image
                                  src={member.avatar || "/placeholder.svg"}
                                  alt={member.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          {teamMembers.filter((m) => m.department === department.id).length > 4 && (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-border">
                              +{teamMembers.filter((m) => m.department === department.id).length - 4}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          View Team
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Join Team CTA */}
        <motion.div
          className="text-center py-16 mt-16 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and technology. Join us
            in building the future!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8">
                <Rocket className="h-5 w-5 mr-2" />
                Join Our Team
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="px-8">
                <Target className="h-5 w-5 mr-2" />
                View Open Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
