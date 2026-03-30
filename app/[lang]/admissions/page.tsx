import type { Metadata } from 'next'
// import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'
import FAQAccordion from '@/app/components/FAQAccordion'

export const metadata: Metadata = { title: 'Admissions' }

export default async function AdmissionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.admissions

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
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Join TMS</span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto mb-10">{t.heroSub}</p>
          {/* <Link
            href="#apply"
            id="admissions-hero-cta"
            className="inline-block px-8 py-3.5 bg-[#C9A84C] text-[#0e2e2c] font-bold text-sm tracking-wide
              uppercase rounded-full hover:bg-[#e0c06a] transition-all duration-300 shadow-lg"
          >
            {t.applyBtn}
          </Link> */}
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#4a6361] text-base sm:text-lg leading-relaxed border-l-4 border-[#C9A84C] pl-6 py-2 italic">
            {t.overviewBody}
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title={t.processTitle} />
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[#C9A84C]/20 hidden sm:block" />
            <div className="flex flex-col gap-4">
              {t.processSteps.map((step, i) => (
                <div key={i} className="relative flex gap-6 items-start pl-0 sm:pl-16">
                  {/* Step bubble */}
                  <div className="hidden sm:flex absolute left-0 w-10 h-10 rounded-full bg-[#1B5954] text-[#C9A84C]
                    font-bold text-sm items-center justify-center border-2 border-[#C9A84C]/40 flex-shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-[#1B5954]/10
                    hover:border-[#C9A84C]/30 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <span className="sm:hidden w-7 h-7 rounded-full bg-[#1B5954] text-[#C9A84C] font-bold text-xs
                        flex items-center justify-center border border-[#C9A84C]/40 flex-shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#1B5954] mb-1">{step.title}</h3>
                        <p className="text-[#4a6361] text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Criteria" title={t.criteriaTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.criteriaItems.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#1B5954]/10
                hover:border-[#C9A84C]/30 transition-all duration-200">
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

      {/* Equity Policy */}
      <section className="py-20 bg-[#1B5954]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Equity</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">{t.equityTitle}</h2>
          </div>
          <p className="text-white/70 mb-6">{t.equityBody}</p>
          <ul className="flex flex-col gap-3">
            {t.equityItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Recognition" title={t.recognitionTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.recognitionItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#1B5954]/10 shadow-sm">
                <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
                <h3 className="font-serif text-[#1B5954] font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#4a6361] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Organization Recognition Avatars */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {[
              { src: '/images/moe.jpg', alt: 'MOE' },
              { src: '/images/moh.jpg', alt: 'MOH' },
              { src: '/images/umm-interm-logo.jpg', alt: 'UMM Interim Logo' },
            ].map((img, idx) => (
              <div
                key={idx}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-[#1B5954]/5 bg-white flex items-center justify-center p-1 sm:p-2 hover:scale-105 transition-transform duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title={t.faqTitle} />
          <FAQAccordion items={t.faqItems} />
        </div>
      </section>

      {/* Apply CTA */}
      {/* <section
        id="apply"
        className="py-20 bg-gradient-to-r from-[#0e2e2c] via-[#1B5954] to-[#143f3c] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-white/70 mb-10">
            The application portal for the 2026 intake will open soon. Check the Announcements page for updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/announcements`}
              id="admissions-cta-announcements"
              className="px-8 py-3.5 bg-[#C9A84C] text-[#0e2e2c] font-bold text-sm tracking-wide
                uppercase rounded-full hover:bg-[#e0c06a] transition-all duration-300 shadow-lg"
            >
              {t.applyBtn}
            </Link>
            <Link
              href={`/${lang}/contact`}
              id="admissions-cta-contact"
              className="px-8 py-3.5 border-2 border-white/40 text-white font-bold text-sm tracking-wide
                uppercase rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section> */}
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
