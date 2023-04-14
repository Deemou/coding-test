function solution(begin, target, words) {
  const shouldMatch = begin.length - 1;
  const dist = Array(words.length + 1).fill(0);
  const wordsPlus = [...words, begin];
  const queue = [];
  queue.push(words.length);

  while (queue.length > 0) {
    const cur = queue.shift();
    for (let i in wordsPlus) {
      if (dist[i] !== 0) continue;
      let match = 0;

      for (let j in begin) {
        if (wordsPlus[cur][j] === wordsPlus[i][j]) {
          match++;
        }
      }

      if (match !== shouldMatch) continue;
      dist[i] = dist[cur] + 1;
      if (wordsPlus[i] === target) return dist[i];
      queue.push(i);
    }
  }

  return 0;
}
