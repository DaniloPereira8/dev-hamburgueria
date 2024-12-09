// import * as Yup from 'yup'
// import Product from '../models/Product'
// import Category from '../models/Category'
// import Order from '../schemas/Order'
// import User from '../models/User'

// class OrderController {
//   async store(request, response) {
//     const schema = Yup.object().shape({
//       products: Yup.array()
//         .required()
//         .of(
//           Yup.object().shape({
//             id: Yup.number().required(),
//             quantity: Yup.number().required(),
//           }),
//         ),
//     })

//     try {
//       await schema.validateSync(request.body, { abortEarly: false })
//     } catch (err) {
//       return response.status(400).json({ error: err.errors })
//     }

//     const productsId = request.body.products.map((product) => product.id)

//     const updatedProducts = await Product.findAll({
//       where: {
//         id: productsId,
//       },
//       include: [
//         {
//           model: Category,
//           as: 'category',
//           attributes: ['name'],
//         },
//       ],
//     })

//     const editedProduct = updatedProducts.map((product) => {
//       const productIndex = request.body.products.findIndex(
//         (requestProduct) => requestProduct.id === product.id,
//       )

//       const newProduct = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         category: product.category.name,
//         url: product.url,
//         quantity: request.body.products[productIndex].quantity,
//       }

//       return newProduct
//     })

//     const order = {
//       user: {
//         id: request.userId,
//         name: request.userName,
//       },
//       products: editedProduct,
//       status: 'pedido realizado',
//     }

//     const orderResponse = await Order.create(order)

//     return response.status(201).json(orderResponse)
//   }

//   async index(request, response) {
//     const orders = await Order.find()

//     return response.json(orders)
//   }

//   async update(request, response) {
//     const schema = Yup.object().shape({
//       status: Yup.string().required(),
//     })

//     try {
//       await schema.validateSync(request.body, { abortEarly: false })
//     } catch (err) {
//       return response.status(400).json({ error: err.errors })
//     }

//     const { admin: isAdmin } = await User.findByPk(request.userId)

//     if (!isAdmin) {
//       return response.status(401).json()
//     }

//     const { id } = request.params
//     const { status } = request.body

//     try {
//       await Order.updateOne({ _id: id }, { status })
//     } catch (error) {
//       return response.status(400).json({ error: error.message })
//     }

//     return response.json({ message: 'Status atualizado com sucesso' })
//   }
// }

// export default new OrderController()

import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    // Obter os IDs dos produtos do corpo da requisição
    const productsId = request.body.products.map((product) => product.id)

    // Buscar os produtos no banco de dados
    const updatedProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    })

    // Mapear os produtos e enriquecer com informações adicionais
    const editedProduct = updatedProducts.map((product) => {
      const productIndex = request.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id,
      )

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      }

      return newProduct
    })

    // Criar a ordem com os produtos detalhados
    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct, // Produtos detalhados
      status: 'pedido realizado',
    }

    // Salvar a ordem no MongoDB
    await Order.create(order)

    // Retornar a ordem criada (sem campos extras)
    return response.status(201).json({
      user: order.user,
      products: order.products,
      status: order.status,
    })
  }

  async index(request, response) {
    const orders = await Order.find()

    return response.json(orders)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { id } = request.params
    const { status } = request.body

    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }

    return response.json({ message: 'Status atualizado com sucesso' })
  }
}

export default new OrderController()
