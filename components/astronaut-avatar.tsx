"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AstronautAvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  animation?: boolean
  className?: string
  role?: string
}

export function AstronautAvatar({ size = "md", animation = true, className, role }: AstronautAvatarProps) {
  const [randomSuit, setRandomSuit] = useState(1)

  useEffect(() => {
    // Generate a random number between 1-5 for different astronaut suits
    setRandomSuit(Math.floor(Math.random() * 5) + 1)
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  return (
    <div className={cn("relative", className)}>
      {animation ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
          className={cn("relative rounded-full overflow-hidden border-2 border-blue-500/50", sizeClasses[size])}
        >
          <Image src={`/images/astronaut-${randomSuit}.png`} alt="Astronaut Avatar" fill className="object-cover" />
        </motion.div>
      ) : (
        <div className={cn("relative rounded-full overflow-hidden border-2 border-blue-500/50", sizeClasses[size])}>
          <Image src={`/images/astronaut-${randomSuit}.png`} alt="Astronaut Avatar" fill className="object-cover" />
        </div>
      )}
      {role && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
          {role}
        </div>
      )}
    </div>
  )
}
