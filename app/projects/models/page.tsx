"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, RotateCw, Maximize2, Minimize2, Download, Info, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { triggerAchievement } from "@/components/achievements-notification"
import { useToast } from "@/hooks/use-toast"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"

// Mock model data
const models = [
  {
    id: "quantum-nav-1",
    name: "QuantumNav Spacecraft",
    description: "Next-generation quantum navigation system for interplanetary travel",
    category: "spacecraft",
    modelUrl: "/models/spacecraft.glb", // This would be a real model in production
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
    creator: "Dr. Elara Vega",
    createdAt: "2023-06-15",
  },
  {
    id: "biodrone-2",
    name: "BioDrone Mark II",
    description: "Biomimetic drone design inspired by peregrine falcon aerodynamics",
    category: "drone",
    modelUrl: "/models/drone.glb", // This would be a real model in production
    thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
    creator: "Prof. Kai Zhang",
    createdAt: "2023-05-22",
  },
  {
    id: "orbital-sat-3",
    name: "Orbital Satellite Array",
    description: "Self-healing satellite network for global communication",
    category: "satellite",
    modelUrl: "/models/satellite.glb", // This would be a real model in production
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
    creator: "Dr. Aiden Mercer",
    createdAt: "2023-04-08",
  },
]

// Placeholder 3D Model component
function Model({ url, autoRotate = true }) {
  const meshRef = useRef()

  // Simulate a 3D model with a simple geometry
  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  )
}

