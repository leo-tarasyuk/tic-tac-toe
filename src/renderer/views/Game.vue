<template>
  <div class="game-board">
    <div class="game-content">
      <div class="tic-tac-toe">
        <div
          v-for="(item, index) in squares"
          :key="index"
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
        <BackButton />
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/General/BackButton.vue'

export default {
  name: 'Game',

  components: {
    BackButton
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

        if (this.squares[index] == null) {
          this.squares[index] = symbol
          event.target.innerHTML = symbol
          this.count += 1
        }

        for (let i = 0; i < this.winLine.length - 1; i++) {
          let line = this.winLine[i]

          if (
            this.squares[line[0]] === symbol &&
            this.squares[line[1]] === symbol &&
            this.squares[line[2]] === symbol
          ) {
            alert('Winner is ' + symbol)
            this.game = false
          }
        }
      }
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
  border-bottom: 1p solid $color-black-1;

  .game-content {
    width: 100%;
    border: 1px solid $color-black-1;

    .tic-tac-toe {
      width: 300px;
      height: 300px;
      border: 2px solid $color-black-1;
      margin: 50px auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

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
    border: 2px solid $color-black-1;
    border-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .score__title {
      width: 100%;
      height: 50px;
      text-align: center;
      border-bottom: 2px solid $color-black-1;
    }

    .score__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;

      .score-players {
        width: 100%;
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
    }
  }
}
</style>