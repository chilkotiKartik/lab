"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { EnhancedSubmissionForm } from "@/components/enhanced-submission-form"
import { EnhancedFloatingAstronaut } from "@/components/enhanced-floating-astronaut"

export default function SubmitProjectPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // Add to localStorage for demo purposes
    const newProject = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      category: data.category,
      status: "Planning",
      progress: 0,
      team: [{ role: "student", variant: 1 }],
      likes: 0,
      comments: 0,
      views: 0,
      lastUpdated: "Just now",
      image: data.image ? URL.createObjectURL(data.image) : "/placeholder.svg?height=300&width=500",
    }

    const existingProjects = JSON.parse(localStorage.getItem("avasya_projects") || "[]")
    existingProjects.unshift(newProject)
    localStorage.setItem("avasya_projects", JSON.stringify(existingProjects.slice(0, 20)))

    setTimeout(() => {
      router.push("/projects")
    }, 3000)
  }

  const handleCancel = () => {
    router.push("/projects")
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        {/* Enhanced floating astronauts */}
        <EnhancedFloatingAstronaut
          style="3d-purple"
          size="xl"
          position="top-left"
          withGlow
          className="hidden lg:block"
        />
        <EnhancedFloatingAstronaut
          style="thumbs-up"
          size="sm"
          position="bottom-right"
          className="hidden lg:block"
          delay={0.8}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-space mb-6 glow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Submit Your <span className="cosmic-gradient">Project</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Share your innovative projects with the Avasya community.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <EnhancedSubmissionForm type="project" onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  )
}
