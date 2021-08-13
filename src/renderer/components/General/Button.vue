<template>
  <button :class="color" @click="clickButton">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    name: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: ''
    },

    method: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    clickButton (event) {
      event.preventDefault()
      this.method()
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
  padding: 5px 20px;
  border-radius: 30px;
  transition: all 0.15s ease;
  margin: 0 5px;
  color: $color-white-1;
}

.green {
  background-color: $color-green-1;
  border: 1px solid $color-green-1;
  &:hover {
    color: $color-green-1;
    background-color: $color-white-1;
  }
}

.red {
  background-color: $color-red-1;
  border: 1px solid $color-red-1;
  &:hover {
    color: $color-red-1;
    background-color: $color-white-1;
  }
}

.blue {
  background-color: $color-blue-1;
  border: 1px solid $color-blue-1;
  &:hover {
    color: $color-blue-1;
    background-color: $color-white-1;
  }
}
</style>