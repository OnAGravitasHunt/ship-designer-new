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
    savedDesigns: []
  },
  mutations: {
    addDesign (state, design) {
      state.savedDesigns.push(design)
    }
  },
  actions: {

  }
})
