import React from 'react'
import { MainContentProps } from '@/types/types'

const MainContent: React.FC<MainContentProps> = ({ lessonName, children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-6 text-black md:rounded-2xl dark:bg-slate-800 dark:text-gray-100">
      <h1 className="mb-4 text-2xl font-bold">{lessonName}</h1>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  )
}

export default MainContent
