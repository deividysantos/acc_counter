import express from 'express'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'

const port = 8000
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Route list
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.end('nao é essa a rota')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})