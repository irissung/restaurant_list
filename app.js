const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

//導入body parser
const bodyParser = require('body-parser')
//設定mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
//導入餐廳model
const Restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  //從資料庫抓取餐廳資訊
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  if (keyword !== " ") {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  } else {
    res.render('nothing')
  }
})
app.listen(port, () => {
  console.log(`Express is listening on localhost :${port}`)
})