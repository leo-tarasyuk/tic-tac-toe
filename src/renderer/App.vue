<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron'
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
