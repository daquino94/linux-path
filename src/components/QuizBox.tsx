'use client'
import React, { useState } from 'react'
import { QuizBoxProps } from '@/types/types'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const QuizBox: React.FC<QuizBoxProps> = ({
  question,
  correctAnswer,
  nextLessonSlug,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const t = useTranslations('common.quizBox')
  const router = useRouter()
  const pathname = usePathname()
  const blankQuiz = correctAnswer === ''

  const handleCheck = (): void => {
    if (userAnswer.trim() === '') return

    setIsAnswered(true)
    setIsCorrect(
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase(),
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  const handleShowAnswer = (): void => {
    setShowCorrectAnswer(true)
  }

  const handleNextLesson = (): void => {
    if (nextLessonSlug) {
      const pathParts = pathname.split('/')
      pathParts[pathParts.length - 1] = nextLessonSlug
      const nextPath = pathParts.join('/')
      router.push(nextPath)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{t('quiz')}</h2>
      <p className="mb-6">{question}</p>

      {!blankQuiz && (
        <div className="mb-4 flex items-end gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyUp={handleKeyPress}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={t('placeholderAnswer')}
            />
          </div>
          <button
            onClick={handleCheck}
            className="rounded-md bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600"
          >
            {t('checkAnswer')}
          </button>
        </div>
      )}

      {isAnswered && (
        <div
          className={`mb-4 rounded-md p-3 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {isCorrect ? 'Correct!' : 'Not quite right. Try again!'}
        </div>
      )}

      {!isCorrect && isAnswered && !showCorrectAnswer && (
        <button
          onClick={handleShowAnswer}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          {t('showCorrectAnswer')}
        </button>
      )}

      {showCorrectAnswer && (
        <div className="rounded-md bg-blue-100 p-3 text-blue-800">
          {t('correctAnswer')} {correctAnswer}
        </div>
      )}

      {(isCorrect || correctAnswer === '') && (
        <button
          onClick={handleNextLesson}
          className="mt-4 w-full rounded-md bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          {nextLessonSlug ? t('nextLesson') : t('backToChapters')}
        </button>
      )}
    </div>
  )
}

export default QuizBox
