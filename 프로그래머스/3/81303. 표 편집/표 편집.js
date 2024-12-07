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
  const UP = "U";
  const DOWN = "D";
  const DELETE = "C";
  const ROLLBACK = "Z";

  const table = Array.from({ length: n }, (_, i) => new Node(i));
  const activationTable = Array(n).fill(ACTIVE);
  const deleted = [];
  let currentRow = k;

  table[0].next = table[1];
  table[n - 1].prev = table[n - 2];
  for (let i = 1; i < n - 1; i++) {
    table[i].prev = table[i - 1];
    table[i].next = table[i + 1];
  }

  for (let i = 0; i < cmd.length; i++) {
    const [action, x] = cmd[i].split(" ");

    switch (action) {
      case UP: {
        currentRow = findActiveRowAbove(currentRow, x);
        break;
      }
      case DOWN: {
        currentRow = findActiveRowBelow(currentRow, x);
        break;
      }
      case DELETE: {
        activationTable[currentRow] = INACTIVE;
        deleted.push(currentRow);

        const row = table[currentRow];
        if (row.prev) row.prev.next = row.next;
        if (row.next) {
          row.next.prev = row.prev;
          currentRow = row.next.index;
        } else currentRow = row.prev.index;
        break;
      }
      case ROLLBACK: {
        const lastDeleted = deleted.pop();
        activationTable[lastDeleted] = ACTIVE;
        const row = table[lastDeleted];
        if (row.prev) row.prev.next = row;
        if (row.next) row.next.prev = row;
        break;
      }
    }
  }

  return activationTable.join("");

  function findActiveRowAbove(idx, x) {
    let row = table[idx];

    for (let i = 0; i < x; i++) {
      row = row.prev;
    }

    return row.index;
  }

  function findActiveRowBelow(idx, x) {
    let row = table[idx];

    for (let i = 0; i < x; i++) {
      row = row.next;
    }

    return row.index;
  }
}