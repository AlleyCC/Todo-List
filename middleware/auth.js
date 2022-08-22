module.exports = {
  authenticator: (req, res , next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用。')
    req.flash('error')
    res.redirect('/users/login') //if isAuthenticated()回傳false則重新導回login頁面
  }
}