/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ClientStorage as cs } from '../clientStorage/clientStorage'
import { LSFieldKey } from '@/interfaces/clientStorageData'
import { ApiResponse, ResponseType } from './config'
import { logger } from '../logger/logger'

/**
 * The response returned from the server.
 */
interface ServerResponse<T> {
  code: number
  details: T
  message: string
  type: "error" | "warning" | "success" | "info"
}

function serverResp2ApiResp<T>(serverResp: ServerResponse<T>): ApiResponse<T> {
  let responseType: ResponseType;
  switch (serverResp.type) {
    case 'success':
      responseType = ResponseType.Success;
      break;
    case 'warning':
      responseType = ResponseType.Warn;
      break;
    case 'error':
      responseType = ResponseType.Error;
      break;
    default:
      responseType = ResponseType.Error;
      logger.error('Unknown server HTTP response type: ', serverResp.type);
      break;
  }

  return {
    data: serverResp.details,
    statusCode: serverResp.code,
    responseType: responseType,
    message: serverResp.message,
  }
}

// API Client configuration
interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

// Create API Client class
class ApiClient {
  private client: AxiosInstance
  private static instance: ApiClient

  private constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    })

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Fetch authentication token from client storage
        const token = cs.getUPItem(LSFieldKey.AuthToken);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific error cases
        if (error.response?.status === 401) {
          // Handle unauthorized access
          // TODO: Enable it
          // window.location.href = process.env.NEXT_PUBLIC_REDIRECT_TO_LOGIN || '/login'
        }
        return Promise.reject(error)
      }
    )

    // Behave with errors like success responses
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status <= 505) {
          return error.response
        }
        return Promise.reject(error)
      }
    )
  }
  public static getInstance(config: ApiClientConfig): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(config)
    }
    return ApiClient.instance
  }

  /**
   * Send a GET request to the specified URL and return the result as an ApiResponse
   *
   * @param url The URL to send the GET request to
   * @param config Optional AxiosRequestConfig to customize the request
   * @returns A Promise resolving to the ApiResponse
   * @throws An Error if the request fails
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ServerResponse<T>> = await this.client.get(url, config)
      const resp = serverResp2ApiResp<T>(response.data)
      return resp
    } catch (err) {
      throw Error(`failed to send GET request to ${url}: ${(err as Error).message}`)
    }
  }

  /**
   * Send a POST request to the specified URL and return the result as an ApiResponse
   *
   * @param url The URL to send the POST request to
   * @param data Optional data to be sent in the request body
   * @param config Optional AxiosRequestConfig to customize the request
   * @returns A Promise resolving to the ApiResponse
   * @throws An Error if the request fails
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ServerResponse<T>> = await this.client.post(url, data, config)
      const resp = serverResp2ApiResp<T>(response.data)
      return resp;
    } catch (err) {
      throw Error(`failed to send POST request to ${url}: ${(err as Error).message}`)
    }
  }

  /**
   * Send a PUT request to the specified URL and return the result as an ApiResponse
   *
   * @param url The URL to send the PUT request to
   * @param data Optional data to be sent in the request body
   * @param config Optional AxiosRequestConfig to customize the request
   * @returns A Promise resolving to the ApiResponse
   * @throws An Error if the request fails
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ServerResponse<T>> = await this.client.put(url, data, config)
      const resp =  serverResp2ApiResp<T>(response.data)
      return resp;
    } catch (err) {
      throw Error(`failed to send PUT request to ${url}: ${(err as Error).message}`)
    }
  }

  /**
   * Send a DELETE request to the specified URL and return the result as an ApiResponse.
   *
   * @param url The URL to send the DELETE request to.
   * @param config Optional AxiosRequestConfig to customize the request.
   * @returns A Promise resolving to the ApiResponse.
   * @throws An Error if the request fails.
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ServerResponse<T>> = await this.client.delete(url, config)
      const resp = serverResp2ApiResp<T>(response.data)
      return resp;
    } catch (err) {
      throw Error(`failed to send DELETE request to ${url}: ${(err as Error).message}`)
    }
  }
}

export default ApiClient