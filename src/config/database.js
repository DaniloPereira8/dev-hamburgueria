import { config } from 'dotenv'
config()

export default {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT || 5432,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
