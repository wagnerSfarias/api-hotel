import User from '../models/User'

export default async (request, response, next) => {
  const { admin: isAdmin } = await User.findByPk(request.userId)

  if (!isAdmin) {
    return response.status(403).json({ error: 'Unauthorized user.' })
  }

  return next()
}
