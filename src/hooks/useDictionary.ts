/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getDictionary } from "@/i18n/get-dictionary";
import { Locale } from '@/i18n/settings';

interface UseDictionaryResult {
  readonly dictionary: any
  loading: boolean
  error: Error | null
}

/**
 * A hook to fetch dictionary for a given locale.
 *
 * @param locale A locale from the list of supported locales.
 * @returns An object with the following properties:
 * - `dictionary`: The dictionary object, or null if there was an error.
 * - `loading`: A boolean indicating if the dictionary is still loading.
 * - `error`: An error object if there was an error while loading the dictionary, or null otherwise.
 */
export const useDictionary = (locale: Locale): UseDictionaryResult => {
  const [dictionary, setDictionary] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchDictionary = async () => {
      setLoading(true)
      setError(null)
      try {
        const dict = await getDictionary(locale)
        setDictionary(dict)
      } catch (e) {
        setError(e as Error)
        setDictionary(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDictionary()
  }, [locale])

  return { dictionary, loading, error }
}