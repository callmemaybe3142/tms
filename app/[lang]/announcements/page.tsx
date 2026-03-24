import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'

export const metadata: Metadata = { title: 'Announcements' }

export default async function AnnouncementsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.announcements

  return (
    <>
      <section className="bg-[#1B5954] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Official Notices</span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      <section className="py-32 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#1B5954]/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#1B5954]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-[#1B5954] font-bold mb-4">{t.placeholderTitle}</h2>
          <p className="text-[#4a6361] text-lg leading-relaxed">{t.placeholderBody}</p>
          <div className="mt-10 h-0.5 w-24 bg-[#C9A84C] mx-auto" />
        </div>
      </section>
    </>
  )
}
