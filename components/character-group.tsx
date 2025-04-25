"use client"

import { CharacterAvatar } from "@/components/character-avatar"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/components/auth-provider"

interface Character {
  role: UserRole
  variant?: number
  status?: "online" | "offline" | "busy" | "away"
}

interface CharacterGroupProps {
  characters: Character[]
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
          size={size}
          status={character.status}
          className="border-2 border-background"
        />
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground border-2 border-background",
            size === "xs" ? "w-8 h-8 text-xs" : size === "sm" ? "w-10 h-10 text-sm" : "w-16 h-16 text-base",
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
