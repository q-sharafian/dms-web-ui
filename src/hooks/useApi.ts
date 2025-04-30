/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';

interface UseApiResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: any[]) => Promise<T | undefined>
}

/**
 * React hook to wrap an API function with state management.  
 * This function doesn't throw any error, just sets the error properties if occured any error.
 * 
 * It returns an object with the following properties:
 * - `data`: The response data of the API call, or `null` if the call is loading or if it has failed.
 * - `loading`: A boolean indicating if the API call is currently loading.
 * - `error`: An error object if the API call has failed, or `null` if it has not failed.
 * - `execute`: A function that can be called to execute the API call. It takes the same arguments as the `apiFunction`.
 *
 * @param apiFunction - The function that makes the API call, which should return a Promise resolving to the response data.
 * @param immediate - A boolean indicating if the API call should be executed immediately when the component mounts. Defaults to `false`.
 * @param setLoadingC - A function that can be called to increase/decrease the loading count when calling the API.
 * @returns An object with the above properties.
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  immediate = false,
  setLoadingC?: (val: number) => void
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoadingC?.(1);
        setLoading(true)
        setError(null)
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err) {
        setError(err as Error)
        // throw err
      } finally {
        setLoadingC?.(-1)
        setLoading(false)
      }
    },
    [apiFunction]
  )

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, loading, error, execute }
}