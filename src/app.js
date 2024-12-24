import dotenv from 'dotenv' // Isso carrega as variáveis do arquivo .env
import express from 'express'
import routes from './routes.js'
import { resolve } from 'path'
import cors from 'cors'

import './database'
dotenv.config()

class App {
  constructor() {
    this.app = express()
    this.app.use(cors()) // dentro tem que colocar por exemplo www.deuburger.com.br

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )

    this.app.use(express.json())
    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
