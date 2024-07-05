import * as Yup from 'yup'
import Unit from '../models/Unit'
import { unlink } from 'node:fs'

class UnitController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    if (!request.file) {
      return response.status(400).json({ error: 'file is a required field' })
    }

    const { filename: url_banner } = request.file
    const { name, address } = request.body

    const unitExists = await Unit.findOne({
      where: { name },
    })

    if (unitExists) {
      unlink(`uploads/${url_banner}`, (err) => {
        if (err) {
          console.log('Erro', err)
        }
        console.log(`${url_banner}, was deleted`)
      })

      return response.status(400).json({ error: 'Unit already exist' })
    }

    const unit = await Unit.create({ name, address, url_banner })

    return response.json(unit)
  }

  async index(request, response) {
    const units = await Unit.findAll()

    return response.json(units)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, address } = request.body
    const { id } = request.params

    let path
    if (request.file) {
      path = request.file.filename
    }

    const unit = await Unit.findByPk(id)

    if (!unit) {
      return response
        .status(401)
        .json({ error: 'Make sure your unit ID is correct' })
    }

    if (unit.name !== name) {
      const unitExists = await Unit.findOne({
        where: { name },
      })

      if (unitExists) {
        return response.status(400).json({ error: 'Unit already exist' })
      }
    }

    await Unit.update(
      {
        name,
        address,
        url_banner: path,
      },
      {
        where: { id },
      },
    )
    return response.json({ message: 'changed unit' })
  }
}

export default new UnitController()
