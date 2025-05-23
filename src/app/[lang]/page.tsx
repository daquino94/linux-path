import Card from '@/components/Card'
import Hero from '@/components/Hero'
import { Chapter } from '@/types/types'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('')
  const cardData: Chapter[] = t
    .raw('chapters')
    .sort((a: { id: number }, b: { id: number }) => a.id - b.id)

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
              // Ordina le lezioni per id e prendi la prima
              const firstLesson = card.lessons.sort((a, b) => a.id - b.id)[0]

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