// Spacecraft model
function SpacecraftModel({ autoRotate }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Thrusters */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Drone model
function DroneModel({ autoRotate }) {
  const meshRef = useRef()
  const propeller1Ref = useRef()
  const propeller2Ref = useRef()
  const propeller3Ref = useRef()
  const propeller4Ref = useRef()

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }

    // Spin propellers
    if (propeller1Ref.current) propeller1Ref.current.rotation.y += delta * 15
    if (propeller2Ref.current) propeller2Ref.current.rotation.y += delta * 15
    if (propeller3Ref.current) propeller3Ref.current.rotation.y += delta * 15
    if (propeller4Ref.current) propeller4Ref.current.rotation.y += delta * 15
  })

  return (
    <group ref={meshRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Arms */}
      <mesh position={[0.5, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-0.5, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[0.5, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-0.5, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Motors and propellers */}
      <group position={[0.75, 0, 0.75]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh ref={propeller1Ref} position={[0, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.05]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group position={[-0.75, 0, 0.75]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh ref={propeller2Ref} position={[0, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.05]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group position={[0.75, 0, -0.75]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh ref={propeller3Ref} position={[0, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.05]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      <group position={[-0.75, 0, -0.75]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh ref={propeller4Ref} position={[0, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.05]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Camera */}
      <mesh position={[0, -0.05, 0.3]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Satellite model
function SatelliteModel({ autoRotate }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#10b981" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Dish */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ModelsPage() {
  const { user, addAchievement, hasAchievement } = useAuth()
  const { toast } = useToast()
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [activeTab, setActiveTab] = useState("spacecraft")
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Check if user has viewed the models page
  useEffect(() => {
    if (user && typeof hasAchievement === "function" && !hasAchievement("view_3d_models")) {
      // Add a small delay to make it feel more natural
      setTimeout(() => {
        if (typeof addAchievement === "function") {
          addAchievement("view_3d_models", "3D Explorer", "View interactive 3D models", 15)
          triggerAchievement("3D Explorer", "You've unlocked the 3D model viewer", 15)
        }
      }, 2000)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [user, addAchievement, hasAchievement])

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle download
  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${selectedModel.name} 3D model.`,
    })
  }

  // Filter models by category
  const filteredModels = models.filter((model) => activeTab === "all" || model.category === activeTab)

  return (
    <div className="relative">
      {/* Header */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 space-dots"></div>
        <div className="absolute inset-0 z-0 cosmic-bg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
                </Button>
              </Link>
            </div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold font-space mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              3D <span className="cosmic-gradient">Model Gallery</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Explore interactive 3D models of our spacecraft, drones, and satellite designs.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Model Viewer Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="spacecraft" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-flex">
            <TabsTrigger value="spacecraft">Spacecraft</TabsTrigger>
            <TabsTrigger value="drone">Drones</TabsTrigger>
            <TabsTrigger value="satellite">Satellites</TabsTrigger>
            <TabsTrigger value="all">All Models</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model List */}
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-1 overflow-hidden">
            <CardHeader>
              <CardTitle>Available Models</CardTitle>
              <CardDescription>Select a model to view in 3D</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredModels.map((model) => (
                  <motion.div
                    key={model.id}
                    className={`flex items-center p-3 cursor-pointer transition-colors ${
                      selectedModel.id === model.id ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedModel(model)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden mr-3 relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${model.thumbnail})` }}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.category}</div>
                    </div>
                    {selectedModel.id === model.id && <div className="ml-auto w-1.5 h-8 bg-primary rounded-full" />}
                  </motion.div>
                ))}

                {filteredModels.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No models found in this category.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3D Viewer */}
          <Card className="bg-card/50 backdrop-blur-sm border-border lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{selectedModel.name}</CardTitle>
                <CardDescription>{selectedModel.category}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={autoRotate ? "text-primary" : ""}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)}>
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={canvasRef} className="h-[400px] w-full relative">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-sm text-muted-foreground">Loading 3D model...</p>
                  </div>
                ) : (
                  <Canvas shadows>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    <Environment preset="city" />

                    {selectedModel.category === "spacecraft" && <SpacecraftModel autoRotate={autoRotate} />}

                    {selectedModel.category === "drone" && <DroneModel autoRotate={autoRotate} />}

                    {selectedModel.category === "satellite" && <SatelliteModel autoRotate={autoRotate} />}
                  </Canvas>
                )}

                {/* Model Info Overlay */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm p-6 overflow-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{selectedModel.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => setShowInfo(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 space-y-4">
                        <p>{selectedModel.description}</p>

                        <div>
                          <h4 className="text-sm font-medium mb-1">Creator</h4>
                          <p className="text-sm text-muted-foreground">{selectedModel.creator}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1">Created</h4>
                          <p className="text-sm text-muted-foreground">{selectedModel.createdAt}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1">Technical Specifications</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {selectedModel.category === "spacecraft" && (
                              <>
                                <li>• Quantum navigation system with 99.9% accuracy</li>
                                <li>• Self-healing hull material</li>
                                <li>• Advanced propulsion system</li>
                                <li>• Life support for up to 6 crew members</li>
                              </>
                            )}

                            {selectedModel.category === "drone" && (
                              <>
                                <li>• Biomimetic wing design</li>
                                <li>• 4K camera with stabilization</li>
                                <li>• 45-minute flight time</li>
                                <li>• AI-powered obstacle avoidance</li>
                              </>
                            )}

                            {selectedModel.category === "satellite" && (
                              <>
                                <li>• Self-healing solar panels</li>
                                <li>• Quantum encryption communication</li>
                                <li>• 10-year operational lifespan</li>
                                <li>• Debris detection and avoidance system</li>
                              </>
                            )}
                          </ul>
                        </div>

                        <Button onClick={handleDownload} className="w-full">
                          <Download className="h-4 w-4 mr-2" /> Download Technical Specs
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 text-sm">
                <p className="text-muted-foreground">{selectedModel.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-muted-foreground">Created by {selectedModel.creator}</div>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-3 w-3 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Models */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models
              .filter((model) => model.id !== selectedModel.id)
              .map((model) => (
                <motion.div
                  key={model.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedModel(model)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden h-full">
                    <div className="h-48 relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${model.thumbnail})` }}
                      />
                      <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs">
                        {model.category}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{model.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{model.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
