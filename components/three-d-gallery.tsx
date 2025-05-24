"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Text, Html, Stars } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Pause,
  Play,
  Eye,
  Heart,
  Share2,
  Rocket,
  Satellite,
  Cpu,
  Atom,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Enhanced Model component with realistic physics
function Model({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isActive = false,
  modelType = "default",
}) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Different animations based on model type
      if (modelType === "spacecraft") {
        modelRef.current.rotation.y += delta * (isActive ? 0.3 : 0.1)
        modelRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      } else if (modelType === "satellite") {
        modelRef.current.rotation.x += delta * 0.1
        modelRef.current.rotation.z += delta * 0.2
        modelRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.3) * 0.15
      } else if (modelType === "drone") {
        modelRef.current.rotation.y += delta * 0.5
        modelRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      } else {
        modelRef.current.rotation.y += delta * 0.2
        modelRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
      }

      // Hover effects
      if (hovered) {
        modelRef.current.scale.setScalar(scale * 1.1)
      } else {
        modelRef.current.scale.setScalar(scale)
      }
    }
  })

  return (
    <group>
      <primitive
        ref={modelRef}
        object={scene}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      />
      {/* Glow effect for active models */}
      {isActive && <pointLight position={position} intensity={0.5} color="#3b82f6" distance={10} />}
    </group>
  )
}

// Loading component with space theme
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <motion.div
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <p className="mt-4 text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

// Gallery item interface
interface GalleryItem {
  id: string
  title: string
  description: string
  modelUrl: string
  thumbnail: string
  category: string
  scale: number
  position: [number, number, number]
  rotation: [number, number, number]
  likes: number
  views: number
  downloads: number
  author: string
  authorAvatar: string
  modelType: string
  breakthrough: string
  techSpecs: string[]
  realWorldImage: string
}

