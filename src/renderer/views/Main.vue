<template>
  <main>
    <h1>Welcome to the Tic-Tac-Toe</h1>
    <p>If you want play, please, click the button "Play"</p>
    <div class="router-buttons">
      <Button
        name="Play"
        color="green"
        :method="goToSettingPage" 
      />
      <Button
        name="Exit"
        color="red"
        :method="closeApp" 
      />
    </div>
  </main>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'

import Button from '@/components/General/Button.vue'

export default {
  name: 'Main',

  components: {
    Button
  },

  created () {
    this.getAllCharacters()
  },

  methods: {
    ...mapActions({
      getAllCharacters: 'characters/getAll'
    }),

    closeApp () {
      ipcRenderer.send('close-app')
    },

    goToSettingPage () {
      this.$router.push('/settings')
    }
  }
}
</script>

<style lang="scss">
@import "@/styles";

main {
  width: 100%;
  height: 563px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: $fontMontserrat;
    font-size: 40px;
    font-weight: bold;
    padding-bottom: 20px;
    text-align: center;
  }

  p {
    text-align: center;
  }

  .router-buttons {
    padding: 20px;
  }
}
</style>
