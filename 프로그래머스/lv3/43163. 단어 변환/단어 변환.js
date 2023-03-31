function solution(begin, target, words) {
  const shouldMatch = begin.length - 1;
  const dist = Array(words.length + 1).fill(0);
  const queue = [];
  const wordsPlus = words.slice();
  wordsPlus.push(begin);
  queue.push(words.length);

  while (queue.length !== 0) {
    const cur = queue.shift();
    for (let i = 0; i < wordsPlus.length - 1; i++) {
      if (dist[i] !== 0) continue;
      let match = 0;

      for (let j = 0; j < begin.length; j++) {
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