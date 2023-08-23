import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddlewares from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import UnitController from './app/controllers/UnitController'

import BedroomController from './app/controllers/BedroomController'

import ReservationController from './app/controllers/ReservationController'

const upload = multer(multerConfig)
const routes = Router()

routes.post('/user', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/units', UnitController.index)

routes.get('/bedroom/:id', BedroomController.index)
routes.get('/bedroom/:id', BedroomController.show)

routes.use(authMiddlewares)
routes.post('/unit', upload.single('file'), UnitController.store)
routes.put('/unit/:id', upload.single('file'), UnitController.update)

routes.post('/bedroom', upload.array('file', 3), BedroomController.store)
routes.put('/bedroom/:id', upload.array('file', 3), BedroomController.update)

routes.post('/reservation', ReservationController.store)
routes.get('/reservations', ReservationController.index)
routes.delete('/reservation/:id', ReservationController.delete)

export default routes
