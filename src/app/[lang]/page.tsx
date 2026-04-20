// src/app/[lang]/page.tsx
import Hero from '@/components/Hero'
import ChapterGrid from '@/components/ChapterGrid'
import { Chapter } from '@/types/types'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/i18n/routing'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const locale = (await params).lang

  const t = await getTranslations({ locale })

  const rawChapters = (t.raw('chapters') || []) as Chapter[]
  const cardData = [...rawChapters].sort((a, b) => a.id - b.id)

  return (
    <>
      <Hero
        title={t('common.hero.title')}
        image={t('common.hero.image')}
        subtitle={t('common.hero.subtitle')}
      />
      <div className="min-h-screen bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <ChapterGrid chapters={cardData} />
        </div>
      </div>
    </>
  )
}
