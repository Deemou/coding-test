function solution(n, t, m, p) {
  let answer = "";
  let number = "";

  for (let i = 0; number.length < t * m; i++) {
    number += i.toString(n).toUpperCase();
  }

  for (let i = 0; i < t; i++) {
    answer += number[m * i + p - 1];
  }

  return answer;
}
