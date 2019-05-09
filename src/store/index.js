import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import design from './design'
import library from './library'

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
    setEditing (state, index) {
      state.editingDesign = index
    },
    clearEditing (state) {
      state.editingDesign = null
    }
  },
  actions: {

  }
})
