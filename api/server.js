const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/', (req, res)=>{
  res.status(200).json({message: `${process.env.SITE_NAME} ${process.env.NODE_ENV} backend API`})
})

module.exports = server;