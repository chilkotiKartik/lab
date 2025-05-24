"use client"

import { motion } from "framer-motion"
import { ThreeDGallery } from "@/components/three-d-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, CuboidIcon as Cube, Download, Eye, Heart } from "lucide-react"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
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
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Badge variant="secondary" className="px-3 py-1">
              <Cube className="h-4 w-4 mr-2" />
              Interactive 3D Gallery
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-space mb-4">
            3D Model{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our collection of 3D models showcasing cutting-edge aerospace technology. Interact with each model
            to learn more about our innovative designs and research.
          </p>
        </motion.div>

        {/* 3D Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ThreeDGallery />
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-8 bg-card/50 backdrop-blur-sm rounded-xl border border-border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold font-space mb-4">How to Use the Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <strong className="text-foreground">Select Model:</strong> Click on any model in the right panel to view
                it
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div>
                <strong className="text-foreground">Interact:</strong> Drag to rotate, scroll to zoom, hover for details
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div>
                <strong className="text-foreground">Controls:</strong> Use the bottom controls to pause rotation or
                reset view
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">4</span>
              </div>
              <div>
                <strong className="text-foreground">Actions:</strong> Like, share, or download models using the action
                buttons
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { icon: <Cube className="h-5 w-5" />, label: "3D Models", value: "25+" },
            { icon: <Eye className="h-5 w-5" />, label: "Total Views", value: "12.5K" },
            { icon: <Heart className="h-5 w-5" />, label: "Total Likes", value: "2.1K" },
            { icon: <Download className="h-5 w-5" />, label: "Downloads", value: "850+" },
          ].map((stat, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 text-center">
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold font-space">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
