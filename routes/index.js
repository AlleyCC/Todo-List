//set總路由器
const express = require('express')
const router = express.Router()  //引用express的路由功能
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth') //middleware

router.use('/todos', authenticator, todos)  //加入驗證程序
router.use('/auth', auth)  //facebook驗證
router.use('/users', users) 
router.use('/', authenticator, home)  //加入驗證程序



module.exports = router  //匯出路由器