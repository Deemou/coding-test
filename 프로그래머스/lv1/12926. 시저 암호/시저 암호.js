function solution(s, n) {
  const arr = s.split("");
  arr.forEach((char, index) => {
    arr[index] = getNewChar(char, n);
  });
  return arr.join("");
}
function isAlphabet(char) {
  return /[a-z]/ig.test(char);
}
function isUpperCase(char) {
  return /[A-Z]/g.test(char);
}
function getAscii(char) {
  return char.charCodeAt(0);
}
function getNewChar(char, distance) {
  if (!isAlphabet(char)) return char;

  const ALPHABET_NUM = 26;
  distance %= ALPHABET_NUM;
  const LAST_UPPER_ASCII = 90;
  const LAST_LOWER_ASCII = 122;
  const ascii = getAscii(char) + distance;
  const lastAscii = isUpperCase(char) ? LAST_UPPER_ASCII : LAST_LOWER_ASCII;
  const code = ascii > lastAscii ? ascii - ALPHABET_NUM : ascii;
  return String.fromCharCode(code);
}
