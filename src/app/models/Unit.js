import Sequelize, { Model } from 'sequelize'

class Unit extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        url_banner: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://api-hotel.up.railway.app/unit-file/${this.url_banner}`
          },
        },
      },
      {
        sequelize,
      },
    )
    return this
  }
}
export default Unit
