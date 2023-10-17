import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddlewares from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import UnitController from './app/controllers/UnitController'

import BedroomController from './app/controllers/BedroomController'
import ListBedroomByUnitControlller from './app/controllers/ListBedroomByUnitControlller'

import ReservationController from './app/controllers/ReservationController'
import ListReservationByUserController from './app/controllers/ListReservationByUserController'

const upload = multer(multerConfig)
const routes = Router()

routes.post('/user', UserController.store)
routes.post('/sessions', SessionController.store)

routes.get('/units', UnitController.index)

routes.get('/unit/bedrooms', ListBedroomByUnitControlller.index)
routes.get('/bedroom/:id', BedroomController.show)

routes.use(authMiddlewares)
routes.post('/unit', upload.single('file'), UnitController.store)
routes.put('/unit/:id', upload.single('file'), UnitController.update)

routes.get('/bedrooms', BedroomController.index)
routes.post('/bedroom', upload.array('file', 3), BedroomController.store)
routes.put(
  '/bedroom/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image_l', maxCount: 1 },
    { name: 'image_r', maxCount: 1 },
  ]),
  BedroomController.update,
)

routes.post('/reservation', ReservationController.store)
routes.get('/reservations', ReservationController.index)
routes.get('/user/reservations', ListReservationByUserController.index)
routes.delete('/reservation/:id', ReservationController.delete)

export default routes
