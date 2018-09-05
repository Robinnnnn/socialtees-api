const fs = require('fs')
const request = require('request')
const hash = require('object-hash')
const { sendTextNotification } = require('./twilio')

const getOptions = () => {
  const url = 'https://www.petfinder.com/search/?page=1&limit[]=40&status=adoptable&token=4ilE1jqmkGvhlZC3SniS4c4Hc1DEVp-cSNp2tkavUtk&distance[]=Anywhere&type[]=dogs&sort[]=recently_added&shelter_id[]=NY835'
  const headers = { 'x-requested-with': 'XMLHttpRequest' }
  return { url, headers }
}

const scrape = (options) =>
  new Promise((resolve, reject) =>
    request(options, (e, r, b) => resolve(JSON.parse(b))))

const getAnimals = data =>
  data.result.animals

const generateCollSignature = animals =>
  animals.map(a => a.animal.id).sort().join('')

const generateHash = id => hash(id)

const getLastKnownHash = () =>
  fs.readFileSync('./lastKnownHash', 'utf8')

const writeHashToFile = hash =>
  fs.writeFileSync('./lastKnownHash', hash)

async function getStatus() {
  const options = await getOptions()
  const payload = await scrape(options)
  const animals = await getAnimals(payload)
  const idSignature = await generateCollSignature(animals)
  const currHash = await generateHash(idSignature)
  console.log(new Date(), currHash)

  // Kick off text message if a change is detected
  const lastKnownHash = getLastKnownHash()
  if (currHash !== lastKnownHash) {
    const hyperlink = payload.shareableUrl
    sendTextNotification(hyperlink)
    writeHashToFile(currHash)
  }
}

module.exports = { getStatus }

