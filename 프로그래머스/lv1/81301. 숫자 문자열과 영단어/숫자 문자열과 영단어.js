function solution(s) {
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return Number(
    numberWords.reduce((str, numberWord, index) => {
      return str.replaceAll(numberWord, index);
    }, s)
  );
}
