import { Router } from 'express'
import noteController from '../controllers/note.controller'
import auth from '../middlewares/auth'

const noteRouter = Router()

noteRouter.use(auth.requireAuth)

noteRouter.post('/', noteController.createNote)
noteRouter.get('/', noteController.getAllNotes)
noteRouter.get('/my-notes', noteController.getMyNotes)
noteRouter.get('/:id', noteController.getNoteById)
noteRouter.put('/:id', noteController.updateNote)
noteRouter.delete('/:id', noteController.deleteNote)

export default noteRouter
