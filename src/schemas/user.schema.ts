import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
})

export type RegisterSchema = z.infer<typeof registerSchema> & {
  username: string
}
export type LoginSchema = z.infer<typeof loginSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
