"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text, Html, Stars } from "@react-three/drei"
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
  Sparkles,
  TrendingUp,
  Plane,
  Settings,
  Users,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Enhanced 3D Models with realistic geometries
function SpacecraftModel({ position = [0, 0, 0], scale = 1, isActive = false }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isActive ? 0.5 : 0.2)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3

      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main spacecraft body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.2, 3, 16]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Solar panels */}
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#059669" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#059669" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Antenna array */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Communication dish */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#f3f4f6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Thrusters */}
      <mesh position={[0, -1.8, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.5, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Glow effect for active state */}
      {isActive && <pointLight position={[0, 0, 0]} intensity={1} color="#3b82f6" distance={15} />}
    </group>
  )
}

function DroneModel({ position = [0, 0, 0], scale = 1, isActive = false }) {
  const meshRef = useRef()
  const propellerRefs = [useRef(), useRef(), useRef(), useRef()]
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isActive ? 0.3 : 0.1)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2

      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }

    // Spin propellers
    propellerRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.rotation.y += delta * 20
      }
    })
  })

  const propellerPositions = [
    [1.2, 0.2, 1.2],
    [-1.2, 0.2, 1.2],
    [1.2, 0.2, -1.2],
    [-1.2, 0.2, -1.2],
  ]

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#dc2626" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Arms */}
      {propellerPositions.map((pos, index) => (
        <group key={index}>
          {/* Arm */}
          <mesh position={[pos[0] / 2, 0, pos[2] / 2]} castShadow>
            <boxGeometry args={[Math.abs(pos[0]), 0.1, 0.1]} />
            <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* Motor */}
          <mesh position={pos} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
            <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Propeller */}
          <mesh ref={propellerRefs[index]} position={[pos[0], pos[1] + 0.1, pos[2]]}>
            <boxGeometry args={[0.8, 0.02, 0.1]} />
            <meshStandardMaterial color="#e5e7eb" metalness={0.7} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Camera gimbal */}
      <mesh position={[0, -0.2, 0.4]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* LED lights */}
      {isActive && (
        <>
          <pointLight position={[0.5, -0.1, 0.5]} intensity={0.5} color="#ef4444" />
          <pointLight position={[-0.5, -0.1, 0.5]} intensity={0.5} color="#22c55e" />
        </>
      )}
    </group>
  )
}

function SatelliteModel({ position = [0, 0, 0], scale = 1, isActive = false }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.z += delta * 0.2
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.3) * 0.25

      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main satellite body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Solar panel arrays */}
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#059669" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#059669" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Communication dish */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#f3f4f6" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sensor array */}
      <mesh position={[0, 0, 0.8]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Status lights */}
      {isActive && (
        <>
          <pointLight position={[0.7, 0.7, 0.7]} intensity={0.3} color="#3b82f6" />
          <pointLight position={[-0.7, 0.7, 0.7]} intensity={0.3} color="#10b981" />
        </>
      )}
    </group>
  )
}

function AeroModel({ position = [0, 0, 0], scale = 1, isActive = false }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isActive ? 0.4 : 0.15)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15

      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.1)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Fuselage */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.1, 4, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.2, 3, 0.8]} />
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Tail */}
      <mesh position={[0, 0.5, -1.8]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 1, 0.6]} />
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh position={[0, 0.8, -1.5]} castShadow>
        <boxGeometry args={[0.1, 1.2, 0.4]} />
        <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.2, 1.5]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Engine exhaust */}
      {isActive && <pointLight position={[0, 0, -2.2]} intensity={1} color="#ff6b35" distance={8} />}
    </group>
  )
}

// Loading component
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <motion.div
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <p className="mt-4 text-sm font-medium">Loading 3D Models...</p>
        <p className="text-xs text-white/60">Initializing AVASYA Gallery</p>
      </div>
    </Html>
  )
}

// Gallery item interface
interface GalleryItem {
  id: string
  title: string
  description: string
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
  status: string
  progress: number
  teamMembers: string[]
}

