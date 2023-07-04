const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = input
  .shift()
  .split(" ")
  .map((a) => +a);
const trees = input
  .pop()
  .split(" ")
  .map((a) => +a);

let min = 0;
let max = Math.max(...trees) - 1;

while (min <= max) {
  let mid = Math.floor((min + max) / 2);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.max(trees[i] - mid, 0);
  }
  if (sum >= m) min = mid + 1;
  else max = mid - 1;
}
console.log(max);
