const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
let cnt = 0;

for (let i = 1; i <= N; i++) {
  const word = input[i];
  let history = [];
  let isGroupWord = true;

  for (let j = 0; j < word.length; j++) {
    if (history.indexOf(word[j]) === -1) {
      history.push(word[j]);
    } else {
      if (history.indexOf(word[j]) !== history.length - 1) {
        isGroupWord = false;
        break;
      }
    }
  }
  if (isGroupWord) cnt += 1;
}
console.log(cnt);
