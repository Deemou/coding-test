const fs = require("fs");
const [n, input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += +input[i];
}
console.log(sum);
