import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import User from '../app/models/User.js'
// import configDatabase from '../config/database.js'
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
    this.connection = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // Requer SSL
          rejectUnauthorized: false, // Desativa a verificação de certificados, pode ser necessário dependendo do ambiente.
        },
      },
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },
    })

    this.connection
      .authenticate()
      .then(() => console.log('Conexão com PostgreSQL bem-sucedida!'))
      .catch((err) => console.error('Erro ao conectar ao PostgreSQL:', err))

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('Conectado ao MongoDB'))
      .catch((err) => console.error('Erro ao conectar ao MongoDB:', err))
  }
}

export default new Database()
