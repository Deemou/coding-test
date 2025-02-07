function solution(board) {
  let oCount = 0;
  let xCount = 0;

  for (const row of board) {
    for (const col of row) {
      if (col === "O") oCount++;
      else if (col === "X") xCount++;
    }
  }

  const oWin = isWinning("O");
  const xWin = isWinning("X");

  if (
    xCount > oCount ||
    oCount > xCount + 1 ||
    (oWin && xWin) ||
    (oWin && oCount === xCount) ||
    (xWin && oCount !== xCount)
  )
    return 0;

  return 1;

  function isWinning(player) {
    return (
      (board[0][0] === player &&
        board[0][1] === player &&
        board[0][2] === player) ||
      (board[1][0] === player &&
        board[1][1] === player &&
        board[1][2] === player) ||
      (board[2][0] === player &&
        board[2][1] === player &&
        board[2][2] === player) ||
      (board[0][0] === player &&
        board[1][0] === player &&
        board[2][0] === player) ||
      (board[0][1] === player &&
        board[1][1] === player &&
        board[2][1] === player) ||
      (board[0][2] === player &&
        board[1][2] === player &&
        board[2][2] === player) ||
      (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) ||
      (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player)
    );
  }
}
