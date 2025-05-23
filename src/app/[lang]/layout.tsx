import type { Metadata } from 'next'
import { Ubuntu, Ubuntu_Mono } from 'next/font/google'
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

const geistSans = Ubuntu({
  variable: '--font-ubuntu-sans',
  subsets: ['latin'],
  weight: '400',
})

const geistMono = Ubuntu_Mono({
  variable: '--font-ubuntu-mono',
  subsets: ['latin'],
  weight: '700',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
