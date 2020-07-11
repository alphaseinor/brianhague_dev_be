const db = require('../../data/db')

const findById = async id => {
   const user = await db('users')
      .where({id})
      .first()
      .select('*')
   return user
}

const userList = async () => {
  const list = await db('users')
    .select('username')
  const arrList = await list.map((user)=>{
    return user.username
  })
  return arrList
}

const countUsers = async () => {
  const count = await db('users')
    .count('id')
    .first()
  return count
}

const confirmUser = async (confirmation_num) => {
  const confirm = await db('users')
    .where({confirmation_num: confirmation_num})  
    .first()
    .select('*')
  return confirm
}

const updateUser = async (id, obj) => {
  const update = await db('users')
    .where({id: id})
    .update(obj)
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
   findBy,
   countUsers,
   userList,
   confirmUser,
   updateUser
}