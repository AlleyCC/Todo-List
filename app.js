const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('start testing my project!')
})

app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}.`)
})