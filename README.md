# brianhague_dev_be
Backend for brianhague.dev
By Brian Hague (alphaseinor)

## Installation Instructions
[ ] - Fork this repo
[ ] - Clone your own repo
[ ] - npm i
[ ] - touch .env
[ ] - install postgresql on your local machine and configure .env file for your environment
[ ] - run knex migrate:latest

## .env file
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres
NODE_ENV=development test or production
SECRET_JWT=whatever your secret for your jwt is
SITE_NAME=yourSiteName.com

## Deployment Instructions
[ ] - Push your changes
[ ] - connect heroku to repo
[ ] - add resource to heroku for heroku postgres
[ ] - Fill in environment variables fro your .env file except what is already there, such as DATABASE_URL or PORT (if you defined one in your .env file)
[ ] - make sure site is deployed by going to root
[ ] - run knex migrate:latest on heroku server


