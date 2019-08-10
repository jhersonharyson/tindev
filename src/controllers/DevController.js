const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })

    return res.send({ users })
  },
  async store (req, res) {
    const {
      body: { username }
    } = req

    // check if user exists
    const userExists = await Dev.findOne({ user: username })
    if (userExists) {
      return res.send(userExists)
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      )

      const { data: { name, bio, avatar_url: avatar } } = response

      const dev = await Dev.create({
        name, user: username, bio, avatar
      })

      return res.send(dev)
    } catch (e) {
      console.log(e.message)
      return res.send({ message: e.message })
    }
  }
}
