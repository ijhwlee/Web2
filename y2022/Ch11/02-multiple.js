const sgMail = require('@sendgrid/mail')
const credentials = require('./credentials')
const api_key = process.env.SENDGRID_API_KEY || credentials.sendgrid.password
sgMail.setApiKey(api_key)

const msg = {
  to: 'ijhwlee@daum.net; ijhwlee@gmail.com', // Change to your recipient
  from: 'ijhwlee@daum.net', // Change to your verified sender
  subject: 'Sendgin to multiple recipants',
  text: 'sent using Node.js at home PC.',
  html: '<strong>sent using Node.js at home PC.</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
