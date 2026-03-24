import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'my']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') || ''
  const preferred = acceptLang.split(',')[0].trim().slice(0, 2).toLowerCase()
  return locales.includes(preferred) ? preferred : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for static assets and Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already contains a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images).*)'],
}
