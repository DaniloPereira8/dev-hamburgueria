import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductsController from './app/controllers/ProductsController'
import authMiddleware from './app/middlewares/auth'
const upload = multer(multerConfig)
// import User from './app/models/User'
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // seta chamado por todasas rotas ABAIXO.

routes.post('/products', upload.single('file'), ProductsController.store)
routes.get('/products', authMiddleware, ProductsController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes
