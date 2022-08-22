const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
  
})

)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, passwordConfirm} = req.body
  const errors = []
  if (!name || !email || !password || !passwordConfirm){
    errors.push({ message: '所有欄位都是必填。' })
  } 
  if (password !== passwordConfirm) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length){
    return res.render('register', {
      errors,
      name,
      email,
      password,
      passwordConfirm
    })
  }
  User.findOne({ email })
  .then((user) => {   //if user存在資料庫則回傳user資料
    if (user) {
    errors.push({ message: '這個email已經註冊過了' })
    return res.render('register', { errors, name, email, password, passwordConfirm })
    } 
    //新增資料前先幫password加鹽
    return bcrypt
      .genSalt(10)  //設定複雜度係數為10
      .then(salt => bcrypt.hash(password, salt)) //加鹽並產生雜湊值
      .then(hash => User.create({ name, email, password: hash })   //沒有則新增資料，密碼為雜湊值(hash)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err)) )
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


module.exports = router