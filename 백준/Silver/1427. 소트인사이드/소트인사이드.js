const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();

const arr = input
  .split("")
  .sort((a, b) => b - a)
  .join("");
console.log(arr);
