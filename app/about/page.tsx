"use client"

import { Badge } from "@/components/ui/badge"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Zap, Award, Target, Users, Globe, Star, Shield, Sparkles, FileText } from "lucide-react"
import { CharacterAvatar } from "@/components/character-avatar"
import { SpaceScene } from "@/components/space-scene"
import { NumberedAstronaut } from "@/components/numbered-astronaut"
import { FloatingSatellite } from "@/components/floating-satellite"
import { SpaceStation } from "@/components/space-station"

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" })

  const missionRef = useRef<HTMLDivElement>(null)
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" })

  const valuesRef = useRef<HTMLDivElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  const timelineRef = useRef<HTMLDivElement>(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

  const partnersRef = useRef<HTMLDivElement>(null)
  const isPartnersInView = useInView(partnersRef, { once: true, margin: "-100px" })

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        {/* Space scene with floating elements */}
        <div className="absolute inset-0 z-0 opacity-40">
          <SpaceScene density="low" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About <span className="cosmic-gradient">Avasya</span> Research Lab
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Pioneering the future of aerospace technology through cutting-edge research and innovation.
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
              <h2 className="text-3xl md:text-4xl font-bold font-space mb-6">
                Our <span className="cosmic-gradient">Story</span>
              </h2>

              <div className="space-y-4 text-muted-foreground">
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
              className="relative h-[400px] rounded-2xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="relative z-10 flex items-center justify-center">
                <SpaceStation size="xl" />
              </div>

              {/* Floating elements */}
              <div className="absolute top-1/4 left-1/4">
                <NumberedAstronaut number="01" size="md" color="blue" />
              </div>
              <div className="absolute bottom-1/4 right-1/4">
                <NumberedAstronaut number="02" size="sm" color="purple" />
              </div>
              <div className="absolute top-1/3 right-1/4">
                <FloatingSatellite size="sm" color="pink" />
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
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Mission & <span className="cosmic-gradient">Vision</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-space mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
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
              <div className="mb-4 p-3 bg-muted inline-block rounded-lg">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-space mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A future where aerospace technology seamlessly integrates with daily life, where space exploration is
                commonplace, and where the innovations developed for space create sustainable solutions for Earth's
                challenges. We envision a world where the boundaries between Earth and space blur, opening new frontiers
                for human achievement.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={valuesRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Our <span className="cosmic-gradient">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The core principles that guide our research and innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
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
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            ref={timelineRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Our <span className="cosmic-gradient">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                },
                {
                  year: "2019",
                  title: "First Research Publication",
                  description: "Published groundbreaking research on autonomous drone navigation systems.",
                  icon: <FileText className="h-6 w-6" />,
                },
                {
                  year: "2020",
                  title: "Expansion",
                  description:
                    "Opened new research facilities and expanded our team to include experts from diverse fields.",
                  icon: <Users className="h-6 w-6" />,
                },
                {
                  year: "2021",
                  title: "Major Breakthrough",
                  description:
                    "Developed a revolutionary propulsion system for small spacecraft, reducing fuel consumption by 40%.",
                  icon: <Zap className="h-6 w-6" />,
                },
                {
                  year: "2022",
                  title: "Global Partnerships",
                  description: "Formed strategic partnerships with leading aerospace organizations around the world.",
                  icon: <Globe className="h-6 w-6" />,
                },
                {
                  year: "2023",
                  title: "Research Hub Launch",
                  description: "Launched our digital research hub to foster collaboration and knowledge sharing.",
                  icon: <Star className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} md:flex-row-reverse`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 px-4 md:px-8">
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
                      <div className="text-primary font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold font-space mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      <div className="relative h-40 rounded-lg overflow-hidden flex items-center justify-center mt-4">
                        <CharacterAvatar
                          role={index % 3 === 0 ? "student" : index % 3 === 1 ? "teacher" : "admin"}
                          size="lg"
                          variant={(index % 5) + 1}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Research Facilities */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Our <span className="cosmic-gradient">Facilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art research centers equipped with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quantum Computing Lab",
                description: "Advanced quantum computing facilities for navigation system development",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                title: "Aerospace Wind Tunnel",
                description: "Testing facility for aerodynamic designs and drone prototypes",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                title: "Materials Science Center",
                description: "Research lab for developing new materials for space applications",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                title: "Virtual Reality Simulation Lab",
                description: "Immersive environment for testing spacecraft designs and training",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                title: "Propulsion Testing Facility",
                description: "Specialized facility for testing new propulsion technologies",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                title: "Space Environment Chamber",
                description: "Simulates space conditions for testing equipment durability",
                image: "/placeholder.svg?height=300&width=500",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 relative">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/80">{`Facility ${index + 1}`}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  <p className="text-muted-foreground">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Partners */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            ref={partnersRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
              Global <span className="cosmic-gradient">Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading organizations around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-muted-foreground">P{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 cosmic-bg opacity-30"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-space mb-4">
                  Join Our <span className="cosmic-gradient">Team</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
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
