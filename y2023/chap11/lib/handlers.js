const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')
const credentials = require('../credentials')

// slightly modified version of the official W3C HTML5 email regex:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
      user: credentials.sendgrid3.user,
      pass: credentials.sendgrid3.password,
    },
  })
  
exports.checkout = (req, res, next) => {
	const cart = req.session.cart
	if(!cart) next(new Error('Cart does not exist.'))
	const name = req.body.name || '', email = req.body.email || ''
	// input validation
	if(!email.match(VALID_EMAIL_REGEX)) 
		return res.next(new Error('Invalid email address.'))
	// assign a random cart ID; normally we would use a database ID here
	cart.number = Math.random().toString().replace(/^0\.0*/, '')
	cart.billing = {
		name: name,
		email: email,
	}
  res.render('email/cart-thank-you', { layout: null, cart: cart },
    (err,html) => {
        console.log('rendered email: ', html)
        if(err) console.log('error in email template')
        mailTransport.sendMail({
          from: '"Meadowlark Travel" <ijhwlee@daum.net>',
          to: cart.billing.email,
          subject: 'Thank You for Book your Trip with Meadowlark Travel',
          html: html,
          text: htmlToFormattedText(html),
        })
          .then(info => {
            console.log('sent! ', info)
            res.render('cart-thank-you', { cart: cart })
          })
          .catch(err => {
            console.error('Unable to send confirmation: ' + err.message)
          })
    }
  )
}
