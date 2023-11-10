const nodemailer = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: credentials.sendgrid3.user,
    pass: credentials.sendgrid3.password,
  },
})

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <ijhwlee@daum.net>',
      to: 'hwlee@inje.ac.kr',
      subject: 'Your Meadowlark Travel Tour',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()