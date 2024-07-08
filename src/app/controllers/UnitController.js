import * as Yup from 'yup'
import Unit from '../models/Unit'
import deleteFiles from '../utils/deleteFiles'

class UnitController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
    })

    const { filename } = request.file

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      deleteFiles(filename)
      return response.status(400).json({ error: err.errors })
    }

    if (!request.file) {
      return response.status(400).json({ error: 'file is a required field' })
    }

    const { name, address } = request.body

    const unitExists = await Unit.findOne({
      where: { name },
    })

    if (unitExists) {
      deleteFiles(filename)

      return response.status(400).json({ error: 'Unit already exist' })
    }

    const unit = await Unit.create({ name, address, url_banner: filename })

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

    const { filename } = request.file

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, address } = request.body
    const { id } = request.params

    const unit = await Unit.findByPk(id)

    if (!unit) {
      deleteFiles(filename)

      return response
        .status(401)
        .json({ error: 'Make sure your unit ID is correct' })
    }

    if (unit.name !== name) {
      const unitExists = await Unit.findOne({
        where: { name },
      })

      if (unitExists) {
        deleteFiles(filename)
        return response.status(400).json({ error: 'Unit already exist' })
      }
    }

    if (request.file) {
      deleteFiles(unit.url_banner)
    }

    await Unit.update(
      {
        name,
        address,
        url_banner: filename,
      },
      {
        where: { id },
      },
    )
    return response.json({ message: 'changed unit' })
  }
}

export default new UnitController()
