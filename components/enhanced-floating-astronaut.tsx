"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EnhancedFloatingAstronautProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "random"
  style?: "classic" | "modern" | "relaxing" | "waving" | "thumbs-up" | "3d-purple" | "random"
  interactive?: boolean
  withShadow?: boolean
  withGlow?: boolean
  className?: string
  onClick?: () => void
  delay?: number
}

export function EnhancedFloatingAstronaut({
  size = "md",
  position = "random",
  style = "random",
  interactive = true,
  withShadow = true,
  withGlow = false,
  className = "",
  onClick,
  delay = 0,
}: EnhancedFloatingAstronautProps) {
  const [astronautStyle, setAstronautStyle] = useState(style)
  const [astronautPosition, setAstronautPosition] = useState<{
    top?: string
    left?: string
    right?: string
    bottom?: string
    transform?: string
  }>({ top: "0", left: "0" })
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Size mapping
  const sizeMap = {
    xs: { width: 60, height: 60 },
    sm: { width: 80, height: 80 },
    md: { width: 120, height: 120 },
    lg: { width: 180, height: 180 },
    xl: { width: 240, height: 240 },
    "2xl": { width: 320, height: 320 },
  }

  // Style mapping to image paths
  const styleMap = {
    classic: "/images/astronaut.png",
    modern: "/images/astronaut-1.png",
    relaxing: "/images/relaxing-astronaut.png",
    waving: "/images/astronaut-2.png",
    "thumbs-up": "/images/astronaut-3.png",
    "3d-purple": "/images/astronaut-3d-purple.png",
    random: [
      "/images/astronaut.png",
      "/images/astronaut-1.png",
      "/images/relaxing-astronaut.png",
      "/images/astronaut-2.png",
      "/images/astronaut-3.png",
      "/images/astronaut-3d-purple.png",
    ],
  }

  // Position mapping
  const positionMap = {
    "top-left": { top: "10%", left: "10%" },
    "top-right": { top: "10%", right: "10%", left: "auto" },
    "bottom-left": { bottom: "10%", left: "10%", top: "auto" },
    "bottom-right": { bottom: "10%", right: "10%", top: "auto", left: "auto" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    random: [
      { top: "15%", left: "15%" },
      { top: "15%", right: "15%", left: "auto" },
      { bottom: "15%", left: "15%", top: "auto" },
      { bottom: "15%", right: "15%", top: "auto", left: "auto" },
      { top: "40%", left: "20%" },
      { top: "20%", right: "40%", left: "auto" },
      { bottom: "30%", left: "25%", top: "auto" },
      { top: "35%", right: "15%", left: "auto" },
      { top: "25%", left: "30%" },
      { bottom: "40%", right: "30%", top: "auto", left: "auto" },
    ],
  }

  useEffect(() => {
    // Set random style if selected
    if (style === "random") {
      const styles = styleMap.random
      const randomStyle = styles[Math.floor(Math.random() * styles.length)]
      const styleKey = Object.keys(styleMap).find(
        (key) => styleMap[key as keyof typeof styleMap] === randomStyle,
      ) as keyof typeof styleMap
      setAstronautStyle(styleKey || "classic")
    } else {
      setAstronautStyle(style)
    }

    // Set position based on selection
    if (position === "random") {
      const positions = positionMap.random
      const randomPosition = positions[Math.floor(Math.random() * positions.length)]
      setAstronautPosition(randomPosition)
    } else {
      setAstronautPosition(positionMap[position])
    }

    // Set random initial rotation
    setRotation(Math.random() * 20 - 10)
  }, [style, position])

  // Get the image path based on style
  const getImagePath = () => {
    if (astronautStyle === "random") {
      const styles = styleMap.random
      return styles[Math.floor(Math.random() * styles.length)]
    }
    return styleMap[astronautStyle as keyof typeof styleMap] || styleMap.classic
  }

  const { width, height } = sizeMap[size]

  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      style={{
        ...astronautPosition,
        width,
        height,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rotation,
        y: [0, -15, 0],
      }}
      transition={{
        delay,
        duration: 3,
        y: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 4 + Math.random() * 2,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 8 + Math.random() * 4,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      }}
      whileHover={
        interactive
          ? {
              scale: 1.1,
              rotate: [null, rotation + 5, rotation - 5, rotation],
              transition: { duration: 0.5 },
            }
          : undefined
      }
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image
          src={getImagePath() || "/placeholder.svg"}
          alt="Floating Astronaut"
          width={width}
          height={height}
          className={`${withShadow ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : ""} ${
            withGlow ? "drop-shadow-[0_0_25px_rgba(147,51,234,0.5)]" : ""
          } ${interactive ? "cursor-pointer" : ""}`}
        />

        {isHovered && interactive && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Click to interact
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
