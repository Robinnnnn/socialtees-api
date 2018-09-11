const fs = require('fs')
const { resolve } = require('path')
const cacheLocation = resolve(__dirname, '../cache')

const getLastKnownHash = () =>
  fs.readFileSync(`${cacheLocation}/lastKnownHash`, 'utf8')

const writeHashToFile = hash =>
  fs.writeFileSync(`${cacheLocation}/lastKnownHash`, hash)

const persistSerializedAnimals = animals =>
  fs.writeFileSync(`${cacheLocation}/lastKnownAnimals`, JSON.stringify(animals))

const deserializeAnimals = () =>
  JSON.parse(fs.readFileSync(`${cacheLocation}/lastKnownAnimals`, 'utf8'))

module.exports = {
  getLastKnownHash,
  writeHashToFile,
  persistSerializedAnimals,
  deserializeAnimals
}
