import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  backgroundColor: z.string().optional().default('#f5f5f5'),
})

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  backgroundColor: z.string().optional(),
})

export type CreateNoteSchema = z.infer<typeof createNoteSchema> & {
  authorId: string
}
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema> & {
  noteId: string
}
