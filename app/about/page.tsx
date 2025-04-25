"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Zap, Award, Target, Users } from "lucide-react"
import { CharacterAvatar } from "@/components/character-avatar"
import { FloatingCharacter } from "@/components/floating-character"

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" })

  const missionRef = useRef<HTMLDivElement>(null)
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" })

  const valuesRef = useRef<HTMLDivElement>(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  const timelineRef = useRef<HTMLDivElement>(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

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
              <div className="relative z-10 flex items-center justify-center gap-8">
                <FloatingCharacter role="student" size="xl" />
                <FloatingCharacter role="teacher" size="xl" delay={0.5} />
                <FloatingCharacter role="admin" size="xl" delay={1} />
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
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                },
                {
                  year: "2019",
                  title: "First Research Publication",
                  description: "Published groundbreaking research on autonomous drone navigation systems.",
                },
                {
                  year: "2020",
                  title: "Expansion",
                  description:
                    "Opened new research facilities and expanded our team to include experts from diverse fields.",
                },
                {
                  year: "2021",
                  title: "Major Breakthrough",
                  description:
                    "Developed a revolutionary propulsion system for small spacecraft, reducing fuel consumption by 40%.",
                },
                {
                  year: "2022",
                  title: "Global Partnerships",
                  description: "Formed strategic partnerships with leading aerospace organizations around the world.",
                },
                {
                  year: "2023",
                  title: "Research Hub Launch",
                  description: "Launched our digital research hub to foster collaboration and knowledge sharing.",
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
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 px-4 md:px-8">
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
                      <div className="text-primary font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold font-space mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Journey - Enhanced with animations */}
      <div className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 space-dots opacity-30"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                },
                {
                  year: "2019",
                  title: "First Research Publication",
                  description: "Published groundbreaking research on autonomous drone navigation systems.",
                },
                {
                  year: "2020",
                  title: "Expansion",
                  description:
                    "Opened new research facilities and expanded our team to include experts from diverse fields.",
                },
                {
                  year: "2021",
                  title: "Major Breakthrough",
                  description:
                    "Developed a revolutionary propulsion system for small spacecraft, reducing fuel consumption by 40%.",
                },
                {
                  year: "2022",
                  title: "Global Partnerships",
                  description: "Formed strategic partnerships with leading aerospace organizations around the world.",
                },
                {
                  year: "2023",
                  title: "Research Hub Launch",
                  description: "Launched our digital research hub to foster collaboration and knowledge sharing.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} md:flex-row-reverse`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 px-4 md:px-8">
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
                      <div className="text-primary font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold font-space mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      <div className="relative h-40 rounded-lg overflow-hidden flex items-center justify-center">
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
