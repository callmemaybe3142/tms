'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

type NavItem = { label: string; href: string }

interface NavbarProps {
  navItems: NavItem[]
  langLabel: string
  currentLang: string
}

export default function Navbar({ navItems, langLabel, currentLang }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const otherLang = currentLang === 'en' ? 'my' : 'en'

  // Switch language by replacing the lang segment in current path
  const langHref = pathname.replace(`/${currentLang}`, `/${otherLang}`)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu when pathname changes (wrapped in setTimeout to avoid synchronous setState-in-effect warning)
  useEffect(() => {
    const t = setTimeout(() => setIsOpen(false), 0)
    return () => clearTimeout(t)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === `/${currentLang}`) {
      return pathname === href || pathname === `${href}/`
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0e2e2c]/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-[#0e2e2c]/80 backdrop-blur-sm'
      }`}
    >
      {/* Top stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#C9A84C] via-[#e0c06a] to-[#C9A84C]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${currentLang}`} className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-tms.png"
                alt="Tealand Medical School Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-[#C9A84C] font-bold text-base tracking-wide">
                Tealand
              </span>
              <span className="text-white/90 text-xs font-medium tracking-widest uppercase">
                Medical School
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-md
                  ${isActive(item.href)
                    ? 'text-[#C9A84C]'
                    : 'text-white/80 hover:text-white'
                  }
                  group
                `}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#C9A84C] rounded-full transition-transform duration-200
                    ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}
                />
              </Link>
            ))}

            {/* Language toggle */}
            <Link
              href={langHref}
              className="ml-4 px-4 py-1.5 border border-[#C9A84C]/60 text-[#C9A84C] text-sm font-medium
                rounded-full hover:bg-[#C9A84C] hover:text-[#0e2e2c] transition-all duration-200 tracking-wide"
            >
              {langLabel}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={langHref}
              className="px-3 py-1 border border-[#C9A84C]/60 text-[#C9A84C] text-xs font-medium
                rounded-full hover:bg-[#C9A84C] hover:text-[#0e2e2c] transition-all duration-200"
            >
              {langLabel}
            </Link>
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0e2e2c]/98 border-t border-[#C9A84C]/20`}
      >
        <nav className="px-4 pb-6 pt-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive(item.href)
                  ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
