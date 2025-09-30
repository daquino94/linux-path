import ChapterWrapper from '@/components/ChapterWrapper'
import { Chapter } from '@/types/types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/routing'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const allParams: { lang: string; chapter: string; lesson: string }[] = []

  for (const lang of locales) {
    const messagesModule = await import(`@/messages/${lang}.json`)
    const messages = messagesModule.default as { chapters: Chapter[] }

    for (const chapter of messages.chapters || []) {
      for (const lesson of chapter.lessons || []) {
        allParams.push({ lang, chapter: chapter.slug, lesson: lesson.slug })
      }
    }
  }

  return allParams
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; chapter: string; lesson: string }>
}) {
  const { lang, chapter } = await params
  const t = await getTranslations({ locale: lang })
  const chaptersData = (t.raw('chapters') || []) as Chapter[]

  const currentChapter = chaptersData.find((e) => e.slug === chapter)
  if (!currentChapter) {
    notFound()
  }

  return <ChapterWrapper chapter={currentChapter} />
}
