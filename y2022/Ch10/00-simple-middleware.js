const express = require('express')
const app = express()
app.use((req, res, next) => {
    console.log(`processing request for ${req.url} from home ...`)
    next()
})
app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing')
})
app.use((req, res, next) => {
    console.log(`whoops, I'll never get called!`)
})
const port = process.env.port || 3000
app.listen(port, ()=> console.log(`Express started on http://localhost:${port}` +
`; press Ctrl-C to terminate.`))
