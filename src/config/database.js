module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'hotelBD',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
