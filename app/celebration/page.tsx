
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"


import { CONSTANTS } from "@/lib/constants"

export default function CelebrationPage() {
  const router = useRouter()
  
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
  
    const frame = () => {
      if (Date.now() > end) return;
  
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
  
      requestAnimationFrame(frame);
    };
  
    frame();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <h1 className="text-5xl md:text-7xl font-dancing text-rose-600 mb-8 drop-shadow-md">
          {CONSTANTS.celebration.title}
        </h1>
        
        <motion.div
           animate={{ y: [0, -20, 0] }}
           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
           className="text-9xl mb-12"
        >
          💑
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="lg"
            variant="romantic"
            className="text-2xl px-10 py-8 rounded-full shadow-2xl animate-bounce"
            onClick={() => router.push("/valentine")}
          >
             {CONSTANTS.celebration.button}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

