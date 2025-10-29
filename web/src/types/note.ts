import type { User } from './user'

export interface Note {
  id: string
  title: string
  content: string
  backgroundColor: string
  authorId: string
  author: User
  createdAt: string
  updatedAt: string
}
