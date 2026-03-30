import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '@/app/lib/dictionaries'

export const metadata: Metadata = { title: 'Contact Us' }

// ─── EASILY CHANGEABLE CONTACT DATA ──────────────────────────────
export const CONTACT_DATA = [
  {
    id: 'email',
    label: 'Email',
    value: 'tealandmedicalschool@gmail.com',
    url: 'mailto:tealandmedicalschool@gmail.com',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@Hi9h1ander',
    url: 'https://t.me/Hi9h1ander',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.24-.02.38z" />
      </svg>
    )
  },
  {
    id: 'facebook',
    label: 'Facebook',
    value: 'Tealand Medical School',
    url: 'https://www.facebook.com/profile.php?id=61586995182436', // Replace with exact embedded facebook URL when ready
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.01 3.66 9.16 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.16 22 17.01 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    )
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '09xxxxxxxx',
    url: 'tel:+959xxxxxxxx',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    id: 'website',
    label: 'Website',
    value: 'tealandmedical.school',
    url: 'https://tealandmedical.vercel.app',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
]
// ───────────────────────────────────────────────────────────────

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const t = dict.contact

  return (
    <>
      <section className="bg-[#1B5954] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <span className="w-8 h-0.5 bg-[#C9A84C]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B5954] font-bold mb-4">Contact Information</h2>
            <p className="text-[#4a6361] text-lg max-w-2xl mx-auto">
              Please feel free to reach out to us using any of the direct channels below. We are here to assist you with any inquiries regarding the Tealand Medical School.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACT_DATA.map((info) => (
              <a
                key={info.id}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-[#1B5954]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#C9A84C]/30 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1B5954]/5 flex items-center justify-center text-[#1B5954] mb-6 group-hover:bg-[#1B5954] group-hover:text-white transition-colors duration-300">
                  {info.icon}
                </div>
                <h3 className="text-[#C9A84C] text-sm font-bold uppercase tracking-widest mb-2">
                  {info.label}
                </h3>
                <span className="text-[#0e2e2c] font-semibold text-lg break-words w-full group-hover:text-[#1B5954] transition-colors">
                  {info.value}
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
