const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const requiresWaiver = require('./lib/tourRequiresWaiver')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const secret = String(Math.random())
app.use(cookieParser(secret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret,
}))

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const products = [
  { id: 'TRAVEL0001', name: 'Rock Climbing Expedition in Bend', price: 239.95, requiresWaiver: true },
  { id: 'TRAVEL0006', name: 'Walking Tour of Portland', price: 89.95 },
  { id: 'TRAVEL0002', name: 'Manzanita Surf Expedition', price: 159.95 },
  { id: 'TRAVEL0012', name: 'Wine Tasting in the Willamette Valley', price: 229.95 },
  { id: 'TRAVEL003', name: '김수로왕릉', price: 22.95 },
  { id: 'TRAVEL004', name: '분성산성', price: 22.95 },
]
const productsById = products.reduce((byId, p) => Object.assign(byId, { [p.id]: p }), {})

// middleware to clear cart validation...without this, the warnings won't
// go away when we remove the offending items from the cart!
app.use((req, res, next) => {
  const { cart } = req.session
  if(cart) cart.warnings = []
  next()
})
// middleware to check cart
app.use(requiresWaiver)

app.get('/', (req, res) => {
  const cart = req.session.cart || { items: [] }
  const context = { products, cart }
  res.render('home', context)
})

app.post('/add-to-cart', (req, res) => {
  if(!req.session.cart) req.session.cart = { items: [] }
  const { cart } = req.session
  Object.keys(req.body).forEach(key => {
    if(!key.startsWith('guests-')) return
    const productId = key.split('-')[1]
    const product = productsById[productId]
    const guests = Number(req.body[key])
    if(guests === 0) return // no guests to add
    if(!cart.items.some(item => item.product.id === productId)) cart.items.push({ product, guests: 0 })
    const idx = cart.items.findIndex(item => item.product.id === productId)
    const item = cart.items[idx]
    item.guests += guests
    if(item.guests < 0) item.guests = 0
    if(item.guests === 0) cart.items.splice(idx, 1)
  })
  res.redirect('/')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))
