import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const baseURL = 'https://cariri-flavor-co-api.onrender.com'

            return `${baseURL}/product-file/${this.path}`
          },
        },
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
      },
    )
    return this
  }

  static associate(models) {
    // Configuração da relação com categorias
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }
}

export default Product

// sem modificações

// import Sequelize, { Model } from 'sequelize'

// class Product extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         name: Sequelize.STRING,
//         price: Sequelize.INTEGER,
//         path: Sequelize.STRING,
//         offer: Sequelize.BOOLEAN,
//         url: {
//           type: Sequelize.VIRTUAL,
//           get() {
//             return `http://localhost:3001/product-file/${this.path}`
//           },
//         },
//       },
//       {
//         sequelize,
//       },
//     )
//     return this
//   }

//   static associate(models) {
//     // Configuração da relação com categorias
//     this.belongsTo(models.Category, {
//       foreignKey: 'category_id',
//       as: 'category',
//     })
//   }
// }

// export default Product
