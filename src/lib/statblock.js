const statCalcs = [
  { name: 'c', calc: 'defStatCalc', round: 1 },
  { name: 's', calc: 'defStatCalc', round: 1 },
  { name: 'h', calc: 'defStatCalc', round: 1 },
  { name: 'l', calc: 'defStatCalc', round: 1 },
  { name: 'p', calc: 'defStatCalc', round: 1 },
  { name: 'e', calc: 'defStatCalc', round: 1 },
  { name: 'r', calc: 'defStatCalc', round: 1 },
  { name: 'ev', calc: 'evStatCalc', round: 2 },
  { name: 'pen', calc: 'penStatCalc', round: 2 },
  { name: 'br', calc: 'penStatCalc', round: 1 },
  { name: 'sr', calc: 'penStatCalc', round: 1 },
  { name: 'o', calc: 'crewStatCalc', round: 1 },
  { name: 'en', calc: 'crewStatCalc', round: 1 },
  { name: 't', calc: 'crewStatCalc', round: 1 }
]

function fixRounding (n, places = 1) {
  return Math.round(n * 10 ** places) / 10 ** places
}

export default class Statblock {
  constructor (raw, techTier, platformGrade) {
    this.raw = raw
    this.techTier = techTier
    this.platformGrade = platformGrade
    this.processedStats = {}

    for (const stat of statCalcs) {
      if (stat.name in this.raw) {
        this.processedStats[stat.name] = fixRounding(
          this[stat.calc](this.raw[stat.name], this.raw[`${stat.name}Grade`]),
          stat.round
        )
      }
    }
  }

  defStatCalc (baseStat, gradeStat) {
    return baseStat + this.platformGrade * gradeStat
      ? baseStat + this.platformGrade * gradeStat + this.techTier * this.raw.techBonus
      : 0
  }

  evStatCalc (baseStat, gradeStat) {
    return (baseStat ? baseStat + this.techTier * baseStat / 3 : 0)
      + (gradeStat ? gradeStat / this.platformGrade + this.techTier * gradeStat / this.platformGrade / 3 : 0)
  }

  penStatCalc (baseStat, gradeStat) {
    return baseStat + this.platformGrade * gradeStat
  }

  crewStatCalc (baseStat, gradeStat) {
    return baseStat + this.platformGrade * gradeStat + this.raw.crewChange * this.techTier
  }

  static add (...blocks) {
    let final = {}
    for (const stat of statCalcs) {
      final[stat.name] = fixRounding(
        blocks.map(b => b.processedStats[stat.name]).reduce((a, c) => a + c, 0),
        stat.round
      )
    }
    return final
  }
}
