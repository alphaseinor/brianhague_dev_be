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
CONFIRMATION_PATH=path where your confirmation emails are verfied

## Deployment Instructions
[ ] - Push your changes
[ ] - connect heroku to repo
[ ] - add resource to heroku for heroku postgres
[ ] - Fill in environment variables fro your .env file except what is already there, such as DATABASE_URL or PORT (if you defined one in your .env file)
[ ] - make sure site is deployed by going to root
[ ] - run knex migrate:latest on heroku server

# endpoints

## /api/users/login
```
Front end should only have access to the following fields to login.
username - text field, normalize to lower case, no special characters - required min 2 characters max 50 characters
password - text field, minimum of 8 characters - required max 255 characters
```
### returns
```
{token:"jwt"}
```
### jwt will decode to
```
id:"string",
is_confirmed: boolean,
twofactor_type: "string",
username:"string",
email: "string",
is_active: boolean
```

## /api/users/register
```
Front end should only have access to the following fields to register.
username - text field, normalize to lower case, no special characters - required min 2 characters max 50 characters
email - text field, validated via regex - required max 255 characters
password - text field, minimum of 8 characters - required max 255 characters
```
### returns
```
{token:"jwt"}
```
### jwt will decode to
```
id:"string",
is_confirmed: boolean,
twofactor_type: "string",
username:"string",
email: "string",
is_active: boolean
```

## /api/users/confirmation
```
Front end will forward confirmation param to confirmation endpoint as

{
  "confirmation_num":param
}

```

### returns
will return a standard error/message group 
