import * as Yup from 'yup'
import Bedroom from '../models/Bedroom'
import Unit from '../models/Unit'
import User from '../models/User'
import { unlink } from 'node:fs'

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

    if (request.files.length !== 3) {
      request.files.map((file) => {
        return unlink(`uploads/${file.filename}`, (err) => {
          if (err) {
            console.log('Erro', err)
          }
          console.log(`${file.filename}, was deleted.`)
        })
      })

      return response
        .status(400)
        .json({ error: 'three "file" fields are required' })
    }

    const path = request.files.map((file) => file.filename)

    const { name, price, qtd_people, unit_id } = request.body

    const bedroom = await Bedroom.create({
      name,
      price,
      qtd_people,
      path,
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

    const { image, image_l, image_r } = request.files

    const urls = [
      image?.[0].filename,
      image_l?.[0].filename,
      image_r?.[0].filename,
    ]

    const bedroom = await Bedroom.findByPk(id)

    if (!bedroom) {
      return response
        .status(401)
        .json({ error: 'Make sure your bedroom ID is correct' })
    }

    const path = urls.map((test, index) => {
      if (test) {
        unlink(`uploads/${bedroom.path[index]}`, (err) => {
          if (err) {
            console.log('Erro', err)
          }
          console.log(`${bedroom.path[index]}, was deleted.`)
        })

        return test
      } else {
        return bedroom.path[index]
      }
    })

    await Bedroom.update(
      {
        name,
        price,
        qtd_people,
        path,
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
