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
    setSlots (state, slots) {
      Vue.set(state, 'slots', slots)
    },
    setSlot (state, { index, properties }) {
      Vue.set(state.slots, index, properties)
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
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties ({ commit, state, dispatch }, { index, properties }) {
      if (properties.module === null) {
        properties.techTier = null
        properties.stats = {}
      } else if (state.slots[index].module === null) {
        properties.techTier = 0
      }
      commit('setSlot', {
        index,
        properties: { ...state.slots[index], ...properties }
      })
      if (properties.module) {
        dispatch('setExtraSlots')
      }
    },
    setExtraSlots ({ state, rootGetters, commit }) {
      let extraSlots = state.slots
        .filter(p => p.module)
        .map(p => p.module)
        .map(m => rootGetters.partByName(m))
        .map(m => m.extraSlots)
        .reduce((a, c) => a + c, 0)
      let baseSlots = rootGetters.platformByName(state.platform).maxSlots + 5
      let currentSlots = state.slots.length
      // if we need to remove a slot
      if (currentSlots > baseSlots + extraSlots) {
        commit('setSlots', state.slots.slice(0, baseSlots + extraSlots))
      } else if (currentSlots < baseSlots + extraSlots) {
        commit('setSlots', [
          ...state.slots,
          ...new Array(baseSlots + extraSlots - currentSlots).fill(rootGetters.emptySlot)
        ])
      }
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
