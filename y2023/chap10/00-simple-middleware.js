const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(`processing for ${req.url}...`)
    next()
})

app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing!')
})

app.use((req, res, next) => {
    console.log(`whoops, I'll never get called!`)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express started on port ${port}; Press Ctrl+C to terminate.`))
