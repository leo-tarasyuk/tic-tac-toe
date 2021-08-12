import axios from 'axios'

const path = require('path')
const fs = require('fs')
const os = require('os')

const pathDownload = path.join(os.homedir(), '/Downloads')
const file = path.join(pathDownload, 'characters.json')

const state = () => ({
  characters: [],
  playerOne: {},
  playerTwo: {}
})

const getters = {
  characters: state => state.characters,
  playerOne: state => state.playerOne,
  playerTwo: state => state.playerTwo
}

const mutations = {
  setCharacters (state, payload) {
    state.characters = payload
  },

  setPlayerOne (state, payload) {
    state.playerOne = payload
  },

  setPlayerTwo (state, payload) {
    state.playerTwo = payload
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
          commit('setPlayerOne', allCharacters.charactersData[0])
          commit('setPlayerTwo', allCharacters.charactersData[0])
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
        commit('setPlayerOne', response.data.results[0])
        commit('setPlayerTwo', response.data.results[0])
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
