import Sequelize, { Model } from 'sequelize'

class category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    )
    return this
  }
}

export default category
