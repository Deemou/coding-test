function solution(n, words) {
  const spokenWords = new Set();
  let lastChar = words[0][0];

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    const player = (i % n) + 1;

    if (currentWord[0] !== lastChar || spokenWords.has(currentWord))
      return [player, Math.floor(i / n) + 1];

    spokenWords.add(currentWord);
    lastChar = currentWord.at(-1);
  }

  return [0, 0];
}
