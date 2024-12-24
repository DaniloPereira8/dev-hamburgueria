import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductsController from './app/controllers/ProductsController'
import authMiddleware from './app/middlewares/auth'
import CreatePaymentIntentController from './app/controllers/Stripe/CreatePaymentIntentController'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // seta chamado por todasas rotas ABAIXO.

routes.post('/products', upload.single('file'), ProductsController.store)
routes.get('/products', ProductsController.index)
routes.put('/products/:id', upload.single('file'), ProductsController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

routes.post('/create-payment-intent', CreatePaymentIntentController.store)

export default routes
