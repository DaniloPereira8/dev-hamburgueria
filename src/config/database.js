module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'code-burger',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
