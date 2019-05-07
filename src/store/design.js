import Vue from 'vue'

const allStats = ['c', 's', 'h', 'l', 'p', 'e', 'r', 'pen', 'ev', 'pen']
const allCosts = ['br', 'sr', 'o', 'en', 't']

export default {
  state: {
    className: 'Comet Study 1',
    platformGrade: 1, // should be looked up based on platform
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: [
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
  getters: {
    totalStats (state) {
      let stats = {}
      let costs = {}
      console.log(state.slots.filter(s => s.module))
      for (const slot of state.slots.filter(s => s.module)) {
        for (const stat of allStats) {
          stats[stat] = stats[stat] + slot.computedProperties.stats[stat] || 0
        }
        for (const res of allCosts) {
          costs[res] = costs[res] + slot.computedProperties.costs[res] || 0
        }
      }
      return { stats, costs }
    }
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    },
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties (state, { index, properties }) {
      console.log('setting properties')
      if (properties.module === null) {
        properties.techTier = null
        properties.computedProperties = {}
      } else if (state.slots[index].module === null) {
        properties.techTier = 0
      }
      Vue.set(state.slots, index, { ...state.slots[index], ...properties })
      // state.slots.splice(index, 1, { ...state.slots[index], ...properties })
      console.log(state.slots[index].computedProperties)
    },
    setSlots (state, slots) {
      Vue.set(state, 'slots', slots)
    },
    // set platform type
    setPlatformName (state, name) {
      state.platform = name
    },
    setPlatformGrade (state, grade) {
      state.platformGrade = grade
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
