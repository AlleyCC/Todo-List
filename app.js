const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')  //載入Mongoose
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //extname代表設定副檔名
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

const db = mongoose.connection   //取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI)    //設定連線至MongoDB

db.on('error', () => {    // 連線異常，"on"=>監聽有無error事件發生
  console.log('MongoDB error')
})

db.once('open', () => {   // 連線成功，once是一次性的監聽行為，監聽"open"有無連線成功，連線成功即解除監聽
  console.log('MongoDB connected!') 
})

app.get('/', (req, res) => {
  Todo.find()   //撈出整份資料
      .lean()  //把Models資料轉換成JS物件
      .then(todos => res.render('index', { todos }) )  //{ todos } = { todos: todos }
      .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name  //拿到表單內欲增加的資料
  return Todo.create({name})  //存入資料庫
    .then(() => res.redirect('/'))  //新增完成後重新導向回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo } ))
    .catch(error => console.log(error))
})

app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}.`)
})