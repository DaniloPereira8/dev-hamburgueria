import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
// import { v4 } from 'uuid'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductsController from './app/controllers/ProductsController'

const upload = multer(multerConfig)
// import User from './app/models/User'
const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/products', upload.single('file'), ProductsController.store)

// routes.get('/', async (request, response) => {
//   const user = await User.create({
//     id:v4(),
//     name: 'Danilo',
//     email: 'danmatmigste23@gmail.com',
//     password_hash: '258gfd4h8lcdyhmj'
//   })
//   return response.json(user)
// })

export default routes
