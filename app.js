const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')  //載入Mongoose
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')  //引用路由器


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //extname代表設定副檔名
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes) //將request導入路由器

const db = mongoose.connection   //取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI)    //設定連線至MongoDB
db.on('error', () => {    // 連線異常，"on"=>監聽有無error事件發生
  console.log('MongoDB error')
})
db.once('open', () => {   // 連線成功，once是一次性的監聽行為，監聽"open"有無連線成功，連線成功即解除監聽
  console.log('MongoDB connected!') 
})




app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}.`)
})