const mongoose = require('mongoose')  //載入Mongoose
const db = mongoose.connection   //取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI)    //設定連線至MongoDB

db.on('error', () => {    // 連線異常，"on"=>監聽有無error事件發生
  console.log('MongoDB error')
})
db.once('open', () => {   // 連線成功，once是一次性的監聽行為，監聽"open"有無連線成功，連線成功即解除監聽
  console.log('MongoDB connected!')
})

module.exports = db