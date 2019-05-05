import Vue from 'vue'

export default {
  state: {
    className: 'Comet Study 1',
    classGrade: 1, // should be looked up based on platform
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: [
      {
        module: 'Armored Hull',
        techTier: 1,
        required: true
      },
      {
        module: 'Small Annihilation Core (FC)',
        techTier: 1,
        required: true
      },
      {
        module: 'Compact High Performance Pattern Nacelles',
        techTier: 1,
        required: true
      },
      {
        module: 'SMP Core',
        techTier: 1,
        required: true
      },
      {
        module: 'Response Pattern Deflector',
        techTier: 1,
        required: true
      }
    ]
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    },
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties (state, { index, properties }) {
      state.slots.splice(index, 1, { ...state.slots[index], ...properties })
    },
    setSlots (state, slots) {
      Vue.set(state, 'slots', slots)
    },
    // set platform type
    setPlatformName (state, name) {
      state.platform = name
    },
    setPlatformGrade (state, grade) {
      state.grade = grade
    }
  },
  actions: {
    setPlatform ({ commit, rootState, rootGetters }, name) {
      let platformData = rootState.library.platforms.filter(p => p.name === name)[0]
      let reqSlots = platformData.slotsMin
      let optSlots = platformData.slotsMax - reqSlots
      let slots = [
        ...rootGetters.defaultSlots,
        ...new Array(reqSlots).fill({ ...rootGetters.emptySlot, required: true }),
        ...new Array(optSlots).fill(rootGetters.emptySlot)
      ]
      commit('setPlatformName', name)
      commit('setSlots', slots)
      commit('setPlatformGrade', platformData.grade)
    }
  }
}
