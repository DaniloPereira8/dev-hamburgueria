import Sequelize, { Model } from 'sequelize'

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const baseURL = 'https://cariri-flavor-co-api.onrender.com'

            return `${baseURL}/category-file/${this.path}`
          },
        },
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
      },
    )
    return this
  }
}

export default Category
