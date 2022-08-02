const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
require('./config/mongoose') //不需回傳參數，因此不需設變數

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')  //引用路由器


app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //extname代表設定副檔名
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes) //將request導入路由器






app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}.`)
})