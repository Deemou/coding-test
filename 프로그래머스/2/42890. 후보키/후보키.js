function solution(relation) {
  const candidateKeys = [];
  const numRows = relation.length;
  const numCols = relation[0].length;

  for (let i = 1; i <= numCols; i++) {
    const combinations = getCombinations(
      Array.from({ length: numCols }, (_, idx) => idx),
      i
    );

    for (const comb of combinations) {
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
  }

  return candidateKeys.length;
}

function getCombinations(array, length) {
  const subArray = [];
  const result = [];

  function combine(start) {
    if (subArray.length === length) {
      result.push([...subArray]);
      return;
    }

    for (let i = start; i < array.length; i++) {
      subArray.push(array[i]);
      combine(i + 1);
      subArray.pop();
    }
  }

  combine(0);
  return result;
}
