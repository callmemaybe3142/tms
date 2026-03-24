import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'

export const metadata: Metadata = { title: 'About Us' }

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.about

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1B5954] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">
              Tealand Medical School
            </span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Overview" title={t.overviewTitle} />
          <p className="text-[#4a6361] text-base sm:text-lg leading-relaxed max-w-3xl">{t.overviewBody}</p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-[#1B5954]/10 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1B5954] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-[#1B5954] font-bold mb-4">{t.visionTitle}</h2>
              <p className="text-[#4a6361] leading-relaxed italic border-l-2 border-[#C9A84C] pl-4">
                {t.visionBody}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-[#1B5954]/10 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1B5954] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-[#1B5954] font-bold mb-4">{t.missionTitle}</h2>
              <ul className="flex flex-col gap-4">
                {t.missionItems.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    </span>
                    <div>
                      <span className="font-semibold text-[#1B5954]">{item.title}: </span>
                      <span className="text-[#4a6361]">{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#1B5954]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">{t.coreValuesTitle}</span>
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">{t.coreValuesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.coreValues.map((val, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15
                  hover:border-[#C9A84C]/40 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#C9A84C] font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-serif text-[#C9A84C] font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Governance" title={t.governanceTitle} />
          <p className="text-[#4a6361] text-base sm:text-lg leading-relaxed mb-12 max-w-3xl">{t.governanceBody}</p>

          <h3 className="font-serif text-2xl text-[#1B5954] font-bold mb-8">{t.orgTitle}</h3>
          <div className="flex flex-col gap-4">
            {t.orgItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-5 rounded-xl border border-[#1B5954]/10
                  bg-[#FAF7F0] hover:border-[#C9A84C]/30 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#1B5954] text-[#C9A84C] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-[#1B5954] mb-1">{item.title}</p>
                  <p className="text-[#4a6361] text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="w-8 h-0.5 bg-[#C9A84C]" />
        <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">{label}</span>
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl text-[#1B5954] font-bold">{title}</h2>
    </div>
  )
}
