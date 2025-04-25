"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Users, NetworkIcon, Search, ZoomIn, ZoomOut, RefreshCw, ArrowLeft } from "lucide-react"
import { AstronautAvatar } from "@/components/astronaut-avatar"
import Link from "next/link"

// Sample network data
const networkData = {
  nodes: [
    { id: "you", label: "You", group: "self", size: 25 },
    { id: "elara", label: "Dr. Elara Vega", group: "collaborator", size: 20 },
    { id: "kai", label: "Prof. Kai Zhang", group: "collaborator", size: 18 },
    { id: "sophia", label: "Dr. Sophia Chen", group: "collaborator", size: 15 },
    { id: "marcus", label: "Marcus Lee", group: "collaborator", size: 12 },
    { id: "avasya", label: "Avasya Lab", group: "institution", size: 22 },
    { id: "mit", label: "MIT", group: "institution", size: 20 },
    { id: "stanford", label: "Stanford", group: "institution", size: 18 },
    { id: "quantum", label: "Quantum Navigation", group: "research", size: 16 },
    { id: "propulsion", label: "Propulsion Systems", group: "research", size: 14 },
    { id: "ai", label: "AI for Spacecraft", group: "research", size: 15 },
    { id: "materials", label: "Advanced Materials", group: "research", size: 13 },
  ],
  links: [
    { source: "you", target: "elara", value: 5 },
    { source: "you", target: "kai", value: 3 },
    { source: "you", target: "sophia", value: 2 },
    { source: "you", target: "marcus", value: 1 },
    { source: "you", target: "avasya", value: 8 },
    { source: "you", target: "quantum", value: 6 },
    { source: "you", target: "propulsion", value: 4 },
    { source: "you", target: "ai", value: 5 },
    { source: "elara", target: "avasya", value: 7 },
    { source: "elara", target: "quantum", value: 5 },
    { source: "kai", target: "mit", value: 6 },
    { source: "kai", target: "propulsion", value: 4 },
    { source: "sophia", target: "stanford", value: 5 },
    { source: "sophia", target: "ai", value: 3 },
    { source: "marcus", target: "materials", value: 2 },
    { source: "avasya", target: "quantum", value: 4 },
    { source: "avasya", target: "propulsion", value: 3 },
    { source: "mit", target: "ai", value: 5 },
    { source: "stanford", target: "materials", value: 4 },
  ],
}

