module.exports = {
  authenticator: (req, res , next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('users/login') //if isAuthenticated()回傳false則重新導回login頁面
  }
}