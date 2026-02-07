
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Lock } from "lucide-react"
import { format, isBefore, startOfDay, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { VALENTINE_WEEK_DATA } from "@/lib/valentine-data"

export default function ValentineWeekPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    // Only set on client to match hydration
    setCurrentDate(new Date())
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-dancing text-rose-600 mb-8 text-center drop-shadow-sm"
      >
        Valentine Week ❤️
      </motion.h1>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
      >
        {VALENTINE_WEEK_DATA.map((day, index) => {
          // Check if unlocked: if current date is same or after the day's date
          const unlockDate = parseISO(day.date)
          // For testing, we can uncomment below to unlock all
          // const isUnlocked = true 
          const isUnlocked = !isBefore(startOfDay(currentDate), startOfDay(unlockDate))

          return (
            <motion.div key={index} variants={item} whileHover={isUnlocked ? { scale: 1.05 } : {}}>
              <Link href={isUnlocked ? day.path : "#"} className={cn("block h-full", !isUnlocked && "cursor-not-allowed")}>
                <Card className={cn(
                  "h-full overflow-hidden border-2 transition-all duration-300 relative",
                  isUnlocked ? "bg-white/80 border-rose-200 hover:shadow-xl hover:border-rose-400" : "bg-gray-100/50 border-gray-200 grayscale opacity-80"
                )}>
                  <div className={cn("h-32 w-full bg-gradient-to-br flex items-center justify-center", day.gradient)}>
                    <day.icon className="w-16 h-16 text-white drop-shadow-md" />
                  </div>
                  
                  <CardContent className="p-6 text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">{day.title}</h2>
                    <p className="text-sm text-gray-500 font-medium">{format(parseISO(day.date), "MMMM d, yyyy")}</p>
                    
                    {isUnlocked ? (
                      <p className="text-rose-600 mt-2 font-medium">{day.description}</p>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-gray-400 mt-4">
                        <Lock className="w-4 h-4" />
                        <span className="font-semibold">Coming Soon</span>
                      </div>
                    )}
                  </CardContent>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center">
                         {/* Overlay for locked state */}
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-rose-800/60 text-sm"
      >
        Made with love for you 💖
      </motion.div>
    </div>
  )
}
