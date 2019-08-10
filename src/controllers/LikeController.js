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

    loggedDev.likes.push(devId)

    if (targetDev.likes.includes(user)) {
      console.log('MATCH')
    }

    loggedDev.save()

    return res.json(loggedDev)
  }
}
