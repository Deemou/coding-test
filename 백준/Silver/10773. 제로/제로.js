let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = input.shift();
const stack = [];

for (let i = 0; i < n; i++) {
  const num = +input[i];
  if (num === 0) stack.pop();
  else stack.push(num);
}

const sum = stack.reduce((prev, cur) => prev + cur, 0);
console.log(sum);
