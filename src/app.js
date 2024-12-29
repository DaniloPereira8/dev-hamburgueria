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

    // Configuração do CORS
    const corsOptions = {
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://danilopereira8.github.io/caririflavorco/' // Substitua pelo domínio do seu frontend em produção
          : 'http://localhost:5173', // URL do frontend local no desenvolvimento (Vite)
      methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
      allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
    }

    // Aplicando o CORS

    this.app.use(cors(corsOptions))

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
