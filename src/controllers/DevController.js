const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async store (req, res) {
    const {
      body: { username }
    } = req

    // check if user exists
    const userExists = await Dev.findOne({ user: username })
    if (userExists) {
      res.send(userExists)
    }

    try {
      const response = await axios.get(
        `htpps://api.github.com/users/${username}`
      )

      const { data: { name, username: user, bio, avatar_url: avatar } } = response

      const dev = await Dev.create({
        name, user, bio, avatar
      })

      return res.send(dev)
    } catch (e) {
      console.log(e.message)
      return res.send({ message: e.message })
    }
  }
}
