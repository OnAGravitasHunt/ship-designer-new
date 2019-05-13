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

function makeNumerical (part) {
  Object.keys(part).forEach(stat => {
    part[stat] = isNaN(part[stat]) || stat === 'Special' ? part[stat] : +part[stat]
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

function makeGradesArray (part) {
  let grades = [true, true, true].map((g, i) => !!part[gradeKeys[i]])
  for (const grade of gradeKeys) {
    delete part[grade]
  }
  // for (const [i, grade] of gradeKeys.entries()) {
  //   grades[i] = !!part[grade]
  //   delete part[grade]
  // }
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

export default class PartParser {
  static parse (file) {
    let data = papa.parse(file, config).data
    // console.log(data)
    data = data
      .map(makeNumerical)
      .map(makeStatsObject)
      .map(makeGradesArray)
      .map(reKey)
    return data
  }
}
