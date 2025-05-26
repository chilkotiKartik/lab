"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text, Html, Stars } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
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
  Plane,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UserAvatar } from "@/components/user-avatar"

// Enhanced 3D Models with better materials and lighting
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
      {/* Main spacecraft body with enhanced materials */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 1.2, 3, 16]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>

      {/* Enhanced solar panels with glow */}
      <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial
          color="#059669"
          metalness={0.8}
          roughness={0.2}
          emissive="#059669"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial
          color="#059669"
          metalness={0.8}
          roughness={0.2}
          emissive="#059669"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Communication array */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Enhanced communication dish */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#f3f4f6" metalness={0.9} roughness={0.1} envMapIntensity={2} />
      </mesh>

      {/* Thrusters with glow effect */}
      <mesh position={[0, -1.8, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.5, 16]} />
        <meshStandardMaterial
          color="#374151"
          metalness={0.8}
          roughness={0.3}
          emissive={isActive ? "#3b82f6" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Active state lighting */}
      {isActive && (
        <>
          <pointLight position={[0, 0, 0]} intensity={2} color="#4f46e5" distance={20} />
          <pointLight position={[0, -1.8, 0]} intensity={1} color="#3b82f6" distance={10} />
        </>
      )}
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

    // Enhanced propeller spinning
    propellerRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.rotation.y += delta * (isActive ? 30 : 20)
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
      {/* Enhanced main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} envMapIntensity={1.2} />
      </mesh>

      {/* Arms and propellers */}
      {propellerPositions.map((pos, index) => (
        <group key={index}>
          {/* Enhanced arm */}
          <mesh position={[pos[0] / 2, 0, pos[2] / 2]} castShadow>
            <boxGeometry args={[Math.abs(pos[0]), 0.1, 0.1]} />
            <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Enhanced motor */}
          <mesh position={pos} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
            <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Enhanced propeller with motion blur effect */}
          <mesh ref={propellerRefs[index]} position={[pos[0], pos[1] + 0.1, pos[2]]}>
            <boxGeometry args={[0.8, 0.02, 0.1]} />
            <meshStandardMaterial
              color="#e5e7eb"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={isActive ? 0.7 : 1}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced camera gimbal */}
      <mesh position={[0, -0.2, 0.4]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Enhanced LED lights */}
      {isActive && (
        <>
          <pointLight position={[0.5, -0.1, 0.5]} intensity={0.8} color="#ef4444" />
          <pointLight position={[-0.5, -0.1, 0.5]} intensity={0.8} color="#22c55e" />
          <pointLight position={[0.5, -0.1, -0.5]} intensity={0.8} color="#3b82f6" />
          <pointLight position={[-0.5, -0.1, -0.5]} intensity={0.8} color="#f59e0b" />
        </>
      )}
    </group>
  )
}

// Loading component with enhanced styling
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <motion.div
          className="w-16 h-16 border-4 border-purple-300/30 border-t-purple-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.p
          className="mt-4 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading AVASYA 3D Models...
        </motion.p>
        <p className="text-xs text-purple-200/60 mt-1">Initializing Aerospace Gallery</p>
      </div>
    </Html>
  )
}

