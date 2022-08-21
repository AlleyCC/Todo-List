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
  },
  userId: {    //此設定的目的主要建立不同collections之間的關聯
    type: Schema.Types.ObjectId, //定義userId為ObjectId讓他連向另一個資料物件(Users)
    ref: 'User', //定義參考對象為User model
    index: true,
    required: true //確保每一筆資料都會對應到某個user
  }
})
module.exports = mongoose.model('Todo', todoSchema)