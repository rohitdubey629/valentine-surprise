"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Names = {
  me: string
  partner: string
}

const STORAGE_KEY = "valentine_names"

type NamesContextType = {
  names: Names
  setNames: (names: Names) => void
  isLoaded: boolean
}

const NamesContext = createContext<NamesContextType | null>(null)

function readStoredNames(): Names {
  if (typeof window === "undefined") return { me: "", partner: "" }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore corrupt storage
  }
  return { me: "", partner: "" }
}

export function NamesProvider({ children }: { children: ReactNode }) {
  const [names, setNamesState] = useState<Names>({ me: "", partner: "" })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setNamesState(readStoredNames())
    setIsLoaded(true)
  }, [])

  const setNames = (newNames: Names) => {
    setNamesState(newNames)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNames))
  }

  return (
    <NamesContext.Provider value={{ names, setNames, isLoaded }}>
      {children}
    </NamesContext.Provider>
  )
}

export function useNames() {
  const ctx = useContext(NamesContext)
  if (!ctx) throw new Error("useNames must be used within a NamesProvider")
  return ctx
}

export function formatText(text: string, names: Names): string {
  return text.replace(/\{\{me\}\}/g, names.me).replace(/\{\{partner\}\}/g, names.partner)
}

export function useFormattedText() {
  const { names } = useNames()
  return (text: string) => formatText(text, names)
}
