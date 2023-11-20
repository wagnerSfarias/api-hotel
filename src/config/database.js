module.exports = {
  dialect: 'postgres',
  url: process.env.URL_POSTGRES,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
