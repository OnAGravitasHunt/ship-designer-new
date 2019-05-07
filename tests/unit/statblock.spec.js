import Statblock from '@/lib/statblock'
import { parts } from '@/assets/library.json'

// Statblock(rawStats, techTier, platformGrade)

describe('Statblock Object', () => {
  test('should create a statblock object', () => {
    let s = new Statblock(parts[0].stats, 0, 1)
    expect(s).toBeTruthy()
  })

  test('should sum statblocks', () => {
    let phaser = new Statblock(parts[23].stats, 0, 1)
    let torpedo = new Statblock(parts[26].stats, 0, 1)
    let s = Statblock.add(phaser, torpedo)
    console.log(s)
    expect(s).toBeTruthy()
  })
})
