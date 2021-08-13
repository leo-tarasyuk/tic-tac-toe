import axios from 'axios'

const path = require('path')
const fs = require('fs')
const os = require('os')

const pathDownload = path.join(os.homedir(), '/Downloads')
const file = path.join(pathDownload, 'characters.json')

const state = () => ({
  characters: [],
  filterCharacters: []
})

const getters = {
  characters: state => state.characters,
  filterCharacters: state => state.filterCharacters
}

const mutations = {
  setCharacters (state, payload) {
    state.characters = payload
  },

  setFilterCharacters (state, payload) {
    state.filterCharacters = payload
  }
}

const actions = {
  async getAll ({ commit, dispatch }) {
    fs.readFile(file, 'utf-8', async (error, data) => {
      if (data) {
        const allCharacters = JSON.parse(data)
        const date = allCharacters.date
        const currentDate = Date.now()
        const oneHour = 3600000

        if (currentDate - date < oneHour) {
          commit('setCharacters', allCharacters.charactersData)
        } else {
          dispatch('getAllFromApi')
        }
      } else {
        console.log(error)
        dispatch('getAllFromApi')
      }
    })
  },

  async getAllFromApi ({ commit }) {
    return axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {
        commit('setCharacters', response.data.results)

        return Promise.resolve(response.data.results)
      })
      .catch((error) => Promise.reject(error))
  },

  async getFilterCharacters ({ commit }, payload) {
    let api = 'https://rickandmortyapi.com/api/character/?'

    if (payload.name) api += `&name=${payload.name}`
    if (payload.status) api += `&status=${payload.status}`
    if (payload.gender) api += `&gender=${payload.gender}`

    return axios
      .get(api)
      .then(response => {
        commit('setFilterCharacters', response.data.results)

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
