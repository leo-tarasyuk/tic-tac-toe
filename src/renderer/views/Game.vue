<template>
  <div class="game-board">
    <div class="game-content">
      <div class="tic-tac-toe">
        <div
          v-for="(item, index) in squares"
          :key="index"
          ref="square"
          class="square"
          @click="event => clickHandler(event, index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="score">
      <div class="score__title">Score</div>
      <div class="score__content">
        <div class="score-players">
          <div class="player">
            <p>x</p>
            <p>0</p>
          </div>
          <div class="player">
            <p>O</p>
            <p>0</p>
          </div>
        </div>
        <div class="app-buttons">
          <Button
            v-if="!game"
            class="margin-top"
            name="New game"
            color="green"
            :method="newGame"
          />
          <Button
            class="margin-top"
            name="Clear score"
            color="blue"
          />
          <BackButton class="margin-top" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/General/BackButton.vue'
import Button from '@/components/General/Button.vue'

export default {
  name: 'Game',

  components: {
    BackButton,
    Button
  },

  data () {
    return {
      squares: Array(9).fill(null),
      count: 0,
      winLine: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ],
      game: true
    }
  },

  methods: {
    clickHandler (event, index) {
      if (this.game) {
        let symbol = (this.count % 2 === 0) ? 'X' : 'O'

        if (this.squares[index] === null) {
          this.squares[index] = symbol
          event.target.innerHTML = symbol
          this.count += 1
        }

        this.win(symbol)
        this.draw()
      }
    },

    win (symbol) {
      this.winLine.forEach(item => {
        if (
          this.squares[item[0]] === symbol &&
          this.squares[item[1]] === symbol &&
          this.squares[item[2]] === symbol
        ) {
          alert('Winner is ' + symbol)
          this.game = false
        }
      })
    },

    draw () {
      if (this.squares.every(elem => elem != null) && this.game) {
        alert('This is a draw :D')
        this.game = false
      }
    },

    newGame () {
      this.squares = Array(9).fill(null)
      this.count = 0
      this.$refs.square.map(item => {
        item.innerHTML = ''

        return item
      })
      this.game = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles";

.game-board {
  width: 100%;
  height: 563px;
  display: flex;

  .game-content {
    width: 100%;
    border: 2px solid $color-black-1;

    .tic-tac-toe {
      width: 300px;
      height: 300px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 2px solid $color-black-1;
      margin: 100px auto;

      .square {
        width: 99px;
        height: 99px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid $color-black-1;
        font-size: 48px;
        cursor: pointer;
      }
    }
  }

  .score {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid $color-black-1;
    border-left: 0;
    border-collapse: collapse;

    .score__title {
      width: 100%;
      text-align: center;
      border-bottom: 2px solid $color-black-1;
    }

    .score__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 20px;

      .score-players {
        width: 100px;
        display: flex;
        justify-content: space-between;

        .player {
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }

      .app-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;

        .margin-top {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>