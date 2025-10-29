import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  backgroundColor: z.string().optional(),
})

export type CreateNoteSchema = z.infer<typeof createNoteSchema>
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema> & {
  noteId: string
}
