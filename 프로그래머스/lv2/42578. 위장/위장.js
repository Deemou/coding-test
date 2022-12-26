function solution(clothes) {
  const numberOfEachCloth = clothes.reduce((map, [_, kind]) => {
    const number = map.get(kind) + 1 || 1;
    return map.set(kind, number);
  }, new Map());

  let numberOfCombinations = 1;
  for ([_, value] of numberOfEachCloth) {
    numberOfCombinations *= value + 1;
  }
  return numberOfCombinations - 1;
}
