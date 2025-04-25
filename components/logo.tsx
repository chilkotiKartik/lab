"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: number
}

export default function Logo({ size = 24 }: LogoProps) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary opacity-50"
        style={{ width: size, height: size }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          top: size * 0.2,
          left: size * 0.2,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bg-secondary"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: "50%",
          top: size * 0.4,
          left: size * 0.4,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
    </motion.div>
  )
}
