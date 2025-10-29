import { prisma } from '../lib/prisma'
import { CreateNoteSchema, UpdateNoteSchema } from '../schemas/note.schema'

async function createNote(data: CreateNoteSchema & { authorId: string }) {
  const note = await prisma.note.create({
    data: {
      ...data,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  })

  return note
}

async function getAllNotes() {
  const notes = await prisma.note.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return notes
}

async function getNotesByAuthorId(authorId: string) {
  const notes = await prisma.note.findMany({
    where: {
      authorId,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return notes
}

async function getOneById(id: string) {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  })

  return note
}

async function updateNote(data: UpdateNoteSchema) {
  const { noteId, ...updateData } = data

  const note = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: updateData,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  })

  return note
}

async function deleteNote(id: string) {
  const note = await prisma.note.delete({
    where: {
      id,
    },
  })

  return note
}

export default {
  createNote,
  getAllNotes,
  getNotesByAuthorId,
  getOneById,
  updateNote,
  deleteNote,
}
