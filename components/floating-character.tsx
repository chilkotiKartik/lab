"use client"

import { motion } from "framer-motion"
import { CharacterAvatar } from "@/components/character-avatar"
import type { UserRole } from "@/components/auth-provider"

interface FloatingCharacterProps {
  role?: UserRole
  size?: "sm" | "md" | "lg" | "xl"
  variant?: number
  className?: string
  delay?: number
}

export function FloatingCharacter({
  role = "student",
  size = "md",
  variant,
  className,
  delay = 0,
}: FloatingCharacterProps) {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay },
        rotate: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut", delay },
      }}
      className={className}
    >
      <CharacterAvatar role={role} size={size} variant={variant} />
    </motion.div>
  )
}
