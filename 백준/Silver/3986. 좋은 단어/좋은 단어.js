const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
let cnt = 0;

for (let i = 1; i <= N; i++) {
  const str = input[i].replace("\r", "");
  const stack = [];
  stack.push(str[0]);
  for (let j = 1; j < str.length; j++) {
    const char = str[j];
    if (char === stack.at(-1)) stack.pop();
    else stack.push(char);
  }
  if (stack.length === 0) cnt++;
}

console.log(cnt);
