import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import UnitController from './app/controllers/UnitController'

const upload = multer(multerConfig)
const routes = Router()

routes.post('/user', UserController.store)
routes.post('/sessions', SessionController.store)

routes.post('/unit', upload.single('file'), UnitController.store)
routes.get('/units', UnitController.index)

export default routes
