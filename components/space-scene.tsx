"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { NumberedAstronaut } from "@/components/numbered-astronaut"
import { FloatingSatellite } from "@/components/floating-satellite"
import { SpaceStation } from "@/components/space-station"
import { SpaceBackground } from "@/components/space-background"
import { SpaceParticles } from "@/components/space-particles"

interface SpaceSceneProps {
  density?: "low" | "medium" | "high"
  interactive?: boolean
  className?: string
}

export function SpaceScene({ density = "medium", interactive = true, className }: SpaceSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Number of elements based on density
  const getCount = (base: number) => {
    const multiplier = density === "low" ? 0.5 : density === "high" ? 2 : 1
    return Math.floor(base * multiplier)
  }

  const astronautCount = getCount(3)
  const satelliteCount = getCount(2)

  useEffect(() => {
    if (typeof window !== "undefined" && interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }

      handleResize()
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [interactive])

  // Generate random positions that don't overlap
  const generatePositions = (count: number, size: number) => {
    const positions: { top: string; left: string; zIndex: number }[] = []

    for (let i = 0; i < count; i++) {
      let attempts = 0
      let position

      // Try to find a position that doesn't overlap with existing ones
      do {
        position = {
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          zIndex: Math.floor(Math.random() * 10) + 1,
        }

        attempts++
      } while (
        positions.some((p) => {
          const pTop = Number.parseFloat(p.top)
          const pLeft = Number.parseFloat(p.left)
          const newTop = Number.parseFloat(position.top)
          const newLeft = Number.parseFloat(position.left)

          // Check if positions are too close
          return Math.abs(pTop - newTop) < size && Math.abs(pLeft - newLeft) < size
        }) &&
        attempts < 20
      )

      positions.push(position)
    }

    return positions
  }

  const astronautPositions = generatePositions(astronautCount, 15)
  const satellitePositions = generatePositions(satelliteCount, 20)

  // Calculate parallax effect
  const getParallaxStyle = (zIndex: number) => {
    if (!interactive || windowSize.width === 0) return {}

    const strength = (10 - zIndex) * 0.5
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    const offsetX = ((mousePosition.x - centerX) / centerX) * strength
    const offsetY = ((mousePosition.y - centerY) / centerY) * strength

    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    }
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <SpaceBackground starCount={100} />
      <SpaceParticles particleCount={30} />

      {/* Space station */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <SpaceStation size="lg" />
      </div>

      {/* Numbered astronauts */}
      {astronautPositions.map((pos, index) => (
        <motion.div
          key={`astronaut-${index}`}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            zIndex: pos.zIndex,
            ...getParallaxStyle(pos.zIndex),
          }}
        >
          <NumberedAstronaut
            number={`0${index + 1}`}
            size={index % 2 === 0 ? "md" : "sm"}
            color={["blue", "purple", "pink", "green", "amber"][index % 5] as any}
            delay={index * 0.5}
          />
        </motion.div>
      ))}

      {/* Satellites */}
      {satellitePositions.map((pos, index) => (
        <motion.div
          key={`satellite-${index}`}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            zIndex: pos.zIndex,
            ...getParallaxStyle(pos.zIndex),
          }}
        >
          <FloatingSatellite
            size={index % 2 === 0 ? "md" : "sm"}
            color={["blue", "purple", "green"][index % 3] as any}
            delay={index * 0.7}
          />
        </motion.div>
      ))}
    </div>
  )
}
