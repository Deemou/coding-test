function solution(n, words) {
  const takenWords = new Map();
  let lastChar = words[0][0];

  for (let i = 0; i < words.length; i++) {
    const curWord = words[i];

    if (curWord.length === 1 || curWord[0] !== lastChar || takenWords.has(curWord))
      return [(i % n) + 1, Math.floor(i / n) + 1];

    takenWords.set(curWord, true);
    lastChar = curWord.at(-1);
  }

  return [0, 0];
}
