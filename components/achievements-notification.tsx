"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Global state for achievements
let achievementQueue: {
  title: string
  description: string
  points: number
}[] = []

// Function to trigger an achievement notification
export function triggerAchievement(title: string, description: string, points: number) {
  achievementQueue.push({ title, description, points })
  // Dispatch a custom event to notify components
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("achievement"))
  }
}

export function AchievementsNotification() {
  const [achievements, setAchievements] = useState<
    {
      title: string
      description: string
      points: number
    }[]
  >([])
  const [currentAchievement, setCurrentAchievement] = useState<{
    title: string
    description: string
    points: number
  } | null>(null)

  // Listen for achievement events
  useEffect(() => {
    const handleAchievement = () => {
      setAchievements([...achievementQueue])
      achievementQueue = []
    }

    window.addEventListener("achievement", handleAchievement)
    return () => {
      window.removeEventListener("achievement", handleAchievement)
    }
  }, [])

  // Process achievements queue
  useEffect(() => {
    if (achievements.length > 0 && !currentAchievement) {
      setCurrentAchievement(achievements[0])
      setAchievements(achievements.slice(1))
    }
  }, [achievements, currentAchievement])

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (currentAchievement) {
      const timer = setTimeout(() => {
        setCurrentAchievement(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentAchievement])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {currentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Card className="w-80 border-primary/20 shadow-lg shadow-primary/10">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">Achievement Unlocked!</h4>
                      <span className="text-xs font-bold text-primary">+{currentAchievement.points} pts</span>
                    </div>
                    <h3 className="text-base font-bold mt-1">{currentAchievement.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{currentAchievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
