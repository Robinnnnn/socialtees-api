const initializeTwilioClient = ({ accSid, token }) =>
  new require('twilio')(accSid, token)

const sendTextNotification = hyperlink => {
  const twilioConfig = require('./config').twilio
  const twilioClient = initializeTwilioClient(twilioConfig)
  const recipients = twilioConfig.recipients

  for (let name in recipients) {
    const text = `Hey ${name}! Looks like there was an update on the petfinder page. Click here to see for yourself: ${hyperlink}`
    twilioClient.messages.create({
      body: text,
      to: recipients[name],
      from: twilioConfig.twilioNumber
    })
    .then(message => console.log(`
  Message ID: ${message.sid}
  Date Sent: ${message.dateCreated}
  Message Body: ${message.body}
    `))
    .catch(e => console.log(`Error sending message: ${e}`))
  }
}

module.exports = { sendTextNotification }
