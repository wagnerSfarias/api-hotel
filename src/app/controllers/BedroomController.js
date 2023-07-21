import * as Yup from 'yup'
import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'

class BedroomController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      qtd_people: Yup.number().required(),
      unit_id: Yup.number().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const url_banner = request.files[0].filename
    const url_left = request.files[1].filename
    const url_right = request.files[2].filename

    const { name, price, qtd_people, unit_id } = request.body

    const bedroom = await Bedroom.create({
      name,
      price,
      qtd_people,
      url_banner,
      url_left,
      url_right,
      unit_id,
    })

    return response.json(bedroom)
  }

  async index(request, response) {
    const units = await Bedroom.findAll({
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

export default new BedroomController()
