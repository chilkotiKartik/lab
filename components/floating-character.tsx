"use client"

import { motion } from "framer-motion"
import { CharacterAvatar } from "@/components/character-avatar"
import type { UserRole } from "@/components/auth-provider"

interface FloatingCharacterProps {
  role?: UserRole
  size?: "sm" | "md" | "lg" | "xl"
  variant?: number
  delay?: number
  className?: string
}

export function FloatingCharacter({
  role = "student",
  size = "md",
  variant,
  delay = 0,
  className,
}: FloatingCharacterProps) {
  // Generate a random orbit path
  const orbitRadius = size === "sm" ? 20 : size === "md" ? 30 : 40
  const orbitDuration = 15 + Math.random() * 10 // Between 15-25 seconds
  const orbitDelay = delay
  const startAngle = Math.random() * 360 // Random start position

  // Create a circular path with some randomness
  const path = {
    x: [0, orbitRadius, 0, -orbitRadius, 0],
    y: [0, orbitRadius / 2, 0, -orbitRadius / 2, 0],
    rotate: [0, 10, 0, -10, 0],
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: orbitDelay }}
    >
      <motion.div
        animate={path}
        transition={{
          duration: orbitDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: orbitDelay,
        }}
      >
        <CharacterAvatar role={role} size={size} variant={variant} animation="pulse" className="cosmic-glow" />
      </motion.div>
    </motion.div>
  )
}
