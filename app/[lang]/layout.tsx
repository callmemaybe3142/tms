import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/lib/dictionaries'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import '../globals.css'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: {
      template: '%s | Tealand Medical School',
      default: 'Tealand Medical School',
    },
    description:
      lang === 'my'
        ? 'တိလမ်းဆေးကျောင်း - တက်မြောက်သော ဆရာဝန်များ မွေးထုတ်ရေး'
        : 'Tealand Medical School — Nurturing Competent, Ethical, and Socially Accountable Medical Professionals',
    keywords: ['Tealand Medical School', 'TMS', 'medical education', 'Myanmar', "Ta'angland", 'MBBS'],
    metadataBase: new URL('https://tms.edu.mm'),
    openGraph: {
      siteName: 'Tealand Medical School',
      type: 'website',
      locale: lang === 'my' ? 'my_MM' : 'en_US',
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.academics, href: `/${lang}/academics` },
    { label: dict.nav.admissions, href: `/${lang}/admissions` },
    { label: dict.nav.announcements, href: `/${lang}/announcements` },
    { label: dict.nav.news, href: `/${lang}/news` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ]

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}>
      <body className="font-sans min-h-full flex flex-col bg-[#FAF7F0] antialiased" suppressHydrationWarning>
        <NextTopLoader color="#C9A84C" showSpinner={true} shadow="0 0 10px #C9A84C,0 0 5px #C9A84C" height={4} zIndex={1600} />
        <Navbar
          navItems={navItems}
          langLabel={dict.nav.language}
          currentLang={lang}
        />
        <main className="flex-1 pt-20">{children}</main>
        <Footer dict={dict.footer} navItems={navItems} lang={lang} />
      </body>
    </html>
  )
}
