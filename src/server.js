import { config } from 'dotenv'
import app from './app.js'

config()

const port = process.env.PORT || 3001 // Você pode definir a porta via variável de ambiente
app.listen(port, () => {
  console.log(`Server is running at port ${port}...`)
})
