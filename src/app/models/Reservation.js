import Sequelize, { Model } from 'sequelize'

class Reservation extends Model {
  static init(sequelize) {
    super.init(
      {
        check_in: Sequelize.DATE,
        check_out: Sequelize.DATE,
      },
      {
        sequelize,
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
    this.belongsTo(models.Bedroom, {
      foreignKey: 'bedroom_id',
      as: 'bedroom',
    })
  }
}
export default Reservation
