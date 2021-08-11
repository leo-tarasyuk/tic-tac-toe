import axios from 'axios'

const state = () => ({
  characters: []
})

const getters = {
  characters: state => state.characters
}

const mutations = {
  setCharacters (state, payload) {
    state.characters = payload
  }
}

const actions = {
  async getAll ({ commit }) {
    return axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        commit('setCharacters', response.data.results)
        return Promise.resolve(response.data.results)
      })
      .catch((error) => Promise.reject(error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
