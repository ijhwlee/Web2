const flashMiddleware = (req, res, next) => {
	// if there's a flash message, transfer
	// it to the context, then clear it
	res.locals.flash = req.session.flash
    console.log('[DEBUG]flash.js: flash = '+req.session.flash)
    if(req.session.flash) {
        console.log('[DEBUG]flash.js: tyep = '+req.session.flash.type)
    }
	delete req.session.flash
	next()
}

module.exports = flashMiddleware