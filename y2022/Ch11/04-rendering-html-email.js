const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const app = express()

const credentials = require('./credentials')
const handlers = require('./lib/handlers')

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}))

app.post('/cart/checkout', handlers.checkout)

app.get('*', (req, res) => {
  // simulate shopping cart
  req.session.cart = {
    items: [
      { id: '82RgrqGCAHqCf6rA2vujbT', qty: 1, guests: 2 },
      { id: 'bqBtwqxpB4ohuxCBXRE9tq', qty: 1 },
    ],
  }
  res.render('04-home')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))
