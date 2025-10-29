import { getToken } from '@/lib/utils'
import type { CreateNoteSchema } from '@/schemas/note.schema'
import axios from 'axios'

const baseUrl = '/api/notes'

export const createNote = async (note: CreateNoteSchema) => {
  const res = await axios.post(`${baseUrl}`, note, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getNotes = async () => {
  const res = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getMyNotes = async () => {
  const res = await axios.get(`${baseUrl}/my-notes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const getNoteById = async (noteId: string) => {
  const res = await axios.get(`${baseUrl}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const updateNote = async (noteId: string, note: CreateNoteSchema) => {
  const res = await axios.put(`${baseUrl}/${noteId}`, note, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete(`${baseUrl}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}

export const searchNotes = async (query: string) => {
  const res = await axios.get(`${baseUrl}/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  return res.data
}
