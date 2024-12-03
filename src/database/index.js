import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User.js'
import configDatabase from '../config/database.js'
import Product from '../app/models/Product.js'
import category from '../app/models/Category.js'

const models = [User, Product, category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/deuburger',
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // },
    )
  }
}

export default new Database()
