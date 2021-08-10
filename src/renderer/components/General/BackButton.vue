<template>
  <button @click="goBack">Back</button>
</template>

<script>
export default {
  name: 'BackButton',

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles";

button {
  font-size: 18px;
  cursor: pointer;
  outline: none;
  padding: 10px 30px;
  border-radius: 30px;
  transition: all 0.15s ease;
  color: $color-white-1;
  background-color: $color-black-1;
  border: 1px solid $color-black-1;
  &:hover {
    color: $color-black-1;
    background-color: $color-white-1;
  }
}
</style>