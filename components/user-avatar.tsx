"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  role?: "admin" | "teacher" | "student"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  showOnlineStatus?: boolean
  isOnline?: boolean
  animation?: boolean
}

export function UserAvatar({
  name,
  role = "student",
  size = "md",
  className,
  showOnlineStatus = false,
  isOnline = false,
  animation = false,
}: UserAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(" ")
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "w-6 h-6 text-xs"
      case "sm":
        return "w-8 h-8 text-sm"
      case "md":
        return "w-10 h-10 text-base"
      case "lg":
        return "w-12 h-12 text-lg"
      case "xl":
        return "w-16 h-16 text-xl"
      default:
        return "w-10 h-10 text-base"
    }
  }

  const getRoleColors = () => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-br from-purple-500 to-purple-700 text-white"
      case "teacher":
        return "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
      case "student":
        return "bg-gradient-to-br from-green-500 to-green-700 text-white"
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-700 text-white"
    }
  }

  const getOnlineStatusSize = () => {
    switch (size) {
      case "xs":
        return "w-2 h-2"
      case "sm":
        return "w-2.5 h-2.5"
      case "md":
        return "w-3 h-3"
      case "lg":
        return "w-3.5 h-3.5"
      case "xl":
        return "w-4 h-4"
      default:
        return "w-3 h-3"
    }
  }

  const avatarComponent = (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-semibold select-none",
        getSizeClasses(),
        getRoleColors(),
        "border-2 border-white shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getInitials(name)}

      {showOnlineStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            getOnlineStatusSize(),
            isOnline ? "bg-green-500" : "bg-gray-400",
          )}
        />
      )}
    </div>
  )

  if (animation) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {avatarComponent}
      </motion.div>
    )
  }

  return avatarComponent
}
