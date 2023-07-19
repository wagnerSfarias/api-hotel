import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import UnityController from './app/controllers/UnityController'

const routes = Router()

routes.post('/user', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/unity', UnityController.store)

export default routes
