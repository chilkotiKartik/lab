"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { ThreeDGallery } from "@/components/three-d-gallery"
import { EnhancedFloatingAstronaut } from "@/components/enhanced-floating-astronaut"

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("3d-models")

  return (
    <div className="relative min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 space-dots"></div>
      <div className="absolute inset-0 z-0 cosmic-bg"></div>

      {/* Floating astronauts */}
      <div className="absolute top-20 right-10 z-10 hidden lg:block">
        <EnhancedFloatingAstronaut style="relaxing" position="top-right" />
      </div>
      <div className="absolute bottom-20 left-10 z-10 hidden lg:block">
        <EnhancedFloatingAstronaut style="waving" position="bottom-left" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>

        <motion.h1
          className="text-3xl md:text-5xl font-bold font-space mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Avasya <span className="cosmic-gradient">Gallery</span>
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Explore our collection of 3D models, visualizations, and research imagery from Avasya's cutting-edge aerospace
          projects.
        </motion.p>

        <Tabs defaultValue="3d-models" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="3d-models">3D Models</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="research-imagery">Research Imagery</TabsTrigger>
          </TabsList>

          <TabsContent value="3d-models" className="mt-6">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
              <ThreeDGallery />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Interactive Models</h3>
                <p className="text-muted-foreground mb-4">
                  Our 3D models are fully interactive. Rotate, zoom, and explore every detail of our aerospace designs.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Download & Use</h3>
                <p className="text-muted-foreground mb-4">
                  All models are available for download and use in educational and research projects with proper
                  attribution.
                </p>
                <Button variant="outline">Download Policy</Button>
              </div>

              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Submit Your Model</h3>
                <p className="text-muted-foreground mb-4">
                  Are you a researcher or student with a 3D model to share? Submit your work to our gallery.
                </p>
                <Button variant="outline">Submit Model</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visualizations" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Visualizations Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We're currently working on adding interactive data visualizations from our research projects.
              </p>
              <Button>Get Notified</Button>
            </div>
          </TabsContent>

          <TabsContent value="research-imagery" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Research Imagery Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Our collection of high-resolution research imagery will be available here soon.
              </p>
              <Button>Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
