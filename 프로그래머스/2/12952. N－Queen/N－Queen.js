function solution(n) {
  const board = Array(n).fill(0);
  let answer = 0;

  function canPlace(row, col) {
    for (let i = 0; i < row; i++) {
      if (
        board[i] === col ||
        board[i] - i === col - row ||
        board[i] + i === col + row
      )
        return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      answer++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (canPlace(row, col)) {
        board[row] = col;
        backtrack(row + 1);
        board[row] = 0;
      }
    }
  }

  backtrack(0);

  return answer;
}
