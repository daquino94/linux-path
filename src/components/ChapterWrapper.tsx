'use client'
import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import QuizBox from './QuizBox'
import { Chapter } from '@/types/types'
import { usePathname } from 'next/navigation'
import { redirect } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import ExerciseBox from './ExerciseBox'

const ChapterWrapper = ({ chapter }: { chapter: Chapter }) => {
  const locale = useLocale()
  const t = useTranslations('common.chapterWrapper')

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content')
  const [sanitizedLessonContent, setSanitizedLessonContent] = useState('')
  const [sanitizedExercise, setSanitizedExercise] = useState('')

  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const currentLesson = pathParts[pathParts.length - 1]
  const currentLessonData = chapter.lessons.find(
    (e) => e.slug === currentLesson,
  )

  const lessonTitle = currentLessonData?.title || 'Lezione non trovata'
  const lessonContent =
    currentLessonData?.lessonContent || '<p>Contenuto non disponibile</p>'
  const quizQuestion =
    currentLessonData?.quizQuestion || 'Nessuna domanda disponibile'
  const quizAnswer = currentLessonData?.quizAnswer || ''
  const exercise = currentLessonData?.exercise || ''

  useEffect(() => {
    const sanitizeContent = async () => {
      const DOMPurify = (await import('dompurify')).default
      setSanitizedLessonContent(DOMPurify.sanitize(lessonContent))
      setSanitizedExercise(DOMPurify.sanitize(exercise))
    }

    sanitizeContent()
  }, [lessonContent, exercise])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      closeSidebar()
    }
  }

  if (!currentLessonData) {
    redirect({
      href: '/',
      locale: locale,
    })
  }

  return (
    <div className="relative flex flex-col overflow-hidden bg-gray-100 text-black md:h-screen md:flex-row">
      {/* Mobile Header with menu button */}
      <div className="flex items-center justify-between bg-white p-4 shadow-sm md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">{chapter.title}</h1>
        <div className="w-6"></div> {/* Spacer for centering title */}
      </div>

      {/* Sidebar component with open/close functionality and transitions */}
      <div
        className={` ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} absolute z-10 h-full transition-transform duration-300 ease-in-out md:relative md:block md:translate-x-0`}
      >
        <Sidebar lessonName={chapter.title} lessons={chapter.lessons} />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden"
          onClick={closeSidebar}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        ></div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile tabs for switching between content and exercises */}
        <div className="flex border-b border-gray-200 md:hidden">
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'content' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('content')}
          >
            {t('content')}
          </button>
          <button
            className={`flex-1 py-3 text-center ${activeTab === 'exercises' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('exercises')}
          >
            {t('exerciseAndQuiz')}
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          {/* Content area */}
          <div
            className={`${activeTab === 'content' ? 'flex' : 'hidden'} flex-col md:flex md:w-3/5 md:flex-shrink-0 md:flex-grow-0 md:overflow-y-auto md:p-3`}
          >
            <MainContent lessonName={lessonTitle}>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedLessonContent }}
              />
            </MainContent>
          </div>

          {/* Exercise/Quiz area */}
          <div
            className={`${activeTab === 'exercises' ? 'flex' : 'hidden'} flex-col space-y-4 overflow-y-auto bg-gray-100 p-4 md:flex md:w-2/5 md:min-w-48 md:flex-shrink md:flex-grow-0 md:space-y-6 md:p-6`}
          >
            <ExerciseBox>
              <div dangerouslySetInnerHTML={{ __html: sanitizedExercise }} />
            </ExerciseBox>
            <QuizBox question={quizQuestion} correctAnswer={quizAnswer} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterWrapper
