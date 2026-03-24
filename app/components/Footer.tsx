import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  dict: {
    tagline: string
    rights: string
    quickLinks: string
    contact: string
    follow: string
    address: string
    email: string
    phone: string
  }
  navItems: { label: string; href: string }[]
  lang: string
}

export default function Footer({ dict, navItems, lang }: FooterProps) {
  return (
    <footer className="bg-[#0d1f1e] text-white/80">
      {/* Gold top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-3 mb-4 group w-fit">
              <div className="relative w-14 h-14">
                <Image src="/images/logo-tms.png" alt="TMS Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[#C9A84C] font-bold text-lg">Tealand</span>
                <span className="text-white/70 text-xs tracking-widest uppercase">Medical School</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs font-serif italic mt-4">
              &ldquo;{dict.tagline}&rdquo;
            </p>
            <div className="mt-6 flex gap-3">
              {/* Social icons - placeholder SVGs */}
              {['facebook', 'twitter', 'instagram'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                    hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200"
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-5">
              {dict.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-5">
              {dict.contact}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <LocationIcon />
                <span>{dict.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <EmailIcon />
                <a href={`mailto:${dict.email}`} className="hover:text-[#C9A84C] transition-colors">{dict.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon />
                <a href={`tel:${dict.phone}`} className="hover:text-[#C9A84C] transition-colors">{dict.phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{dict.rights}</p>
          <p className="text-xs text-white/30">
            Est. 2026 · Ta&apos;angland
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'facebook') return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  )
  if (name === 'twitter') return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
  )
  return (
    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function LocationIcon() {
  return <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function EmailIcon() {
  return <svg className="w-4 h-4 flex-shrink-0 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function PhoneIcon() {
  return <svg className="w-4 h-4 flex-shrink-0 text-[#C9A84C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3-8.57A2 2 0 0 1 3 1.34h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.95 5.95l1.73-1.73a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}
