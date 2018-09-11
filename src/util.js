const getAnimalsFromPayload = data => data.result.animals

const formatName = name => name[0].toUpperCase() + name.toLowerCase().slice(1)

const scrubAnimals = animals => animals
  .map(({ animal }) => ({
    id: animal.id,
    name: formatName(animal.name),
    photo: animal.primary_photo_url,
    published_at: animal.published_at
  }))
  .reduce((acc, curr, i) => {
    acc[curr.id] = curr
    return acc
  }, {})

const generateHash = obj => require('object-hash')(obj)

const compareDiff = (newObj, baseObj) => {
  const detected = {
    created: [],
    deleted: [],
    updated: []
  }
  for (let k in newObj) {
    if (!baseObj[k]) {
      detected.created.push(newObj[k])
    }
  }
  for (let k in baseObj) {
    if (!newObj[k]) {
      detected.deleted.push(baseObj[k])
    }
  }
  for (let k in baseObj) {
    if (newObj[k]) {
      const photoAdded = (
        !baseObj[k].photo &&
        newObj[k].photo
      )
      if (photoAdded) {
        detected.updated.push(newObj[k])
      }
    }
  }

  return detected
}

const generateDiffReport = diff => {
  const diffReport = []

  for (let type in diff) {
    const containsUpdates = diff[type].length
    if (containsUpdates) {
      const names = diff[type].map(a => a.name)
      const single = names.length === 1
      const multi = names.length > 1
      let message = ''
      switch(type) {
        case 'created':
          if (single) message = `${names[0]} was added!`
          if (multi) message = `${names.join(', ')} were added!`
          break
        case 'deleted':
          if (single) message = `${names[0]} was removed. Goodbye, ${names[0]}!`
          if (multi) message = `${names.join(', ')} were removed. Hopefully their new owners are nice!`
          break
        case 'updated':
          if (single) message = `${names[0]} has an updated profile picture!`
          if (multi) message = `${names.join(', ')} have updated their profile pictures!`
          break
      }
      if (message) diffReport.push(message)
    }
  }

  return diffReport
}

module.exports = {
  getAnimalsFromPayload,
  scrubAnimals,
  generateHash,
  compareDiff,
  generateDiffReport
}
