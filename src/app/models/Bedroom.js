import Sequelize, { Model } from 'sequelize'

class Bedroom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        qtd_people: Sequelize.INTEGER,
        path: Sequelize.ARRAY(Sequelize.STRING),
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const result = this.path.map((file) => {
              return `http://localhost:3001/bedroom-file/${file}`
            })
            return result
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
