const db = require('../../data/db')

const findById = async id => {
   const user = await db('users')
      .where({id})
      .first()
      .select('*')
   return user
}

async function addUser(user) {
   const [id] = await db('users')
      .insert(user)
      .returning('id')
   return findById(id)
}

async function findBy(username) {
   const user = await db('users')
      .where({username})
      .first()
   return user
}

module.exports = {
   addUser,
   findById,
   findBy
}