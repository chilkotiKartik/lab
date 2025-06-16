"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Rocket, Users, Trophy, ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface WelcomeAnimationProps {
  onComplete: () => void
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const { profile } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)

  const welcomeSteps = [
    {
      title: `Welcome back, ${profile?.name?.split(" ")[0]}! 🎉`,
      subtitle: "Ready to continue your research journey?",
      icon: <Sparkles className="h-12 w-12 text-yellow-500" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Your Project Awaits",
      subtitle: profile?.projectTitle || "Amazing research ahead!",
      icon: <Rocket className="h-12 w-12 text-blue-500" />,
      color: "from-blue-400 to-purple-500",
    },
    {
      title: "Team Collaboration",
      subtitle: `${profile?.teamMembers?.length || 0} team members ready to work`,
      icon: <Users className="h-12 w-12 text-green-500" />,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Let's Build Something Amazing!",
      subtitle: "Your dashboard is ready",
      icon: <Trophy className="h-12 w-12 text-purple-500" />,
      color: "from-purple-400 to-pink-500",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < welcomeSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => {
            setShowWelcome(false)
            setTimeout(onComplete, 500)
          }, 2000)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [onComplete, welcomeSteps.length])

  if (!showWelcome) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
        <CardContent className="p-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-r ${welcomeSteps[currentStep].color} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.05 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {welcomeSteps[currentStep].icon}
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{welcomeSteps[currentStep].title}</h2>
                <p className="text-muted-foreground">{welcomeSteps[currentStep].subtitle}</p>
              </div>

              <div className="flex justify-center gap-2">
                {welcomeSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {currentStep === welcomeSteps.length - 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Button
                    onClick={() => {
                      setShowWelcome(false)
                      onComplete()
                    }}
                    className="mt-4"
                  >
                    Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
