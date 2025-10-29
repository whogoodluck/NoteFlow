import { Router } from 'express'
import userController from '../controllers/user.controller'
import auth from '../middlewares/auth'

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)

userRouter.get('/me', auth.requireAuth, userController.validateToken)

userRouter.get('/', auth.requireAuth, userController.getUsers)

userRouter.put('/update-profile', auth.requireAuth, userController.UpdateProfile)

userRouter.get('/:username', userController.getUserByUsername)

export default userRouter
