"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { EnhancedFloatingAstronaut } from "@/components/enhanced-floating-astronaut"

export function WelcomeAnimation() {
  const [showAnimation, setShowAnimation] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if the animation has been shown before
    const hasSeenAnimation = localStorage.getItem("hasSeenWelcomeAnimation")

    if (hasSeenAnimation) {
      setShowAnimation(false)
      return
    }

    // Set a timeout to hide the animation after 4 seconds
    const timer = setTimeout(() => {
      setShowAnimation(false)
      localStorage.setItem("hasSeenWelcomeAnimation", "true")
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!showAnimation) return null

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Stars background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {Array.from({ length: 100 }).map((_, i) => {
                  const size = Math.random() * 2 + 1
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: size,
                        height: size,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.5, 1] }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  )
                })}
              </motion.div>
            </div>

            {/* Logo animation */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="text-5xl md:text-7xl font-bold text-white mb-4 text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: 1, ease: "easeInOut" }}
              >
                <span className="cosmic-gradient">Avasya</span> Research Lab
              </motion.div>
            </motion.div>

            {/* Floating astronaut */}
            <motion.div
              className="absolute z-20"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <EnhancedFloatingAstronaut style="relaxing" size="xl" />
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="mt-8 text-xl text-white/80 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Pioneering the future of aerospace technology
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 2 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
