const express = require('express')
var users = require('./routes/users');
const app = express()
const port = 8000


app.use('/user', users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})