// 這是種子資料產生器
const mongoose = require('mongoose') 
const Todo = require('../todo')  //載入todo model

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error')
})

db.once('open', () => {
  console.log('MongoDB connected!')
  for(let i = 0; i < 7; i++){
    Todo.create({name: `name-${i}`})
  }
  console.log('done.')
})

