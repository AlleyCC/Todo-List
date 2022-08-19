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
  User.findOne({ email })
  .then((user) => {   //if user存在資料庫則回傳user資料
    if (user) {
    console.log('User already exists!')
    return res.render('register', { name, email, password, passwordConfirm })
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
  res.redirect('/users/login')
})


module.exports = router