import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { Analytics } from '@vercel/analytics/next'
import { Locales, localesObject } from '@/i18n/routing'

export async function generateStaticParams() {
  return localesObject
}

export const metadata: Metadata = {
  title: {
    template: '%s | Linux Path',
    default: 'Linux Path',
  },
  description: 'Learn Linux step by step',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<Locales>
}>) {
  const locale = (await params).lang
  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Analytics />
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
