import Vue from 'vue'

import libData from '@/assets/library.json'

export default {
  state: {
    // name: 'Starfleet',
    // ...libData,
    partLists: {
      'Starfleet': {
        ...libData
      }
    },
    partListNames: ['Starfleet'],
    currentPartListIndex: 0,
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
    partByName (state, getters) {
      return (name) => getters.currentParts.filter(p => p.name === name)[0] || null
    },
    platformByName (state, getters) {
      return (name) => getters.currentPlatforms.filter(p => p.name === name)[0] || null
    },
    currentPartListName (state) {
      return state.partListNames[state.currentPartListIndex]
    },
    currentPartList (state) {
      return state.partLists[state.partListNames[state.currentPartListIndex]]
    },
    currentParts (state, getters) {
      return getters.currentPartList.parts
    },
    currentPlatforms (state, getters) {
      return getters.currentPartList.platforms
    }
  },
  mutations: {
    addPartList (state, { name, partList }) {
      Vue.set(state.partLists, name, partList)
      state.partListNames.push(name)
    },
    setCurrentPartList (state, index) {
      state.currentPartListIndex = index
    },
    deletePartList (state, index) {
      delete state.partLists[state.partListNames[state.currentPartListIndex]]
      state.partListNames.splice(index, 1)
    },
    changePartListName (state, { index, name }) {
      let oldName = state.partListNames[index]
      Vue.set(state.partLists, name, state.partLists[oldName])
      state.partListNames.splice(index, 1, name)
      delete state.partLists[oldName]
    },
    storePartLists (state) {
      localStorage.setItem('partLists', JSON.stringify({
        names: state.partListNames,
        lists: state.partLists
      }))
    },
    loadLists (state, storedLists) {
      Vue.set(state, 'partListNames', storedLists.names)
      Vue.set(state, 'partLists', storedLists.lists)
    },
    loadListsFromData (state) {
      Vue.set(state, 'partListNames', ['Starfleet'])
      Vue.set(state, 'partLists', {
        'Starfleet': {
          ...libData
        }
      })
    }
  },
  actions: {
    savePartList ({ commit, state }, { name, partList }) {
      commit('addPartList', { name, partList })
      commit('storePartLists')
    },
    removePartList ({ commit }, index) {
      commit('deletePartList', index)
      commit('storePartLists')
    },
    renamePartList ({ commit }, payload) {
      commit('changePartListName', payload)
      commit('storePartLists')
    },
    loadPartListsFromStorage ({ commit }) {
      let stored = localStorage.getItem('partLists')
      if (stored) {
        try {
          stored = JSON.parse(stored)
          commit('loadLists', stored)
        } catch (error) {
          console.error('Unable to parse saved part lists. Resetting...')
          commit('storePartLists')
        }
      } else {
        commit('storePartLists')
      }
    }
  }
}
