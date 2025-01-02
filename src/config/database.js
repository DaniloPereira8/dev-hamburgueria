import { config } from 'dotenv'
config()

export default {
  url:
    process.env.DB_URL ||
    'postgresql://caririflavorcopostgres_user:GNCKP2bHpYhilEUulzyAJ0P4LZwLvy3l@dpg-ctoehnhopnds73fhcg90-a.oregon-postgres.render.com:5432/caririflavorcopostgres',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}

// DADOS PARA CONECTAR LOCALMENTE.

// import { config } from 'dotenv'
// config()

// module.exports = {
//   dialect: process.env.DB_DIALECT || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 5432,
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'postgres',
//   database: process.env.DB_NAME || 'deuburger',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// }
