<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'electron',

  mounted () {
    ipcRenderer.on('navigate', (event, routePath) => {
      if (this.$router.currentRoute.path !== routePath) {
        this.$router.push(routePath)
      }
    })
  }
}
</script>

<style lang="scss">
@import "./styles";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: $fontManrope;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
}
</style>
