const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')
exports.about = (req, res) => res.render('about', {fortune:fortune.getFortune()})
exports.notFound = (req, res) => res.render('404')
exports.header = (req, res)=> {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
}
exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}