function solution(babbling) {
  const possibleWords = ['aya', 'ye', 'woo', 'ma'];
  const groupRegex = '(' + possibleWords.join('|') + ')';
  const consecutiveRegexString = groupRegex + '\\1+';
  const combinationRegexString = '^' + groupRegex + '+$';
  const consecutiveRegex = new RegExp(consecutiveRegexString);
  const combinationRegex = new RegExp(combinationRegexString);

  return babbling.reduce(
    (answer, babblingWord) =>
      !consecutiveRegex.test(babblingWord) && combinationRegex.test(babblingWord)
        ? ++answer
        : answer,
    0
  );
}
