import libData from '@/assets/library.json'

export default {
  state: {
    ...libData,
    nullModule: {
      name: null,
      type: null,
      slot: null,
      limit: null,
      extraSlots: null,
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
        computedProperties: {}
      }
    },
    defaultSlots () {
      return [
        {
          module: 'Armored Hull',
          techTier: 1,
          required: true,
          computedProperties: {}
        },
        {
          module: 'Small Annihilation Core (FC)',
          techTier: 1,
          required: true,
          computedProperties: {}
        },
        {
          module: 'Compact High Performance Pattern Nacelles',
          techTier: 1,
          required: true,
          computedProperties: {}
        },
        {
          module: 'SMP Core',
          techTier: 1,
          required: true,
          computedProperties: {}
        },
        {
          module: 'Response Pattern Deflector',
          techTier: 1,
          required: true,
          computedProperties: {}
        }
      ]
    },
    parts (state) {
      return state.parts
    }
  }
}
