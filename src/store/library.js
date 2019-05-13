import libData from '@/assets/library.json'

export default {
  state: {
    ...libData,
    nullModule: {
      name: null,
      type: null,
      slot: null,
      limit: null,
      extraSlot: null,
      crewChange: null,
      special: null,
      stats: {
        techBonus: null,
        c: null,
        cGrade: null,
        s: null,
        sGrade: null,
        h: null,
        hGrade: null,
        l: null,
        lGrade: null,
        p: null,
        pGrade: null,
        r: null,
        rGrade: null,
        e: null,
        eGrade: null,
        ev: null,
        evGrade: null,
        pen: null,
        penGrade: null
      },
      costs: {
        br: null,
        brGrade: null,
        sr: null,
        srGrade: null,
        o: null,
        oGrade: null,
        en: null,
        enGrade: null,
        t: null,
        tGrade: null
      },
      grades: [
        true,
        true,
        true
      ]
    }
  },
  getters: {
    emptySlot () {
      return {
        module: null,
        techTier: null,
        required: false,
        isRefit: false,
        userDivider: false
      }
    },
    defaultSlots (state, getters) {
      return new Array(5).fill(getters.emptySlot)
    },
    parts (state) {
      return state.parts
    },
    partByName (state) {
      return (name) => state.parts.filter(p => p.name === name)[0] || null
    },
    platformByName (state) {
      return (name) => state.platforms.filter(p => p.name === name)[0] || null
    }
  }
}
