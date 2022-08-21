const express = require('express')

const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {  //get: 首頁
  const userId = req.user._id
  Todo.find({ userId })   //撈出整份資料
    .lean()   //把Models資料轉換成JS物件
    .sort({ _id: 'asc' })  //資料排序=>'asc'升冪/'desc'降冪
    .then(todos => res.render('index', { todos }))  //{ todos } = { todos: todos }
    .catch(error => console.error(error))
})

module.exports = router