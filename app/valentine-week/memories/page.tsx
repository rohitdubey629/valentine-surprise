"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import confetti from "canvas-confetti"
import { SurpriseReveal } from "@/components/SurpriseReveal"
import { CONSTANTS } from "@/lib/constants"
import { useFormattedText } from "@/lib/names-context"

type Memory = {
  id: number
  text: string
  date: string
  type: 'wish' | 'memory'
}

export default function MemoriesPage() {
  const t = useFormattedText()
  const [memories, setMemories] = useState<Memory[]>([])
  const [inputText, setInputText] = useState("")
  const [activeTab, setActiveTab] = useState<'wish' | 'memory'>('wish')

  const [today, setToday] = useState<Date | null>(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shreya_rohit_memories')
    if (saved) {
      setMemories(JSON.parse(saved))
    } else {
      // Default initial memories
      setMemories([
        { id: 1, text: CONSTANTS.memories.defaultWish, date: new Date().toLocaleDateString(), type: 'wish' },
        { id: 2, text: CONSTANTS.memories.defaultMemory, date: "Special Day", type: 'memory' }
      ])
    }
  }, [])

  // Save to local storage whenever memories change
  useEffect(() => {
    localStorage.setItem('shreya_rohit_memories', JSON.stringify(memories))
  }, [memories])

  const handleAdd = () => {
    if (!inputText.trim()) return

    const newMemory: Memory = {
      id: Date.now(),
      text: inputText,
      date: new Date().toLocaleDateString(),
      type: activeTab
    }

    setMemories(prev => [newMemory, ...prev])
    setInputText("")
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#8b5cf6']
    })
  }

  const handleDelete = (id: number) => {
    setMemories(prev => prev.filter(m => m.id !== id))
  }

  return (
    <SurpriseReveal color="pink">
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-pink-50 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce">💌</div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse transform rotate-12 w-16 h-16 bg-white border border-pink-300 rounded-lg shadow-sm flex flex-col items-center overflow-hidden">
          <div className="w-full h-5 bg-pink-500 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold uppercase">
              {today ? today.toLocaleString('default', { month: 'short' }) : '...'}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
             <span className="text-2xl font-bold text-pink-600">
               {today ? today.getDate() : '...'}
             </span>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-dancing text-pink-600 drop-shadow-sm mb-2">
          {CONSTANTS.memories.title}
        </h1>
        <p className="text-pink-800 italic">
          {t(CONSTANTS.memories.subtitle)}
        </p>
      </motion.div>

      <div className="w-full max-w-2xl z-10 space-y-8">
        
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-md border-2 border-pink-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex gap-4 justify-center mb-6">
              <Button 
                variant={activeTab === 'wish' ? 'default' : 'outline'}
                onClick={() => setActiveTab('wish')}
                className={activeTab === 'wish' ? "bg-pink-500 hover:bg-pink-600 outline-none border-none text-white" : "text-pink-500 border-pink-200 hover:text-pink-600 hover:bg-pink-50"}
              >
                <Star className="w-4 h-4 mr-2" /> {CONSTANTS.memories.wishTab}
              </Button>
              <Button 
                variant={activeTab === 'memory' ? 'default' : 'outline'}
                onClick={() => setActiveTab('memory')}
                className={activeTab === 'memory' ? "bg-purple-500 hover:bg-purple-600 outline-none border-none text-white" : "text-purple-500 border-purple-200 hover:text-purple-600 hover:bg-purple-50"}
              >
                <Heart className="w-4 h-4 mr-2" /> {CONSTANTS.memories.memoryTab}
              </Button>
            </div>

            <div className="flex gap-2">

              <Input
                placeholder={activeTab === 'wish' ? CONSTANTS.memories.wishPlaceholder : CONSTANTS.memories.memoryPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="text-lg bg-white border-pink-100 focus:border-pink-300 transition-all font-serif"
              />

              <Button onClick={handleAdd} className={`${activeTab === 'wish' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}>
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {memories.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                layout
                className={`relative p-6 rounded-xl shadow-md border ${item.type === 'wish' ? 'bg-yellow-50 border-yellow-200 rotate-1' : 'bg-blue-50 border-blue-200 -rotate-1'} hover:rotate-0 transition-transform duration-300 group`}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'wish' ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{item.date}</span>
                </div>
                
                <p className={`text-xl font-dancing font-semibold ${item.type === 'wish' ? 'text-yellow-800' : 'text-blue-800'}`}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {memories.length === 0 && (
          <div className="text-center text-gray-400 mt-12 font-serif italic">
            {CONSTANTS.memories.empty}
          </div>
        )}

      </div>
    </div>
    </SurpriseReveal>
  )
}
