const request = require('request')

const getOptions = () => {
  const url = 'https://www.petfinder.com/search/?page=1&limit[]=40&status=adoptable&token=4ilE1jqmkGvhlZC3SniS4c4Hc1DEVp-cSNp2tkavUtk&distance[]=Anywhere&type[]=dogs&sort[]=recently_added&shelter_id[]=NY835'
  const headers = { 'x-requested-with': 'XMLHttpRequest' }
  return { url, headers }
}

const scrape = (options) =>
  new Promise((resolve, reject) =>
    request(options, (e, r, b) => resolve(JSON.parse(b))))

const scrapeWithOptions = () => scrape(getOptions())

module.exports = { scrapeWithOptions }
