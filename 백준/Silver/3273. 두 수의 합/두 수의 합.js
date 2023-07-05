let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const arr = input[1].split(" ").map((v) => +v);
const x = +input[2];
const map = new Map();

let cnt = 0;
for (let i = 0; i < n; i++) {
  if (map.has(x - arr[i])) cnt++;
  map.set(arr[i], true);
}

console.log(cnt);
