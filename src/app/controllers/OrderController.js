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
      address: Yup.object()
        .shape({
          name: Yup.string().required(),
          street: Yup.string().required(),
          number: Yup.string().required(),
          neighborhood: Yup.string().required(),
          reference: Yup.string(),
          contact: Yup.string().required(),
        })
        .required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { products, address } = request.body

    const productsId = products.map((product) => product.id)

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

    const editedProduct = updatedProducts.map((product) => {
      const productIndex = products.findIndex(
        (requestProduct) => requestProduct.id === product.id,
      )

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: products[productIndex].quantity,
      }

      return newProduct
    })

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct,
      address,
      status: 'pedido realizado',
    }

    await Order.create(order)

    return response.status(201).json({
      user: order.user,
      products: order.products,
      address: order.address,
      status: order.status,
      createdAt: order.createdAt, // Inclua o campo de data aqui
    })
  }

  async showClientOrders(request, response) {
    try {
      const orders = await Order.find({ 'user.id': request.userId })

      if (!orders.length) {
        return response
          .status(404)
          .json({ message: 'Nenhum pedido encontrado.' })
      }

      return response.status(200).json(orders)
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar pedidos.' })
    }
  }

  async index(request, response) {
    try {
      // Buscando todos os pedidos
      const orders = await Order.find()

      // Verificando se não há pedidos
      if (!orders.length) {
        return response
          .status(404)
          .json({ message: 'Nenhum pedido encontrado.' })
      }

      // Formatando a resposta para incluir os dados necessários
      const formattedOrders = orders.map((order) => ({
        user: order.user, // Dados do usuário
        products: order.products, // Dados dos produtos
        address: order.address, // Incluindo o endereço
        status: order.status, // Status do pedido
        createdAt: order.createdAt, // Incluindo a data de criação aqui
      }))

      // Enviando a resposta formatada para a tela de admin
      return response.json(formattedOrders)
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar pedidos.' })
    }
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
//       address: Yup.object()
//         .shape({
//           name: Yup.string().required(),
//           street: Yup.string().required(),
//           number: Yup.string().required(),
//           neighborhood: Yup.string().required(),
//           reference: Yup.string(),
//           contact: Yup.string().required(),
//         })
//         .required(),
//     })

//     try {
//       await schema.validateSync(request.body, { abortEarly: false })
//     } catch (err) {
//       return response.status(400).json({ error: err.errors })
//     }

//     const { products, address } = request.body

//     const productsId = products.map((product) => product.id)

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
//       const productIndex = products.findIndex(
//         (requestProduct) => requestProduct.id === product.id,
//       )

//       const newProduct = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         category: product.category.name,
//         url: product.url,
//         quantity: products[productIndex].quantity,
//       }

//       return newProduct
//     })

//     const order = {
//       user: {
//         id: request.userId,
//         name: request.userName,
//       },
//       products: editedProduct,
//       address,
//       status: 'pedido realizado',
//     }

//     await Order.create(order)

//     return response.status(201).json({
//       user: order.user,
//       products: order.products,
//       address: order.address,
//       status: order.status,
//     })
//   }

//   async showClientOrders(request, response) {
//     try {
//       const orders = await Order.find({ 'user.id': request.userId })

//       if (!orders.length) {
//         return response
//           .status(404)
//           .json({ message: 'Nenhum pedido encontrado.' })
//       }

//       return response.status(200).json(orders)
//     } catch (error) {
//       return response.status(500).json({ error: 'Erro ao buscar pedidos.' })
//     }
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
