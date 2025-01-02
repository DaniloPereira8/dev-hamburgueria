import { config } from 'dotenv'
import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import databaseConfig from '../config/database'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'

config()

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    const { url, dialectOptions } = databaseConfig

    this.connection = new Sequelize(url, {
      dialect: 'postgres',
      dialectOptions,
    })

    // Verifica a conexão com o PostgreSQL
    this.connection
      .authenticate()
      .then(() => {
        console.log('PostgreSQL connected successfully.')
      })
      .catch((error) => {
        console.error('Unable to connect to the PostgreSQL database:', error)
      })

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected successfully.'))
      .catch((error) => {
        console.error('MongoDB connection error:', error)
      })
  }
}

export default new Database()

// DADOS PARA CONECTAR LOCALMENTE
// import { config } from 'dotenv'
// import Sequelize from 'sequelize'
// import mongoose from 'mongoose'
// import configDatabase from '../config/database'
// import User from '../app/models/User.js'
// import Product from '../app/models/Product.js'
// import Category from '../app/models/Category.js'

// config()

// const models = [User, Product, Category]

// class Database {
//   constructor() {
//     this.init()
//     this.mongo()
//   }

//   init() {
//     this.connection = new Sequelize(configDatabase)

//     models
//       .map((model) => model.init(this.connection))
//       .map(
//         (model) => model.associate && model.associate(this.connection.models),
//       )
//   }

//   mongo() {
//     mongoose
//       .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log('MongoDB connected successfully.'))
//       .catch((error) => {
//         console.error('MongoDB connection error:', error)
//       })
//   }
// }

// export default new Database()
