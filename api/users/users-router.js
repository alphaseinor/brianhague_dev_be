const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {v4} = require('uuid');

const {createToken} = require('../auth/createToken')
require('dotenv').config()

const Users = require('./users-model')

router.post('/register', validateEmail, validateUsername, validatePassword, userCounter, async (req, res) => {
  
  //this is for the first user to be an admin without any intervention. since this only happens when the system is registering it's "cheap" to determine this now. It can be replaced with the else statement assignment if you already have an admin
  if(req.user_counter == 0){
    req.body.is_admin = true
  }
  else{
    req.body.is_admin = false
  }

  req.body.password = bcrypt.hashSync(req.body.password, 8)
  req.body.is_confirmed = false
  req.body.confirmation_num = v4()
  req.body.is_active = true
  req.body.is_twofactor = false //not implemented
  req.body.twofactor_num = "" //not implemented
  req.body.twofactor_type = "" //not implemented
  req.body.phone = "" //not implemented

  Users.addUser(req.body)
       .then(async user => {
         const token = await createToken(user.id)
         res.status(201).json({token})
       })
       .catch(err => {
         res.status(500).json({
            message: "error adding user",
            error: err
          })
       })
})

router.post('/login', validateUsername, validatePassword, async (req, res) => {
  Users.findBy(req.body.username)
       .then(async user => {
         if(user && bcrypt.compareSync(req.body.password, user.password)){
           const token = await createToken(user.id)
           res.status(200).json({error: false, token: token})
         } else {
          res.status(400).json({
            message: "Username and/or Password Incorrect",
            error: true,
            err: err
          })
         }
       })
       .catch(err => {
        res.status(500).json({
          message: `Could not locate user with username: ${req.body.username}`,
          error: true,
          err: err
        })
       })
})

router.get('/count', userCounter, (req, res)=>{
  
  res.status(200).json({
    error: false, 
    message: req.user_counter
  })
})

function userCounter(req, res, next){
  //this should be the last middleware
  Users.countUsers()
    .then((count)=>{
      console.log("User Count: ", count.count)
        req.user_counter = count.count
        next()
    })
    .catch(err => {
      res.status(400).json({
        error:true, 
        message:"something wrong in the count", 
        err:err
      })
    })
}

function validateUsername(req, res, next) {
  if(req.body.username){
    next()
  }else{
    res.status(500).json({error: true, message: "Missing username"})
  }
}

function validatePassword(req, res, next) {
  if(req.body.password){
    next()
  }else{
    res.status(500).json({error: true, message: "Missing password"})
  }
}

function validateEmail(req, res, next) {
  if(req.body.email){
    next()
  }else{
    res.status(500).json({error: true, message: "Missing email"})
  }
}

module.exports = router
