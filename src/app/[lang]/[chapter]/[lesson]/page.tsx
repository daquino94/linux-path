'use client'
import ChapterWrapper from '@/components/ChapterWrapper'
import { Chapter } from '@/types/types'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { notFound } from 'next/navigation'

export default function Page() {
  const t = useTranslations('')
  const chaptersData: Chapter[] = t.raw('chapters')

  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const currentLesson = pathParts[pathParts.length - 2]
  const currentChapter = chaptersData.find((e) => e.slug === currentLesson)

  if (!currentChapter) {
    notFound()
  }

  return <ChapterWrapper chapter={currentChapter} />
}
