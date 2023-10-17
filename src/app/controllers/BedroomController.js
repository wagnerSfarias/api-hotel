import * as Yup from 'yup'
import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'
import User from '../models/User'

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

    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) {
      return response.status(401).json()
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

  async show(request, response) {
    const { id } = request.params

    const bedroom = await Bedroom.findByPk(id)

    if (!bedroom) {
      return response
        .status(401)
        .json({ error: 'Make sure your bedroom ID is correct' })
    }
    return response.status(200).json(bedroom)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      qtd_people: Yup.number(),
      unit_id: Yup.number(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json({ error: 'no authorization' })
    }

    const { name, price, qtd_people, unit_id } = request.body

    const { id } = request.params

    let url_banner
    let url_left
    let url_right
    if (request.files.image) {
      url_banner = request.files.image[0].filename
    }
    if (request.files.image_l) {
      url_left = request.files.image_l[0].filename
    }
    if (request.files.image_r) {
      url_right = request.files.image_r[0].filename
    }

    const bedroom = await Bedroom.findByPk(id)

    if (!bedroom) {
      return response
        .status(401)
        .json({ error: 'Make sure your bedroom ID is correct' })
    }
    await Bedroom.update(
      {
        name,
        price,
        qtd_people,
        url_banner,
        url_left,
        url_right,
        unit_id,
      },
      {
        where: { id },
      },
    )
    return response.status(200).json()
  }
}

export default new BedroomController()
