import ApiClient from '../client'
import { getApiConfig, ApiResponse } from '../config'
import { endpoints } from '../endpoints'

interface User {
  created_by: string;
  id: string;
  is_disabled: number;
  name: string;
  phone_number: string;
}

class UserService {
  private api: ApiClient

  constructor() {
    this.api = ApiClient.getInstance(getApiConfig())
  }

  getCurrentUser = async (): Promise<ApiResponse<User>> => {
    try {
      return this.api.get<User>(endpoints.users.getCurrent())
    } catch (err) {
      throw Error(`failed to get details of current user: ${(err as Error).message}`)
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

  export const userService = new UserService()