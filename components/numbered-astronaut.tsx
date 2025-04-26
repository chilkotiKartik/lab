"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface NumberedAstronautProps {
  number: string | number
  size?: "sm" | "md" | "lg" | "xl"
  color?: "blue" | "purple" | "pink" | "green" | "amber"
  className?: string
  delay?: number
}

export function NumberedAstronaut({
  number,
  size = "md",
  color = "blue",
  className,
  delay = 0,
}: NumberedAstronautProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const colorClasses = {
    blue: "from-blue-500/80 to-blue-600/30",
    purple: "from-purple-500/80 to-purple-600/30",
    pink: "from-pink-500/80 to-pink-600/30",
    green: "from-green-500/80 to-green-600/30",
    amber: "from-amber-500/80 to-amber-600/30",
  }

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }

  return (
    <motion.div
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        opacity: 1,
      }}
      transition={{
        y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut", delay },
        rotate: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut", delay },
        opacity: { duration: 0.5 },
      }}
      className={cn("relative", sizeClasses[size], className)}
    >
      {/* Glow effect behind astronaut */}
      <div className={cn("absolute inset-0 rounded-full bg-gradient-radial opacity-70", colorClasses[color])}></div>

      {/* Astronaut image */}
      <Image
        src="/images/astronaut.png"
        alt="Floating Astronaut"
        fill
        className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
      />

      {/* Number overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className={cn("font-bold font-mono", textSizeClasses[size])}>{number}</span>
      </div>
    </motion.div>
  )
}
