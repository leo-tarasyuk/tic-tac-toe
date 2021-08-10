import Vue from 'vue'
import Vuex from 'vuex'
import { createSharedMutations, createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createSharedMutations(),
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
