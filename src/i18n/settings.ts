export const i18n = {
  defaultLocale: 'fa',
  // Add more languages in future if needded
  locales: ['fa', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]