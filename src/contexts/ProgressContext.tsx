'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface ProgressContextType {
  completedLessons: string[]
  markLessonComplete: (lessonSlug: string) => void
  isLessonComplete: (lessonSlug: string) => boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
)

const STORAGE_KEY = 'linux-path-progress'

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved))
      } catch {
        setCompletedLessons([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons))
    }
  }, [completedLessons, mounted])

  const markLessonComplete = (lessonSlug: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonSlug)) {
        return prev
      }
      return [...prev, lessonSlug]
    })
  }

  const isLessonComplete = (lessonSlug: string) => {
    return completedLessons.includes(lessonSlug)
  }

  if (!mounted) {
    return null
  }

  return (
    <ProgressContext.Provider
      value={{ completedLessons, markLessonComplete, isLessonComplete }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
