// src/app/[lang]/page.tsx
import Card from '@/components/Card'
import Hero from '@/components/Hero'
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
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const firstLesson = ([...(card.lessons || [])] as any[])
                .slice()
                .sort((a, b) => a.id - b.id)[0]

              if (!firstLesson) return null

              return (
                <div key={index} className="h-full">
                  <Card
                    href={`${card.slug}/${firstLesson.slug}`}
                    title={card.title}
                    description={card.description}
                    imageSrc={
                      card.image || '/images/chapters/gettingStarted.png'
                    }
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
