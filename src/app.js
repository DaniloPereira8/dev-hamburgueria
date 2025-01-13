import dotenv from 'dotenv'
import express from 'express'
import routes from './routes.js'
import { resolve } from 'path'
import cors from 'cors'
import './database' // Isso carrega as variáveis do arquivo .env
dotenv.config()

class App {
  constructor() {
    this.app = express()

    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL, // Define o domínio permitido
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define os métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Define os headers permitidos
        credentials: true, // Permite o envio de cookies
      }),
    ) // dentro tem que colocar por exemplo www.deuburger.com.br
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

// DADOS PARA CONECTAR LOCALMENTE

// import dotenv from 'dotenv'
// import express from 'express'
// import routes from './routes.js'
// import { resolve } from 'path'
// import cors from 'cors'
// import './database' // Isso carrega as variáveis do arquivo .env
// dotenv.config()

// class App {
//   constructor() {
//     this.app = express()
//     this.app.use(cors()) // dentro tem que colocar por exemplo www.deuburger.com.br
//     this.middlewares()
//     this.routes()
//   }

//   middlewares() {
//     this.app.use(express.json())
//     this.app.use(
//       '/product-file',
//       express.static(resolve(__dirname, '..', 'uploads')),
//     )

//     this.app.use(express.json())
//     this.app.use(
//       '/category-file',
//       express.static(resolve(__dirname, '..', 'uploads')),
//     )
//   }

//   routes() {
//     this.app.use(routes)
//   }
// }

// export default new App().app
