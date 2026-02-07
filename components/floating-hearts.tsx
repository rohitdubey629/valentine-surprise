
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: Math.random() * 5 + 5, // 5-10s duration
        },
      ])

      // Cleanup old hearts
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 10000))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ duration: heart.duration, ease: "linear" }}
          className="absolute text-pink-300/30 text-4xl"
          style={{ left: `${heart.left}%` }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}
