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
  }
}
