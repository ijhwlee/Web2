const express = require('express')
const multiparty = require('multiparty')
const cors = require('cors')

const handlers = require('./lib/handlers')

const credentials = require('./credentials')

require('./db')

const app = express()

app.use('/api', cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3001

app.use(express.static(__dirname + '/public'))

// api
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from server of Meadowlark!" });
  });
app.get('/api/vacations', handlers.getVacationsApi)
app.get('/api/vacation/:sku', handlers.getVacationBySkuApi)
app.post('/api/vacation/:sku/notify-when-in-season', handlers.addVacationInSeasonListenerApi)
app.delete('/api/vacation/:sku', handlers.requestDeleteVacationApi)

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}
