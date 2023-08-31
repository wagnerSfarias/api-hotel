import * as Yup from 'yup'
import { v4 } from 'uuid'
import Reservation from '../models/Reservation'
import User from '../models/User'
import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'

class ReservationController {
  async store(request, response) {
    const schema = Yup.object().shape({
      check_in: Yup.date().required(),
      check_out: Yup.date().required(),
      bedroom_id: Yup.number().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { check_in, check_out, bedroom_id } = request.body

    const bedroom = await Reservation.create({
      id: v4(),
      check_in,
      check_out,
      user_id: request.userId,
      bedroom_id,
    })

    return response.json(bedroom)
  }

  async index(request, response) {
    const reservation = await Reservation.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Bedroom,
          as: 'bedroom',
          attributes: ['name', 'url_banner'],
          include: {
            model: Unit,
            as: 'unidade',
            attributes: ['name', 'address'],
          },
        },
      ],
    })

    return response.json(reservation)
  }

  async delete(request, response) {
    const { id } = request.params

    try {
      const reservation = await Reservation.findOne({ where: { id } })

      if (!reservation) {
        return response
          .status(401)
          .json({ error: 'Make sure your reservation ID is correct' })
      }
    } catch (err) {
      return response
        .status(401)
        .json({ error: 'Make sure your reservation ID is correct' })
    }

    await Reservation.destroy({ where: { id } })

    return response.status(200).json()
  }
}

export default new ReservationController()
