import { logger } from '@/lib/logger/logger'
import { i18n, type Locale } from './settings'

/**
 * Return json dictionary. If  the `locale` was wrong, return default locale.
 */
export const getDictionary = async (locale: Locale) => {
  logger.info(`Loading dictionary for locale: ${locale}`)
  try{
  return (await import(`./locales/${locale}/common.json`)).default
  }
  catch(e){
    logger.error(`Error loading dictionary for locale: ${locale}: ${(e as Error).message}. loading default locale "${i18n.defaultLocale}"`)
    return (await import(`./locales/${i18n.defaultLocale}/common.json`)).default
  }
}