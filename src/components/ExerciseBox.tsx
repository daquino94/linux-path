import { useTranslations } from 'next-intl'
import React from 'react'

const ExerciseBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations('common.exerciseBox')

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{t('exercise')}</h2>
      {children}
    </div>
  )
}

export default ExerciseBox
