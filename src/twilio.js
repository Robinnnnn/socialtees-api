const { resolve } = require('path')
const configLocation = resolve(__dirname, '../config')

const initializeTwilioClient = ({ accSid, token }) =>
  new require('twilio')(accSid, token)

const sendTextNotification = (diffReport, hyperlink) => {
  const twilioConfig = require(configLocation).twilio
  const twilioClient = initializeTwilioClient(twilioConfig)
  const recipients = twilioConfig.recipients

  for (let name in recipients) {
    const updated = diffReport.join(' Also, ')
    const text = `.\n\nHey ${name}!\n\nGuess what - ${updated}\n\n${hyperlink}`
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
