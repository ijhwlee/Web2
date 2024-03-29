const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')

module.exports = credentials => {

	const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
      user: credentials.sendgrid.user,
      pass: credentials.sendgrid.password,
    },
	})

	const from = '"Meadowlark Travel" <ijhwlee@daum.net>'
	const errorRecipient = 'ijhwlee@daum.net'

	return {
    send: (to, subject, html) => 
      mailTransport.sendMail({
        from,
        to,
        subject,
        html,
        text: htmlToFormattedText(html),
      }),
  }

}
