import dotenv from 'dotenv'

dotenv.config() // Carregar variáveis de ambiente

export default {
  secret: process.env.JWT_SECRET, // Usar a chave secreta do arquivo .env
  expiresIn: process.env.JWT_EXPIRES_IN || '5d', // Usar o tempo de expiração do token
}
