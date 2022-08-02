// 這是種子資料產生器
const Todo = require('../todo')  //載入todo model
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('MongoDB connected!')
  for(let i = 0; i < 7; i++){
    Todo.create({name: `name-${i}`})
  }
  console.log('done.')
})