export function ThreeDGallery() {
  const [activeModel, setActiveModel] = useState<string | null>("quantum-engine")
  const [showInfo, setShowInfo] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0, 5, 15])
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<"gallery" | "showcase">("gallery")
  const { toast } = useToast()
  const controlsRef = useRef()

  // Revolutionary gallery items with real project data
  const galleryItems: GalleryItem[] = [
    {
      id: "quantum-engine",
      title: "Quantum Propulsion Engine",
      description:
        "Revolutionary quantum drive system that manipulates space-time for unprecedented propulsion efficiency. This breakthrough technology could enable interstellar travel.",
      modelUrl: "/assets/3d/duck.glb",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=500&auto=format&fit=crop",
      realWorldImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop",
      category: "Propulsion",
      scale: 2.5,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      likes: 3247,
      views: 89432,
      downloads: 2156,
      author: "Dr. Elena Vasquez",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop",
      modelType: "spacecraft",
      breakthrough: "99.7% energy efficiency achieved",
      techSpecs: ["Quantum Field Manipulation", "Zero-Point Energy", "Space-Time Distortion", "Antimatter Containment"],
    },
    {
      id: "neural-satellite",
      title: "Neural Communication Satellite",
      description:
        "AI-powered satellite network that learns and adapts communication patterns in real-time, providing unprecedented global connectivity and data processing.",
      modelUrl: "/assets/3d/duck.glb",
      thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
      realWorldImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
      category: "Satellite",
      scale: 2,
      position: [6, 2, 0],
      rotation: [0, Math.PI / 4, 0],
      likes: 2891,
      views: 67234,
      downloads: 1543,
      author: "Prof. Marcus Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      modelType: "satellite",
      breakthrough: "Self-healing network topology",
      techSpecs: ["Neural Processing Units", "Quantum Encryption", "Self-Repair Systems", "Adaptive Antennas"],
    },
    {
      id: "bio-drone",
      title: "Biomimetic Exploration Drone",
      description:
        "Nature-inspired drone that mimics bird flight patterns and insect navigation systems for autonomous exploration of extreme environments.",
      modelUrl: "/assets/3d/duck.glb",
      thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
      realWorldImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=600&auto=format&fit=crop",
      category: "Drone",
      scale: 1.8,
      position: [-6, 1, 0],
      rotation: [0, -Math.PI / 4, 0],
      likes: 4156,
      views: 92847,
      downloads: 2847,
      author: "Dr. Sophia Williams",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      modelType: "drone",
      breakthrough: "Bio-inspired flight efficiency",
      techSpecs: ["Morphing Wings", "Swarm Intelligence", "Environmental Adaptation", "Energy Harvesting"],
    },
    {
      id: "fusion-reactor",
      title: "Compact Fusion Reactor",
      description:
        "Miniaturized fusion reactor designed for spacecraft power generation, providing clean and virtually unlimited energy for long-duration missions.",
      modelUrl: "/assets/3d/duck.glb",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=500&auto=format&fit=crop",
      realWorldImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=600&auto=format&fit=crop",
      category: "Energy",
      scale: 1.5,
      position: [0, -2, -6],
      rotation: [0, Math.PI, 0],
      likes: 2734,
      views: 54321,
      downloads: 1876,
      author: "Dr. James Lee",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
      modelType: "reactor",
      breakthrough: "Stable plasma containment",
      techSpecs: ["Magnetic Confinement", "Tritium Breeding", "Plasma Control", "Waste Heat Recovery"],
    },
  ]

  const activeItem = galleryItems.find((item) => item.id === activeModel)

  const handleLike = (itemId: string) => {
    setLikedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
    toast({
      title: likedItems[itemId] ? "Like removed" : "Model Liked! ⭐",
      description: likedItems[itemId] ? "Removed from favorites" : "Added to your favorites",
    })
  }

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started 🚀",
      description: `Downloading ${title} 3D model and technical specifications.`,
    })
  }

  const handleShare = (title: string) => {
    toast({
      title: "Shared Successfully! 📡",
      description: `Link to "${title}" copied to clipboard.`,
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Propulsion":
        return <Rocket className="h-4 w-4" />
      case "Satellite":
        return <Satellite className="h-4 w-4" />
      case "Drone":
        return <Cpu className="h-4 w-4" />
      case "Energy":
        return <Atom className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="w-full h-[800px] relative bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl overflow-hidden border border-primary/20">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.3}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 1.8}
        />

        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#3b82f6" />
        <spotLight position={[0, 15, 0]} intensity={0.5} angle={0.3} penumbra={1} castShadow />

        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />

        {/* 3D Models */}
        <Suspense fallback={<LoadingSpinner />}>
          {galleryItems.map((item) => (
            <Model
              key={item.id}
              url={item.modelUrl}
              scale={item.scale}
              position={item.position}
              rotation={item.rotation}
              isActive={activeModel === item.id}
              modelType={item.modelType}
            />
          ))}
        </Suspense>

        {/* Gallery Title */}
        <Text
          position={[0, 12, 0]}
          fontSize={2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          Avasya 3D Project Gallery
        </Text>

        {/* Info Panel */}
        {activeItem && showInfo && (
          <Html position={[0, 4, 0]} transform occlude>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Card className="w-96 bg-black/90 border-primary/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg">{getCategoryIcon(activeItem.category)}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {activeItem.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-white hover:bg-white/10"
                      onClick={() => setShowInfo(false)}
                    >
                      ×
                    </Button>
                  </div>

                  <p className="text-sm text-white/80 mb-4 leading-relaxed">{activeItem.description}</p>

                  {/* Breakthrough Badge */}
                  <div className="flex items-center gap-2 mb-4 p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">{activeItem.breakthrough}</span>
                  </div>

                  {/* Tech Specs */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Technical Specifications:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {activeItem.techSpecs.map((spec, index) => (
                        <div key={index} className="text-xs text-white/70 bg-white/5 rounded px-2 py-1">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={activeItem.authorAvatar || "/placeholder.svg"}
                        alt={activeItem.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{activeItem.author}</div>
                      <div className="text-xs text-white/60">Lead Researcher</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {activeItem.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {activeItem.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {activeItem.downloads}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Html>
        )}
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-white/10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="border-white/20 text-white hover:bg-white/10"
        >
          {autoRotate ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {autoRotate ? "Pause" : "Rotate"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], Math.max(cameraPosition[2] - 3, 5)])}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], Math.min(cameraPosition[2] + 3, 30)])}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setCameraPosition([0, 5, 15])
            if (controlsRef.current) {
              controlsRef.current.reset()
            }
          }}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <RotateCw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Gallery Items Panel */}
      <div className="absolute top-6 right-6 w-80 bg-black/70 backdrop-blur-sm rounded-xl p-4 space-y-3 max-h-[700px] overflow-auto border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Project Gallery
          </h3>
          <Badge variant="outline" className="text-xs">
            {galleryItems.length} Models
          </Badge>
        </div>

        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className={`group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden ${
              activeModel === item.id
                ? "bg-primary/20 border-primary/50 shadow-lg shadow-primary/25"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
            onClick={() => setActiveModel(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex gap-3 p-3">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-1 right-1">{getCategoryIcon(item.category)}</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-white truncate group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/60 mb-2 line-clamp-2">{item.description}</p>

                {/* Author */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full overflow-hidden">
                    <Image
                      src={item.authorAvatar || "/placeholder.svg"}
                      alt={item.author}
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-white/70">{item.author}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {item.views}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Show when active */}
            <AnimatePresence>
              {activeModel === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 p-3"
                >
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 text-white hover:bg-white/10 ${likedItems[item.id] ? "text-red-400" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(item.id)
                      }}
                    >
                      <Heart className={`h-4 w-4 ${likedItems[item.id] ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowInfo(!showInfo)
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(item.title)
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(item.title)
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Real World Image */}
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <Image
                      src={item.realWorldImage || "/placeholder.svg"}
                      alt={`${item.title} real world application`}
                      width={280}
                      height={120}
                      className="w-full h-20 object-cover"
                    />
                    <div className="bg-white/5 p-2">
                      <p className="text-xs text-white/70">Real-world application</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Performance Stats */}
      <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          Gallery Stats
        </h4>
        <div className="space-y-2 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Total Models:</span>
            <span className="text-white font-medium">{galleryItems.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Views:</span>
            <span className="text-white font-medium">
              {galleryItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Likes:</span>
            <span className="text-white font-medium">
              {galleryItems.reduce((sum, item) => sum + item.likes, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Downloads:</span>
            <span className="text-white font-medium">
              {galleryItems.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
