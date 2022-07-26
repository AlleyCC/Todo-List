const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')  //載入Mongoose

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //extname代表設定副檔名
app.set('view engine', 'hbs')

//取得資料庫連線狀態
const db = mongoose.connection
//設定連線至MongoDB
mongoose.connect(process.env.MONGODB_URI) 

 

// 連線異常，"on"=>監聽有無error事件發生
db.on('error', () => {
  console.log('MongoDB error')
})
// 連線成功，once是一次性的監聽行為，監聽"open"有無連線成功，連線成功即解除監聽
db.once('open', () => {
  console.log('MongoDB connected!')
  
  
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}.`)
})