export function ThreeDGallery() {
  const [activeModel, setActiveModel] = useState<string | null>("quantum-spacecraft")
  const [showInfo, setShowInfo] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0, 8, 20])
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})
  const [viewMode, setViewMode] = useState<"gallery" | "showcase">("gallery")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const controlsRef = useRef()

  // Real AVASYA project models
  const galleryItems: GalleryItem[] = [
    {
      id: "quantum-spacecraft",
      title: "QuantumNav Spacecraft",
      description:
        "Revolutionary quantum propulsion system with AI-powered navigation for interplanetary missions. Features advanced life support and autonomous operation capabilities.",
      category: "Space",
      scale: 1.2,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      likes: 3247,
      views: 89432,
      downloads: 2156,
      author: "Lakshay Verma",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      modelType: "spacecraft",
      breakthrough: "99.7% propulsion efficiency achieved",
      techSpecs: ["Quantum Field Manipulation", "AI Navigation", "Life Support Systems", "Solar Panel Arrays"],
      realWorldImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      status: "Active Development",
      progress: 75,
      teamMembers: ["Lakshay Verma", "Aman Verma", "Swarnabha Banerjee"],
    },
    {
      id: "bio-drone-swarm",
      title: "BioDrone Swarm Intelligence",
      description:
        "Biomimetic drone swarm with collective intelligence for environmental monitoring, search and rescue operations, and autonomous exploration missions.",
      category: "Drone",
      scale: 1,
      position: [8, 2, 0],
      rotation: [0, Math.PI / 4, 0],
      likes: 4156,
      views: 92847,
      downloads: 2847,
      author: "Harshal Kokate",
      authorAvatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      modelType: "drone",
      breakthrough: "Swarm coordination with 99.2% efficiency",
      techSpecs: ["Swarm Intelligence", "Bio-inspired Flight", "Environmental Sensors", "Autonomous Navigation"],
      realWorldImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
      status: "Testing Phase",
      progress: 60,
      teamMembers: ["Harshal Kokate", "Anjalee Chaudhary", "Kavisha Kapoor"],
    },
    {
      id: "orbital-cleanup",
      title: "Orbital Debris Cleanup System",
      description:
        "Advanced satellite network for space debris detection, capture, and disposal using robotic arms and AI-powered trajectory prediction systems.",
      category: "Satellite",
      scale: 0.8,
      position: [-8, 1, 0],
      rotation: [0, -Math.PI / 4, 0],
      likes: 2891,
      views: 67234,
      downloads: 1543,
      author: "Baalaji G K M",
      authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      modelType: "satellite",
      breakthrough: "Autonomous debris capture system",
      techSpecs: ["Robotic Arms", "AI Trajectory Prediction", "Debris Detection", "Orbital Maneuvering"],
      realWorldImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop",
      status: "Prototype Ready",
      progress: 45,
      teamMembers: ["Baalaji G K M", "Aparimita Singh", "Sampreeti Banerjee"],
    },
    {
      id: "hypersonic-vehicle",
      title: "Hypersonic Research Vehicle",
      description:
        "Next-generation hypersonic aircraft with scramjet propulsion for atmospheric research and rapid global transportation applications.",
      category: "Aero",
      scale: 1.1,
      position: [0, -2, -8],
      rotation: [0, Math.PI, 0],
      likes: 3456,
      views: 78234,
      downloads: 1987,
      author: "Shamanth V",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      modelType: "aero",
      breakthrough: "Mach 5+ sustained flight capability",
      techSpecs: ["Scramjet Engine", "Heat-Resistant Materials", "Advanced Aerodynamics", "Flight Control Systems"],
      realWorldImage: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop",
      status: "Design Phase",
      progress: 30,
      teamMembers: ["Shamanth V", "Akash Jana", "Anjalee Chaudhary"],
    },
  ]

  const activeItem = galleryItems.find((item) => item.id === activeModel)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
      case "Space":
        return <Rocket className="h-4 w-4" />
      case "Satellite":
        return <Satellite className="h-4 w-4" />
      case "Drone":
        return <Cpu className="h-4 w-4" />
      case "Aero":
        return <Plane className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const renderModel = (item: GalleryItem) => {
    switch (item.modelType) {
      case "spacecraft":
        return <SpacecraftModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      case "drone":
        return <DroneModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      case "satellite":
        return <SatelliteModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      case "aero":
        return <AeroModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-[900px] relative bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl overflow-hidden border border-primary/20">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.2}
          enableZoom={true}
          enablePan={true}
          minDistance={8}
          maxDistance={40}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[15, 15, 10]} intensity={1} castShadow shadow-mapSize={[2048, 2048]} />
        <pointLight position={[-15, -15, -10]} intensity={0.4} color="#3b82f6" />
        <spotLight position={[0, 20, 0]} intensity={0.6} angle={0.4} penumbra={1} castShadow />

        {/* Environment */}
        <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade speed={0.5} />
        <Environment preset="night" />

        {/* Ground plane for shadows */}
        <mesh receiveShadow position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.3} />
        </mesh>

        {/* 3D Models */}
        <Suspense fallback={<LoadingSpinner />}>
          {!isLoading &&
            galleryItems.map((item) => (
              <group key={item.id} onClick={() => setActiveModel(item.id)}>
                {renderModel(item)}
              </group>
            ))}
        </Suspense>

        {/* Gallery Title */}
        <Text
          position={[0, 15, 0]}
          fontSize={2.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          AVASYA 3D Project Gallery
        </Text>

        <Text
          position={[0, 13, 0]}
          fontSize={1}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Interactive Aerospace Research Models
        </Text>

        {/* Info Panel */}
        {activeItem && showInfo && (
          <Html position={[0, 6, 0]} transform occlude>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-[450px] bg-black/90 border-primary/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/20 rounded-xl">{getCategoryIcon(activeItem.category)}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{activeItem.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {activeItem.category}
                          </Badge>
                          <Badge
                            variant={activeItem.status === "Active Development" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {activeItem.status}
                          </Badge>
                        </div>
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

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white">Development Progress</span>
                      <span className="text-sm text-white/70">{activeItem.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${activeItem.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Breakthrough Badge */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">{activeItem.breakthrough}</span>
                  </div>

                  {/* Tech Specs */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Technical Specifications
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {activeItem.techSpecs.map((spec, index) => (
                        <div
                          key={index}
                          className="text-xs text-white/70 bg-white/5 rounded-lg px-3 py-2 border border-white/10"
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Members
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.teamMembers.map((member, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={activeItem.authorAvatar || "/placeholder.svg"}
                        alt={activeItem.author}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{activeItem.author}</div>
                      <div className="text-xs text-white/60">Project Lead</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-3">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {activeItem.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {activeItem.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" /> {activeItem.downloads.toLocaleString()}
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
          onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], Math.max(cameraPosition[2] - 5, 8)])}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], Math.min(cameraPosition[2] + 5, 40)])}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setCameraPosition([0, 8, 20])
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
      <div className="absolute top-6 right-6 w-96 bg-black/70 backdrop-blur-sm rounded-xl p-4 space-y-3 max-h-[800px] overflow-auto border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AVASYA Projects
          </h3>
          <Badge variant="outline" className="text-xs">
            {galleryItems.length} Active Models
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
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg">{getCategoryIcon(item.category)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-white truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-white/60">{item.progress}% Complete</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 mb-3 line-clamp-2">{item.description}</p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-primary to-purple-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Team & Stats */}
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{item.teamMembers.length} members</span>
                </div>
                <div className="flex items-center gap-3">
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
                  <div className="flex gap-2 mb-3">
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
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={item.realWorldImage || "/placeholder.svg"}
                      alt={`${item.title} real world application`}
                      width={350}
                      height={150}
                      className="w-full h-24 object-cover"
                    />
                    <div className="bg-white/5 p-2 border-t border-white/10">
                      <p className="text-xs text-white/70">Real-world Research Application</p>
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
          Gallery Performance
        </h4>
        <div className="space-y-2 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Active Projects:</span>
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
          <div className="flex justify-between">
            <span>Avg Progress:</span>
            <span className="text-white font-medium">
              {Math.round(galleryItems.reduce((sum, item) => sum + item.progress, 0) / galleryItems.length)}%
            </span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <motion.div
              className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <h3 className="text-xl font-bold text-white mb-2">Initializing AVASYA Gallery</h3>
            <p className="text-white/70">Loading 3D models and project data...</p>
          </div>
        </div>
      )}
    </div>
  )
}
