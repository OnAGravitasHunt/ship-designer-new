import papa from 'papaparse'

const config = {
  header: true
}

const statKeys = [
  { csvKey: 'C', csvGrade: 'CGrade', jsonKey: 'c', jsonGrade: 'cGrade' },
  { csvKey: 'S', csvGrade: 'SGrade', jsonKey: 's', jsonGrade: 'sGrade' },
  { csvKey: 'H', csvGrade: 'HGrade', jsonKey: 'h', jsonGrade: 'hGrade' },
  { csvKey: 'L', csvGrade: 'LGrade', jsonKey: 'l', jsonGrade: 'lGrade' },
  { csvKey: 'P', csvGrade: 'PGrade', jsonKey: 'p', jsonGrade: 'pGrade' },
  { csvKey: 'R', csvGrade: 'RGrade', jsonKey: 'r', jsonGrade: 'rGrade' },
  { csvKey: 'E', csvGrade: 'EGrade', jsonKey: 'e', jsonGrade: 'eGrade' },
  { csvKey: 'Ev', csvGrade: 'EvPERGrade', jsonKey: 'ev', jsonGrade: 'evGrade' },
  { csvKey: 'Pen', csvGrade: 'PenGrade', jsonKey: 'pen', jsonGrade: 'penGrade' },
  { csvKey: 'BR', csvGrade: 'BRGrade', jsonKey: 'br', jsonGrade: 'brGrade' },
  { csvKey: 'SR', csvGrade: 'SRGrade', jsonKey: 'sr', jsonGrade: 'srGrade' },
  { csvKey: 'O', csvGrade: 'OGrade', jsonKey: 'o', jsonGrade: 'oGrade' },
  { csvKey: 'EN', csvGrade: 'ENGrade', jsonKey: 'en', jsonGrade: 'enGrade' },
  { csvKey: 'T', csvGrade: 'TGrade', jsonKey: 't', jsonGrade: 'tGrade' }
]
const gradeKeys = ['Frigates', 'Cruisers', 'Explorers']
const otherKeys = [
  'Extra Slot',
  'Legal Techbases',
  'Limit',
  'Name',
  'Slot',
  'Special',
  'Type'
]

const specials = {
  'Base Built Time in Months': 'buildTime'
}

function makeNumerical (part) {
  Object.keys(part).forEach(stat => {
    part[stat] = part[stat] === '' ? null : isNaN(part[stat]) ? part[stat] : +part[stat]
  })
  return part
}

function makeStatsObject (part) {
  let stats = {}
  for (const stat of statKeys) {
    stats[stat.jsonKey] = part[stat.csvKey]
    stats[stat.jsonGrade] = part[stat.csvGrade]
    delete part[stat.csvKey]
    delete part[stat.csvGrade]
  }
  stats.techBonus = part['Tech Bonus']
  stats.crewChange = part['Crew Change by Tech (Nongrade)']
  delete part['Tech Bonus']
  delete part['Crew Change by Tech (Nongrade)']
  return {
    ...part,
    stats
  }
}

function makePlatformStatsObject (platform) {
  let stats = {}
  for (const stat of statKeys) {
    stats[stat.jsonKey] = platform[stat.csvKey]
    delete platform[stat.csvKey]
  }
  return {
    ...platform,
    stats
  }
}

function makeGradesArray (part) {
  let grades = [true, true, true].map((g, i) => !!part[gradeKeys[i]])
  for (const grade of gradeKeys) {
    delete part[grade]
  }
  return {
    ...part,
    grades
  }
}

function camelKey (key) {
  return key.replace(/ /g, '').replace(/^([a-zA-Z])/, match => match.toLowerCase())
}

function reKey (part) {
  let newPart = {}
  otherKeys.forEach(key => {
    newPart[camelKey(key)] = part[key]
  })
  return {
    ...newPart,
    stats: part.stats,
    grades: part.grades
  }
}

function reKeyPlatform (part) {
  let newPart = {}
  Object.keys(part).forEach(stat => {
    if (stat in specials) {
      newPart[specials[stat]] = part[stat]
    } else {
      newPart[camelKey(stat)] = part[stat]
    }
  })
  return newPart
}

function mapCapabilities (part) {
  part.capabilities = part.capabilities.split(', ')
  return part
}

export class PartParser {
  static parse (file) {
    return papa.parse(file, config).data
      .map(makeNumerical)
      .map(makeStatsObject)
      .map(makeGradesArray)
      .map(reKey)
  }
}

export class PlatformParser {
  static parse (file) {
    return papa.parse(file, config).data
      .map(makeNumerical)
      .map(makePlatformStatsObject)
      .map(reKeyPlatform)
      .map(mapCapabilities)
  }
}
