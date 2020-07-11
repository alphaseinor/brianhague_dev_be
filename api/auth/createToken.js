const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
const Users = require('../users/users-model')

const createToken = async id => {
  return Users.findById(id)
    .then(user => {
      
      const payload = {
        user_id: user.id,
        user_name: user.username,
        user_email: user.email,
        is_confirmed: user.is_confirmed,
        twofactor_type: user.twofactor_type,
        is_active: user.is_active
      }
      //token expires in:
      const hours = 1
      const options = {
        expiresIn: 60 * 60 * hours
      }

      const token = jwt.sign(payload, secret, options)

      return token;
    })
    .catch(err => {
      res.status(500).json({
        message: "Token creation failed",
        error: err
      })
    })
}

module.exports = {
  createToken
}