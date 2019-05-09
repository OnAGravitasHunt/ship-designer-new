import Vue from 'vue'
import Statblock from '@/lib/statblock'

export default {
  state: {
    className: 'Comet Study 1',
    platformGrade: 1, // should be looked up based on platform
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: []
  },
  getters: {
    totalStats (state, getters, rootState) {
      let parts = state.slots
        .filter(s => s.module)
        .map(slot => ({
          slot,
          stats: rootState.library.parts.filter(p => p.name === slot.module)[0].stats
        }))
      return Statblock.add(
        ...parts.map(p => new Statblock(p.stats, p.slot.techTier, state.platformGrade))
      )
    },
    weights (state, getters, rootState) {
      let platform = rootState.library.platforms.filter(p => p.name === state.platform)[0]
      return {
        max: platform.overheadWeight + platform.maxSlots * platform.slotWeight,
        design: platform.overheadWeight
          + (state.slots.filter(s => s.module).length - 5) * platform.slotWeight
      }
    }
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    },
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties (state, { index, properties }) {
      if (properties.module === null) {
        properties.techTier = null
        properties.stats = {}
      } else if (state.slots[index].module === null) {
        properties.techTier = 0
      }
      Vue.set(state.slots, index, { ...state.slots[index], ...properties })
      // state.slots.splice(index, 1, { ...state.slots[index], ...properties })
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
    setPlatform ({ commit, state, rootState, rootGetters }, { name, overwrite = false }) {
      return new Promise((resolve, reject) => {
        let platformData = rootState.library.platforms.filter(p => p.name === name)[0]
        let reqSlots = platformData.minSlots
        let optSlots = platformData.maxSlots - reqSlots
        let slots = [
          ...rootGetters.defaultSlots,
          ...new Array(reqSlots).fill({
            ...rootGetters.emptySlot,
            required: true
          }),
          ...new Array(optSlots).fill(rootGetters.emptySlot)
        ]
        if (!overwrite) {
          slots = slots.map((s, i) => {
            return state.slots[i] && state.slots[i].module ? state.slots[i] : s
          })
        }

        commit('setPlatformName', name)
        commit('setSlots', slots)
        commit('setPlatformGrade', platformData.grade)
        resolve()
      })
    },
    // clear design
    clearDesign ({ dispatch, commit, rootState }) {
      commit('setClassName', '')
      dispatch('setPlatform', { name: rootState.library.platforms[0].name, overwrite: true })
    },
    restoreDesign ({ dispatch, commit }, { design }) {
      dispatch('setPlatform', { name: design.platform, overwrite: true }).then(() => {
        commit('setSlots', design.slots)
        commit('setClassName', design.className)
      })
    }
  }
}
