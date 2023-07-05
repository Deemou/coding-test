let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();

const arr = new Array(9).fill(0);

for (let i = 0; i < input.length; i++) {
  if ([6, 9].includes(+input[i])) arr[6] += 0.5;
  else arr[input[i]] += 1;
}
console.log(Math.ceil(Math.max(...arr)));
