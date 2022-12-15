function solution(s) {
  const splitWords = [];
  let copiedString = s.slice();
  let firstLetter = copiedString[0];
  let firstLetterCount = 0;
  let nonFirstLetterCount = 0;
  let index = 0;

  while (index !== copiedString.length) {
    copiedString[index] === firstLetter ? firstLetterCount++ : nonFirstLetterCount++;
    if (firstLetterCount === nonFirstLetterCount) {
      firstLetterCount = 0;
      nonFirstLetterCount = 0;
      const indexEnd = index + 1;
      const splitWord = copiedString.slice(0, indexEnd);
      splitWords.push(splitWord);
      copiedString = copiedString.slice(indexEnd);
      firstLetter = copiedString[0];
      index = -1;
    }
    index++;
  }
  if (copiedString) splitWords.push(copiedString);

  return splitWords.length;
}
