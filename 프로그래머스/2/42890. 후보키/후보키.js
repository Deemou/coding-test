function solution(relation) {
  const candidateKeys = [];
  const numRows = relation.length;
  const numCols = relation[0].length;

  for (let i = 1; i < 1 << numCols; i++) {
    const comb = [];
    for (let j = 0; j < numCols; j++) {
      if (i & (1 << j)) comb.push(j);
    }

    // 유일성 검사
    const rowsMap = new Set();

    for (let r = 0; r < numRows; r++) {
      const tuple = comb.map((index) => relation[r][index]).join("|");
      rowsMap.add(tuple);
    }

    if (rowsMap.size !== numRows) continue;

    // 최소성 검사
    let isMinimal = true;
    for (const key of candidateKeys) {
      if (key.every((k) => comb.includes(k))) {
        isMinimal = false;
        break;
      }
    }

    if (isMinimal) candidateKeys.push(comb);
  }

  return candidateKeys.length;
}
