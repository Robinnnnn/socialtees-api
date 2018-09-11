const {
  scrapeWithOptions
} = require('./request')
const {
  sendTextNotification
} = require('./twilio')
const {
  getLastKnownHash,
  writeHashToFile,
  persistSerializedAnimals,
  deserializeAnimals
} = require('./fs')
const {
  getAnimalsFromPayload,
  scrubAnimals,
  generateHash,
  compareDiff,
  generateDiffReport
} = require('./util')

async function getDoggieStatus() {
  const payload = await scrapeWithOptions()
  const animals = await getAnimalsFromPayload(payload)
  const newlyScrubbedAnimals = await scrubAnimals(animals)
  const currHash = await generateHash(newlyScrubbedAnimals)
  console.log(currHash)

  const lastKnownHash = getLastKnownHash()
  if (currHash !== lastKnownHash) {
    const currentAnimals = await deserializeAnimals()
    const currentlyScrubbedAnimals = await scrubAnimals(currentAnimals)
    const diff = await compareDiff(newlyScrubbedAnimals, currentlyScrubbedAnimals)
    const diffReport = generateDiffReport(diff)
    if (diffReport.length) {
      const hyperlink = payload.shareableUrl
      sendTextNotification(diffReport, hyperlink)
    }
    writeHashToFile(currHash)
    persistSerializedAnimals(animals)
  }
}

module.exports = { getDoggieStatus }

