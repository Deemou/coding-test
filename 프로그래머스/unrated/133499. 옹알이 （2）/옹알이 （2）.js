function solution(babbling) {
  const possibleWords = ['aya', 'ye', 'woo', 'ma'];
  const combinationWords = getCombinationWords(possibleWords, babbling);
  const nonConsecutiveWords = getNonConsecutiveWords(possibleWords, combinationWords);
  return nonConsecutiveWords.length;
}

function getNonConsecutiveWords(possibleWords, words) {
  return words.filter((word) => {
    for (let i = 0; i < possibleWords.length; i++) {
      if (word.includes(possibleWords[i].repeat(2))) return false;
    }
    return true;
  });
}

function getCombinationWords(possibleWords, words) {
  return words.filter((word) => {
    for (let i = 0; i < possibleWords.length; i++) {
      const regex = new RegExp(possibleWords[i], 'g');
      word = word.replace(regex, '-');
    }
    const lowercaseRegex = /[a-z]/;
    if (lowercaseRegex.test(word)) return false;
    return true;
  });
}