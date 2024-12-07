class Node {
  constructor(index) {
    this.index = index;
    this.prev = null;
    this.next = null;
  }
}

function solution(n, k, cmd) {
  const ACTIVE = "O";
  const INACTIVE = "X";
  const COMMANDS = {
    UP: "U",
    DOWN: "D",
    DELETE: "C",
    ROLLBACK: "Z",
  };

  const table = Array.from({ length: n }, (_, i) => new Node(i));
  const activationStatus = Array(n).fill(ACTIVE);
  const deletedRowIndexes = [];
  let currentRow = table[k];

  for (let i = 0; i < n; i++) {
    if (i > 0) table[i].prev = table[i - 1];
    if (i < n - 1) table[i].next = table[i + 1];
  }

  for (let i = 0; i < cmd.length; i++) {
    const [command, steps] = cmd[i].split(" ");

    switch (command) {
      case COMMANDS.UP: {
        currentRow = getRowAboveBySteps(currentRow, steps);
        break;
      }
      case COMMANDS.DOWN: {
        currentRow = getRowBelowBySteps(currentRow, steps);
        break;
      }
      case COMMANDS.DELETE: {
        deleteRow(currentRow);
        currentRow = getNextRow(currentRow);
        break;
      }
      case COMMANDS.ROLLBACK: {
        rollbackRow();
        break;
      }
    }
  }

  return activationStatus.join("");

  function getRowAboveBySteps(row, steps) {
    for (let i = 0; i < steps; i++) {
      row = row.prev;
    }

    return row;
  }

  function getRowBelowBySteps(row, steps) {
    for (let i = 0; i < steps; i++) {
      row = row.next;
    }

    return row;
  }

  function deleteRow(row) {
    activationStatus[row.index] = INACTIVE;
    deletedRowIndexes.push(row.index);

    if (row.prev) row.prev.next = row.next;
    if (row.next) row.next.prev = row.prev;
  }

  function getNextRow(row) {
    return row.next ? row.next : row.prev;
  }

  function rollbackRow() {
    const lastDeletedRow = deletedRowIndexes.pop();
    activationStatus[lastDeletedRow] = ACTIVE;
    const row = table[lastDeletedRow];
    if (row.prev) row.prev.next = row;
    if (row.next) row.next.prev = row;
  }
}