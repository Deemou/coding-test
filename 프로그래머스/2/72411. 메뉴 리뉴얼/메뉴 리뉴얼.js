function solution(orders, course) {
  const combinationCountsByMenuSize = new Map();
  const result = [];

  for (const c of course) {
    combinationCountsByMenuSize.set(c, new Map());
  }

  for (const order of orders) {
    const sortedOrder = order.split("").sort();

    for (const c of course) {
      const combinations = getCombinations(sortedOrder, c);

      for (const comb of combinations) {
        const combinationCounts = combinationCountsByMenuSize.get(c);
        const key = comb.join("");
        const count = (combinationCounts.get(key) || 0) + 1;
        combinationCounts.set(key, count);
      }
    }
  }

  for (const c of course) {
    let maxCount = 0;
    const combinationCounts = combinationCountsByMenuSize.get(c);

    for (const [key, count] of combinationCounts) {
      maxCount = Math.max(maxCount, count);
    }

    if (maxCount <= 1) continue;

    for (const [key, count] of combinationCounts) {
      if (count === maxCount) result.push(key);
    }
  }

  return result.sort();
}

function getCombinations(array, size) {
  const subArray = [];
  const result = [];

  function combine(start) {
    if (subArray.length === size) {
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
