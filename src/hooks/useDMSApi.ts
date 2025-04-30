/* eslint-disable @typescript-eslint/no-explicit-any */
import { MsgTypes } from "@/interfaces/msgType"
import { useApi } from "./useApi"
import { ApiResponse } from "@/lib/api/config"
import { useCMessage } from "./useCMessage"
import { useEffect } from "react"

interface UseApiResponse<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: any[]) => Promise<T | undefined>
}

/**
 * A React hook that integrates API calls with message handling and state management.
 *
 * This hook wraps an API function, executes it, and manages the state of the request.
 * It provides feedback messages based on the API response and the specified acceptable message types.
 *
 * @param apiFunction - The function that makes the API call, which should return 
 * a Promise resolving to an ApiResponse.
 * @param immediate - A boolean indicating if the API call should be executed immediately 
 * when the component mounts. Defaults to `false`.
 * @param setLoadingC - An optional function to modify the loading state. (to display 
 * something like a spinner to show that an operation is in progress)
 * @param acceptableMsgs - An optional array of message types that are considered acceptable to be displayed.
 * 
 * @returns An object containing the API response data, loading status, error information, and an 
 * execute function to manually trigger the API call.
 */

export function useDMSApi<T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  immediate = false,
  setLoadingC?: (val: number) => void,
  acceptableMsgs?: MsgTypes[]
): UseApiResponse<ApiResponse<T>> {
  const { showMsg } = useCMessage()
  // const handleMsg = <T>(
  //   resp: ApiResponse<T> | null,
  //   acceptableMsgs: MsgTypes[] | undefined,
  // ) => {
  //   if (acceptableMsgs == undefined) return
  //   else if (resp == null && acceptableMsgs.includes('error')) {
  //     showMsg("error", "مشکلی در هنگام دریافت پاسخ از سرور رخ داد. لطفا مجددا امتحان نمایید.2");
  //     return;
  //   }
  // }
  const { data, loading, error, execute } = useApi(
    apiFunction,
    immediate,
    setLoadingC
  )

  useEffect(() => {
    if (!loading && data != null) {
      // showMsg(data, acceptableMsgs);
      handleMsg(data, acceptableMsgs, showMsg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  return { data, loading, error, execute }
}

function handleMsg<T>(
  resp: ApiResponse<T> | null,
  acceptableMsgs: MsgTypes[] | undefined,
  showMsg: (type: MsgTypes, message: string) => void
) {
  if (acceptableMsgs == undefined) return
  else if (resp == null && acceptableMsgs.includes('error')) {
    showMsg("error", "مشکلی در هنگام دریافت پاسخ از سرور رخ داد. لطفا مجددا امتحان نمایید.2");
    return;
  }

  switch (resp?.responseType) {
    case 'error':
      if (acceptableMsgs.includes('error')) {
        showMsg("error", resp.message ?? "خطا");
      }
      break;
    case 'info':
      if (acceptableMsgs.includes('info')) {
        showMsg("info", resp.message ?? "اطلاع");
      }
      break;
    case 'warn':
      if (acceptableMsgs.includes('warn')) {
        showMsg("warn", resp.message ?? "هشدار غیر منتظره");
      }
      break;
    case 'success':
      if (acceptableMsgs.includes('success')) {
        showMsg("success", resp.message ?? "موفقیت غیر منتظره");
      }
      break;
  }
}
