import { config } from 'dotenv'
import app from './app.js'
config()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`))

// DADOS PARA CONECTAR LOCALMENTE

// import { config } from 'dotenv'

// import app from './app.js'
// config()
// app.listen(3001, () => console.log('Server is running at port 3001...'))