export function Enhanced3DGallery() {
  const [activeModel, setActiveModel] = useState<string | null>("quantum-spacecraft")
  const [showInfo, setShowInfo] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0, 8, 20])
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const controlsRef = useRef()

  // Real AVASYA project models with team member data
  const galleryItems = [
    {
      id: "quantum-spacecraft",
      title: "QuantumNav Spacecraft",
      description: "Revolutionary quantum propulsion system with AI-powered navigation for interplanetary missions.",
      category: "Space",
      scale: 1.2,
      position: [0, 0, 0],
      modelType: "spacecraft",
      breakthrough: "99.7% propulsion efficiency achieved",
      techSpecs: ["Quantum Field Manipulation", "AI Navigation", "Life Support Systems", "Solar Panel Arrays"],
      status: "Active Development",
      progress: 85,
      teamMembers: ["Lakshay Verma", "Aman Verma", "Swarnabha Banerjee"],
      likes: 3247,
      views: 89432,
      downloads: 2156,
    },
    {
      id: "bio-drone-swarm",
      title: "BioDrone Swarm Intelligence",
      description: "Biomimetic drone swarm with collective intelligence for environmental monitoring and exploration.",
      category: "Drone",
      scale: 1,
      position: [8, 2, 0],
      modelType: "drone",
      breakthrough: "Swarm coordination with 99.2% efficiency",
      techSpecs: ["Swarm Intelligence", "Bio-inspired Flight", "Environmental Sensors", "Autonomous Navigation"],
      status: "Testing Phase",
      progress: 72,
      teamMembers: ["Harshal Kokate", "Anjalee Chaudhary", "Kavisha Kapoor"],
      likes: 4156,
      views: 92847,
      downloads: 2847,
    },
    {
      id: "orbital-cleanup",
      title: "Orbital Debris Cleanup System",
      description: "Advanced satellite network for space debris detection, capture, and disposal using AI prediction.",
      category: "Satellite",
      scale: 0.8,
      position: [-8, 1, 0],
      modelType: "spacecraft",
      breakthrough: "Autonomous debris capture system",
      techSpecs: ["Robotic Arms", "AI Trajectory Prediction", "Debris Detection", "Orbital Maneuvering"],
      status: "Prototype Ready",
      progress: 58,
      teamMembers: ["Baalaji G K M", "Aparimita Singh", "Sampreeti Banerjee"],
      likes: 2891,
      views: 67234,
      downloads: 1543,
    },
    {
      id: "hypersonic-vehicle",
      title: "Hypersonic Research Vehicle",
      description: "Next-generation hypersonic aircraft with scramjet propulsion for atmospheric research.",
      category: "Aero",
      scale: 1.1,
      position: [0, -2, -8],
      modelType: "drone",
      breakthrough: "Mach 5+ sustained flight capability",
      techSpecs: ["Scramjet Engine", "Heat-Resistant Materials", "Advanced Aerodynamics", "Flight Control Systems"],
      status: "Design Phase",
      progress: 34,
      teamMembers: ["Shamanth V", "Akash Jana", "Anjalee Chaudhary"],
      likes: 3456,
      views: 78234,
      downloads: 1987,
    },
  ]

  const activeItem = galleryItems.find((item) => item.id === activeModel)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleLike = (itemId: string) => {
    setLikedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
    toast({
      title: likedItems[itemId] ? "Like removed" : "Model Liked! ⭐",
      description: likedItems[itemId] ? "Removed from favorites" : "Added to your favorites",
    })
  }

  const renderModel = (item: any) => {
    switch (item.modelType) {
      case "spacecraft":
        return <SpacecraftModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      case "drone":
        return <DroneModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
      default:
        return <SpacecraftModel position={item.position} scale={item.scale} isActive={activeModel === item.id} />
    }
  }

  return (
    <div className="w-full h-[900px] relative overflow-hidden rounded-2xl border border-purple-500/20">
      {/* Enhanced Purple/Navy Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-navy-900/50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.3}
          enableZoom={true}
          enablePan={true}
          minDistance={8}
          maxDistance={40}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.4} color="#8b5cf6" />
        <directionalLight
          position={[15, 15, 10]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-15, -15, -10]} intensity={0.6} color="#4f46e5" />
        <pointLight position={[15, -15, 10]} intensity={0.4} color="#7c3aed" />
        <spotLight position={[0, 25, 0]} intensity={0.8} angle={0.4} penumbra={1} color="#a855f7" castShadow />

        {/* Enhanced Environment */}
        <Stars radius={200} depth={100} count={12000} factor={8} saturation={0} fade speed={0.8} />
        <Environment preset="night" />

        {/* Enhanced ground plane */}
        <mesh receiveShadow position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[150, 150]} />
          <meshStandardMaterial color="#1e1b4b" transparent opacity={0.4} metalness={0.8} roughness={0.2} />
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

        {/* Enhanced Gallery Title */}
        <Text
          position={[0, 16, 0]}
          fontSize={3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          AVASYA 3D Gallery
        </Text>

        <Text
          position={[0, 13.5, 0]}
          fontSize={1.2}
          color="#c4b5fd"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Interactive Aerospace Research Models
        </Text>
      </Canvas>

      {/* Enhanced Controls */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="border-purple-400/30 text-white hover:bg-purple-500/20"
        >
          {autoRotate ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {autoRotate ? "Pause" : "Rotate"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCameraPosition([0, 8, 15])}
          className="border-purple-400/30 text-white hover:bg-purple-500/20"
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCameraPosition([0, 8, 25])}
          className="border-purple-400/30 text-white hover:bg-purple-500/20"
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
          className="border-purple-400/30 text-white hover:bg-purple-500/20"
        >
          <RotateCw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </motion.div>

      {/* Enhanced Gallery Items Panel */}
      <motion.div
        className="absolute top-6 right-6 w-96 bg-black/80 backdrop-blur-md rounded-xl p-4 space-y-3 max-h-[800px] overflow-auto border border-purple-500/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            AVASYA Projects
          </h3>
          <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-200">
            {galleryItems.length} Active Models
          </Badge>
        </div>

        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`group cursor-pointer rounded-xl border transition-all duration-300 overflow-hidden ${
              activeModel === item.id
                ? "bg-purple-500/20 border-purple-400/50 shadow-lg shadow-purple-500/25"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/30"
            }`}
            onClick={() => setActiveModel(item.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  {item.category === "Space" && <Rocket className="h-4 w-4 text-purple-300" />}
                  {item.category === "Drone" && <Cpu className="h-4 w-4 text-purple-300" />}
                  {item.category === "Satellite" && <Satellite className="h-4 w-4 text-purple-300" />}
                  {item.category === "Aero" && <Plane className="h-4 w-4 text-purple-300" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-white truncate group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-200">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-purple-300">{item.progress}% Complete</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-purple-100/70 mb-3 line-clamp-2">{item.description}</p>

              {/* Enhanced Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  />
                </div>
              </div>

              {/* Team Members with UserAvatar */}
              <div className="mb-3">
                <p className="text-xs text-purple-200 mb-2">Team Members:</p>
                <div className="flex items-center gap-1">
                  {item.teamMembers.slice(0, 3).map((member, memberIndex) => (
                    <UserAvatar
                      key={memberIndex}
                      name={member}
                      size="xs"
                      role="student"
                      className="border border-purple-400/30"
                    />
                  ))}
                  {item.teamMembers.length > 3 && (
                    <span className="text-xs text-purple-300 ml-1">+{item.teamMembers.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-purple-200/60">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {item.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {item.views.toLocaleString()}
                  </span>
                </div>
                <Badge variant={item.status === "Active Development" ? "default" : "secondary"} className="text-xs">
                  {item.status}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <AnimatePresence>
              {activeModel === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-purple-400/20 p-3"
                >
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 text-white hover:bg-purple-500/20 ${likedItems[item.id] ? "text-red-400" : ""}`}
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
                      className="h-8 w-8 text-white hover:bg-purple-500/20"
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
                      className="h-8 w-8 text-white hover:bg-purple-500/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast({
                          title: "Shared Successfully! 📡",
                          description: `Link to "${item.title}" copied to clipboard.`,
                        })
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-purple-500/20"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast({
                          title: "Download Started 🚀",
                          description: `Downloading ${item.title} 3D model and specifications.`,
                        })
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-navy-900/90 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="w-20 h-20 border-4 border-purple-300/30 border-t-purple-400 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Initializing AVASYA 3D Gallery
            </motion.h3>
            <p className="text-purple-200/70">Loading aerospace models and project data...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
