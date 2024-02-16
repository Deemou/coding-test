function solution(weights) {
  weights.sort((a, b) => b - a);
  const weightCount = {};
    
  return weights.reduce((pairs, w) => {
    if (weightCount[w]) pairs += weightCount[w]; // 1:1
    if (weightCount[(3 * w) / 2]) pairs += weightCount[(3 * w) / 2]; // 2:3
    if (weightCount[2 * w]) pairs += weightCount[2 * w]; // 2:4
    if (weightCount[(4 * w) / 3]) pairs += weightCount[(4 * w) / 3]; // 3:4
    weightCount[w] = (weightCount[w] || 0) + 1;

    return pairs;
  }, 0);
}