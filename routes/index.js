//set總路由器
const express = require('express')
const router = express.Router()  //引用express的路由功能
const home = require('./modules/home')
const Todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', Todos)

module.exports = router  //匯出路由器