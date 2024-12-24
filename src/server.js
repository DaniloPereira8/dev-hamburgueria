// import app from './app.js'
// app.listen(3001, () => console.log('Server is running at port 3001...'))

import { config } from 'dotenv' // Carrega as variáveis do .env

import app from './app.js'
config()
app.listen(3001, () => console.log('Server is running at port 3001...'))
