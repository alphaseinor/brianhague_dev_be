const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const usersRouter = require('./users/users-router')
const authenticate = require('./auth/authenticate-middleware')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/validate_token', authenticate, ()=>{
  res.status(200).json({error:false, message:'Token is valid'})
})

server.use('/', (req, res)=>{
  res.status(200).json({error: false, message: `${process.env.SITE_NAME} ${process.env.NODE_ENV} backend API`})
})

module.exports = server;