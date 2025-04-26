"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FloatingSatelliteProps {
  size?: "sm" | "md" | "lg"
  color?: "blue" | "purple" | "pink" | "green" | "amber"
  className?: string
  delay?: number
  rotation?: boolean
}

export function FloatingSatellite({
  size = "md",
  color = "blue",
  className,
  delay = 0,
  rotation = true,
}: FloatingSatelliteProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const colorClasses = {
    blue: "from-blue-500/50 to-transparent",
    purple: "from-purple-500/50 to-transparent",
    pink: "from-pink-500/50 to-transparent",
    green: "from-green-500/50 to-transparent",
    amber: "from-amber-500/50 to-transparent",
  }

  return (
    <motion.div
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [0, -10, 0],
        rotate: rotation ? [0, 360] : 0,
        opacity: 1,
      }}
      transition={{
        y: { repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut", delay },
        rotate: rotation ? { repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear", delay } : {},
        opacity: { duration: 0.5 },
      }}
      className={cn("relative", sizeClasses[size], className)}
    >
      {/* Glow effect */}
      <div className={cn("absolute inset-0 rounded-full bg-gradient-radial", colorClasses[color])}></div>

      {/* Satellite image */}
      <Image
        src="/images/satellite.png"
        alt="Floating Satellite"
        fill
        className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10"
      />

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-0 border border-dashed border-white/20 rounded-full -z-10"
        style={{ transform: "scale(1.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-0 border border-dashed border-white/10 rounded-full -z-10"
        style={{ transform: "scale(1.4)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.div>
  )
}
