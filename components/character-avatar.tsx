"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/components/auth-provider"

interface CharacterAvatarProps {
  role?: UserRole
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  animation?: boolean | "float" | "pulse" | "rotate" | "bounce"
  className?: string
  customImage?: string
  variant?: number
  showRole?: boolean
  status?: "online" | "offline" | "busy" | "away"
}

export function CharacterAvatar({
  role = "student",
  size = "md",
  animation = false,
  className,
  customImage,
  variant,
  showRole = false,
  status,
}: CharacterAvatarProps) {
  const [randomVariant, setRandomVariant] = useState(variant || 1)

  useEffect(() => {
    if (variant === undefined) {
      // Generate a random variant for each role (1-5)
      setRandomVariant(Math.floor(Math.random() * 5) + 1)
    }
  }, [role, variant])

  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }

  const getAvatarImage = () => {
    if (customImage) return customImage

    // Return different images based on role
    switch (role) {
      case "student":
        return `/images/astronaut-${randomVariant}.png`
      case "teacher":
        return `/images/astronaut-${randomVariant}.png`
      case "admin":
        return `/images/astronaut-${randomVariant}.png`
      default:
        return `/images/astronaut-1.png`
    }
  }

  const getRoleColor = () => {
    switch (role) {
      case "student":
        return "border-blue-500/50 bg-blue-500/10"
      case "teacher":
        return "border-purple-500/50 bg-purple-500/10"
      case "admin":
        return "border-amber-500/50 bg-amber-500/10"
      default:
        return "border-gray-500/50 bg-gray-500/10"
    }
  }

  const getAnimationProps = () => {
    if (!animation) return {}

    if (animation === true || animation === "float") {
      return {
        animate: { y: [0, -10, 0] },
        transition: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
      }
    }

    if (animation === "pulse") {
      return {
        animate: { scale: [1, 1.05, 1] },
        transition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
      }
    }

    if (animation === "rotate") {
      return {
        animate: { rotate: [0, 5, -5, 0] },
        transition: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" },
      }
    }

    if (animation === "bounce") {
      return {
        animate: { y: [0, -15, 0] },
        transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeOut" },
      }
    }

    return {}
  }

  return (
    <div className={cn("relative", className)}>
      <motion.div
        {...getAnimationProps()}
        className={cn("relative rounded-full overflow-hidden border-2", getRoleColor(), sizeClasses[size])}
      >
        <Image src={getAvatarImage() || "/placeholder.svg"} alt={`${role} Avatar`} fill className="object-cover" />

        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
              status === "online"
                ? "bg-green-500"
                : status === "busy"
                  ? "bg-red-500"
                  : status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500",
            )}
          />
        )}
      </motion.div>

      {showRole && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap capitalize">
          {role}
        </div>
      )}
    </div>
  )
}
