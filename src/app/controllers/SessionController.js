import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const { email, password } = request.body

    if (!(await schema.isValid(request.body)))
      return response.status(401).json({
        error:
          'Email ou senha incorretos, verifique os dados e tente novamente.',
      })

    const user = await User.findOne({
      where: { email },
    })

    if (!user)
      return response.status(401).json({
        error:
          'Email ou senha incorretos, verifique os dados e tente novamente.',
      })

    if (!(await user.checkPassword(password)))
      return response.status(401).json({
        error:
          'Email ou senha incorretos, verifique os dados e tente novamente.',
      })

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
