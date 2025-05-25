"use client"

import { motion } from "framer-motion"
import { ThreeDGallery } from "@/components/three-d-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowLeft,
  CuboidIcon as Cube,
  Download,
  Eye,
  Heart,
  Rocket,
  Satellite,
  Cpu,
  Plane,
  Users,
  TrendingUp,
  Sparkles,
  MousePointer,
  RotateCw,
  ZoomIn,
} from "lucide-react"

export default function GalleryPage() {
  const stats = [
    { icon: <Cube className="h-6 w-6" />, label: "3D Models", value: "4", color: "text-blue-400" },
    { icon: <Eye className="h-6 w-6" />, label: "Total Views", value: "327K", color: "text-green-400" },
    { icon: <Heart className="h-6 w-6" />, label: "Total Likes", value: "13.7K", color: "text-red-400" },
    { icon: <Download className="h-6 w-6" />, label: "Downloads", value: "8.5K", color: "text-purple-400" },
  ]

  const features = [
    {
      icon: <MousePointer className="h-5 w-5" />,
      title: "Interactive Controls",
      description: "Click, drag, and zoom to explore models from every angle",
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      title: "Auto-Rotation",
      description: "Models automatically rotate to showcase all features",
    },
    {
      icon: <ZoomIn className="h-5 w-5" />,
      title: "Detailed Views",
      description: "Zoom in to see intricate details and technical specifications",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Projects",
      description: "Real projects developed by AVASYA research team members",
    },
  ]

  const categories = [
    { name: "Space", icon: <Rocket className="h-5 w-5" />, count: 1, color: "bg-blue-500/20 text-blue-400" },
    { name: "Drone", icon: <Cpu className="h-5 w-5" />, count: 1, color: "bg-red-500/20 text-red-400" },
    { name: "Satellite", icon: <Satellite className="h-5 w-5" />, count: 1, color: "bg-green-500/20 text-green-400" },
    { name: "Aero", icon: <Plane className="h-5 w-5" />, count: 1, color: "bg-purple-500/20 text-purple-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Badge variant="secondary" className="px-4 py-2 gap-2">
              <Cube className="h-4 w-4" />
              Interactive 3D Gallery
            </Badge>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-space mb-6">
              3D Project{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our cutting-edge aerospace research projects in stunning 3D. Interact with real models developed
              by the AVASYA team, featuring spacecraft, drones, satellites, and hypersonic vehicles.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-4 text-center">
                <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-2xl font-bold font-space">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold font-space mb-4 text-center">Project Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Project{category.count !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 3D Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <ThreeDGallery />
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold font-space mb-6 text-center flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Gallery Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold font-space mb-6 text-center">How to Use the Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {[
              {
                step: "1",
                title: "Select Model",
                description: "Click on any project in the right panel to view it in 3D",
                color: "bg-blue-500/20 text-blue-500",
              },
              {
                step: "2",
                title: "Interact",
                description: "Drag to rotate, scroll to zoom, and explore every detail",
                color: "bg-green-500/20 text-green-500",
              },
              {
                step: "3",
                title: "Learn More",
                description: "Click the info button to see technical specifications",
                color: "bg-purple-500/20 text-purple-500",
              },
              {
                step: "4",
                title: "Engage",
                description: "Like, share, or download models and their documentation",
                color: "bg-pink-500/20 text-pink-500",
              },
            ].map((instruction, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 rounded-full ${instruction.color} flex items-center justify-center mx-auto mb-3 font-bold text-lg`}
                >
                  {instruction.step}
                </div>
                <h4 className="font-semibold mb-2">{instruction.title}</h4>
                <p className="text-muted-foreground">{instruction.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold font-space mb-4">Ready to Explore?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Dive into our interactive 3D gallery and discover the future of aerospace technology. Each model represents
            real research and innovation from the AVASYA team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg" className="gap-2">
                <TrendingUp className="h-5 w-5" />
                View All Projects
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Meet the Team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
