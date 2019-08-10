const Dev = require('../models/Dev')

module.exports = {
  // todo => save who likes in user's like array
  async store (req, res) {
    const { user } = req.headers
    const { devId } = req.params

    const loggedDev = await Dev.findById(user)

    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).json({ message: 'user is not found' })
    }

    loggedDev.dislikes.push(devId)

    loggedDev.save()

    return res.json(loggedDev)
  }
}
