// 這是種子資料產生器
const User = require('../user')
const Todo = require('../todo')  //載入todo model
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'PRODUCTION'){
  require('dotenv').config()
}

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '123456'
}

db.once('open', () => {
  console.log('MongoDB connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ 
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
     }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()  //關閉這段Node的執行程序
    })  
})