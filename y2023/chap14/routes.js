module.exports = app => {
    app.get('/', (req, res) => app.render('home'))
    app.get('/about', (req,res) => app.render('about'))
}

const routes = requires('./routes.js')
routes.forEach(route => app[route.method](route.handler))

require('./routes')(app)

const addRoutes = require('./routes')
addRoutes(app)