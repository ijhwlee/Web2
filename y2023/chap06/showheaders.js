const express = require('express')
const expresshandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers')

//핸들바 뷰 엔진 설정
app.engine('handlebars', expresshandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', handlers.header)
app.get('/error', handlers.error)
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: '안녕하세요 여러분!',
        style: req.query.style,
        //userid: req.cookies.userid,
        //username: req.session.username
    })
})

app.post('/process-contact', (req, res) => {
    console.log(`body = ${req.body}`)
    console.log(`receiving contact from ${req.body.name} <${req.body.email}>`)
    res.redirect(303, 'thanks')
})
app.get('/thanks', (req,res)=>{
    console.log("Thanks called")
    res.end()
})

// custom 404 page
app.use(handlers.notFound)
//custom 500 page
app.use(handlers.serverError)

app.listen(port, ()=> console.log(
    `Express started on http://localhost:${port}; `+
    `press Ctrl-C to terminate...`))