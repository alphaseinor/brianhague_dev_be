const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const secret = process.env.SECRET_JWT
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        res.status(401).json({  error: true, message: 'Received an invalid token' })
      } else {
        console.log(decoded)
        req.token = decoded
        next()
      }
    })
  } else {
    res.status(401).json({ error: true, message: 'No valid token, no admittance, try logging in again' })
  }
}