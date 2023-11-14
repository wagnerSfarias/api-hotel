import Reservation from '../models/Reservation'
import User from '../models/User'
import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'

class ListReservationByUserController {
  async index(request, response) {
    const reservation = await Reservation.findAll({
      where: {
        user_id: request.userId,
      },
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
          attributes: ['name', 'url_banner', 'url'],
          include: {
            model: Unit,
            as: 'unidade',
            attributes: ['name', 'address'],
          },
        },
      ],
      order: [['check_in', 'ASC']],
    })

    return response.json(reservation)
  }
}
export default new ListReservationByUserController()
