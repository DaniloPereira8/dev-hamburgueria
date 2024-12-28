// import { config } from 'dotenv'

// import app from './app.js'
// config()
// app.listen(3001, () => console.log('Server is running at port 3001...'))

import { config } from 'dotenv' // Carrega as variáveis de ambiente do arquivo .env
import app from './app.js' // Importa a instância do servidor (Express ou outro)

config() // Carrega as variáveis do arquivo .env

// Defina a porta a partir das variáveis de ambiente ou use 3001 por padrão
const port = process.env.PORT || 3001

// Inicializa o servidor na porta definida
app.listen(port, () => {
  console.log(`Server is running at port ${port}...`)
})
