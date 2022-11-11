function solution(s) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
      return str.replaceAll(numberWord, numbers[index]);;
    }, s)
  );
}
