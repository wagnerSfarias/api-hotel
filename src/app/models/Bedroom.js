import Sequelize, { Model } from 'sequelize'

class Bedroom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        qtd_people: Sequelize.INTEGER,
        url_banner: Sequelize.STRING,
        url_left: Sequelize.STRING,
        url_right: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://api-hotel.up.railway.app/bedroom-file/${this.url_banner}`
          },
        },
        url_l: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://api-hotel.up.railway.app/bedroom-file/${this.url_left}`
          },
        },
        url_r: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://api-hotel.up.railway.app/bedroom-file/${this.url_right}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Unit, {
      foreignKey: 'unit_id',
      as: 'unidade',
    })
  }
}
export default Bedroom
