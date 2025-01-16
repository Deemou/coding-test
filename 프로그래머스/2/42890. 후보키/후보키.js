function solution(relation) {
  const candidateKeys = [];
  const numRows = relation.length;
  const numCols = relation[0].length;

  for (let i = 1; i < 1 << numCols; i++) {
    const comb = [];
    for (let j = 0; j < numCols; j++) {
      if (i & (1 << j)) comb.push(j);
    }

    if (isUnique(comb) && isMinimal(comb)) candidateKeys.push(comb);
  }

  return candidateKeys.length;

  function isUnique(comb) {
    const rowsMap = new Set();
    for (let r = 0; r < numRows; r++) {
      const tuple = comb.map((index) => relation[r][index]).join("|");
      if (rowsMap.has(tuple)) return false;
      rowsMap.add(tuple);
    }

    return true;
  }

  function isMinimal(comb) {
    for (const key of candidateKeys) {
      if (key.every((k) => comb.includes(k))) return false;
    }

    return true;
  }
}
