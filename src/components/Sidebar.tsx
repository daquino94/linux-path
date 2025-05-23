import React from 'react'
import { Lesson } from '@/types/types'
import { Link, usePathname } from '@/i18n/navigation'

const Sidebar: React.FC<{ lessons: Lesson[]; lessonName: string }> = ({
  lessons,
  lessonName,
}) => {
  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const basePath = pathParts.slice(0, pathParts.length - 1).join('/')
  const currentLesson = pathParts[pathParts.length - 1]
  const ordinatedLesson = lessons.sort((a, b) => a.id - b.id)

  return (
    <div className="flex h-screen w-64 flex-col rounded-r-2xl bg-sky-800 text-white shadow-lg md:rounded-r-none">
      <div className="flex items-center justify-between border-b border-sky-600 p-4">
        <h2 className="text-xl font-medium">{lessonName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {ordinatedLesson.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${basePath}/${item.slug}`}
              className={`block cursor-pointer border-b border-sky-600 p-4 transition-colors hover:bg-sky-600 ${
                currentLesson.toLowerCase() === item.slug ? 'bg-sky-600' : ''
              }`}
            >
              {index + 1}. {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
