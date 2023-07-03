const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("example.txt").toString().trim().split("\n");
const [n, k] = input
  .shift()
  .split(" ")
  .map((a) => +a);
const lines = input.map((a) => +a);

let low = 1,
  high = Math.max(...lines);

while (low <= high) {
  let mid = Math.floor((low + high) / 2);
  let totalLines = 0;
  for (let i = 0; i < lines.length; i++) {
    totalLines += Math.floor(lines[i] / mid);
  }

  if (totalLines >= k) low = mid + 1;
  else high = mid - 1;
}
console.log(high);
