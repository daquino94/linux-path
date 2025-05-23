import 'server-only'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Card from '@/components/Card'
import Hero from '@/components/Hero'
import { Resource } from '@/types/types'
import { Locales } from '@/i18n/routing'

type Props = {
  params: Promise<Locales>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).lang
  const t = await getTranslations({ locale, namespace: 'common' })

  return {
    title: t('resources.title'),
  }
}

export default function Page() {
  const t = useTranslations('common')
  const cardData: Resource[] = t.raw('resources.data')
  return (
    <>
      <Hero
        title={t('resources.hero.title')}
        image={t('resources.hero.image')}
        subtitle={t('resources.hero.subtitle')}
      />
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <div key={index} className="h-full">
                <Card
                  href={`${card.href}`}
                  target="_blank"
                  title={card.title}
                  description={card.description}
                  imageSrc={card.image || '/images/link.png'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
