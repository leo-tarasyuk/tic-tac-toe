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

import Button from '@/components/General/Button.vue'

export default {
  name: 'Main',

  components: {
    Button
  },

  methods: {
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
  }

  .router-buttons {
    padding-top: 20px;
  }
}
</style>
