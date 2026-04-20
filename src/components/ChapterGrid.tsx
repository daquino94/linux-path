'use client'
import Card from '@/components/Card'
import { Chapter, Lesson } from '@/types/types'
import { useProgress } from '@/contexts/ProgressContext'

interface ChapterGridProps {
  chapters: Chapter[]
}

export default function ChapterGrid({ chapters }: ChapterGridProps) {
  const { isLessonComplete } = useProgress()

  const isChapterComplete = (lessons: Lesson[]) => {
    if (!lessons || lessons.length === 0) return false
    return lessons.every((lesson) => isLessonComplete(lesson.slug))
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {chapters.map((card, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortedLessons = ([...(card.lessons || [])] as any[])
          .slice()
          .sort((a, b) => a.id - b.id)
        const firstLesson = sortedLessons[0]

        if (!firstLesson) return null

        const completed = isChapterComplete(card.lessons)

        return (
          <div key={index} className="h-full">
            <Card
              href={`${card.slug}/${firstLesson.slug}`}
              title={card.title}
              description={card.description}
              imageSrc={card.image || '/images/chapters/gettingStarted.png'}
              state={completed ? 'COMPLETED' : 'NEW'}
            />
          </div>
        )
      })}
    </div>
  )
}
