function solution(board, moves) {
  const game = new ClawMachineGame(board);
  return game.moves(moves);
}

class ClawMachineGame {
  #board;
  #prizes;
  #popCount;

  constructor(board) {
    this.#board = board;
    this.#prizes = [];
    this.#popCount = 0;
  }

  moves(lanes) {
    lanes.forEach((lane) => {
      this.move(lane - 1);
    });
    return this.#popCount;
  }

  move(lane) {
    const board = this.#board;
    for (let i = 0; i < board.length; i++) {
      const item = board[i][lane];
      if (this.isNotEmpty(item)) {
        this.pileUpPrize(item);
        this.popContinuousPrizes();
        this.setItemEmpty(i, lane);
        break;
      }
    }
  }

  isNotEmpty(item) {
    return item !== 0;
  }

  pileUpPrize(prize) {
    this.#prizes.push(prize);
  }

  popContinuousPrizes() {
    const top = this.#prizes.length - 1;

    if (this.#prizes[top] !== this.#prizes[top - 1]) return;

    for (let i = 0; i < 2; i++) this.popPrize();
  }

  popPrize() {
    this.#prizes.pop();
    this.#popCount++;
  }

  setItemEmpty(index, lane) {
    this.#board[index][lane] = 0;
  }
}