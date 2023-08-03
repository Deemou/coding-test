function solution() {
  const fs = require("fs");
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : "./example.txt";
  const input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map(Number);
  const n = input[0];
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(input[i]);
  }
  return arr.sort((a, b) => a - b).join("\n");
}

console.log(solution());
