<template>
  <main>
    <h2>Please, choose players</h2>
    <div class="players-container">
      <div v-if="characters" class="player">
        <p>{{ characters[0].name }}</p>
        <img :src="characters[0].image" alt="Player1">
        <Button
          name="Choose player"
          color="blue"
          :method="changeCharacter"
        />
      </div>
      <div v-if="characters" class="player">
        <p>{{ characters[0].name }}</p>
        <img :src="characters[0].image" alt="Player2">
        <Button
          name="Choose player"
          color="blue"
          :method="changeCharacter"
        />
      </div>
    </div>
    <div>
      <BackButton />
      <Button
        name="Start"
        color="green"
        :method="goToGamePage" 
      />
    </div>
  </main>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapGetters, mapActions } from 'vuex'
// import axios from 'axios'

import Button from '@/components/General/Button.vue'
import BackButton from '@/components/General/BackButton.vue'

export default {
  name: 'Settings',

  components: {
    Button,
    BackButton
  },

  // mounted () {
  //   axios
  //     .get('https://rickandmortyapi.com/api/character')
  //     .then(response => (this.characters = response.data.results))
  // },

  created () {
    this.getCharacters()
  },

  // data () {
  //   return {
  //     characters: []
  //   }
  // },

  computed: {
    ...mapGetters({
      characters: 'characters/characters'
    })
  },

  methods: {
    ...mapActions({
      getCharacters: 'characters/getCharacters'
    }),

    goToGamePage () {
      this.$router.push('/game')
    },

    changeCharacter () {
      ipcRenderer.send('change-character', this.characters)
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 563px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h2 {
    font-size: 32px;
    font-weight: bold;
    padding-bottom: 20px;
  }

  .players-container {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 30px;

    .player {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 200px;
        height: 200px;
        margin: 20px 0;
      }
    }
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>