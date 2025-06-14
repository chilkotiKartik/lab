"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Rocket, Users, Target, Heart, Globe, Lightbulb, Award, Code, ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const stats = [
    { label: "Community Members", value: "500+", icon: <Users className="h-6 w-6" /> },
    { label: "Projects Completed", value: "150+", icon: <Code className="h-6 w-6" /> },
    { label: "Countries Reached", value: "25+", icon: <Globe className="h-6 w-6" /> },
    { label: "Awards Won", value: "50+", icon: <Award className="h-6 w-6" /> },
  ]

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description: "We believe in pushing boundaries and exploring new possibilities in technology.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Spirit",
      description: "Together we achieve more. Our community thrives on collaboration and knowledge sharing.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Inclusive Community",
      description: "We welcome everyone regardless of background, experience level, or location.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Impact Driven",
      description: "Every project we undertake aims to make a positive impact on society.",
    },
  ]

  const timeline = [
    {
      year: "2023",
      title: "Foundation",
      description: "Infinity Tech Society was founded with a vision to democratize innovation and technology.",
      achievements: ["First 50 members", "Launch of platform", "First project submissions"],
    },
    {
      year: "2024",
      title: "Growth & Expansion",
      description: "Rapid growth in community size and project diversity across multiple domains.",
      achievements: ["500+ active members", "150+ completed projects", "Global reach in 25+ countries"],
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Expanding our impact with advanced AI tools and global partnerships.",
      achievements: ["AI-powered project matching", "University partnerships", "Industry collaborations"],
    },
  ]

  const team = [
    {
      name: "Alex Chen",
      role: "Co-Founder & CTO",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      bio: "Passionate about AI and machine learning with 8+ years of experience in building scalable tech solutions.",
      specialties: ["AI/ML", "Full-Stack Development", "System Architecture"],
    },
    {
      name: "Maya Patel",
      role: "Co-Founder & Creative Director",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
      bio: "Award-winning designer and creative strategist focused on human-centered design and innovation.",
      specialties: ["UX/UI Design", "Creative Strategy", "Brand Development"],
    },
    {
      name: "Dr. Sarah Kim",
      role: "Head of Research",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      bio: "Research scientist with expertise in AI ethics and responsible technology development.",
      specialties: ["AI Ethics", "Research", "Academic Partnerships"],
    },
    {
      name: "Michael Zhang",
      role: "Community Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      bio: "Community builder passionate about fostering collaboration and knowledge sharing.",
      specialties: ["Community Building", "Event Management", "Mentorship"],
    },
  ]

  const achievements = [
    {
      title: "Best Innovation Platform 2024",
      organization: "Tech Innovation Awards",
      date: "December 2024",
      description: "Recognized for outstanding contribution to technology innovation and community building.",
    },
    {
      title: "Top 10 Tech Communities",
      organization: "Developer Weekly",
      date: "November 2024",
      description: "Featured among the top 10 most impactful tech communities globally.",
    },
    {
      title: "Social Impact Award",
      organization: "Global Tech Summit",
      date: "October 2024",
      description: "Honored for projects that create positive social and environmental impact.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={heroRef}
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-lg px-6 py-2">
              <Rocket className="h-5 w-5 mr-2" />
              About Infinity
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space mb-6 text-white">
              Building the Future{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Infinity Tech Society is a global community of innovators, creators, and dreamers working together to
              solve tomorrow's challenges through technology and collaboration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/team">
                <Button size="lg" className="px-8">
                  <Users className="h-5 w-5 mr-2" />
                  Meet Our Team
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="px-8 border-white/20 text-white hover:bg-white/10">
                  <Code className="h-5 w-5 mr-2" />
                  View Projects
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
            <TabsTrigger value="values">Our Values</TabsTrigger>
            <TabsTrigger value="story">Our Story</TabsTrigger>
            <TabsTrigger value="team">Leadership</TabsTrigger>
          </TabsList>

          {/* Mission & Vision */}
          <TabsContent value="mission" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To democratize innovation by creating a global platform where passionate individuals can collaborate,
                  learn, and build technology solutions that make a positive impact on the world.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that the best innovations come from diverse minds working together. Our platform breaks
                  down barriers and connects people across geographical, cultural, and professional boundaries to create
                  something extraordinary.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-80 rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-80 rounded-2xl overflow-hidden md:order-1"
              >
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                  alt="Future vision"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:order-2"
              >
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To be the world's leading platform for collaborative innovation, where every great idea has the
                  opportunity to become reality through community support and technological excellence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a future where innovation is not limited by resources, connections, or geography. A world
                  where anyone with a great idea can find the right team, tools, and support to bring their vision to
                  life.
                </p>
              </motion.div>
            </div>
          </TabsContent>

          {/* Values */}
          <TabsContent value="values" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our values guide everything we do and shape the culture of our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <div className="text-primary">{value.icon}</div>
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Impact Section */}
            <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                <p className="text-muted-foreground">See how our community is making a difference around the world.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                  <p className="text-muted-foreground">Lives Impacted</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$2.5M</div>
                  <p className="text-muted-foreground">Funding Raised</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <p className="text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Story */}
          <TabsContent value="story" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From a simple idea to a global community - here's how Infinity Tech Society came to life.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                      <div className="space-y-2">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < timeline.length - 1 && <div className="absolute left-10 top-20 w-0.5 h-12 bg-border"></div>}
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Recognition & Awards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-border">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <Badge variant="outline">{achievement.date}</Badge>
                        </div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Team */}
          <TabsContent value="team" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals leading Infinity Tech Society towards its mission.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                          <p className="text-primary font-medium mb-3">{member.role}</p>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {member.specialties.map((specialty, specialtyIndex) => (
                              <Badge key={specialtyIndex} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/team">
                <Button size="lg">
                  <Users className="h-5 w-5 mr-2" />
                  Meet the Full Team
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Be part of a community that's shaping the future through innovation, collaboration, and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                <Rocket className="h-5 w-5 mr-2" />
                Join Our Community
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8">
                <Heart className="h-5 w-5 mr-2" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
