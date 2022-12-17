function solution(s) {
  return s
    .split(' ')
    .map((str) => upperCaseEvenAndLowerCaseOdd(str))
    .join(' ');
}

function upperCaseEvenAndLowerCaseOdd(str) {
  const splitString = str.split('');
  for (let i = 0; i < splitString.length; i++) {
    if (i & 1) splitString[i] = splitString[i].toLowerCase();
    else splitString[i] = splitString[i].toUpperCase();
  }
  return splitString.join('');
}
