function solution(n) {
  const FIRST_WORD = "수",
    SECOND_WORD = "박";
  const str = FIRST_WORD + SECOND_WORD;
  const repetition = Math.floor(n / 2);
  const message = str.repeat(repetition);
  
  if (n % 2 == 1) return message + FIRST_WORD;
  return message;
}
