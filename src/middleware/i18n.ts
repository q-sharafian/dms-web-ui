import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n/settings'

export function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // TODO: Edited to be smarter in future
    const locale = i18n.defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}