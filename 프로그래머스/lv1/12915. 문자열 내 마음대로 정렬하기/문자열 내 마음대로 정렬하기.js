function solution(strings, n) {
  return strings.sort((a, b) => {
    const char1 = a.charAt(n);
    const char2 = b.charAt(n);
    if (char1 > char2) return 1;
    if (char1 < char2) return -1;
    if (a > b) return 1;
    return -1;
  });
}

// String.localeCompare()를 이용한 풀이
// 문제는 실행속도가 약 500배 이상 느렸음
// function solution(strings, n) {
//   return strings.sort((a, b) => {
//     const char1 = a.charAt(n);
//     const char2 = b.charAt(n);
//     return char1 === char2 ? a.localeCompare(b) : char1.localeCompare(char2);
//   });
// }
