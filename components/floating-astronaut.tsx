"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FloatingAstronaut() {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
        rotate: { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" },
      }}
      className="relative w-32 h-32 md:w-48 md:h-48"
    >
      <Image
        src="/images/astronaut.png"
        alt="Floating Astronaut"
        width={200}
        height={200}
        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      />
    </motion.div>
  )
}
