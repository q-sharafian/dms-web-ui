/* eslint-disable @typescript-eslint/no-explicit-any */
import { MsgTypes } from "@/interfaces/msgType"
import { useApi } from "./useApi"
import { ApiResponse } from "@/lib/api/config"
import { useCMessage } from "./useCMessage"
import { useEffect } from "react"

interface UseApiResponse<T> {
  data: T | null
  loading: boolean
  error: ApiResponse<string> | null
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
  const { data, loading, error, execute } = useApi(
    apiFunction,
    immediate,
    setLoadingC
  )
  let formattedError: ApiResponse<string> | null = null
  let returnData: ApiResponse<T> | null = null

  if (!loading) {
    if(data?.responseType == 'error' || data?.responseType == 'warn') {
      formattedError = {
        data: data.data as string ?? "",
        statusCode: data.statusCode,
        responseType: data.responseType,
        message: data.message
      }
      returnData = null
    }
    else {
      formattedError = null
      returnData = data
    }
  }
  useEffect(() => {
    if (!loading && (data != null|| error != null)) {
      // showMsg(data, acceptableMsgs);
      handleMsg(data, acceptableMsgs, showMsg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading])

  return { data: returnData, loading, error: formattedError, execute }
}

function handleMsg<T>(
  data: ApiResponse<T> | null,
  acceptableMsgs: MsgTypes[] | undefined,
  showMsg: (type: MsgTypes, message: string) => void
) {
  if (acceptableMsgs == undefined || acceptableMsgs?.length == 0) return
  else if (data == null && acceptableMsgs.includes('error')) {
    showMsg("error", "مشکلی در هنگام دریافت پاسخ از سرور رخ داد. لطفا مجددا امتحان نمایید.2");
    return;
  }
  
  switch (data?.responseType) {
    case 'error':
      if (acceptableMsgs.includes('error')) {
        showMsg("error", data.message ?? "خطا");
      }
      break;
    case 'info':
      if (acceptableMsgs.includes('info')) {
        showMsg("info", data.message ?? "اطلاع");
      }
      break;
    case 'warn':
      if (acceptableMsgs.includes('warn')) {
        showMsg("warn", data.message ?? "هشدار غیر منتظره");
      }
      break;
    case 'success':
      if (acceptableMsgs.includes('success')) {
        showMsg("success", data.message ?? "موفقیت غیر منتظره");
      }
      break;
  }
}
