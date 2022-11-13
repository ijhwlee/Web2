const nodemailer = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <ijhwlee@daum.net>',
      to: 'ijhwlee@daum.net, ijhwlee@gmail.com',
      subject: 'Your Meadowlark Travel Tour Multiple user',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit! Multiple user',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()