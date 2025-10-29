import type { CreateNoteSchema } from '@/schemas/note.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  createNote,
  deleteNote,
  getMyNotes,
  getNoteById,
  getNotes,
  searchNotes,
  updateNote,
} from '../services/note'

export function useCreateNote() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['my-notes'] })
      toast.success('Note created successfully!')
      navigate('/dashboard')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useGetAllNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })
}

export function useGetMyNotes() {
  return useQuery({
    queryKey: ['my-notes'],
    queryFn: getMyNotes,
  })
}

export function useGetNoteById(id: string) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  })
}

export function useUpdateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ noteId, noteData }: { noteId: string; noteData: CreateNoteSchema }) =>
      updateNote(noteId, noteData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['my-notes'] })
      queryClient.invalidateQueries({ queryKey: ['note', variables.noteId] })
      toast.success('Note updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useDeleteNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['my-notes'] })
      toast.success('Note deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || error.message)
    },
  })
}

export function useSearchNotes(query: string) {
  return useQuery({
    queryKey: ['notes', 'search', query],
    queryFn: () => searchNotes(query),
    enabled: query.trim().length > 0,
    staleTime: 30000,
  })
}
