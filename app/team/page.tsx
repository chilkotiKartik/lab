"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Rocket,
  DrillIcon as Drone,
  Satellite,
  Zap,
  Globe,
  Cpu,
} from "lucide-react"

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Elara Vega",
    role: "Founder & Lead Researcher",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Spacecraft Design",
    bio: "Dr. Vega is a renowned aerospace engineer with over 15 years of experience in spacecraft design and propulsion systems. She founded Avasya Research Lab with a vision to revolutionize space exploration.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Prof. Kai Zhang",
    role: "Chief Technology Officer",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Drone Technology",
    bio: "Prof. Zhang specializes in autonomous drone systems and AI-driven navigation. His groundbreaking work has led to several patents in drone technology.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    name: "Dr. Aiden Mercer",
    role: "Head of Materials Research",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Advanced Materials",
    bio: "Dr. Mercer leads our materials research division, focusing on developing lightweight, durable materials for spacecraft and drones that can withstand extreme conditions.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 4,
    name: "Dr. Lyra Chen",
    role: "Quantum Computing Specialist",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Quantum Navigation",
    bio: "Dr. Chen is pioneering the application of quantum computing in aerospace navigation systems, enabling unprecedented accuracy in interplanetary navigation.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 5,
    name: "Dr. Soren Patel",
    role: "Propulsion Systems Engineer",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Ion Propulsion",
    bio: "Dr. Patel is developing next-generation propulsion systems that will revolutionize how spacecraft travel through the solar system and beyond.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 6,
    name: "Dr. Maya Rodriguez",
    role: "AI & Robotics Lead",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Autonomous Systems",
    bio: "Dr. Rodriguez specializes in creating intelligent robotic systems for space exploration, with a focus on adaptive learning algorithms for unknown environments.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 7,
    name: "Prof. Theo Nakamura",
    role: "Astrophysics Researcher",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Exoplanet Studies",
    bio: "Prof. Nakamura studies distant exoplanets and develops technologies to better understand potentially habitable worlds beyond our solar system.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 8,
    name: "Dr. Amara Okafor",
    role: "Environmental Systems Engineer",
    avatar: "/placeholder.svg?height=300&width=300",
    specialty: "Life Support Systems",
    bio: "Dr. Okafor designs closed-loop environmental systems for long-duration space missions, ensuring sustainable life support for future space travelers.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

// Department data
const departments = [
  { id: "all", name: "All", icon: <Globe className="h-4 w-4" /> },
  { id: "spacecraft", name: "Spacecraft", icon: <Rocket className="h-4 w-4" /> },
  { id: "drones", name: "Drones", icon: <Drone className="h-4 w-4" /> },
  { id: "satellites", name: "Satellites", icon: <Satellite className="h-4 w-4" /> },
  { id: "quantum", name: "Quantum", icon: <Zap className="h-4 w-4" /> },
  { id: "ai", name: "AI & Robotics", icon: <Cpu className="h-4 w-4" /> },
]

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const teamRef = useRef<HTMLDivElement>(null)
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" })

  // Filter team members (in a real app, this would filter based on department)
  const filteredMembers = activeFilter === "all" ? teamMembers : teamMembers.filter((_, index) => index % 2 === 0) // Just for demo purposes

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Mission <span className="cosmic-gradient">Minds</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Meet the brilliant researchers and innovators behind Avasya's groundbreaking work.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Department Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {departments.map((dept) => (
              <Button
                key={dept.id}
                variant={activeFilter === dept.id ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveFilter(dept.id)}
              >
                {dept.icon}
                <span className="ml-2">{dept.name}</span>
              </Button>
            ))}
          </motion.div>

          {/* Team Grid */}
          <motion.div
            ref={teamRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={isTeamInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden card-hover">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex space-x-2 justify-center">
                        <Link
                          href={member.social.twitter}
                          className="bg-muted/80 p-2 rounded-full hover:bg-primary/80 transition-colors"
                        >
                          <Twitter size={16} />
                          <span className="sr-only">Twitter</span>
                        </Link>
                        <Link
                          href={member.social.linkedin}
                          className="bg-muted/80 p-2 rounded-full hover:bg-primary/80 transition-colors"
                        >
                          <Linkedin size={16} />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          href={member.social.github}
                          className="bg-muted/80 p-2 rounded-full hover:bg-primary/80 transition-colors"
                        >
                          <Github size={16} />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="inline-block px-2 py-1 bg-muted text-xs rounded-full mb-2">{member.specialty}</div>
                    <h3 className="text-lg font-bold font-space">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Selected Member Modal */}
      {selectedMember && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {teamMembers.find((m) => m.id === selectedMember) && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                    <Image
                      src={teamMembers.find((m) => m.id === selectedMember)!.avatar || "/placeholder.svg"}
                      alt={teamMembers.find((m) => m.id === selectedMember)!.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="w-full md:w-2/3">
                    <div className="inline-block px-2 py-1 bg-muted text-xs rounded-full mb-2">
                      {teamMembers.find((m) => m.id === selectedMember)!.specialty}
                    </div>
                    <h2 className="text-2xl font-bold font-space mb-1">
                      {teamMembers.find((m) => m.id === selectedMember)!.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {teamMembers.find((m) => m.id === selectedMember)!.role}
                    </p>

                    <p className="text-muted-foreground mb-6">
                      {teamMembers.find((m) => m.id === selectedMember)!.bio}
                    </p>

                    <div className="flex space-x-3">
                      <Link
                        href={teamMembers.find((m) => m.id === selectedMember)!.social.twitter}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter size={18} />
                        <span className="sr-only">Twitter</span>
                      </Link>
                      <Link
                        href={teamMembers.find((m) => m.id === selectedMember)!.social.linkedin}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin size={18} />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                      <Link
                        href={teamMembers.find((m) => m.id === selectedMember)!.social.github}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={() => setSelectedMember(null)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Join the Team Section */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-6">
              Join Our <span className="cosmic-gradient">Team</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for brilliant minds to join our mission. If you're passionate about aerospace
              innovation, we want to hear from you.
            </p>

            <Link href="/contact">
              <Button size="lg" className="rounded-full">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
