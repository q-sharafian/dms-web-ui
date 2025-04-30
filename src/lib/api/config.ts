const API_CONFIG = {
  // For example https://api.example.com
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    'Content-Type': 'application/json',
  },
}

export function getApiConfig() {
  return API_CONFIG
}

export const enum ResponseType {
  Success = 'success',
  Warn = 'warn',
  Error = 'error',
  Info = "info"
}

/**
 * The response structure used across services
 */
export interface ApiResponse<T> {
  data: T
  statusCode: number
  responseType: ResponseType
  message?: string
}