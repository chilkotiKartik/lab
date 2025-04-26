"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HomeNotificationProps {
  delay?: number
}

export function HomeNotification({ delay = 3000 }: HomeNotificationProps) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if notification has been dismissed before
    const isDismissed = localStorage.getItem("notification_dismissed")
    if (isDismissed) {
      return
    }

    // Show notification after delay
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    localStorage.setItem("notification_dismissed", "true")
  }

  if (dismissed) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-primary-foreground">
                <Bell className="h-5 w-5" />
                <span className="font-medium">New Reviews Available</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/90"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="p-4">
              <p className="text-sm mb-4">
                Teachers have reviewed new research and projects. Sign in to see the latest feedback and approvals.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  <span>5 new reviews</span>
                </div>
                <Link href="/login">
                  <Button size="sm" variant="default">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
