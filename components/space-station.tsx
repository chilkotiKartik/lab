"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SpaceStationProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  delay?: number
}

export function SpaceStation({ size = "md", className, delay = 0 }: SpaceStationProps) {
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  }

  return (
    <motion.div
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [0, -5, 0],
        rotate: [0, 1, -1, 0],
        opacity: 1,
      }}
      transition={{
        y: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut", delay },
        rotate: { repeat: Number.POSITIVE_INFINITY, duration: 12, ease: "easeInOut", delay },
        opacity: { duration: 0.8 },
      }}
      className={cn("relative", sizeClasses[size], className)}
    >
      {/* Space station image */}
      <Image
        src="/images/space-station.png"
        alt="Space Station"
        fill
        className="object-contain drop-shadow-[0_0_20px_rgba(79,70,229,0.5)] z-10"
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full -z-10"></div>

      {/* Solar panels animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 h-full w-1 bg-blue-500/30 rounded-full"></div>
        <div className="absolute top-1/2 left-0 h-1 w-full bg-blue-500/30 rounded-full"></div>
      </motion.div>
    </motion.div>
  )
}
