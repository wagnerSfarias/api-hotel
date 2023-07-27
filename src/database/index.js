import Sequelize from 'sequelize'
import configDatabase from '../config/database'

import User from '../app/models/User'
import Unit from '../app/models/Unit'
import Bedroom from '../app/models/Bedroom'
import Reservation from '../app/models/Reservation'

const models = [User, Unit, Bedroom, Reservation]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }
}

export default new Database()
