"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function OrbitingPlanet() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 md:-translate-y-24">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Image
              src="/images/planet.png"
              alt="Orbiting Planet"
              width={64}
              height={64}
              className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Orbit path */}
      <div className="absolute inset-0 rounded-full border border-primary/20 transform scale-[2.5]"></div>
    </div>
  )
}
