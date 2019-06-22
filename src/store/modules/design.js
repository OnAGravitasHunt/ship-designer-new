import Vue from 'vue'
import Statblock from '@/lib/statblock'

const roundingFunctions = {
  c: s => Math.floor(s),
  s: s => Math.floor(s),
  h: s => Math.floor(s),
  l: s => Math.floor(s),
  p: s => Math.floor(s),
  e: s => Math.floor(s),
  r: s => Math.floor(s),
  pen: roundPercents,
  ev: roundPercents,
  br: roundRes,
  sr: roundRes,
  o: roundCrew,
  en: roundCrew,
  t: roundCrew
}

function roundCrew (c) {
  return Math.ceil(c / 10)
}
function roundRes (r, grade) {
  let step = grade === 1 ? 5 : 10
  return step * Math.ceil(r / step)
}
function roundPercents (s) {
  return Math.round(s * 1000) / 10
}

export default {
  state: {
    defaultTier: 0,
    className: 'Comet Study 1',
    platformGrade: 1,
    minSlots: 2,
    platform: "2310s 500-1000kt Frigate 'Kepler' 'Comet'",
    slots: [],
    partList: ''
  },
  getters: {
    platformStats (state, getters, rootState, rootGetters) {
      return rootGetters.platformByName(state.platform).stats
    },
    totalStats (state, getters, rootState, rootGetters) {
      let parts = state.slots
        .filter(s => s.module)
        .map(slot => ({
          slot,
          stats: rootGetters.partByName(slot.module).stats
        }))
      let pStats = getters.platformStats
      return Statblock.add(
        ...parts.map(p => new Statblock(p.stats, p.slot.techTier, state.platformGrade)),
        new Statblock(pStats, 0, state.platformGrade, true)
      )
    },
    weights (state, getters, rootState, rootGetters) {
      let platform = rootGetters.currentPlatforms.filter(p => p.name === state.platform)[0]
      let filled = Math.max(0, state.slots.filter(s => s.module).length - 5)
      return {
        max: Math.round(platform.overheadWeight + (platform.maxSlots, state.slots.length - 5) * platform.slotWeight),
        design: Math.round(
          platform.overheadWeight + filled * platform.slotWeight
        )
      }
    },
    roundedStats (state, getters) {
      let tStats = {
        ...getters.totalStats,
        br: getters.weights.design / 10 + getters.totalStats.br
      }
      Object.keys(tStats).forEach(s => {
        tStats[s] = roundingFunctions[s](tStats[s], state.platformGrade)
      })
      return tStats
    },
    buildTime (state, getters, rootState, rootGetters) {
      let base = rootGetters.platformByName(state.platform).buildTime
      let additional = state.slots.filter(s => s.module).length - 5
      return Math.ceil((base + additional) / 3) / 4
    },
    requiredSlot (state) {
      return (i) => i < state.minSlots + 5
    }
  },
  mutations: {
    setClassName (state, name) {
      state.className = name
    },
    setSlots (state, slots) {
      Vue.set(state, 'slots', JSON.parse(JSON.stringify(slots)))
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
    },
    setMinSlots (state, min) {
      state.minSlots = min
    },
    setDefaultTier (state, tier) {
      state.defaultTier = tier
    },
    setDesignPartList (state, listName) {
      state.partList = listName
    }
  },
  actions: {
    setPlatform ({ commit, state, rootState, rootGetters }, { name, overwrite = false }) {
      return new Promise((resolve, reject) => {
        let platformData = rootGetters.platformByName(name)
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
        slots = slots.map((s, i) => ({ ...s, key: i }))

        commit('setPlatformName', name)
        commit('setSlots', slots)
        commit('setPlatformGrade', platformData.grade)
        commit('setMinSlots', reqSlots)
        resolve()
      })
    },
    // set slot properties; properties object must contain 'module' or 'techTier'
    setSlotProperties ({ commit, state, dispatch }, { index, properties }) {
      if (properties.module === null) {
        properties.techTier = null
        properties.isRefit = false
        properties.stats = {}
      } else if (state.slots[index].module === null && properties.module) {
        properties.techTier = state.defaultTier
      }
      commit('setSlot', {
        index,
        properties: { ...state.slots[index], ...properties }
      })
      if (properties.module) {
        dispatch('setextraSlot')
      }
    },
    setextraSlot ({ state, rootGetters, commit }) {
      let extraSlot = state.slots
        .filter(p => p.module)
        .map(p => p.module)
        .map(m => rootGetters.partByName(m))
        .map(m => m.extraSlot)
        .reduce((a, c) => a + c, 0)
      let baseSlots = rootGetters.platformByName(state.platform).maxSlots + 5
      let currentSlots = state.slots.length
      // if we need to remove a slot
      if (currentSlots > baseSlots + extraSlot) {
        commit('setSlots', state.slots.slice(0, baseSlots + extraSlot))
      } else if (currentSlots < baseSlots + extraSlot) {
        commit('setSlots', [
          ...state.slots,
          ...new Array(baseSlots + extraSlot - currentSlots).fill(rootGetters.emptySlot)
        ])
      }
    },
    // clear design
    clearDesign ({ dispatch, commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('setClassName', '')
        dispatch('setPlatform', { name: rootGetters.currentPlatforms[0].name, overwrite: true })
        resolve()
      })
    },
    restoreDesign ({ dispatch, commit, state }, { design }) {
      return new Promise((resolve, reject) => {
        dispatch('setPlatform', { name: design.platform, overwrite: true }).then(() => {
          commit('setSlots', design.slots)
          commit('setDesignPartList', design.partList)
          commit('setClassName', design.className)
          commit('setDefaultTier', design.defaultTier)
          resolve()
        })
      })
    }
  }
}
