const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
require('./config/mongoose') //不需回傳參數，因此不需設變數

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')  //引用路由器
const session = require('express-session')
const usePassport = require('./config/passport') //載入設定檔，必須寫在express-session之後

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' })) //extname代表設定副檔名
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app) //呼叫Passport並傳入app，必須寫在路由之前
app.use(flash())

// 把req裡的登入狀態交接給res，此設定必須放在usePassport(app)之後routes之前
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() //把isAuthenticated()回傳的Boolean交給res
  res.locals.user = req.user  //把user的資料交給res(給樣板使用)
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


app.use(routes) //將request導入路由器

app.listen(PORT, (req, res) => {
  console.log(`It is running on http://localhost:${PORT}.`)
})