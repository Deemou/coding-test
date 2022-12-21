function solution(n, words) {
  const takenWords = [words[0]];
  let lastCharacter = words[0].at(-1);

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const firstCharcter = word[0];
    if (lastCharacter !== firstCharcter || takenWords.includes(word)) {
      const number = (i % n) + 1;
      const round = Math.floor(i / n) + 1;
      return [number, round];
    }
    takenWords.push(word);
    lastCharacter = word.at(-1);
  }
  return [0, 0];
}
