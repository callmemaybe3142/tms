import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'
import FAQAccordion from '@/app/components/FAQAccordion'
import { CurriculumGallery } from './CurriculumGallery'

export const metadata: Metadata = { title: 'Academics' }

export default async function AcademicsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.academics

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
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">M.B,B.S Programme</span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#4a6361] text-base sm:text-lg leading-relaxed border-l-4 border-[#C9A84C] pl-6 py-2 italic">
            {t.overviewBody}
          </p>
        </div>
      </section>

      {/* Curriculum Phases */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Programme" title={t.curriculumTitle} />
          <p className="text-[#4a6361] mb-12">{t.curriculumBody}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-[#C9A84C]/30 z-0" />

            {t.phases.map((phase, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-8 border border-[#1B5954]/10 shadow-sm
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 z-10"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1B5954] border-2 border-[#C9A84C] shadow" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-widest">{phase.phase}</span>
                <h3 className="font-serif text-[#1B5954] font-bold text-xl mt-2 mb-1">{phase.title}</h3>
                <p className="text-[#C9A84C]/80 text-sm font-medium mb-3">{phase.years}</p>
                <p className="text-[#4a6361] text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>

          {/* Curriculum Lightbox Images Module */}
          <CurriculumGallery 
            images={[
              '/images/01-cirriculum.jpg',
              '/images/02-cirriculum.jpg',
              '/images/03-cirriculum.jpg',
              '/images/04-cirriculum.jpg'
            ]} 
          />
        </div>
      </section>

      {/* Teaching Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Methodology" title={t.methodTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.methodItems.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#1B5954]/10
                hover:border-[#C9A84C]/30 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-[#1B5954] text-[#C9A84C] flex items-center justify-center font-bold text-sm mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#1B5954] mb-2">{item.title}</h3>
                <p className="text-[#4a6361] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-20 bg-[#1B5954]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Assessment</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">{t.assessmentTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.assessmentItems.map((item, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-8 border border-white/20
                hover:bg-white/15 hover:border-[#C9A84C]/40 transition-all duration-300">
                <h3 className="font-serif text-[#C9A84C] font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title={t.faqTitle} />
          <FAQAccordion items={t.faqItems} />
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
