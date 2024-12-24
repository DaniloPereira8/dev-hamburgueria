// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'postgres',
//   database: 'deuburger',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// }

import { config } from 'dotenv'
config() // Carrega as variáveis do .env

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
