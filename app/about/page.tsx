"use client"

import { Badge } from "@/components/ui/badge"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Rocket,
  Zap,
  Award,
  Target,
  Users,
  Globe,
  Star,
  Shield,
  Sparkles,
  FileText,
  MapPin,
} from "lucide-react"

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" })

  const missionRef = useRef<HTMLDivElement>(null)
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" })

  const valuesRef = useRef<HTMLDivElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  const timelineRef = useRef<HTMLDivElement>(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

  const teamRef = useRef<HTMLDivElement>(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })

  const facilitiesRef = useRef<HTMLDivElement>(null)
  const isFacilitiesInView = useInView(facilitiesRef, { once: true, margin: "-100px" })

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots opacity-20"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 to-background/80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-space mb-6 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Avasya Research Lab
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Pioneering the future of aerospace technology through cutting-edge research and innovation since 2018.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/research">
                  Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/team">Meet Our Team</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Story</span>
              </h2>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Avasya Research Lab was founded in 2018 by a group of visionary aerospace engineers and scientists who
                  shared a common dream: to push the boundaries of what's possible in space exploration and aerial
                  technology.
                </p>
                <p>
                  What began as a small research initiative in a university laboratory has grown into a pioneering
                  institution at the forefront of aerospace innovation. Our name, "Avasya," derives from the Sanskrit
                  word for "opportunity" – reflecting our belief that space presents humanity with its greatest
                  opportunity for advancement.
                </p>
                <p>
                  Today, Avasya stands as a beacon of innovation, bringing together brilliant minds from diverse
                  backgrounds to solve the most challenging problems in aerospace technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=500&auto=format&fit=crop"
                      alt="Research Lab"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=500&auto=format&fit=crop"
                      alt="Team Meeting"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-32 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=500&auto=format&fit=crop"
                      alt="Innovation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop"
                      alt="Space Technology"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            ref={missionRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-space mb-4">
              Mission &{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Vision</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-6 p-4 bg-muted inline-block rounded-lg">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-space mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To advance humanity's capabilities in aerospace through innovative research, cutting-edge technology
                development, and interdisciplinary collaboration. We strive to create solutions that make space more
                accessible, sustainable, and beneficial for all of humanity.
              </p>
            </motion.div>

            <motion.div
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-6 p-4 bg-muted inline-block rounded-lg">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-space mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A future where aerospace technology seamlessly integrates with daily life, where space exploration is
                commonplace, and where the innovations developed for space create sustainable solutions for Earth's
                challenges. We envision a world where the boundaries between Earth and space blur, opening new frontiers
                for human achievement.
              </p>
            </motion.div>
          </div>

          {/* Mission Minds Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold font-space mb-8">
              Mission{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Minds</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Meet the brilliant researchers and innovators driving our mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Elena Vega",
                role: "Chief Research Officer",
                specialty: "Quantum Navigation",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300&auto=format&fit=crop",
                bio: "Leading expert in quantum computing applications for aerospace navigation systems.",
              },
              {
                name: "Prof. Marcus Chen",
                role: "Director of Innovation",
                specialty: "Spacecraft Design",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
                bio: "Pioneer in sustainable spacecraft architecture and propulsion systems.",
              },
              {
                name: "Dr. Sophia Williams",
                role: "Head of AI Research",
                specialty: "Neural Interfaces",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
                bio: "Developing next-generation brain-computer interfaces for space applications.",
              },
              {
                name: "Dr. James Lee",
                role: "Materials Science Lead",
                specialty: "Advanced Materials",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
                bio: "Creating revolutionary materials for extreme space environments.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/80">{member.specialty}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold font-space mb-1">{member.name}</h4>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Facilities */}
      <div className="py-20 relative" ref={facilitiesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isFacilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-space mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Facilities
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              State-of-the-art research centers equipped with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quantum Computing Lab",
                description: "Advanced quantum computing facilities for navigation system development",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=500&auto=format&fit=crop",
                location: "Building A, Floor 3",
                capacity: "50 researchers",
              },
              {
                title: "Aerospace Wind Tunnel",
                description: "Testing facility for aerodynamic designs and drone prototypes",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=500&auto=format&fit=crop",
                location: "Building B, Ground Floor",
                capacity: "Large scale testing",
              },
              {
                title: "Materials Science Center",
                description: "Research lab for developing new materials for space applications",
                image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=500&auto=format&fit=crop",
                location: "Building C, Floor 2",
                capacity: "30 researchers",
              },
              {
                title: "Virtual Reality Simulation Lab",
                description: "Immersive environment for testing spacecraft designs and training",
                image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?q=80&w=500&auto=format&fit=crop",
                location: "Building A, Floor 1",
                capacity: "20 simultaneous users",
              },
              {
                title: "Propulsion Testing Facility",
                description: "Specialized facility for testing new propulsion technologies",
                image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=500&auto=format&fit=crop",
                location: "Building D, Basement",
                capacity: "High-power testing",
              },
              {
                title: "Space Environment Chamber",
                description: "Simulates space conditions for testing equipment durability",
                image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=500&auto=format&fit=crop",
                location: "Building B, Floor 2",
                capacity: "Large components",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isFacilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 relative">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/80">{`Facility ${index + 1}`}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  <p className="text-muted-foreground mb-4">{facility.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {facility.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {facility.capacity}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 bg-muted/30 relative" ref={valuesRef}>
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-space mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The core principles that guide our research and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Innovation",
                description:
                  "We embrace bold ideas and creative thinking to solve the most challenging problems in aerospace.",
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Excellence",
                description:
                  "We maintain the highest standards in our research, striving for excellence in everything we do.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Collaboration",
                description: "We believe in the power of diverse perspectives and interdisciplinary teamwork.",
              },
              {
                icon: <Globe className="h-10 w-10 text-primary" />,
                title: "Sustainability",
                description:
                  "We develop technologies that benefit humanity while preserving our planet and space environment.",
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Integrity",
                description: "We conduct our research with transparency, honesty, and the highest ethical standards.",
              },
              {
                icon: <Sparkles className="h-10 w-10 text-primary" />,
                title: "Curiosity",
                description: "We foster a culture of continuous learning, exploration, and intellectual growth.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4 p-3 bg-muted inline-block rounded-lg">{value.icon}</div>
                <h3 className="text-xl font-bold font-space mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 relative" ref={timelineRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-space mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Key milestones in Avasya's history of innovation and discovery.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {[
                {
                  year: "2018",
                  title: "Foundation",
                  description:
                    "Avasya Research Lab was established by a team of visionary aerospace engineers and scientists.",
                  icon: <Rocket className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format&fit=crop",
                },
                {
                  year: "2019",
                  title: "First Research Publication",
                  description: "Published groundbreaking research on autonomous drone navigation systems.",
                  icon: <FileText className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=400&auto=format&fit=crop",
                },
                {
                  year: "2020",
                  title: "Expansion",
                  description:
                    "Opened new research facilities and expanded our team to include experts from diverse fields.",
                  icon: <Users className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop",
                },
                {
                  year: "2021",
                  title: "Major Breakthrough",
                  description:
                    "Developed a revolutionary propulsion system for small spacecraft, reducing fuel consumption by 40%.",
                  icon: <Zap className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop",
                },
                {
                  year: "2022",
                  title: "Global Partnerships",
                  description: "Formed strategic partnerships with leading aerospace organizations around the world.",
                  icon: <Globe className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop",
                },
                {
                  year: "2023",
                  title: "Research Hub Launch",
                  description: "Launched our digital research hub to foster collaboration and knowledge sharing.",
                  icon: <Star className="h-6 w-6" />,
                  image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=400&auto=format&fit=crop",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center z-10">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 px-4 md:px-8 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-xl transition-all duration-300">
                      <div className="text-primary font-bold text-2xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold font-space mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold font-space mb-4">
                  Join Our{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Become part of our mission to pioneer the future of aerospace technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/team">
                  <Button size="lg" className="rounded-full">
                    Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
