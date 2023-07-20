import * as Yup from 'yup'
import Unit from '../models/Unit'

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
    const { filename: url_banner } = request.file
    const { name, address } = request.body

    const unit = await Unit.create({ name, address, url_banner })

    return response.json(unit)
  }

  async index(request, response) {
    const units = await Unit.findAll()

    return response.json(units)
  }
}

export default new UnitController()
