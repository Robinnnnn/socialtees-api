module.exports = {
  twilio: {
    accSid: process.env.TWILIO_ACC_SID,
    token: process.env.TWILIO_TOKEN,
    twilioNumber: process.env.TWILIO_NUMBER,
    recipients: {
      Robin: process.env.PH_NUMBER_ROBIN,
      Gianna: process.env.PH_NUMBER_GIANNA
    }
  }
}
