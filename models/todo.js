//資料庫綱要
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//建構新的Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false    //(預設完成狀態=>false尚未完成)
  }
})
module.exports = mongoose.model('Todo', todoSchema)