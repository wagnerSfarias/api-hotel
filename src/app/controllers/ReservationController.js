import * as Yup from 'yup'
import { v4 } from 'uuid'
import Reservation from '../models/Reservation'
import User from '../models/User'
import Bedroom from '../models/Bedroom'

import { UUID } from 'sequelize'

class ReservationController {
  async store(request, response) {
    const schema = Yup.object().shape({
      check_in: Yup.date().required(),
      check_out: Yup.date().required(),
      user_id: Yup.string(UUID).required(),
      bedroom_id: Yup.number().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { check_in, check_out, user_id, bedroom_id } = request.body

    const bedroom = await Reservation.create({
      id: v4(),
      check_in,
      check_out,
      user_id,
      bedroom_id,
    })

    return response.json(bedroom)
  }

  async index(request, response) {
    const reservation = await Reservation.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Bedroom,
          as: 'bedroom',
          all: true,
          nested: true,
        },
      ],
    })

    return response.json(reservation)
  }
}

export default new ReservationController()
