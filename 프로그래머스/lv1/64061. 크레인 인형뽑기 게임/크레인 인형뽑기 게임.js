function solution(board, moves) {
  const transposedBoard = transpose(board);
  const game = new ClawMachineGame(transposedBoard);
  return game.moves(moves);
}

const transpose = (matrix) =>
  matrix.reduce((result, row) => row.map((_, i) => [...(result[i] || []), row[i]]), []);

class ClawMachineGame {
  #lanes;
  #prizes;
  #popCount;

  constructor(board) {
    this.#lanes = board.map((lane) => lane.reverse().filter((item) => this.isNotEmpty(item)));
    this.#prizes = [];
    this.#popCount = 0;
  }

  isNotEmpty(item) {
    return item !== 0;
  }

  moves(laneNumbers) {
    laneNumbers.forEach((laneNumber) => {
      this.move(laneNumber - 1);
    });
    return this.#popCount;
  }

  move(laneNumber) {
    const item = this.#lanes[laneNumber].pop();
    if (!item) return;

    this.pileUpPrize(item);
    this.popContinuousPrizes();
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
}