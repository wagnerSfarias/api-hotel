import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'

class ListBedroomByUniController {
  async index(request, response) {
    const { unit_id } = request.query
    const unit = await Unit.findByPk(unit_id)

    if (!unit) {
      return response
        .status(401)
        .json({ error: 'Make sure your unit ID is correct' })
    }
    const units = await Bedroom.findAll({
      where: { unit_id },
      include: [
        {
          model: Unit,
          as: 'unidade',
          attributes: ['id', 'name'],
        },
      ],
    })

    return response.json(units)
  }
}

export default new ListBedroomByUniController()
