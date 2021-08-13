<template>
  <section>
    <form class="filter-character-form">
      <h1>Rick and Morty characters</h1>
      <input
        class="character-name" 
        type="text"
        v-model="form.name"
      >
      <div class="status-block">
        <label
          v-for="(status, index) in statuses"
          :key="index"
          class="status"
        >
          <input
            class="input-status"
            type="radio"
            v-model="form.status"
            :value="status" 
          />
          <div class="selected-status"></div>
          <p class="input-text">{{ status }}</p>
        </label>
      </div>
      <div class="select">
        <div @click="openList" class="select__head">
          <p ref="select__head" class="select__text">Choose gender</p>
        </div>
        <ul ref="select__list" class="select__list">
          <li
            v-for="(gender, index) in genders"
            :key="index"
            class="select__item"
            @click="chooseGender(gender)"
          >
            {{ gender }}
          </li>
        </ul>
    </div>
      <input
        class="filter-character-submit"
        type="submit"
        @click="getCharacters" 
      />
    </form>
    <ul v-if="filterCharacters.length" class="filter-charecters">
      <h2>Characters:</h2>
      <li
        v-for="character in filterCharacters"
        :key="character.id"
        class="character"
      >
        <img :src="character.image" alt="character">
        <p>{{ character.name }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FilterCharacter',

  computed: {
    ...mapGetters({
      filterCharacters: 'characters/filterCharacters'
    })
  },

  data () {
    return {
      form: {
        name: '',
        status: '',
        gender: ''
      },
      genders: ['Male', 'Female'],
      statuses: ['Alive', 'Dead'],
      selectClickCounter: 0
    }
  },

  methods: {
    ...mapActions({
      getFilterCharacters: 'characters/getFilterCharacters'
    }),

    getCharacters (event) {
      event.preventDefault()
      this.getFilterCharacters(this.form)
    },

    openList () {
      if (this.selectClickCounter % 2 === 0) {
        this.$refs.select__list.style.display = 'block'
      } else {
        this.$refs.select__list.style.display = 'none'
      }
      this.selectClickCounter++
    },

    chooseGender (gender) {
      this.$refs.select__head.innerHTML = gender
      this.form.gender = gender
      this.$refs.select__list.style.display = 'none'
      this.selectClickCounter++
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles';

.filter-character-form {
  width: 500px;
  height: 100%;
  margin: 90px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $color-black-1;

  .character-name {
    width: 300px;
    padding: 0 20px;
    background: $color-grey-1;
    line-height: 40px;
    border-width: 0;
    border-radius: 20px;
    outline: none;
  }

  h1 {
    font-size: 32px;
    text-align: center;
    padding-bottom: 20px;
    color: $color-grey-3;
  }

  .status-block {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      background: $color-grey-1;
    }

    .status {
      display: flex;
      align-items: center;
      border-radius: 100px;
      padding: 10px 20px;
      margin: 0 5px;
      cursor: pointer;

      .input-status {
        display: none;
      }

      .selected-status {
        width: 22px;
        height: 22px;
        border-radius: 100px;
        padding-left: 10px;
        cursor: pointer;
        background: $color-grey-2;
      }

      .input-status:checked~.selected-status {
        background: $color-blue-1;
      }

      .input-text {
        padding-left: 10px;
        color: $color-grey-3;
      }
    }
  }

  .select {
    position: relative;
    min-width: 200px;
    max-width: 300px;
    margin-bottom: 20px;

    .select__head {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      box-shadow: 0 0 4px $color-black-1;
      border-radius: 10px;
      cursor: pointer;
      color: $color-grey-3;

      .select__text {
        width: 100%;
        padding: 0 0 0 15px;
        margin: 0;
      }
    }

    .select__list {
      display: none;
      box-shadow: 0 0 4px rgb(0, 0, 0);
      border-radius: 10px;
      margin-top: 5px;
      margin: 0;
      padding: 0;
      color: $color-grey-3;

      .select__item {
        padding: 10px 15px;
        cursor: pointer;
        list-style-type: none;
        &:hover {
          background-color: $color-grey-1;
          border-radius: 10px;
        }
      }
    }
  }

  .filter-character-submit {
    padding: 5px 20px;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: $color-blue-1;
  }
}

.filter-charecters {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 24px;
    color: $color-grey-3;
  }

  .character {
    list-style: none;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 200px;
      height: 200px;
    }

    p {
      text-align: center;
      padding-top: 20px;
    }
  }
}
</style>