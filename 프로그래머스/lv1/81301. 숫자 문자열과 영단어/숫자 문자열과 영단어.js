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

// String.split()과 Array.join()을 이용한 풀이
// function solution(s) {
//   let numberWords = [
//     "zero",
//     "one",
//     "two",
//     "three",
//     "four",
//     "five",
//     "six",
//     "seven",
//     "eight",
//     "nine",
//   ];
//   return Number(
//     numberWords.reduce((str, numberWord, index) => {
//       return str.split(numberWord).join(index);
//     }, s)
//   );
// }
