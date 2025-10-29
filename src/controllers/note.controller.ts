import { NextFunction, Request, Response } from 'express'
import { ExpressRequest } from '../middlewares/auth'
import { createNoteSchema, updateNoteSchema } from '../schemas/note.schema'
import noteService from '../services/note.service'
import { HttpError } from '../utils/http-error'

function generateRandomColor(): string {
  const colors = [
    '#FFB3BA', // Light pink
    '#FFDFBA', // Light orange
    '#FFFFBA', // Light yellow
    '#BAFFC9', // Light green
    '#BAE1FF', // Light blue
    '#E0BBE4', // Light purple
    '#FFDFD3', // Peach
    '#D4F1F4', // Mint
    '#F8E8EE', // Blush
    '#C9E4DE', // Sage
    '#FFE5B4', // Peach cream
    '#E6E6FA', // Lavender
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

async function createNote(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { title, content } = createNoteSchema.parse(req.body)

    const note = await noteService.createNote({
      title,
      content,
      backgroundColor: generateRandomColor(),
      authorId: req.user!.id,
    })

    res.status(201).json({
      status: 'success',
      message: 'Note created successfully',
      data: note,
    })
  } catch (err) {
    next(err)
  }
}

async function getAllNotes(_req: Request, res: Response, next: NextFunction) {
  try {
    const notes = await noteService.getAllNotes()

    res.status(200).json({
      status: 'success',
      message: 'Notes fetched successfully',
      data: notes,
    })
  } catch (err) {
    next(err)
  }
}

async function getMyNotes(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const notes = await noteService.getNotesByAuthorId(req.user!.id)

    res.status(200).json({
      status: 'success',
      message: 'Notes fetched successfully',
      data: notes,
    })
  } catch (err) {
    next(err)
  }
}

async function getNoteById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const note = await noteService.getOneById(id)

    if (!note) {
      throw new HttpError(404, 'Note not found')
    }

    res.status(200).json({
      status: 'success',
      message: 'Note fetched successfully',
      data: note,
    })
  } catch (err) {
    next(err)
  }
}

async function updateNote(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const updateData = updateNoteSchema.parse(req.body)

    const existingNote = await noteService.getOneById(id)

    if (!existingNote) {
      throw new HttpError(404, 'Note not found')
    }

    if (existingNote.authorId !== req.user!.id) {
      throw new HttpError(403, 'You are not authorized to update this note')
    }

    const note = await noteService.updateNote({
      noteId: id,
      ...updateData,
    })

    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      data: note,
    })
  } catch (err) {
    next(err)
  }
}

async function deleteNote(req: ExpressRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const existingNote = await noteService.getOneById(id)

    if (!existingNote) {
      throw new HttpError(404, 'Note not found')
    }

    if (existingNote.authorId !== req.user!.id) {
      throw new HttpError(403, 'You are not authorized to delete this note')
    }

    await noteService.deleteNote(id)

    res.status(200).json({
      status: 'success',
      message: 'Note deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createNote,
  getAllNotes,
  getMyNotes,
  getNoteById,
  updateNote,
  deleteNote,
}
