const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { name, email, password, profile_pic, bio } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      email,
      password: passwordDigest,
      username: name,
      profile_pic,
      bio,
      friend_list: [],
      watched_list: [],
      upvoted: [],
      downvoted: []
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}
const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email: email },
      raw: true
    })
    let matched = await middleware.comparePassword(user.password, password)
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email,
        name: user.username,
        pic: user.profile_pic,
        friends: user.friend_list,
        watched: user.watched_list,
        upvoted: user.upvoted,
        downvoted: user.downvoted
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Incorrect Password' })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred on Login!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      let payload = {
        id: user.id,
        email: user.email,
        name: user.username,
        pic: user.profile_pic,
        friends: user.friend_list,
        watched: user.watched_list
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}
const GetUser = async (req, res) => {
  const { id } = req.params
  try {
    const users = await User.findOne({
      where: { id: id },
      raw: true
    })
    res.send(users)
  } catch (error) {
    throw error
  }
}
const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.userId)
    // const user = await User.findByPk(userId)

    const updatedUser = await User.update(
      { ...req.body },
      {
        where: { id: userId },
        returning: true
      }
    )
    if (updatedUser[1][0].dataValues) {
      console.log(updatedUser.dataValues)
      let payload = {
        id: updatedUser[1][0].dataValues.id,
        email: updatedUser[1][0].dataValues.email,
        name: updatedUser[1][0].dataValues.username,
        pic: updatedUser[1][0].dataValues.profile_pic,
        friends: updatedUser[1][0].dataValues.friend_list,
        watched: updatedUser[1][0].dataValues.watched_list,
        upvoted: updatedUser[1][0].dataValues.upvoted,
        downvoted: updatedUser[1][0].dataValues.downvoted
      }
      return res.send({ status: 'Watched Updated!', user: payload })
    }
    res.status(401).send('error')
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession,
  GetUser,
  UpdateUser
}
