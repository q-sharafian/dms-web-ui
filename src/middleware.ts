import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nMiddleware } from './middleware/i18n'

export function middleware(request: NextRequest) {
  // Run i18n middleware
  const i18nResponse = i18nMiddleware(request)
  if (i18nResponse) return i18nResponse

  // You can add more middleware here
  // Example: auth, logging, etc.

  return NextResponse.next()
}
// Exclude some routes to use middlewares
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|imgs).*)']
}