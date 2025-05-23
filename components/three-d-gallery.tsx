"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Text, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Download, ZoomIn, ZoomOut, RotateCw, Pause, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Model component with loading state
function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (modelRef.current && hovered) {
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  )
}

// Info panel component
function InfoPanel({ title, description, onClose }) {
  return (
    <Html position={[0, 2, 0]} transform occlude>
      <Card className="w-64 bg-black/80 border-primary/50">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white" onClick={onClose}>
              ×
            </Button>
          </div>
          <p className="text-sm text-white/80">{description}</p>
        </CardContent>
      </Card>
    </Html>
  )
}

// Gallery item type
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
}

// Main 3D Gallery component
export function ThreeDGallery() {
  const [activeModel, setActiveModel] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0, 5, 10])
  const { toast } = useToast()
  const controlsRef = useRef()

  // Sample gallery items
  const galleryItems: GalleryItem[] = [
    {
      id: "spacecraft",
      title: "QuantumNav Spacecraft",
      description: "Next-generation quantum navigation system for interplanetary travel",
      modelUrl: "/assets/3d/duck.glb", // Using the sample duck model
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop",
      category: "Spacecraft",
      scale: 2,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    {
      id: "satellite",
      title: "Orbital Satellite Array",
      description: "Self-healing satellite network for global communication",
      modelUrl: "/assets/3d/duck.glb", // Using the sample duck model
      thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop",
      category: "Satellite",
      scale: 2,
      position: [5, 0, 0],
      rotation: [0, Math.PI / 4, 0],
    },
    {
      id: "drone",
      title: "BioDrone Mark II",
      description: "Biomimetic drone design inspired by peregrine falcon aerodynamics",
      modelUrl: "/assets/3d/duck.glb", // Using the sample duck model
      thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop",
      category: "Drone",
      scale: 2,
      position: [-5, 0, 0],
      rotation: [0, -Math.PI / 4, 0],
    },
  ]

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${title} 3D model.`,
    })
  }

  const handleZoomIn = () => {
    setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] - 2])
  }

  const handleZoomOut = () => {
    setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] + 2])
  }

  const handleResetCamera = () => {
    setCameraPosition([0, 5, 10])
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="w-full h-[600px] relative">
      {/* 3D Canvas */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={true}
          enablePan={true}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {galleryItems.map((item) => (
            <group key={item.id} visible={activeModel === null || activeModel === item.id}>
              <Model url={item.modelUrl} scale={item.scale} position={item.position} rotation={item.rotation} />
              {activeModel === item.id && showInfo && (
                <InfoPanel title={item.title} description={item.description} onClose={() => setShowInfo(false)} />
              )}
            </group>
          ))}
        </Suspense>

        {/* Gallery title */}
        <Text
          position={[0, 8, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          3D Model Gallery
        </Text>
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setAutoRotate(!autoRotate)}>
          {autoRotate ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {autoRotate ? "Pause" : "Rotate"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button variant="outline" size="sm" onClick={handleResetCamera}>
          <RotateCw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Gallery items selection */}
      <div className="absolute top-4 right-4 w-64 bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-2 max-h-[500px] overflow-auto">
        <h3 className="text-lg font-bold mb-2">Gallery Items</h3>
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className={`p-2 rounded-lg cursor-pointer ${
              activeModel === item.id ? "bg-primary/20 border border-primary/50" : "bg-card/50 hover:bg-card/80"
            }`}
            onClick={() => setActiveModel(activeModel === item.id ? null : item.id)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-12 h-12 rounded bg-cover bg-center"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
              ></div>
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            </div>
            {activeModel === item.id && (
              <div className="flex mt-2 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
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
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(item.title)
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
