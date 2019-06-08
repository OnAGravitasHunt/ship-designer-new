import Vue from 'vue'
import Vuex from 'vuex'

import ui from './modules/ui'
import design from './modules/design'
import library from './modules/library'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    design,
    library
  },
  state: {
    savedDesigns: [],
    editingDesign: null
  },
  mutations: {
    addDesign (state, design) {
      state.savedDesigns.push(design)
    },
    updateDesign (state, design) {
      state.savedDesigns.splice(state.editingDesign, 1, design)
    },
    updateLocalStorage (state) {
      localStorage.setItem('designs', JSON.stringify(state.savedDesigns))
    },
    loadDesignsFromStorage (state) {
      let loaded = localStorage.getItem('designs')
      if (loaded) {
        Vue.set(state, 'savedDesigns', JSON.parse(loaded))
      }
    },
    setEditing (state, index) {
      state.editingDesign = index
    },
    clearEditing (state) {
      state.editingDesign = null
    },
    removeDesign (state, index) {
      state.savedDesigns.splice(index, 1)
    }
  },
  actions: {
    // TODO: maybe merge these?
    saveNewDesign ({ commit }, design) {
      commit('addDesign', design)
      commit('updateLocalStorage')
    },
    saveExistingDesign ({ commit }, design) {
      commit('updateDesign', design)
      commit('updateLocalStorage')
    },
    deleteDesign ({ commit }, index) {
      commit('removeDesign', index)
      commit('updateLocalStorage')
    }
  }
})
