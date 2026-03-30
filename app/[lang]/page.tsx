import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'

export const metadata: Metadata = { title: 'Home' }

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.home

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Tealand Medical School Campus"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e2e2c]/70 via-[#0e2e2c]/60 to-[#0e2e2c]/90" />
        </div>

        {/* Decorative gold lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent z-10" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24">
          <div className="flex justify-center mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-tms.png"
              alt="TMS Crest"
              className="w-32 h-32 sm:w-44 sm:h-44 object-cover object-center rounded-full drop-shadow-2xl"
            />
          </div>

          <p className="text-[#C9A84C] text-sm sm:text-base tracking-[0.3em] uppercase font-semibold mb-6">
            Tealand Medical School · Est. 2026
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 drop-shadow-lg">
            {t.heroTitle}
          </h1>

          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/academics`}
              id="hero-cta-primary"
              className="px-8 py-3.5 bg-[#C9A84C] text-[#0e2e2c] font-bold text-sm tracking-wide
                rounded-full hover:bg-[#e0c06a] transition-all duration-300 shadow-lg shadow-[#C9A84C]/30
                hover:shadow-xl hover:shadow-[#C9A84C]/40 hover:-translate-y-0.5 uppercase"
            >
              {t.heroCta}
            </Link>
            <Link
              href={`/${lang}/admissions`}
              id="hero-cta-secondary"
              className="px-8 py-3.5 border-2 border-white/50 text-white font-bold text-sm tracking-wide
                rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 uppercase"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ─── INTRODUCTION ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-0.5 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">
                  Tealand Medical School
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B5954] font-bold mb-6 leading-tight">
                {t.introTitle}
              </h2>
              <p className="text-[#4a6361] text-base sm:text-lg leading-relaxed mb-8">
                {t.introBody}
              </p>
              <Link
                href={`/${lang}/about`}
                id="intro-about-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B5954] text-white font-medium text-sm
                  rounded-full hover:bg-[#143f3c] transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                {t.introBtn}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#C9A84C]/20 scale-110" />
                <div className="absolute inset-0 rounded-full border border-[#1B5954]/10 scale-125" />
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#C9A84C]/30 shadow-2xl shadow-[#1B5954]/20">
                  <Image
                    src="/images/logo-tms.png"
                    alt="Tealand Medical School"
                    fill
                    className="object-contain p-8 bg-[#f5f9f8]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK FACTS ──────────────────────────────────── */}
      <section className="py-20 bg-[#1B5954] relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">{t.factsTitle}</span>
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">{t.factsTitle}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(t.facts).map(([key, fact]) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20
                  hover:bg-white/15 hover:border-[#C9A84C]/40 transition-all duration-300 text-center"
              >
                <div className="w-8 h-0.5 bg-[#C9A84C] mx-auto mb-4" />
                <p className="text-[#C9A84C] font-bold text-lg sm:text-xl font-serif mb-2">{fact.value}</p>
                <p className="text-white/70 text-xs sm:text-sm tracking-wide">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPLORE CARDS ────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">{t.exploreTitle}</span>
              <span className="w-8 h-0.5 bg-[#C9A84C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B5954] font-bold">{t.exploreTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { data: t.exploreAcademics, href: `/${lang}/academics`, icon: '🎓', id: 'explore-academics' },
              { data: t.exploreAdmissions, href: `/${lang}/admissions`, icon: '📋', id: 'explore-admissions' },
              { data: t.exploreContact, href: `/${lang}/contact`, icon: '✉️', id: 'explore-contact' },
            ].map(({ data, href, icon, id }) => (
              <div
                key={id}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-[#1B5954]/10
                  hover:shadow-xl hover:shadow-[#1B5954]/10 hover:-translate-y-1 transition-all duration-300
                  flex flex-col"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-serif text-xl text-[#1B5954] font-bold mb-3 group-hover:text-[#143f3c] transition-colors">
                  {data.title}
                </h3>
                <p className="text-[#4a6361] text-sm leading-relaxed flex-1 mb-6">{data.desc}</p>
                <Link
                  id={id}
                  href={href}
                  className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm
                    group-hover:gap-3 transition-all duration-200"
                >
                  {data.btn}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST UPDATES & STORIES ─────────────────────────── */}
      <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
        {/* Soft decorative blur */}
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Announcements Card */}
            <Link
              href={`/${lang}/announcements`}
              className="group relative flex flex-col justify-end p-10 sm:p-14 rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] border border-[#1B5954]/10 shadow-lg hover:shadow-2xl hover:shadow-[#1B5954]/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#1B5954] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2e2c] via-[#1B5954]/80 to-transparent" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

              <div className="relative z-10 flex flex-col items-start text-white">
                <span className="px-4 py-1.5 rounded-full bg-[#C9A84C] text-[#0e2e2c] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                  Official Notices
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4 group-hover:text-[#C9A84C] transition-colors leading-[1.1]">
                  {t.announcementsTitle}
                </h2>
                <p className="text-white/80 text-base sm:text-lg mb-10 max-w-sm leading-relaxed">
                  Stay updated with the latest official announcements, schedules, and notices from Tealand Medical School.
                </p>
                <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  {t.viewAll}
                  <span className="w-10 h-0.5 bg-[#C9A84C]" />
                </div>
              </div>
            </Link>

            {/* News & Articles Card */}
            <Link
              href={`/${lang}/news`}
              className="group relative flex flex-col justify-end p-10 sm:p-14 rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] border border-[#C9A84C]/30 shadow-lg hover:shadow-2xl hover:shadow-[#C9A84C]/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#FAF7F0] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F0] via-transparent to-transparent opacity-50" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B5954 1px, transparent 0)', backgroundSize: '30px 30px' }} />

              <div className="relative z-10 flex flex-col items-start text-[#1B5954]">
                <span className="px-4 py-1.5 rounded-full bg-[#1B5954] text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                  Stories & Insights
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4 group-hover:text-[#143f3c] transition-colors leading-[1.1]">
                  {t.newsTitle}
                </h2>
                <p className="text-[#4a6361] text-base sm:text-lg mb-10 max-w-sm leading-relaxed">
                  Explore exciting stories, research breakthroughs, and campus life articles curated by our community.
                </p>
                <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  {t.viewAll}
                  <span className="w-10 h-0.5 bg-[#1B5954]" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#0e2e2c] via-[#1B5954] to-[#143f3c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
            Ready to Shape the Future of Healthcare?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-10">
            Begin your journey at Tealand Medical School.
          </p>
          <Link
            href={`/${lang}/admissions`}
            id="cta-apply-banner"
            className="inline-block px-10 py-4 bg-[#C9A84C] text-[#0e2e2c] font-bold text-sm tracking-widest
              uppercase rounded-full hover:bg-[#e0c06a] transition-all duration-300
              shadow-lg shadow-[#C9A84C]/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  )
}
