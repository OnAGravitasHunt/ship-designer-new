const statType1 = ['c', 's', 'h', 'l', 'p', 'e', 'r', 'pen']
const statType2 = ['ev']
const statType3 = ['pen', 'br', 'sr']
const statType4 = ['o', 'en', 't']

export default class Statblock {
  constructor (raw, techTier, platformGrade) {
    this.raw = raw
    this.techTier = techTier
    this.platformGrade = platformGrade
    this.processedStats = {}
    for (const stat of statType1) {
      if (stat in this.raw) {
        this.processedStats[stat] = this.defaultStatCalc(this.raw[stat], this.raw[`${stat}Grade`])
      }
    }
    for (const stat of statType2) {
      if (stat in this.raw) {
        this.processedStats[stat] = this.evStatCalc(this.raw[stat], this.raw[`${stat}Grade`])
      }
    }
    for (const stat of statType3) {
      if (stat in this.raw) {
        this.processedStats[stat] = this.penStatCalc(this.raw[stat], this.raw[`${stat}Grade`])
      }
    }
    for (const stat of statType4) {
      if (stat in this.raw) {
        this.processedStats[stat] = this.crewStatCalc(this.raw[stat], this.raw[`${stat}Grade`])
      }
    }
  }

  defaultStatCalc (baseStat, gradeStat) {
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
    for (const stat of [...statType1, ...statType2, ...statType3, ...statType4]) {
      final[stat] = Math.round(10 * blocks.map(b => b.processedStats[stat]).reduce((a, c) => a + c, 0)) / 10
    }
    return final
  }
}
