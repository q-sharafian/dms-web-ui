// API endpoints and their types
export interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  title: string
  content: string
  userId: number
}

export const endpoints = {
  docs: {
    list: () => '/docs',
  },
  users: {
    list: () => '/users',
    getCurrent: () => '/users/current',
    get: (id: number) => `/users/${id}`,
    posts: (userId: number) => `/users/${userId}/posts`,
  },
  posts: {
    list: () => '/posts',
    get: (id: number) => `/posts/${id}`,
    create: () => '/posts',
  },
} as const