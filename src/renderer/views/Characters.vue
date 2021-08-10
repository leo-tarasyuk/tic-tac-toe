<template>
  <div class="characters" v-if="characters">
    <p class="characters__name">
      {{ characters[count].name }}
    </p>
    <img
      class="characters__image"
      :src="characters[count].image"
      alt="Character"
      width="200"
      height="200"
    >
    <div class="character__change-buttons">
      <Button
        name="Back"
        color="blue"
        :method="backCharacter"
      />
      <Button
        name="Next"
        color="blue"
        :method="nextCharacter"
      />
    </div>
    <Button
      name="Submit"
      color="green"
      :method="submitCharacter"
    />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Button from '../components/General/Button.vue'

export default {
  name: 'Characters',

  components: {
    Button
  },

  mounted () {
    ipcRenderer.on('characters', (event, arg) => {
      this.characters = arg
    })
  },

  data () {
    return {
      characters: [],
      count: 0
    }
  },

  methods: {
    nextCharacter () {
      if (this.count >= 0 && this.count < 19) this.count++
    },

    backCharacter () {
      if (this.count > 0 && this.count <= 19) this.count--
    },

    submitCharacter () {
      ipcRenderer.send('close-character')
    }
  }
}
</script>

<style lang="scss" scoped>
.characters {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .characters__name {
    padding-top: 20px;
  }

  .characters__image {
    margin: 20px 0;
  }

  .character__change-buttons {
    padding-bottom: 20px;
  }
}
</style>