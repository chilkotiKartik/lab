"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 space-dots"></div>
      <div className="absolute inset-0 z-0 cosmic-bg"></div>

      <div className="container relative z-10 px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl font-bold font-space glow-text">404</div>
            <div className="text-2xl md:text-3xl font-bold font-space mb-4">
              Lost in <span className="cosmic-gradient">Space</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mb-8"
          >
            The page you're looking for has drifted beyond our reach. It might have been moved, deleted, or never
            existed in this dimension.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <Link href="/">
              <Button size="lg" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated space objects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary rounded-full"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Floating astronaut */}
          <motion.div
            className="absolute w-20 h-20 text-primary"
            style={{ top: "30%", left: "15%" }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
              <path d="M16 12v2a4 4 0 0 1-8 0v-2" />
              <path d="M12 16v3" />
              <path d="M8 19h8" />
              <path d="M12 3v2" />
              <path d="M5 7l1.5 1.5" />
              <path d="M19 7l-1.5 1.5" />
            </svg>
          </motion.div>

          {/* Floating satellite */}
          <motion.div
            className="absolute w-24 h-24 text-secondary"
            style={{ bottom: "20%", right: "15%" }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10a4 4 0 0 1 4-4c2 0 4 1 6 3 2 2 3 4 3 6a4 4 0 0 1-4 4c-2 0-4-1-6-3-2-2-3-4-3-6z" />
              <path d="M10 4a4 4 0 0 1 4 4c0 2-1 4-3 6-2 2-4 3-6 3a4 4 0 0 1-4-4c0-2 1-4 3-6 2-2 4-3 6-3z" />
              <line x1="15" y1="15" x2="19" y2="19" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
