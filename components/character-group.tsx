"use client"

import { CharacterAvatar } from "@/components/character-avatar"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { UserRole } from "@/components/auth-provider"

interface CharacterGroupProps {
  characters: Array<{
    role: UserRole
    variant?: number
    customImage?: string
  }>
  size?: "xs" | "sm" | "md"
  limit?: number
  className?: string
}

export function CharacterGroup({ characters, size = "sm", limit = 5, className }: CharacterGroupProps) {
  const visibleCharacters = characters.slice(0, limit)
  const remainingCount = characters.length - limit

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleCharacters.map((character, index) => (
        <CharacterAvatar
          key={index}
          role={character.role}
          variant={character.variant}
          customImage={character.customImage}
          size={size}
          className="border-2 border-background"
        />
      ))}

      {remainingCount > 0 && (
        <Avatar
          className={cn(
            "border-2 border-background",
            size === "xs" ? "h-8 w-8" : size === "sm" ? "h-10 w-10" : "h-16 w-16",
          )}
        >
          <AvatarFallback className="bg-primary/10 text-primary">+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
