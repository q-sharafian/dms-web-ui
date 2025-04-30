import ApiClient from '../client'
import { ApiResponse, getApiConfig } from '../config'
import { endpoints } from '../endpoints'

// Types
interface MediaPath {
  file_name: string
  media_type: number
  src: string
}

interface Doc {
  context: string
  created_at: number
  created_by: string
  event_id: string
  id: string
  media_paths: MediaPath[]
}

interface DocWithEventName extends Doc {
  event_name: string;
}

class DocService {
  private api: ApiClient

  constructor() {
    this.api = ApiClient.getInstance(getApiConfig())
  }

  /**
   * 
   * @returns some last docs (specified by offset and limit) for the current user and 
   * one if his job positions.
   */
  getNLastDocs =async (jobPosition: string, offset: number = 0, limit: number = 30): Promise<ApiResponse<DocWithEventName[]>> => {
    try {
      return this.api.get<DocWithEventName[]>(endpoints.docs.list(), {
        params: {
          jpid: jobPosition,
          offset: offset,
          limit: limit
        }
      })
    } catch (err) {
      throw Error(`failed to get last docs for ${jobPosition}, offset: ${offset}, limit: ${limit}: ${(err as Error).message}`)
    }
  }
  // async getUsers(): Promise<User[]> {
  //   return this.api.get<User[]>('/users')
  // }

  // async getUserById(id: number): Promise<User> {
  //   return this.api.get<User>(`/users/${id}`)
  // }

  // async createUser(userData: CreateUserDTO): Promise<User> {
  //   return this.api.post<User>('/users', userData)
  // }

  // async updateUser(id: number, userData: Partial<User>): Promise<User> {
  //   return this.api.put<User>(`/users/${id}`, userData)
  // }

  // async deleteUser(id: number): Promise<void> {
  //   return this.api.delete<void>(`/users/${id}`)
  // }
}

export const docService = new DocService()
export type {DocWithEventName, Doc}