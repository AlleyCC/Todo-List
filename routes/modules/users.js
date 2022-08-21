const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

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
  } else {
    return User.create({ name, email, password })   //沒有則在db新增資料
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }

  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


module.exports = router