export default function NetworkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Initialize and render network visualization
  useEffect(() => {
    if (isLoading || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      renderNetwork()
    }

    // Simple force-directed graph layout
    const renderNetwork = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set positions (in a real app, this would use a proper force-directed algorithm)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.4 * zoom

      // Position nodes in a circle
      const nodePositions: Record<string, { x: number; y: number }> = {}
      networkData.nodes.forEach((node, i) => {
        const angle = (i / networkData.nodes.length) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius * (node.id === "you" ? 0 : 1)
        const y = centerY + Math.sin(angle) * radius * (node.id === "you" ? 0 : 1)
        nodePositions[node.id] = { x, y }
      })

      // Draw links
      ctx.lineWidth = 1
      networkData.links.forEach((link) => {
        const source = nodePositions[link.source]
        const target = nodePositions[link.target]

        const isActive = activeNode === link.source || activeNode === link.target

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = isActive
          ? "rgba(147, 51, 234, 0.7)" // Purple for active
          : "rgba(100, 116, 139, 0.3)" // Slate for inactive
        ctx.lineWidth = isActive ? 2 : 1
        ctx.stroke()
      })

      // Draw nodes
      networkData.nodes.forEach((node) => {
        const pos = nodePositions[node.id]
        const isActive = activeNode === node.id

        // Node circle
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, node.size * zoom * (isActive ? 1.2 : 1), 0, Math.PI * 2)

        // Set color based on group
        let fillColor = "rgba(100, 116, 139, 0.8)" // Default slate
        if (node.group === "self") fillColor = "rgba(147, 51, 234, 0.8)" // Purple
        if (node.group === "collaborator") fillColor = "rgba(59, 130, 246, 0.8)" // Blue
        if (node.group === "institution") fillColor = "rgba(234, 88, 12, 0.8)" // Orange
        if (node.group === "research") fillColor = "rgba(16, 185, 129, 0.8)" // Green

        ctx.fillStyle = fillColor
        ctx.fill()

        // Node border
        ctx.strokeStyle = isActive ? "white" : "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = isActive ? 2 : 1
        ctx.stroke()

        // Node label
        ctx.font = `${isActive ? "bold " : ""}${12 * zoom}px sans-serif`
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, pos.x, pos.y + node.size * zoom + 15)
      })
    }

    // Handle mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if mouse is over any node
      let hoveredNode = null
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.4 * zoom

      for (const node of networkData.nodes) {
        const angle = (networkData.nodes.indexOf(node) / networkData.nodes.length) * Math.PI * 2
        const nodeX = centerX + Math.cos(angle) * radius * (node.id === "you" ? 0 : 1)
        const nodeY = centerY + Math.sin(angle) * radius * (node.id === "you" ? 0 : 1)

        const distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2))
        if (distance < node.size * zoom) {
          hoveredNode = node.id
          break
        }
      }

      if (hoveredNode !== activeNode) {
        setActiveNode(hoveredNode)
        canvas.style.cursor = hoveredNode ? "pointer" : "default"
      }
    }

    // Initial render
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    resizeCanvas()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isLoading, zoom, activeNode])

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Research Network</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Visualize your research connections and collaborations</p>
      </div>

      <Tabs defaultValue="network">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="network">
            <NetworkIcon className="h-4 w-4 mr-2" />
            Network View
          </TabsTrigger>
          <TabsTrigger value="collaborators">
            <Users className="h-4 w-4 mr-2" />
            Collaborators
          </TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="mt-4">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Research Network Visualization</CardTitle>
              <CardDescription>Interactive visualization of your research connections</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div className="w-32">
                    <Slider value={[zoom]} min={0.5} max={2} step={0.1} onValueChange={(value) => setZoom(value[0])} />
                  </div>
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveNode(null)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="relative h-[500px] w-full">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                      <p className="mt-4 text-sm text-muted-foreground">Loading network data...</p>
                    </div>
                  </div>
                ) : (
                  <canvas ref={canvasRef} className="h-full w-full" />
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                    <span className="text-xs">You</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-xs">Collaborators</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-orange-500 mr-2"></span>
                    <span className="text-xs">Institutions</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-xs">Research Areas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{networkData.nodes.find((n) => n.id === activeNode)?.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeNode === "you"
                      ? "This is you! You're at the center of your research network."
                      : activeNode === "avasya"
                        ? "Avasya Research Lab is your primary research institution."
                        : activeNode === "quantum"
                          ? "Quantum Navigation is your primary research focus with 6 collaborations."
                          : `Connected with ${
                              networkData.links.filter((l) => l.source === activeNode || l.target === activeNode).length
                            } nodes in your network.`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="collaborators" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Collaborators</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search collaborators..."
                    className="h-9 rounded-md border border-input bg-background px-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkData.nodes
                  .filter((node) => node.group === "collaborator")
                  .map((collaborator, index) => (
                    <motion.div
                      key={collaborator.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <AstronautAvatar size="sm" />
                        <div>
                          <h4 className="font-medium">{collaborator.label}</h4>
                          <p className="text-xs text-muted-foreground">
                            {collaborator.id === "elara"
                              ? "Quantum Navigation Expert"
                              : collaborator.id === "kai"
                                ? "Propulsion Systems Specialist"
                                : collaborator.id === "sophia"
                                  ? "AI Researcher"
                                  : "Materials Scientist"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="ghost" size="sm">
                          Message
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
