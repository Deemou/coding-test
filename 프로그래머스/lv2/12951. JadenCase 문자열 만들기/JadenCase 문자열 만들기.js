function solution(s) {
  const words = s.split(" ");

  const jadenCaseWords = words.map((word) => {
    if (word.length === 0) return "";
    const firstChar = word[0].toUpperCase();
    const restChars = word.slice(1).toLowerCase();
    return firstChar + restChars;
  });

  return jadenCaseWords.join(" ");
}
