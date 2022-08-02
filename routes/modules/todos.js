const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {  //到Create頁面
  return res.render('new')
})

router.post('/', (req, res) => {   //Create
  const name = req.body.name  //拿到表單內欲增加的資料
  return Todo.create({ name })  //存入資料庫
    .then(() => res.redirect('/'))  //新增完成後重新導向回首頁
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {   //get: detail頁面
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {   //get: edit頁面
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {  //post: edit頁面進行修改資料
  const { id } = req.params
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = todo.isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {  //post: delete資料
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))     //delete後redirect回首頁
    .catch(error => console.log(error))
})

module.exports = router